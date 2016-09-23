'use strict';

import React, {Component} from "react";
import {AsyncStorage, StyleSheet, Text, ListView, View, ScrollView, TouchableHighlight} from "react-native";
import AppSettings from "./settings";

const ALERT_LIST_STORAGE_KEY = AppSettings.storageKeys.alertList;

var fullListData = []; // global variable to keep the full data list

class AlertsView extends Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => (r1 !== r2)
        });

        var type = props.type.toLowerCase();
        var title = "";
        if (AppSettings.alertCategories[type]) {
            title = AppSettings.alertCategories[type].title;
        }

        var contentBackground = AppSettings.colors.contentBackground;
        if (AppSettings.alertCategories[type] && AppSettings.alertCategories[type].contentBackground) {
            contentBackground = AppSettings.alertCategories[type].contentBackground;
        }

        this.state = {
            dataSource: ds,    // alert data list
            refreshing: false, // loading indicator
            error: false,      // error message if any
            messages: [],      // flow messages (TEMPORARY),
            alertType: props.type, // alert type
            title: title,
            contentBackground: contentBackground
        };
    }

    componentWillMount() {
        this.setState({
            refreshing: true
        });
        // Look for saved list data in storage
        AsyncStorage.getItem(ALERT_LIST_STORAGE_KEY)
            .then((response) => {
                // data has been found
                if (response !== null) {
                    //this._appendMessage('Recovered data from Storage');

                    // save data to a global list
                    fullListData = JSON.parse(response);

                    // render a filtered list
                    this.setState({
                        refreshing: false,
                        dataSource: this.state.dataSource.cloneWithRows(this._filterAlertData(fullListData, this.state.alertType))
                    });

                    // data not found, fetch from API
                } else {
                    //this._appendMessage('Data is not found in Storage');
                    // TODO
                }
            })
            .catch((error) => {
                console.log("Error - caught error in AlertsView.componentWillMount()", error);
            })
            .done();
    }

    _filterAlertData(listData, alertType) {
        // filter data
        var filteredData = listData.filter((item) => {
            return alertType === item.type;
        });

        // sort by orderingDate
        filteredData.sort((a, b) => {
            if (a.orderingDate < b.orderingDate) {
                return 1;
            }
            if (a.orderingDate > b.orderingDate) {
                return -1;
            }
            // a must be equal to b
            return 0;
        });

        // Set up display values for different alert types
        return this._setDisplayData(filteredData);
    }

    _setDisplayData(listData) {
        return listData.map((item) => {
            if (item.type === 'HIGHWAY') {
                var impact = item.impact ? item.impact : '';
                item.displayValue = impact + ' on highway near ' + item.location.address;
                return item;
            } else {
                item.displayValue = item.title ? item.title : '';
                return item;
            }
        });
    }

    _onRefresh() {
        this._fetchAlertData(); // TODO
    }

    _displayAlertDetails(rowID, rowData) {
        this.props.navigator.push({
            name: AppSettings.sections.alertDetails.routeName,
            data: {
                alertData: rowData,
                alertType: this.state.alertType.toLowerCase(),
                title: this.state.title
            }
        });
    }

    _renderRow(rowData, sectionID, rowID) {
        return (
            <TouchableHighlight underlayColor={this.state.contentBackground}
                                onPress={() => this._displayAlertDetails(rowID, rowData)}>
                <View style={styles.card}>
                    <Text style={styles.alertListText}>{rowData.displayValue}</Text>
                </View>
            </TouchableHighlight>
        );
    }

    render() {
        var containerColor = {
            flex: 1,
            alignItems: 'stretch',
            justifyContent: 'center',
            backgroundColor: this.state.contentBackground
        };
        return (
            <View style={containerColor}>
                <ListView
                    style={{flex: 1}}
                    enableEmptySections={true}
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow.bind(this)}
                    renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`}
                                                                 style={styles.separator}/>}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    separator: {
        height: 1,
        backgroundColor: AppSettings.colors.separator
    },
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        backgroundColor: AppSettings.colors.contentBackground
    },
    card: {
        margin: 2,
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: AppSettings.colors.borderColor
    },
    alertListText: {
        flex: 1,
        textAlign: 'left',
        color: AppSettings.colors.textColour
    }
});

module.exports = AlertsView;