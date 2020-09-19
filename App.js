//Required to be first beacuse of navigation
import 'react-native-gesture-handler';

import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  ToastAndroid } from 'react-native';

import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';

import {GoogleSignin, statusCodes} from '@react-native-community/google-signin'

import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SigninPage from './components/SigninPage';
import RegisterPage from './components/RegisterPage';

const Stack = createStackNavigator();

const App = () => {
  const [userInfo, setUserInfo] = useState(null);

  function configureGoogleSignin() {
    GoogleSignin.configure({
      webClientId: '959658651855-pfj1va0r7gglohl7ti4kef7t7an7um7l.apps.googleusercontent.com',
      offlineAccess: false,
    });
  }

  useEffect(() => {
    configureGoogleSignin();
  }, []);

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
      
        const user = userCredential.user;
        
        await isUserinDB(user);

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
    } catch (error) {
      ToastAndroid.show(error.toString(), 15);
    }
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name = "SigninPage">
          {props => <SigninPage {...props} loginAttempt = {loginAttempt} signOut = {signOut}/>}
        </Stack.Screen>
        <Stack.Screen name = "RegisterPage">
          {props => <RegisterPage/>}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  
});

export default App;
