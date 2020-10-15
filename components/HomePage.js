//React imports
import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

const HomePage = ({navigation}) => {


    return (
        <View>
            <TouchableOpacity>
                <Text>CONSOLE</Text>
            </TouchableOpacity>
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