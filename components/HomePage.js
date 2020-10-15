//React imports
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const HomePage = ({navigation}) => {
    
    const onPress = () => {
        navigation.navigate('UserScheduleItem');
    }


    return (
        <View style = {styles.logOut}>
            <TouchableOpacity onPress={onPress}>
                <Text>
                    ITEM
                </Text>
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