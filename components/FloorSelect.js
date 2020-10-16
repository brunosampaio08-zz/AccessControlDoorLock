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
                <Text style={styles.texto}>
                    2º andar
                </Text>
            </TouchableOpacity>
            </View>
            <View  style={styles.buttonTwo}>
            <TouchableOpacity onPress={touchTwo}>
                <Text style={styles.texto}>
                    3º andar
                </Text>
            </TouchableOpacity>
            </View>
            <View  style={styles.buttonThree}>
            <TouchableOpacity onPress={touchThree}>
                <Text style={styles.texto}>
                    4º andar
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
        backgroundColor: "#cce6ff",
        marginHorizontal: 12,
        marginVertical: 8,
        borderRadius: 8,
    },
    buttonTwo: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#cce6ff",
        marginHorizontal: 12,
        marginVertical: 8,
        borderRadius: 8,
    },
    buttonThree: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#cce6ff",
        marginHorizontal: 12,
        marginVertical: 8,
        borderRadius: 8,
    },
    texto: {
        color: "#1a8cff",
        textAlign: "center",
        fontSize: 25,
        fontWeight: "bold",
    }
})

export default ClassRoomSelect;