import React, {useEffect} from 'react';

import {View, TouchableOpacity, Text, ToastAndroid, StyleSheet} from 'react-native';

import {GoogleSignin} from '@react-native-community/google-signin';

import firebase from '../constants/firebase';

const HomePage = ({navigation}) => {

    const signOut = async () => {
        try {
          await GoogleSignin.revokeAccess();
          await GoogleSignin.signOut();

          firebase.auth().signOut();
        } catch (error) {
          ToastAndroid.show(error.toString(), 15);
        }
    }

    return (
        <View style = {styles.logOut}>
            <TouchableOpacity onPress = {signOut}>
                <Text>
                    SAIR
                </Text>
            </TouchableOpacity>
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