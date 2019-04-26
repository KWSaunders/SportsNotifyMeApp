import React, {Component} from 'react';
import {Platform, StyleSheet, View, Image, TouchableOpacity, StatusBar} from 'react-native';
import {Button, Text} from 'native-base';

class Topbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#5c6b70" barStyle="light-content"/>
        <View style={styles.content}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.toggleDrawer();
            }}
          >
            <Image style={styles.menuBtn} source={require('./../../assets/images/menu_icon.png')}/>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
            }}>
            <View style={styles.txtRecView}>
              <Text style={styles.txt_rec}>{this.props.title ? this.props.title : 'Teams'}</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.txtRecView}></View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FF0000',
    width: '100%',
    height: Platform.OS === 'ios' ? 73 : 50,
    alignItems: 'center',
    display: 'flex'
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FF0000',
    width: '100%',
    height: Platform.OS === 'ios' ? 60 : 55,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 20 : 0
  },
  title: {
    height: '100%',
    fontSize: 30,
    marginTop: 10,
    textAlign: 'center',
    fontFamily: 'Merriweather Regular'
  },
  menuBtn: {
    width: 30,
    height: 30,
    fontSize: 20,
    textAlign: 'center',
    justifyContent: 'center',
  },
  appicon: {
    marginLeft: 38,
    width: 35,
    height: 30,
    fontSize: 20,
    textAlign: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 50,
    height: 50
  },
  txtRecView: {
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  txt_rec: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold'

  }
});
export default Topbar;