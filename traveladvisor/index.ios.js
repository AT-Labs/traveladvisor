import React, { Component } from 'react';
import {
  AppRegistry,
  BackAndroid,
  Navigator,
  StyleSheet,
  Text,
  View,
   Dimensions,
   StatusBar,
   TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import AppSettings from "./components/settings";
import HomeView from "./components/HomeView";
import AlertsView from "./components/AlertsView";
import AlertDetails from "./components/AlertDetails";

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
var _navigator;

var RouteMapper = function(route, navigationOperations) {
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
               <View style={{flex:1}}>
                   <StatusBar
                       barStyle="default"
                   />
                   <View style={styles.topTitle} >
                       <View style={styles.topPress}>
                           <TouchableOpacity onPress={navigationOperations.pop}>
                               <View>
                                   <Text style={styles.topTitleBack}> Back</Text>
                                   <Icon name="angle-left" style={styles.Icon}/>
                               </View>
                           </TouchableOpacity>
                           <Text style={styles.topTitleText}>{AppSettings.alertCategories.highway.title}</Text>
                           <Text>             </Text>
                       </View>
                   </View>
                  <AlertsView
                    navigator={navigationOperations}
                    type = {AppSettings.alertCategories.highway.key}
                  />
               </View>
          </View>
    );
  } else if (route.name === AppSettings.alertCategories.moved_stop.routeName) {
    return (
          <View style={{flex: 1}}>
               <View style={{flex:1}}>
                   <StatusBar
                       barStyle="default"
                   />
                   <View style={styles.topTitle} >
                       <View style={styles.topPress}>
                           <TouchableOpacity onPress={navigationOperations.pop}>
                               <View>
                                   <Text style={styles.topTitleBack}> Back</Text>
                                   <Icon name="angle-left" style={styles.Icon}/>
                               </View>
                           </TouchableOpacity>
                           <Text style={styles.topTitleText}>{AppSettings.alertCategories.moved_stop.title}</Text>
                           <Text>             </Text>
                       </View>
                   </View>
                  <AlertsView
                    navigator={navigationOperations}
                    type = {AppSettings.alertCategories.moved_stop.key}
                  />
               </View>
          </View>
    );
  } else if (route.name === AppSettings.alertCategories.real_time.routeName) {
    return (
          <View style={{flex: 1}}>
               <View style={{flex:1}}>
                   <StatusBar
                       barStyle="default"
                   />
                   <View style={styles.topTitle} >
                       <View style={styles.topPress}>
                           <TouchableOpacity onPress={navigationOperations.pop}>
                               <View>
                                   <Text style={styles.topTitleBack}> Back</Text>
                                   <Icon name="angle-left" style={styles.Icon}/>
                               </View>
                           </TouchableOpacity>
                           <Text style={styles.topTitleText}>{AppSettings.alertCategories.real_time.title}</Text>
                           <Text>             </Text>
                       </View>
                   </View>
                  <AlertsView
                    navigator={navigationOperations}
                    type = {AppSettings.alertCategories.real_time.key}
                  />
               </View>
          </View>
    );
  } else if (route.name === AppSettings.alertCategories.road.routeName) {
    return (
          <View style={{flex: 1}}>
               <View style={{flex:1}}>
                   <StatusBar
                       barStyle="default"
                   />
                   <View style={styles.topTitle} >
                       <View style={styles.topPress}>
                           <TouchableOpacity onPress={navigationOperations.pop}>
                               <View>
                                   <Text style={styles.topTitleBack}> Back</Text>
                                   <Icon name="angle-left" style={styles.Icon}/>
                               </View>
                           </TouchableOpacity>
                           <Text style={styles.topTitleText}>{AppSettings.alertCategories.road.title}</Text>
                           <Text>             </Text>
                       </View>
                   </View>
                  <AlertsView
                    navigator={navigationOperations}
                    type = {AppSettings.alertCategories.road.key}
                  />
               </View>
          </View>
    );
  } else if (route.name === AppSettings.alertCategories.events.routeName) {
    return (
          <View style={{flex: 1}}>
               <View style={{flex:1}}>
                   <StatusBar
                       barStyle="default"
                   />
                   <View style={styles.topTitle} >
                       <View style={styles.topPress}>
                           <TouchableOpacity onPress={navigationOperations.pop}>
                               <View>
                                   <Text style={styles.topTitleBack}> Back</Text>
                                   <Icon name="angle-left" style={styles.Icon}/>
                               </View>
                           </TouchableOpacity>
                           <Text style={styles.topTitleText}>{AppSettings.alertCategories.events.title}</Text>
                           <Text>             </Text>
                       </View>
                   </View>
                  <AlertsView
                    navigator={navigationOperations}
                    type = {AppSettings.alertCategories.events.key}
                  />
               </View>
          </View>
    );
  } else if(route.name === AppSettings.sections.alertDetails.routeName){
    return (
         <View style={{flex: 1}}>
               <View style={{flex:1}}>
                   <StatusBar
                       barStyle="default"
                   />
                   <View style={styles.topTitle} >
                       <View style={styles.topPress}>
                           <TouchableOpacity onPress={navigationOperations.pop}>
                               <View>
                                   <Text style={styles.topTitleBack}> Back</Text>
                                   <Icon name="angle-left" style={styles.Icon}/>
                               </View>
                           </TouchableOpacity>
                           <Text style={styles.topTitleText}>{AppSettings.alertCategories.alertDetails.title}</Text>
                           <Text>             </Text>
                       </View>
                   </View>
                 <AlertDetails
                    navigator={navigationOperations}
                    data={route.data}
                />
               </View>
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
    topTitle:{
        flexDirection: 'row',
        backgroundColor: AppSettings.colors.appContainerBackground,
        marginTop: 20,
        height: 44,
        paddingTop: 7,
    },
    topPress:{
        flex:1,
        flexDirection:'row',
        justifyContent: 'space-between',
        width:width,
    },
    topTitleText:{
        fontSize: 16,
        // flex:1,
        color: AppSettings.colors.appContainerText,
        fontWeight: '700',
        marginTop: 5,
    },
    topTitleBack:{
        color: AppSettings.colors.appContainerText,
        // alignSelf: 'flex-start',
        marginTop: 6,
        paddingLeft: 20,
        textAlign: 'center'
    },
    Icon:{
        color: AppSettings.colors.appContainerText,
        fontSize: 35,
        marginLeft: 5,
        elevation: 20,
        position: 'absolute',
        left: 0,
        bottom: -8
    },
});

AppRegistry.registerComponent('travelimpact', () => travelimpact);
