import React, {Component} from 'react';
import {AsyncStorage, Linking, ScrollView, StyleSheet, Text, View} from 'react-native';
import {List} from 'react-native-elements';
import Spinner from "react-native-loading-spinner-overlay";

class Transaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      games: [],
      followedTeams: {}
    };
  }

  remoteRequest = () => {
    fetch('https://guarded-springs-84197.herokuapp.com/nba/live.json', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    }).then((response) => response.json())
      .then(async (responseJson) => {
        console.log(responseJson);
        const games = responseJson.games;
        /*const filterGames = [];
        games.forEach((game) => {
          if (this.state.followedTeams[game.away] || this.state.followedTeams[game.home]) {
            filterGames.push(game);
          }
        });*/
        this.setState({loading: false})
        this.setState({games});
        setTimeout(()=>{
          this.remoteRequest();
        },2000);
      })
      .catch((error) => {
        this.setState({loading: false});
        console.error(error);
        alert(error)
      });
  }

  onSuccess(e) {
    alert('read');
    Linking
      .openURL(e.data)
      .catch(err => console.error('An error occured', err));
  }

  componentWillReceiveProps(newProps) {
    console.log("New")
  }

  componentWillUnmount() {
  }

  async componentDidMount() {
    let followedTeams = await AsyncStorage.getItem("followedTeams");
    if (followedTeams) {
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
            this.state.games.map((game, i) => {
              if (game.live) {
                return (
                  <View style={styles.item}>
                    <View style={styles.teamName}>
                      <Text style={styles.team_name}>{game.away}</Text>
                      <Text style={styles.team_name}>{game.home}</Text>
                    </View>
                    <View style={styles.teamScore}>
                      <Text style={styles.team_score}>{game.away_score}</Text>
                      <Text style={styles.team_score}>{game.home_score}</Text>
                    </View>
		    <View style={styles.team_name}>
			<Text>{game.time}</Text>
		    </View>

                  </View>
                )
              } else {
                return (
                  <View style={styles.item}>
                    <Text style={styles.team_name}>{game.away} vs {game.home}</Text>
		    <Text style={styles.team_name}>{game.time}</Text>
                  </View>
                )
              }
            })
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
    margin: '2%',
    width: '96%',
    height: 100,
    backgroundColor: '#e5e5e8'
  },
  teamName: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: 30,
    flexDirection: 'row',
  },
  teamScore: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '90%',
    marginLeft: '5%',
    marginTop: 10,
    height: 30,
    flexDirection: 'row',
  },
  team_name: {
    width: '50%',
    color: '#819298',
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 30,

  },
  team_score: {
    width: '50%',
    color: '#819298',
    fontSize: 16,
    fontWeight: 'normal',
    paddingLeft: 20,

  }
});
export default Transaction;                                            