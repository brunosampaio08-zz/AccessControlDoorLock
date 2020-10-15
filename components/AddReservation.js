import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Calendar} from 'react-native-calendars';

const AddReservation = ({navigation}) => {

    const dayPressed = (date) => {
        let month;
        switch (date.month) {
            case 1:
                month = 'JANEIRO';
                break;
            
            case 2:
                month = 'FEVEREIRO';
                break;

            case 3:
                month = 'MARÇO';
                break;
            
            case 4:
                month = 'ABRIL';
                break;
            
            case 5:
                month = 'MAIO';
                break;
            
            case 6:
                month = 'JUNHO';
                break;
            
            case 7:
                month = 'JULHO';
                break;
            
            case 8:
                month = 'AGOSTO';
                break;
            
            case 9:
                month = 'SETEMBRO';
                break;
            
            case 10:
                month = 'OUTUBRO';
                break;
            
            case 11:
                month = 'NOVEMBRO';
                break;
            
            case 12:
                month = 'DEZEMBRO';
                break;

            default:
                console.log('Error month!');
                break;
        }

        navigation.navigate('FloorSelect', {month:month, day:date.day});
    }
    return (
        <View>
            <Calendar onDayPress={dayPressed}/>
        </View>
    );
}

export default AddReservation;