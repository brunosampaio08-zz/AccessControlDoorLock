import React, {useState} from 'react';

import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const ClassRoomSelect = ({route, navigation}) =>{
    const {month, day} = route.params;

    const touchOne = () => {
        navigation.navigate('ClassRoomSelect', {floor:200, month: month, day: day});
    }

    const touchTwo = () => {
        navigation.navigate('ClassRoomSelect', {floor:300, month: month, day: day});
    }

    const touchThree = () => {
        navigation.navigate('ClassRoomSelect', {floor:400, month: month, day: day});
    }

    return (
        <View style={styles.mainView}>
            <View  style={styles.buttonOne}>
            <TouchableOpacity onPress={touchOne}>
                <Text>
                    200
                </Text>
            </TouchableOpacity>
            </View>
            <View  style={styles.buttonTwo}>
            <TouchableOpacity onPress={touchTwo}>
                <Text>
                    300
                </Text>
            </TouchableOpacity>
            </View>
            <View  style={styles.buttonThree}>
            <TouchableOpacity onPress={touchThree}>
                <Text>
                    400
                </Text>
            </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
    }, 
    buttonOne: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonTwo: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonThree: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
})

export default ClassRoomSelect;