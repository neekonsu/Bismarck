// Keeping all components in one file for organization
// To run, create two terminal prompts
// Run `npx react-native start` in the first prompt
// Run `npx react-native run-android` in the second prompt
import React, { Component } from 'react';
// Core components
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
// For navigation between screens
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
// Define screens and respective component names
const MainNavigator = createStackNavigator({
  Splash: Splash,
  Testing: Testing
});
// instantiate AppContainer for navigation using MainNavigator
const App = createAppContainer(MainNavigator);
// Use `AppContainer` to render `App`
export default class AppContainer extends React.Component {
  render() {
    return <App/>;
  }
}
// Splash: root screen which greets users
class Splash extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {navigate} = this.props.navigation;
    return (
      <TouchableOpacity style={{flex: 1, flexDirection: "row"}} onPress={() => navigate('Testing')}>
        <View style={{flex: 100, flexDirection: "column", justifyContent: "center", backgroundColor: 'powderblue'}}>
          <Text style={{textAlign: "center", textAlignVertical: "center"}}>Tap To Get Started</Text>
        </View>
        <View style={{flex: 1, backgroundColor: 'grey'}}/>
        <View style={{flex: 100, flexDirection: "column", justifyContent: "center", backgroundColor: 'powderblue'}}>
          <Text style={{textAlign: "center", textAlignVertical: "center"}}>Tap To Get Started</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
// Testing: videoView which plays the Okazo-experiment video
class Testing extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{flex: 1, flexDirection: "row"}}>
        <View style={{flex: 100, flexDirection: "column", justifyContent: "center", backgroundColor: 'powderblue'}}>
          <Text style={{textAlign: "center", textAlignVertical: "center"}}>Testing Now!</Text>
        </View>
        <View style={{flex: 1, backgroundColor: 'grey'}}/>
        <View style={{flex: 100, flexDirection: "column", justifyContent: "center", backgroundColor: 'powderblue'}}>
          <Text style={{textAlign: "center", textAlignVertical: "center"}}>Testing Now!</Text>
        </View>
      </View>
    );
  }
}
// General style-definitions
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});