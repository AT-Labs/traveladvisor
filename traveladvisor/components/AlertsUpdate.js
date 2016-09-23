'use strict';

import React, {Component} from "react";
import {AsyncStorage, View} from "react-native";
import moment from "moment";
import AppSettings from "./settings";

const ALERT_URL = AppSettings.alertUrl;
const ALERT_LIST_STORAGE_KEY = AppSettings.storageKeys.alertList;
const ALERT_LAST_UPDATED_STORAGE_KEY = AppSettings.storageKeys.alertLastUpdated;

class AlertsUpdate extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        AsyncStorage.getItem(ALERT_LAST_UPDATED_STORAGE_KEY)
            .then((response) => {
                // data has been found
                if (response !== null) {
                    var lastUpdateDate = moment(response);

                    // check if it is valid date
                    if (lastUpdateDate.isValid()) {
                        var secondsFromLastUpdate = moment().diff(moment(response), 'seconds');

                        if (secondsFromLastUpdate > AppSettings.alertUpdatePeriod) {
                            this._fetchAlertData();
                        }
                    } else {
                        this._fetchAlertData();
                    }
                } else {
                    this._fetchAlertData();
                }
            })
            .catch((error) => {
            })
            .done();
    }

    _fetchAlertData() {
        //Get data from API
        fetch(ALERT_URL)
            .then((response) => response.json())
            .catch((error) => {
            })
            .then((responseData) => {
                if (responseData && responseData.response && responseData.response.data) {
                    // save data to Storage
                    AsyncStorage.setItem(ALERT_LIST_STORAGE_KEY, JSON.stringify(responseData.response.data)).done();

                    // set last updated date
                    AsyncStorage.setItem(ALERT_LAST_UPDATED_STORAGE_KEY, moment().format("YYYY-MM-DD HH:mm:ss")).done();
                }
            })
            .done();
    }

    render() {
        return (
            <View></View>
        );
    }
}


module.exports = AlertsUpdate;