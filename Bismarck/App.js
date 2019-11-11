// Keeping all components in one file for organization
// To run, create two terminal prompts
// Run `npx react-native start` in the first prompt
// Run `npx react-native run-android` in the second prompt
import React, { Component } from 'react';
// Core components
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
// For navigation between pages
import { NativeRouter, Route, Link } from "react-router-native";
// Splash: root screen which greets users
class Splash extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Link style={{flex: 1, flexDirection: "row"}} to="/Testing">
        <View>
          <View style={{flex: 100, flexDirection: "column", justifyContent: "center", backgroundColor: 'powderblue'}}>
            <Text style={{textAlign: "center", textAlignVertical: "center"}}>Tap To Get Started</Text>
          </View>
          <View style={{flex: 1, backgroundColor: 'grey'}}/>
          <View style={{flex: 100, flexDirection: "column", justifyContent: "center", backgroundColor: 'powderblue'}}>
            <Text style={{textAlign: "center", textAlignVertical: "center"}}>Tap To Get Started</Text>
          </View>
        </View>
      </Link>
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
// App to parent the navigation system
function App() {
  return (
    <NativeRouter>
      <Route exact path="/" component={Splash} />
      <Route path="/Testing" component={Testing} />
    </NativeRouter>
  );
}
export default App;
// General style-definitions
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  container: {
    marginTop: 25,
    padding: 10
  },
  header: {
    fontSize: 20
  },
  nav: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    padding: 10
  },
  subNavItem: {
    padding: 5
  },
  topic: {
    textAlign: "center",
    fontSize: 15
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