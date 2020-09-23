import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const UserSchedulePage = () => {

    return (
        <View style = {styles.mainView}>
            <Text>
                User Schedule Page
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});


export default UserSchedulePage;