import React, {Component} from "react";
import {Image, View, StyleSheet} from "react-native";
import Header from './../components/header';
import Scores from './../components/Scores';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content} pointerEvents={this.state.loading ? "none" : "auto"}>
          <Header navigation={this.props.navigation} title={"Games"} user={this.state.user}/>
          <Scores navigation={this.props.navigation} user={this.state.user}/>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#cfd8dc',
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#cfd8dc',
    width: '100%',
    height: '100%',
  },
});