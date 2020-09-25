//React imports
import React from 'react';

//Navigation imports
import {createStackNavigator} from '@react-navigation/stack';

//Components imports
import UserSchedulePage from '../components/UserSchedulePage';

//Vector icons import
import Icon from 'react-native-vector-icons/AntDesign';

const UserSchedStack =  createStackNavigator();

const UserSchedStackScreen = ({navigation}) => {
    return(
        <UserSchedStack.Navigator>
            <UserSchedStack.Screen name = "MySchedule" component={UserSchedulePage} options = {{
<<<<<<< HEAD
                title: 'MySchedule      ',
                headerStyle:{
                    backgroundColor: '#e6f2ff',
                },
                headerTitleStyle:{
                    color: '#1a8cff',
                    textAlign: 'center',
                    justifyContent: 'center',
                },
=======
                title: 'MySchedule',
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
        </UserSchedStack.Navigator>
    )
}

export default UserSchedStackScreen;