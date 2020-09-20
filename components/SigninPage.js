import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity, 
    ToastAndroid,} from 'react-native';
import {GoogleSigninButton, GoogleSignin, statusCodes} from '@react-native-community/google-signin';

import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';

const SigninPage = ({navigation}) => {

  const isUserinDB = async (user) => {
    const usersCollection = firebase.firestore().collection('Users');

    const currUser = await usersCollection.doc(user.uid).get();

    if(!currUser.exists){
      usersCollection.doc(user.uid).set({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      });
    }
  }

  const loginAttempt = async () =>{
    try{
      await GoogleSignin.hasPlayServices();
      const {accessToken, idToken} = await GoogleSignin.signIn().catch(error => {
        ToastAndroid.show(error.toString, 15);
      });

      const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
      try{
        const userCredential = await firebase.auth().signInWithCredential(credential);
      
        /*const user = userCredential.user;
        
        await isUserinDB(user);
        */

        ToastAndroid.show('Logged In!', 5);
      }catch(error){
        ToastAndroid.show(error.toString(), 15);
      }
      
    }catch(error){
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // when user cancels sign in process,
        ToastAndroid.show('Process Cancelled', 5)
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // when in progress already
        ToastAndroid.show('Process in progress', 5)
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // when play services not available
        ToastAndroid.show('Play services are not available', 5)
      } else {
        // some other error
        ToastAndroid.show(error.toString(), 15);
      }  
    }
  }

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();

      firebase.auth().signOut();

      ToastAndroid.show('Logged Out!', 5);
    } catch (error) {
      ToastAndroid.show(error.toString(), 15);
    }
}
  
  return(
    <View style = {styles.container}>
      <View style = {styles.header}>
          <Text style = {styles.text}>
            Access Control Door Lock
          </Text>
      </View>
      
      <View style = {styles.SignButton}>
        <GoogleSigninButton 
          size = {GoogleSigninButton.Size.Wide}
          color = {GoogleSigninButton.Color.Dark}
          onPress = {loginAttempt}
        />
        
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }, 
    
    header: {
        height: 35,
        backgroundColor: "blue",
        alignItems: "center",
        justifyContent: "center"
    },
    
    SignButton: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },

    text: {
        color : "white"
    }
  });

export default SigninPage;