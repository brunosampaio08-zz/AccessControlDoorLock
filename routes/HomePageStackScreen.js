//React imports
import React from 'react';

<<<<<<< HEAD
//Style imports
import {View, Text, StyleSheet} from 'react-native';

=======
>>>>>>> master
//Navigation imports
import {createStackNavigator} from '@react-navigation/stack';

//Components Imports
import HomePage from '../components/HomePage';

//Vector icon import
import Icon from 'react-native-vector-icons/AntDesign';

const HomePageStack =  createStackNavigator();

const HomePageStackScreen = ({navigation}) => {
    return(
        <HomePageStack.Navigator>
            <HomePageStack.Screen name = "Home Page" component={HomePage} options = {{
<<<<<<< HEAD
                headerTitle: 'HomePage          ',
                headerStyle:{
                    backgroundColor: '#e6f2ff',
                },
                headerTitleStyle:{
                    color: '#1a8cff',
                    textAlign: 'center',
                    justifyContent: 'center',
                },
=======
                title: 'Home Page',
>>>>>>> master
                headerLeft: () => {
                    return (
                        <Icon.Button 
                        name="menu-fold" 
                        size = {25} 
<<<<<<< HEAD
                        color="#3399ff"
                        backgroundColor="#e6f2ff"
=======
                        color="black"
                        backgroundColor="white"
>>>>>>> master
                        onPress={() => {navigation.openDrawer()}}/> 
                    );
                }
            }}/>
        </HomePageStack.Navigator>
    )
}

export default HomePageStackScreen;