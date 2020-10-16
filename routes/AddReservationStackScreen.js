//React imports
import React from 'react';

//Navigation imports
import {createStackNavigator} from '@react-navigation/stack';

//Components Imports
import AddReservation from '../components/AddReservation';
import ReservationForms from '../components/ReservationForms';
import FloorSelect from '../components/FloorSelect';
import ClassRoomSelect from '../components/ClassRoomSelect';

//Vector icon import
import Icon from 'react-native-vector-icons/AntDesign';

const AddReservationStack =  createStackNavigator();

const AddReservationStackScreen = ({navigation}) => {
    return(
        <AddReservationStack.Navigator>
            <AddReservationStack.Screen name = "Home Page" component={AddReservation} options = {
            {
                headerTitle: 'Reservar sala          ',
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
            }} />
            <AddReservationStack.Screen name="Forms" component={ReservationForms} options = {
            {
                headerTitle: 'Selecione os horários       ',
                headerStyle:{
                    backgroundColor: '#e6f2ff',
                },
                headerTitleStyle:{
                    color: '#1a8cff',
                    textAlign: 'center',
                    justifyContent: 'center',
                },
            }}/>
            <AddReservationStack.Screen name="FloorSelect" component={FloorSelect}options = {
            {
                headerTitle: 'Selecione o andar          ',
                headerStyle:{
                    backgroundColor: '#e6f2ff',
                },
                headerTitleStyle:{
                    color: '#1a8cff',
                    textAlign: 'center',
                    justifyContent: 'center',
                },
            }}/>
            <AddReservationStack.Screen name="ClassRoomSelect" component={ClassRoomSelect}options = {
            {
                headerTitle: 'Selecione a sala           ',
                headerStyle:{
                    backgroundColor: '#e6f2ff',
                },
                headerTitleStyle:{
                    color: '#1a8cff',
                    textAlign: 'center',
                    justifyContent: 'center',
                },
            }}/>
        </AddReservationStack.Navigator>
    )
}

export default AddReservationStackScreen;