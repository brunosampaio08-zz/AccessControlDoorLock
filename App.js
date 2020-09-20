//Required to be first beacuse of navigation
import 'react-native-gesture-handler';

import React, {useState, useEffect} from 'react';
import {
  StyleSheet,} from 'react-native';

import {GoogleSignin} from '@react-native-community/google-signin'

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SigninPage from './components/SigninPage';
import RegisterPage from './components/RegisterPage';
import HomePage from './components/HomePage';

import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import LoadingScreen from './components/LoadingScreen';

const Stack = createStackNavigator();

const App = () => {
  const [userInfo, setUserInfo] = useState();
  const [initializing, setInitializing] = useState(true);

  function configureGoogleSignin() {
    GoogleSignin.configure({
      webClientId: '959658651855-pfj1va0r7gglohl7ti4kef7t7an7um7l.apps.googleusercontent.com',
      offlineAccess: false,
    });
  }
  
  useEffect(() => {
    configureGoogleSignin();

    const subscribe = firebase.auth().onAuthStateChanged(user => {
      setUserInfo(user);
      console.log(user);
    });
    
    return subscribe;
    
  }, []);

  return (
      <NavigationContainer>
        <Stack.Navigator>
          {
            userInfo == null ? (
              <Stack.Screen name = "SigninPage" component = {SigninPage}/>
            ) : (
              <Stack.Screen name = "HomePage" component = {HomePage}/>
            )
          }
        </Stack.Navigator>
      </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  
});

export default App;
