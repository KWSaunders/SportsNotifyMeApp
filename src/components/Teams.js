import React, {Component} from 'react';
import {Image, Linking, Platform, ScrollView, StyleSheet, View, Text, AsyncStorage} from 'react-native';
import {Button, List, ListItem} from 'react-native-elements';
import TeamIcon from './../../assets/images/networking.png';
import Spinner from "react-native-loading-spinner-overlay";

class Transaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      teams: [],
      followedTeams:{}
    };
  }
  updateTeamFollowing = async (name, follow)=>{
    const followedTeams = {...this.state.followedTeams};
    console.log(followedTeams);
    followedTeams [name] = !follow;
    AsyncStorage.setItem("followedTeams",JSON.stringify(followedTeams),()=>{
      this.setState({followedTeams})
    });
  }

  remoteRequest = () => {
    this.setState({loading: true});
    fetch('https://wfs.sbcc.edu/student/kwsaunders/web/teams.json', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    }).then((response) => response.json())
      .then(async (responseJson) => {
        console.log(responseJson);
        this.setState({loading: false})
        this.setState({teams: responseJson.teams})
      })
      .catch((error) => {
        this.setState({loading: false});
        console.error(error);
        alert(error)
      });
  }
  async componentDidMount() {
    let followedTeams = await AsyncStorage.getItem("followedTeams");
    if(followedTeams) {
      followedTeams = JSON.parse(followedTeams);
      this.setState({followedTeams});
    }
    this.remoteRequest();
  }

  render() {
    return (
      <ScrollView style={{width: '100%', height: '95%',}}>
        <Spinner visible={this.state.loading} textContent={"Loading..."} textStyle={{color: '#FFF'}}/>
        <List
          containerStyle={{marginBottom: 20, width: '100%', height: '100%'}}>
          {
            this.state.teams.map((team, i) => (
              <View style={styles.item}>
                <Image style={styles.icon} source={uri: 'https://wfs.sbcc.edu/student/kwsaunders/web/nba/' + team.name + '.png'}/> 
                <Text style={styles.team_name}>{team.name}</Text>
                <Button
                  containerViewStyle={{position:'absolute',right:0}}
                  onPress={() => {
                    this.updateTeamFollowing(team.name, this.state.followedTeams[team.name]);
                  }}
                  title={this.state.followedTeams[team.name] === true ? "Unfollow" : "Follow"}
                  buttonStyle={{
                    right:0,
                    backgroundColor: "#788b91",
                    width: 100,
                    height: 40,
                    borderColor: "transparent",
                    borderWidth: 0,
                    borderRadius: 5
                  }}
                />
              </View>
            ))
          }
        </List>
      </ScrollView>
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
  icon: {
    width: 100,
    height: 50,
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
  camera: {
    width: '100%',
    height: '100%'
  },
  item: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    width: '100%',
    height: 100,
    flexDirection: 'row'
  },
  team_name: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 30,

  }
});
export default Transaction;                                             