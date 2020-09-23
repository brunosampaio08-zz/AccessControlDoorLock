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
import Icon from 'react-native-vector-icons/FontAwesome';

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
          <Text>
           {"\n"} <Icon name="address-card-o" size ={140} color="#0066cc"/>{"\n"}
          </Text>
          <Text style = {styles.text1}>
            ControLock <Icon name="lock" size ={25} color = "#0066cc"/>
          </Text>
          {/* <Text style = {styles.text2}>
            control
          </Text>
          <Text style = {styles.text3}>
            door
          </Text>
          <Text style = {styles.text4}>
            lock <Icon name="lock" size ={25} color = "#0066cc"/>
          </Text> */}
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
        flexDirection: 'column',
        padding: 20,
        flex: 1,
        backgroundColor: "#e6f2ff",
    }, 
    
    header: {
        flex:1,
        flexDirection:'column',
        alignItems: "center",
        justifyContent:"center",
    },
    
    SignButton: {
      alignItems: "center",
      justifyContent: "flex-end",
    },

    text1: {
      color : "#3399ff",
      fontSize: 40,
      fontFamily: 'fantasy',
    },
    text2: {
      color : "#3399ff",
      fontSize: 40,
      fontFamily: 'fantasy',
    },
    text3: {
      color : "#3399ff",
      fontSize: 40,
      fontFamily: 'fantasy',
    },
    text4: {
      color : "#3399ff",
      fontSize: 40,
      fontFamily: 'fantasy',
    },
  });

export default SigninPage;