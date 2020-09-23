import React, {useEffect} from 'react';

import {View, TouchableOpacity, Text, ToastAndroid, StyleSheet} from 'react-native';

import {GoogleSignin} from '@react-native-community/google-signin';

import firebase from '../constants/firebase';

const HomePage = ({navigation}) => {

    return (
        <View style = {styles.logOut}>
            <Text>
                This is the homepage
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    logOut: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
})

export default HomePage;