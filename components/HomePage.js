//React imports
import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';

const HomePage = ({navigation}) => {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const currUser = firebase.auth().currentUser;
        setUser(currUser);
        setLoading(false);
        console.log(currUser);
    }, [])
    
    const onPress = () => {
        navigation.navigate('UserSchedulePage');
    }

    return (
        <View style = {styles.logOut}>
            {loading == true? (
                <Text>
                    CARREGANDO
                </Text>
            ) : (
                <View>
                    <Image source={{uri: user.photoURL}}/>
                </View>
            )}
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