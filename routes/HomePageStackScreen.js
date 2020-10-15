//React imports
import React from 'react';

//Navigation imports
import {createStackNavigator} from '@react-navigation/stack';

//Components Imports
import HomePage from '../components/HomePage';
import UserSchedulePage from '../components/UserSchedulePage';

//Vector icon import
import Icon from 'react-native-vector-icons/AntDesign';

const HomePageStack =  createStackNavigator();

const HomePageStackScreen = ({navigation}) => {
    return(
        <HomePageStack.Navigator>
            <HomePageStack.Screen name = "Home Page" component={HomePage} options = {{
                headerTitle: 'HomePage          ',
                headerStyle:{
                    backgroundColor: '#e6f2ff',
                },
                headerTitleStyle:{
                    color: '#1a8cff',
                    textAlign: 'center',
                    justifyContent: 'center',
                },
                headerLeft: () => {
                    return (
                        <Icon.Button 
                        name="menu-fold" 
                        size = {25} 
                        color="#3399ff"
                        backgroundColor="#e6f2ff"
                        onPress={() => {navigation.openDrawer()}}/> 
                    );
                }
            }}/>
        <HomePageStack.Screen name="UserSchedulePage" component={UserSchedulePage} />
        </HomePageStack.Navigator>
    )
}

export default HomePageStackScreen;