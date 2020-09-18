import React from 'react';
import {
  StyleSheet,
  Alert } from 'react-native';

import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin'
import SigninPage from './components/SigninPage';

const App = () => {
  const loginAttempt = async (e) =>{
    GoogleSignin.configure();

  try{
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = firebase.auth().GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return firebase.auth().signInWithCredential(googleCredential);
  }catch(error){
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      Alert.alert('Ok', 'SignIn cancelled', ['Ok']);
    } else if (error.code === statusCodes.IN_PROGRESS) {
      Alert.alert('Ok', 'SignIn still in progress', ['Ok']);
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      Alert.alert('Ok', 'Play services not available', ['Ok']);
    } else {
      Alert.alert('Ok', 'Error', ['Ok']);
    }
  }

  }

  return (
    <SigninPage loginAttempt = {loginAttempt}/>
  );
};

const styles = StyleSheet.create({
  
});

export default App;
