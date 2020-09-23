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
                title: 'MySchedule',
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
        </UserSchedStack.Navigator>
    )
}

export default UserSchedStackScreen;