//React imports
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';

const SigninForms = ({navigation}) => {
    const [formState, setFormState] = useState();

    return (
        <View style = {styles.mainView}>
            <TextInput />
        </View>
    );
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    }
});

export default SigninForms;