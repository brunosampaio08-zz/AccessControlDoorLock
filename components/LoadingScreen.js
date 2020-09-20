import React, {useEffect} from 'react';
import {View, 
    Text,
    StyleSheet, 
    ActivityIndicator, ToastAndroid} from 'react-native';
import firebase from '../constants/firebase';

const LoadingScreen = ({navigation}) => {
    
    return(
        <View style = {styles.LoadingStyle}>
            <Text>
                Loading...
            </Text>
            <ActivityIndicator size = "large"></ActivityIndicator>
        </View>
    )
}

const styles = StyleSheet.create({
    LoadingStyle: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
})

export default LoadingScreen;