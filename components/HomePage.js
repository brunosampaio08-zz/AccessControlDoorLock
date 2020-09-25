//React imports
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const HomePage = ({navigation}) => {
    

    return (
        <View style = {styles.logOut}>
            <Text>
                This is the homepage
            </Text>
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