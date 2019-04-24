import React, {Component} from 'react';
import Home from './src/screens/Home';
import Games from './src/screens/Games';
import Settings from './src/screens/Settings';
import SideMenu from './src/screens/sidebar/index';


import {createAppContainer, createDrawerNavigator, createStackNavigator} from 'react-navigation';

const drawerNavigator = createDrawerNavigator({
  Home: {
    screen: Home,
  },
  Games: {
    screen: Games,
  },
  Settings: {
    screen: Settings,
  }
}, {
  contentComponent: (props) => {
    return (<SideMenu {...props}/>)
  }, navigationOptions: {
    gesturesEnabled: false
  }
});

const RootStack = createStackNavigator({
  drawer: drawerNavigator,
}, {header: {visible: false}, headerMode: 'none', initialRouteName: 'drawer'});

const AppNavigator = createAppContainer(RootStack);
const drawerContainer = createAppContainer(drawerNavigator);

export default class App extends Component<Props> {

  render() {
    return (
      <AppNavigator/>
    );
  }
}