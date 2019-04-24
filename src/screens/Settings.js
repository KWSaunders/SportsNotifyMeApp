import React, {Component} from "react";
import {Image, View, StyleSheet, AsyncStorage} from "react-native";
import Header from './../components/header';
import {CheckBox, Text} from "react-native-elements";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      notifySettings: {
        start: true,
        end: true,
      }
    }
  }

  async componentDidMount() {
    let notifySettings = await AsyncStorage.getItem("notifySettings");
    if (notifySettings) {
      notifySettings = JSON.parse(notifySettings);
      this.setState({notifySettings});
    }
  }

  updateNotifySettings = async () => {
    const notifySettings = {...this.state.notifySettings};
    AsyncStorage.setItem("notifySettings", JSON.stringify(notifySettings));
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content} pointerEvents={this.state.loading ? "none" : "auto"}>
          <Header navigation={this.props.navigation} title={"Settings"} user={this.state.user}/>
          <Text style={styles.txt_notification}>Notifications</Text>
          <Text style={styles.txt_notifi_start}>Game Start</Text>
          <Text style={styles.txt_desc_start}>Receive notifications of upcoming games for teams that you are following
            for today</Text>
          <CheckBox
            title={''}
            containerStyle={{marginTop: 20, marginBottom: 20}}
            textStyle={{fontSize: 10}}
            checked={this.state.notifySettings.start}
            onPress={() => {
              const notifySettings = {...this.state.notifySettings};
              notifySettings.start = !notifySettings.start;
              this.setState({notifySettings}, () => {
                this.updateNotifySettings()
              });
            }}/>
          <Text style={styles.txt_notifi_start}>Game End</Text>
          <Text style={styles.txt_desc_start}>Receive notifications of final scores for followed teams when the game
            ends</Text>
          <CheckBox
            title={''}
            containerStyle={{marginTop: 20}}
            textStyle={{fontSize: 10}}
            checked={this.state.notifySettings.end}
            onPress={() => {
              const notifySettings = {...this.state.notifySettings};
              notifySettings.end = !notifySettings.end;
              this.setState({notifySettings}, () => {
                this.updateNotifySettings()
              });
            }}/>
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
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
  },
  txt_notification: {
    color: '#819298',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 50
  },
  txt_notifi_start: {
    color: '#819298',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20
  },
  txt_desc_start: {
    color: '#819298',
    fontSize: 16,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10
  }
});