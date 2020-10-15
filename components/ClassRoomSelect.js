import React, {useState} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

const ClassRoomSelect = ({route, navigation}) =>{
    const {floor, month, day} = route.params;

    if(floor == 200){
        return(
            <View style = {styles.mainView}>
                <View style = {styles.secondaryView}>
                    <View style={styles.itemView}>
                        <Button onPress = {() => 
                            {
                                navigation.navigate('Forms', {classroom: '201', month: month, day: day});
                            }}
                            title="201"
                        />
                    </View>
                    <View style = {styles.itemView}>
                        <Button onPress = {() => 
                                {
 
                                    navigation.navigate('Forms', {classroom: '202', month: month, day: day});
                                }}
                                title="202"
                            />
                    </View>
                </View>
                <View style = {styles.secondaryView}>
                    <View style={styles.itemView}>
                        <Button onPress = {() => 
                                {
 
                                    navigation.navigate('Forms', {classroom: '203', month: month, day: day});
                                }}
                                title="203"
                            />
                    </View>
                    <View style = {styles.itemView}>
                        <Button onPress = {() => 
                                {
 
                                    navigation.navigate('Forms', {classroom: '204', month: month, day: day});
                                }}
                                title="204"
                            />
                    </View>
                </View>
                <View style = {styles.secondaryView}>
                    <View style={styles.itemView}>
                        <Button onPress = {() => 
                                {
 
                                    navigation.navigate('Forms', {classroom: '205', month: month, day: day});
                                }}
                                title="205"
                            />
                    </View>
                    <View style = {styles.itemView}>
                        <Button onPress = {() => 
                                {
 
                                    navigation.navigate('Forms', {classroom: '206', month: month, day: day});
                                }}
                                title="206"
                            />
                    </View>
                </View>
                <View style = {styles.secondaryView}>
                    <View style={styles.itemView}>
                        <Button onPress = {() => 
                                {
 
                                    navigation.navigate('Forms', {classroom: '207', month: month, day: day});
                                }}
                                title="207"
                            />
                    </View>
                    <View style = {styles.itemView}>
                        <Button onPress = {() => 
                                {
 
                                    navigation.navigate('Forms', {classroom: '208', month: month, day: day});
                                }}
                                title="208"
                            />
                    </View>
                </View>
                <View style = {styles.secondaryView}>
                    <View style={styles.itemView}>
                        <Button onPress = {() => 
                                {
 
                                    navigation.navigate('Forms', {classroom: '209', month: month, day: day});
                                }}
                                title="209"
                            />
                    </View>
                    <View style = {styles.itemView}>
                        <Button onPress = {() => 
                                {
 
                                    navigation.navigate('Forms', {classroom: '210', month: month, day: day});
                                }}
                                title="210"
                            />
                    </View>
                </View>
            </View>
        )
    }else if(floor == 300){
        return(
            <View style = {styles.mainView}>
                <View style = {styles.secondaryView}>
                    <View style={styles.itemView}>
                        <Button onPress = {() => 
                            {
                                navigation.navigate('Forms', {classroom: '301', month: month, day: day});
                            }}
                            title="301"
                        />
                    </View>
                    <View style = {styles.itemView}>
                        <Button onPress = {() => 
                                {
 
                                    navigation.navigate('Forms', {classroom: '302', month: month, day: day});
                                }}
                                title="302"
                            />
                    </View>
                </View>
                <View style = {styles.secondaryView}>
                    <View style={styles.itemView}>
                        <Button onPress = {() => 
                                {
 
                                    navigation.navigate('Forms', {classroom: '303', month: month, day: day});
                                }}
                                title="303"
                            />
                    </View>
                    <View style = {styles.itemView}>
                        <Button onPress = {() => 
                                {
 
                                    navigation.navigate('Forms', {classroom: '304', month: month, day: day});
                                }}
                                title="304"
                            />
                    </View>
                </View>
                <View style = {styles.secondaryView}>
                    <View style={styles.itemView}>
                        <Button onPress = {() => 
                                {
 
                                    navigation.navigate('Forms', {classroom: '305', month: month, day: day});
                                }}
                                title="305"
                            />
                    </View>
                    <View style = {styles.itemView}>
                        <Button onPress = {() => 
                                {
 
                                    navigation.navigate('Forms', {classroom: '306', month: month, day: day});
                                }}
                                title="306"
                            />
                    </View>
                </View>
                <View style = {styles.secondaryView}>
                    <View style={styles.itemView}>
                        <Button onPress = {() => 
                                {
 
                                    navigation.navigate('Forms', {classroom: '307', month: month, day: day});
                                }}
                                title="307"
                            />
                    </View>
                    <View style = {styles.itemView}>
                        <Button onPress = {() => 
                                {
 
                                    navigation.navigate('Forms', {classroom: '308', month: month, day: day});
                                }}
                                title="308"
                            />
                    </View>
                </View>
                <View style = {styles.secondaryView}>
                    <View style={styles.itemView}>
                        <Button onPress = {() => 
                                {
 
                                    navigation.navigate('Forms', {classroom: '309', month: month, day: day});
                                }}
                                title="309"
                            />
                    </View>
                    <View style = {styles.itemView}>
                        <Button onPress = {() => 
                                {
 
                                    navigation.navigate('Forms', {classroom: '310', month: month, day: day});
                                }}
                                title="310"
                            />
                    </View>
                </View>
            </View>
        );
    }else{
        return(
            <View style = {styles.mainView}>
                <View style = {styles.secondaryView}>
                    <View style={styles.itemView}>
                        <Button onPress = {() => 
                            {
                                navigation.navigate('Forms', {classroom: '401', month: month, day: day});
                            }}
                            title="401"
                        />
                    </View>
                    <View style = {styles.itemView}>
                        <Button onPress = {() => 
                                {
 
                                    navigation.navigate('Forms', {classroom: '402', month: month, day: day});
                                }}
                                title="402"
                            />
                    </View>
                </View>
                <View style = {styles.secondaryView}>
                    <View style={styles.itemView}>
                        <Button onPress = {() => 
                                {
 
                                    navigation.navigate('Forms', {classroom: '403', month: month, day: day});
                                }}
                                title="403"
                            />
                    </View>
                    <View style = {styles.itemView}>
                        <Button onPress = {() => 
                                {
 
                                    navigation.navigate('Forms', {classroom: '404', month: month, day: day});
                                }}
                                title="404"
                            />
                    </View>
                </View>
                <View style = {styles.secondaryView}>
                    <View style={styles.itemView}>
                        <Button onPress = {() => 
                                {
 
                                    navigation.navigate('Forms', {classroom: '405', month: month, day: day});
                                }}
                                title="405"
                            />
                    </View>
                    <View style = {styles.itemView}>
                        <Button onPress = {() => 
                                {
 
                                    navigation.navigate('Forms', {classroom: '406', month: month, day: day});
                                }}
                                title="406"
                            />
                    </View>
                </View>
                <View style = {styles.secondaryView}>
                    <View style={styles.itemView}>
                        <Button onPress = {() => 
                                {
 
                                    navigation.navigate('Forms', {classroom: '407', month: month, day: day});
                                }}
                                title="407"
                            />
                    </View>
                    <View style = {styles.itemView}>
                        <Button onPress = {() => 
                                {
 
                                    navigation.navigate('Forms', {classroom: '408', month: month, day: day});
                                }}
                                title="408"
                            />
                    </View>
                </View>
                <View style = {styles.secondaryView}>
                    <View style={styles.itemView}>
                        <Button onPress = {() => 
                                {
 
                                    navigation.navigate('Forms', {classroom: '409', month: month, day: day});
                                }}
                                title="409"
                            />
                    </View>
                    <View style = {styles.itemView}>
                        <Button onPress = {() => 
                                {
 
                                    navigation.navigate('Forms', {classroom: '410', month: month, day: day});
                                }}
                                title="410"
                            />
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    secondaryView: {
        flex: 1,
        flexDirection: "row"
    },
    itemView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default ClassRoomSelect;