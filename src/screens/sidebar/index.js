import React, {Component} from "react";
import {Image, View} from "react-native";
import {Container, Content, Left, List, ListItem, Text} from "native-base";
import styles from "./style";

const data = [
  {
    name: "Teams",
    route: "Home",
    limg: require('../../../assets/images/collaboration.png'),
  },
  {
    name: "Games",
    route: "Games",
    limg: require('../../../assets/images/basketball.png'),
  },
  {
    name: "Settings",
    route: "Settings",
    limg: require('../../../assets/images/settings.png'),
  }
];

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4,
      menus: data
    };
  }

  async componentDidMount() {
  }

  onMenuClick = async (data) => {
    this.props.navigation.navigate(data.route);
    this.props.navigation.closeDrawer();
  }

  render() {
    return (
      <View style={{height: '100%', width: '100%'}}>
        <Container
          style={{
            backgroundColor: '#ffffff',
            alignItems: 'center',
            flex: 1,
            justifyContent: 'space-between'
          }}>
          <Content
            bounces={true}
            style={{flex: 1, top: 0}}
          >
            <View
              style={{backgroundColor: '#ff0000', width: '100%', height: 150, marginBottom:40}}
            />

            <List
              style={{backgroundColor: 'white'}}
              dataArray={this.state.menus}
              renderRow={(data, index, row) =>
                <View>
                  <ListItem
                    button
                    noBorder
                    onPress={() => this.onMenuClick(data)}
                  >
                    {
                      <View
                        style={{display: 'flex', width: '100%', justifyContent: 'flex-start'}}>
                        {index === 6 ? <View
                          style={{
                            width: '100%',
                            height: 2,
                            backgroundColor: 'black'
                          }}/> : null}
                        <Left style={{width: '100%'}}>
                          <Image
                            source={data.limg}
                            resizeMode={'contain'}
                            style={{width: 30, height: 30}}
                          />
                          <Text style={styles.text}>
                            {data.name}
                          </Text>
                        </Left>
                      </View>
                    }
                  </ListItem>
                </View>
              }
            />
          </Content>
        </Container>
      </View>
    );
  }
}

export default SideBar;
