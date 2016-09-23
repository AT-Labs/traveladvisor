'use strict';

import React, {Component} from "react";
import {Linking, Platform, ScrollView, StyleSheet, Text, View, ListView, TouchableHighlight} from "react-native";
import moment from "moment";
import Communications from "react-native-communications";
import Icon from "react-native-vector-icons/MaterialIcons";
import AppSettings from "./settings";

const MOVED_STOP_DETAILS_URL = AppSettings.movedStopsUrl;

class AlertDetails extends Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        
        var type = props.data.alertType;
        var contentBackground = AppSettings.colors.contentBackground;
        if (AppSettings.alertCategories[type] && AppSettings.alertCategories[type].contentBackground) {
            contentBackground = AppSettings.alertCategories[type].contentBackground;
        }
        this.state = {
            newAddressesDataSource: ds,
            contentBackground:contentBackground,
            refreshing: false
        };

    }

    componentWillMount() {
        if (this.props.data.alertData.type === 'MOVED_STOP') {
            this.state.refreshing = true;
            this.state.stopId = this.props.data.alertData.stopId;
            this.state.existingAddress = this.props.data.alertData.existingAddress;
            this._fetchMovedStopDetails(this.state.stopId);
        }
    }

    _fetchMovedStopDetails(stopID) {
        var url = MOVED_STOP_DETAILS_URL.replace("{STOPID}", stopID);
        fetch(url)
            .then((response) => response.json())
            .catch((error) => {
                return [];
            })
            .then((responseData) => {
                if (responseData && responseData.response) {
                    var newAddresses = responseData.response.map(details => {
                        return details.attributes.NEWSTOPNAME;
                    });

                    this.setState({
                        refreshing: false,
                        newAddressesDataSource: this.state.newAddressesDataSource.cloneWithRows(newAddresses)
                    });
                } else {
                    console.log("empty response")
                }
            })
            .done();
    }

    _getDateRow(date, label, format = 'DD/MM/YYYY HH:mm') {
        var Result = (<View></View>);

        if (date) {
            var dateObj = moment(date);
            if (dateObj.isValid()) {
                var formattedDate = dateObj.format(format);
                Result = (
                    <View>
                        <Text style={styles.label}>{label}</Text>
                        <Text style={styles.paragraph}>{formattedDate}</Text>
                    </View>
                );
            }
        }
        return Result;
    }

    _getStringRow(data, label) {
        var Result = (<View></View>);

        if (data) {
            Result = (
                <View>
                    <Text style={styles.label}>{label}</Text>
                    <Text style={styles.paragraph}>{data}</Text>
                </View>
            );
        }
        return Result;
    }

    _renderLoading() {
        if (this.state.refreshing) {
            return (
                <Text style={styles.paragraph}>Loading...</Text>
            );
        } else {
            return null;
        }
    }

    _formatCSV(services){
        return services.split(": ")[1].split(",").join(", ")
    }

    render() {
        //var now = moment(this.props.data.alertData.startDate).format("DD MMM YY");
        var Details = (<View></View>);

        if (this.props.data.alertData.type === 'HIGHWAY') {
            var mapLink = (Platform.OS === 'ios') ? 'http://maps.apple.com/?q=' + this.props.data.alertData.location.latitude + ',' + this.props.data.alertData.location.longitude
                : 'https://maps.google.com/maps?q=loc:' + this.props.data.alertData.location.latitude + ',' + this.props.data.alertData.location.longitude;

            Details = (
                <View>
                    <Text style={styles.title}>{this.props.data.alertData.title}: {this.props.data.alertData.impact}</Text>

                    {this._getStringRow(this.props.data.alertData.description, 'Description')}

                    {this._getDateRow(this.props.data.alertData.startDate, 'From')}

                    {this._getDateRow(this.props.data.alertData.endDate, 'To')}

                    {this._getStringRow(this.props.data.alertData.expectedResolution, 'Expected resolution')}

                    {this._getStringRow(this.props.data.alertData.location.address, 'Location')}
                    <View style={{marginTop: 15, alignItems: 'center'}}>
                        <TouchableHighlight onPress={() => Communications.web(mapLink)}>
                            <View style= {{flexDirection: 'row', alignItems: 'center'}}>
                                <Icon style={styles.mapIcon} name="place"/>
                                <Text style={styles.label}>View on Map</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
            );
        } else if (this.props.data.alertData.type === 'MOVED_STOP') {
            var newAddresses = this.state.newAddresses;
            Details = (
                <View>
                    <Text style={styles.title}>{this.props.data.alertData.title}</Text>
                    {this._getStringRow(this._formatCSV(this.props.data.alertData.description), 'Affected Services')}
                    {this._getStringRow(this.props.data.alertData.existingAddress, 'Old Address')}
                    <Text style={styles.label}>New Address(es)</Text>
                    <ListView
                        dataSource={this.state.newAddressesDataSource}
                        renderRow={(rowData) => <Text style={styles.paragraph}>{rowData}</Text>}
                        renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`}
                                                                     style={styles.separator}/>}
                    />{this._renderLoading()}
                </View>
            );
        } else if (this.props.data.alertData.type === 'REAL_TIME') {
            var Url = this.props.data.alertData.url ? (<Text style={styles.activeText}
                                                   onPress={() => Communications.web(this.props.data.alertData.url)}>{this.props.data.alertData.url}</Text>) : '';

            Details = (
                <View>
                    <Text style={styles.title}>{this.props.data.alertData.title}</Text>

                    <Text style={styles.label}>Description</Text>
                    <Text style={styles.paragraph}>{this.props.data.alertData.description} {Url}</Text>

                    {this._getDateRow(this.props.data.alertData.startDate, 'From')}
                </View>
            );
        } else if (this.props.data.alertData.type === 'ROAD') {
            if (this.props.data.alertData.subtype === 'ROAD_WORKS') {
                Details = (
                    <View>
                        <Text style={styles.title}>{this.props.data.alertData.title}</Text>

                        {this._getStringRow(this.props.data.alertData.description, 'Description')}

                        {this._getDateRow(this.props.data.alertData.startDate, 'From')}

                        {this._getDateRow(this.props.data.alertData.endDate, 'To')}
                    </View>
                );
            } else if (this.props.data.alertData.subtype === 'ROAD_EVENTS') {
                Details = (
                    <View>
                        <Text style={styles.title}>{this.props.data.alertData.title}</Text>

                        {this._getDateRow(this.props.data.alertData.eventDate, 'Event date')}

                        {this._getStringRow(this.props.data.alertData.closureTimes, 'Closure times')}

                        {this._getStringRow(this.props.data.alertData.parkingRestrictions, 'Parking restrictions')}
                    </View>
                );
            }
        } else if (this.props.data.alertData.type === 'EVENTS') {
            Details = (
                <View>
                    <Text style={styles.title}>{this.props.data.alertData.title}</Text>

                    {this._getDateRow(this.props.data.alertData.startDate, 'Event starts', 'DD/MM/YYYY')}

                    {this._getDateRow(this.props.data.alertData.endDate, 'Event ends', 'DD/MM/YYYY')}

                    {this._getStringRow(this.props.data.alertData.eventTimes, 'Event times')}

                    {this._getStringRow(this.props.data.alertData.networkImpact, 'Network impact')}

                    {this._getStringRow(this.props.data.alertData.impactedRoads, 'Impacted roads')}

                    {this._getStringRow(this.props.data.alertData.roadsClosed, 'Roads closed')}

                    {this._getStringRow(this.props.data.alertData.closureTimes, 'Closure times')}

                    {this._getStringRow(this.props.data.alertData.parkingRestrictions, 'Parking restrictions')}

                    {this._getStringRow(this.props.data.alertData.restrictionTimes, 'Restriction times')}
                </View>
            );
        }

        var containerColor = {
                flex: 1,
                alignItems: 'stretch',
                justifyContent: 'center',
                backgroundColor: this.state.contentBackground
            };
        return (
            <View style={containerColor}>
                <ScrollView>
                    <View style={{alignItems: 'center'}}>
                        <Text style={styles.title}>{this.props.data.title}</Text>
                        <View style={styles.card}>
                            {Details}
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 8,
        alignItems: 'stretch',
        justifyContent: 'center',
        backgroundColor: AppSettings.colors.contentBackground,
    },
    card: {
        elevation: 2,
        marginBottom: 8,
        borderRadius: 2,
        padding: 16,
        alignSelf: 'stretch'
    },
    title: {
        color: AppSettings.colors.textColour,
        paddingBottom: 16,
        fontSize: 18,
    },
    paragraph: {
        color: AppSettings.colors.textColour,
        paddingBottom: 3,
    },
    activeText: {
        color: AppSettings.colors.textColour,
    },
    label: {
        color: AppSettings.colors.textColour,
        fontWeight: 'bold',
    },
    separator: {
        height: 1,
        backgroundColor: AppSettings.colors.separator
    },
    mapIcon: {
        color: AppSettings.colors.textColour,
        fontSize: 20
    }
});

module.exports = AlertDetails;