'use strict';

var AppSettings = {
	colors: {
            appContainerText:        '#ffffff',  // main app text colour for the home and toolbar
            appContainerBackground:  '#171717',  // main app background colour for the home and toolbar (very dark blue)
            textColour: '#dbdce4',
            contentBackground: `#222`,
            borderColor: 'rgba(0, 0, 0, 0.5)',
            toolbarBackground: '#111'
    },
	sections: {
		home: {
            routeName: 'home',
            title: ''
        },
        alerts: {
            routeName: 'alerts',
            title: 'Alerts',
            color: 'rgb(233, 54, 59)',
            activeColor: 'rgba(233, 54, 59, 0.8)'
        },
        alertDetails: {
            routeName: 'alertDetails',
            title: 'Alert Details'
        }
	},
    alertCategories: {
        highway: {
            title: 'Highway Alerts',
            routeName: 'highway',
            key: 'HIGHWAY',
            contentBackground: '#2f4a2f',
            indicatorStyle: {
                backgroundColor: 'rgba(201, 255, 149, 1)',
                width: 7
            }
        },
        moved_stop: {
            title: 'Moved Bus Stop Alerts',
            routeName: 'moved_stop',
            key: 'MOVED_STOP',
            contentBackground: '#222e42',
            indicatorStyle: {
                backgroundColor: 'rgba(164, 224, 232, 1)',
                width: 7
            }
        },
        real_time: {
            title: 'Real Time Alerts',
            routeName: 'real_time',
            key: 'REAL_TIME',
            contentBackground: '#3e2f4a',
            indicatorStyle: {
                backgroundColor: 'rgba(220, 177, 255, 1)',
                width: 7
            }
        },
        road: {
            title: 'Roadwork Alerts',
            routeName: 'road',
            key: 'ROAD',
            contentBackground: '#4a2f2f',
            indicatorStyle: {
                backgroundColor: 'rgba(232, 170, 149, 1)',
                width: 7
            }
        },
        events: {
            title: 'Event Alerts',
            routeName: 'events',
            key: 'EVENTS',
            contentBackground: '#4a3c2f',
            indicatorStyle: {
                backgroundColor: 'rgba(255, 247, 176, 1)',
                width: 7
            }
        },
        feedback: {
            indicatorStyle: {
                backgroundColor: 'rgba(233, 54, 59, 0.8)',
                width: 7
            }
        },
        "alertDetails": {
            "title": "Alert Details"
        }
    },
    titleStyle: {
        textAlign: 'center',
        color: '#dbdce4',
        //height: 20,
        fontWeight: '600',
        fontSize: 20
    },
    storageKeys: {
        alertList: '@AT_METRO:alertList',
        alertLastUpdated: '@AT_METRO:alertLastUpdated'
    },
    alertUrl: 'https://api.at.govt.nz/v2/notifications?subscription-key=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    movedStopsUrl: 'https://api.at.govt.nz/v2/notifications/stop/{STOPID}?subscription-key=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    feedbackUrl: 'https://at.govt.nz/about-us/contact-us/feedback-form/',
    alertUpdatePeriod: 24*60*60
};

module.exports = AppSettings;
