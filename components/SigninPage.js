import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,} from 'react-native';
import {GoogleSigninButton} from '@react-native-community/google-signin';
import Icon from 'react-native-vector-icons';

const SigninPage = ({loginAttempt, signOut, navigation}) => {
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
        <TouchableOpacity onPress = {signOut}>
          <Text>
            SAIR
          </Text>
        </TouchableOpacity>
        
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