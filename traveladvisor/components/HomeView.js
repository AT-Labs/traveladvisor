'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Dimensions,
    Linking,
    StatusBar,
    TouchableHighlight
} from 'react-native';
import AppSettings from "./settings";
import AlertsUpdate from "./AlertsUpdate";
import Instabug from "./instabug";

class HomeView extends Component {
    constructor(props) {
        super(props);

        let {width, height} = Dimensions.get('window');

        this.state = {
            dimensionsStyles: StyleSheet.create({
                backgroundImage: {
                    width: width
                }
            }),
            initialPosition: null
        };
    }

    _layoutChange(e) {
        let {width, height} = Dimensions.get('window');
        var deviceWidth = Math.min(width, height);
        var deviceHeight = Math.max(width, height);

        var currentImageHeight = e.nativeEvent.layout.height;

        var isPortrait = currentImageHeight > deviceWidth;

        this.setState({
            dimensionsStyles: StyleSheet.create({
                backgroundImage: {
                    width: isPortrait ? deviceWidth : deviceHeight
                }
            })
        });

    }

    _getBannerView() {
        return (
            <View style={styles.imageContainer}>
                <Image
                    source={require('./images/at_logo.png')}
                    resizeMode='contain'
                    style={{flex: 1, width: 60, height: 60, alignSelf: 'center'}}
                />
                <Text
                    style={{flex: 5, color: '#ffffff', fontSize: 30, alignSelf: 'center'}}>
                    Travel Advisor
                </Text>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.rootContainer}>
                <StatusBar
                    barStyle="light-content"
                        />
                <Image
                    source={require('./images/background.jpg')}
                    style={[styles.backgroundImage, this.state.dimensionsStyles.backgroundImage]}
                    resizeMode={Image.resizeMode.cover}
                    onLayout={(e) => this._layoutChange(e)}>
                    {this._getBannerView()}
                    <ScrollView
                        style={styles.scrollViewContainer}>
                        <AlertsUpdate/>
                        <TouchableHighlight
                            style={styles.panel}
                            onPress={() => this.props.navigator.push({name: AppSettings.alertCategories.highway.routeName})}
                            key={AppSettings.alertCategories.highway.routeName.key}>
                            <View style={styles.panelWrap}>
                                <View style={AppSettings.alertCategories.highway.indicatorStyle}></View>
                                <Text style={styles.panelText}>{AppSettings.alertCategories.highway.title}</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={styles.panel}
                            onPress={() => this.props.navigator.push({name: AppSettings.alertCategories.moved_stop.routeName})}
                            key={AppSettings.alertCategories.moved_stop.routeName.key}>
                            <View style={styles.panelWrap}>
                                <View style={AppSettings.alertCategories.moved_stop.indicatorStyle}></View>
                                <Text style={styles.panelText}>{AppSettings.alertCategories.moved_stop.title}</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={styles.panel}
                            onPress={() => this.props.navigator.push({name: AppSettings.alertCategories.real_time.routeName})}
                            key={AppSettings.alertCategories.real_time.routeName.key}>
                            <View style={styles.panelWrap}>
                                <View style={AppSettings.alertCategories.real_time.indicatorStyle}></View>
                                <Text style={styles.panelText}>{AppSettings.alertCategories.real_time.title}</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={styles.panel}
                            onPress={() => this.props.navigator.push({name: AppSettings.alertCategories.road.routeName})}
                            key={AppSettings.alertCategories.road.routeName.key}>
                            <View style={styles.panelWrap}>
                                <View style={AppSettings.alertCategories.road.indicatorStyle}></View>
                                <Text style={styles.panelText}>{AppSettings.alertCategories.road.title}</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={styles.panel}
                            onPress={() => this.props.navigator.push({name: AppSettings.alertCategories.events.routeName})}
                            key={AppSettings.alertCategories.events.routeName.key}>
                            <View style={styles.panelWrap}>
                                <View style={AppSettings.alertCategories.events.indicatorStyle}></View>
                                <Text style={styles.panelText}>{AppSettings.alertCategories.events.title}</Text>
                            </View>
                        </TouchableHighlight>
                    </ScrollView>
                    <TouchableHighlight
                        style={styles.panelFeedback}
                        onPress={() => Instabug.invoke()}
                        key='feedback'>
                        <View style={styles.panelWrap}>
                            <Text style={styles.panelTextFeedback}>Feedback</Text>
                            <View style={AppSettings.alertCategories.feedback.indicatorStyle}></View>
                        </View>
                    </TouchableHighlight>
                </Image>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    panel: {
        flex: 1,
        backgroundColor: 'transparent'
    },
    panelWrap: {
        height: 60,
        flexDirection: 'row'
    },
    panelText: {
        color: AppSettings.colors.textColour,
        fontSize: 20,
        marginLeft: 20,
        fontWeight: '600',
        alignSelf: 'center'
    },
    panelFeedback: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'flex-end',
        height: 40
    },
    panelTextFeedback: {
        color: AppSettings.colors.textColour,
        fontSize: 20,
        marginRight: 20,
        fontWeight: '600',
        alignSelf: 'center'
    },
    rootContainer: {
        flex: 1,
        flexDirection: 'column'
    },
    imageContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        flex: 3,
        margin: 10
    },
    scrollViewContainer: {
        flex: 5
    },
    backgroundImage: {
        flex: 1,
        paddingVertical: 1,
    }
});

module.exports = HomeView;