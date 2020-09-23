//React imports
import React from 'react';

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
                title: 'Home Page',
                headerLeft: () => {
                    return (
                        <Icon.Button 
                        name="menu-fold" 
                        size = {25} 
                        color="black"
                        backgroundColor="white"
                        onPress={() => {navigation.openDrawer()}}/> 
                    );
                }
            }}/>
        </HomePageStack.Navigator>
    )
}

export default HomePageStackScreen;