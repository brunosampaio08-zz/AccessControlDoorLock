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
                title: 'Minhas reservas        ',
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
        </UserSchedStack.Navigator>
    )
}

export default UserSchedStackScreen;