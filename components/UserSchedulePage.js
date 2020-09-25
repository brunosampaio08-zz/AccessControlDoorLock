//React imports
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

//Firebase imports
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';
import '@react-native-firebase/auth';

const UserSchedulePage = () => {
    const [user, setUser] = useState();

    useEffect(() => {
        const currUser = firebase.auth().currentUser;

        setUser(currUser);
    }
    ,[]);

    

    return (
        <View style = {styles.mainView}>
            <Text>
                User Schedule Page
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});


export default UserSchedulePage;