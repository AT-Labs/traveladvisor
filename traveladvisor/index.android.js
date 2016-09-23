import React, {Component} from "react";
import {AppRegistry, BackAndroid, Navigator, StyleSheet, Text, View, ToolbarAndroid} from "react-native";
import AppSettings from "./components/settings";
import HomeView from "./components/HomeView";
import AlertsView from "./components/AlertsView";
import AlertDetails from "./components/AlertDetails";

var _navigator;

BackAndroid.addEventListener('hardwareBackPress', () => {
    if (_navigator && _navigator.getCurrentRoutes().length > 1) {
        _navigator.pop();
        return true;
    }
    return false;
});

var RouteMapper = function (route, navigationOperations) {
    _navigator = navigationOperations;

    if (route.name === AppSettings.sections.home.routeName) {
        return (
            <HomeView
                navigator={navigationOperations}
            />
        );
    } else if (route.name === AppSettings.alertCategories.highway.routeName) {
        return (
            <View style={{flex: 1}}>
                <ToolbarAndroid
                    style={styles.toolbar}
                    title={AppSettings.alertCategories.highway.title}
                    titleColor={AppSettings.colors.textColour}
                    navIcon={require('./components/images/logo.png')}
                    onIconClicked={navigationOperations.pop}
                />
                <AlertsView
                    navigator={navigationOperations}
                    type={AppSettings.alertCategories.highway.key}
                />
            </View>
        );
    } else if (route.name === AppSettings.alertCategories.moved_stop.routeName) {
        return (
            <View style={{flex: 1}}>
                <ToolbarAndroid
                    style={styles.toolbar}
                    title={AppSettings.alertCategories.moved_stop.title}
                    titleColor={AppSettings.colors.textColour}
                    navIcon={require('./components/images/logo.png')}
                    onIconClicked={navigationOperations.pop}
                />
                <AlertsView
                    navigator={navigationOperations}
                    type={AppSettings.alertCategories.moved_stop.key}
                />
            </View>
        );
    } else if (route.name === AppSettings.alertCategories.real_time.routeName) {
        return (
            <View style={{flex: 1}}>
                <ToolbarAndroid
                    style={styles.toolbar}
                    title={AppSettings.alertCategories.real_time.title}
                    titleColor={AppSettings.colors.textColour}
                    navIcon={require('./components/images/logo.png')}
                    onIconClicked={navigationOperations.pop}
                />
                <AlertsView
                    navigator={navigationOperations}
                    type={AppSettings.alertCategories.real_time.key}
                />
            </View>
        );
    } else if (route.name === AppSettings.alertCategories.road.routeName) {
        return (
            <View style={{flex: 1}}>
                <ToolbarAndroid
                    style={styles.toolbar}
                    title={AppSettings.alertCategories.road.title}
                    titleColor={AppSettings.colors.textColour}
                    navIcon={require('./components/images/logo.png')}
                    onIconClicked={navigationOperations.pop}
                />
                <AlertsView
                    navigator={navigationOperations}
                    type={AppSettings.alertCategories.road.key}
                />
            </View>
        );
    } else if (route.name === AppSettings.alertCategories.events.routeName) {
        return (
            <View style={{flex: 1}}>
                <ToolbarAndroid
                    style={styles.toolbar}
                    title={AppSettings.alertCategories.events.title}
                    titleColor={AppSettings.colors.textColour}
                    navIcon={require('./components/images/logo.png')}
                    onIconClicked={navigationOperations.pop}
                />
                <AlertsView
                    navigator={navigationOperations}
                    type={AppSettings.alertCategories.events.key}
                />
            </View>
        );
    } else if (route.name === AppSettings.sections.alertDetails.routeName) {
        return (
            <View style={{flex: 1}}>
                <ToolbarAndroid
                    style={styles.toolbar}
                    title={AppSettings.sections.alertDetails.title}
                    titleColor={AppSettings.colors.textColour}
                    navIcon={require('./components/images/logo.png')}
                    onIconClicked={navigationOperations.pop}
                />
                <AlertDetails
                    navigator={navigationOperations}
                    data={route.data}
                />
            </View>
        );
    }
};

class travelimpact extends Component {
    render() {
        var initialRoute = {name: AppSettings.sections.home.routeName};

        return (
            <Navigator
                style={styles.navigator}
                initialRoute={initialRoute}
                configureScene={() => Navigator.SceneConfigs.FadeAndroid}
                renderScene={RouteMapper}
            />
        );
    }
}

const styles = StyleSheet.create({
    navigator: {
        flex: 1
    },
    toolbar: {
        height: 48,
        backgroundColor: AppSettings.colors.toolbarBackground,
        alignItems: 'center'
    }
});

AppRegistry.registerComponent('travelimpact', () => travelimpact);