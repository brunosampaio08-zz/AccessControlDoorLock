import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const UserScheduleItem = ({item}) =>{

    return (
        <View>
            <Text>
                {item.HORA_INIT}
            </Text>
        </View>
    );
}

const stylees = StyleSheet.create({

});



export default UserScheduleItem;