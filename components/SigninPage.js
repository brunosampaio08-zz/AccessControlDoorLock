import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const SigninPage = ({loginAttempt}) => {
    return(
    <View>
      <View style = {styles.header}>
          <Text style = {styles.text}>
            Access Control Door Lock
          </Text>
      </View>
      
      <View style = {styles.SignButton}>
        <TouchableOpacity onPress={loginAttempt}>
            <Icon name = "google" size = {24} color = "black"/>
        </TouchableOpacity>
      </View>

    </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flex:1,
        paddingTop: 30,
        backgroundColor: "blue",
        alignItems: "center"
    },
    
    SignButton: {
      flex:1,
      alignItems: "center",
      justifyContent: "center"
    },
  });

export default SigninPage;