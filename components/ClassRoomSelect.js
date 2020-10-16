import React, {useState} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

const ClassRoomSelect = ({route, navigation}) =>{
    const [classroom, setClassroom] = useState();
    const {floor, month, day} = route.params;



    if(floor == 200){
        return(
            <View style = {styles.mainView}>
                <View style = {styles.secondaryView}>
                    <View style={styles.itemView}>
                        <Button onPress = {() => 
                            {
                                setClassroom(201); 
                                navigation.navigate('Forms', {classroom: classroom, month: month, day: day});
                            }}
                            title="201"
                        />
                    </View>
                    <View style = {styles.itemView}>
                        <Button onPress = {() => 
                                {
                                    setClassroom(202); 
                                    navigation.navigate('Forms', {classroom: classroom, month: month, day: day});
                                }}
                                title="202"
                            />
                    </View>
                </View>
                <View style = {styles.secondaryView}>
                    <View style={styles.itemView}>
                        <Button onPress = {() => 
                                {
                                    setClassroom(203); 
                                    navigation.navigate('Forms', {classroom: classroom, month: month, day: day});
                                }}
                                title="203"
                            />
                    </View>
                    <View style = {styles.itemView}>
                        <Button onPress = {() => 
                                {
                                    setClassroom(204); 
                                    navigation.navigate('Forms', {classroom: classroom, month: month, day: day});
                                }}
                                title="204"
                            />
                    </View>
                </View>
                <View style = {styles.secondaryView}>
                    <View style={styles.itemView}>
                        <Button onPress = {() => 
                                {
                                    setClassroom(205); 
                                    navigation.navigate('Forms', {classroom: classroom, month: month, day: day});
                                }}
                                title="205"
                            />
                    </View>
                    <View style = {styles.itemView}>
                        <Button onPress = {() => 
                                {
                                    setClassroom(206); 
                                    navigation.navigate('Forms', {classroom: classroom, month: month, day: day});
                                }}
                                title="206"
                            />
                    </View>
                </View>
                <View style = {styles.secondaryView}>
                    <View style={styles.itemView}>
                        <Button onPress = {() => 
                                {
                                    setClassroom(207); 
                                    navigation.navigate('Forms', {classroom: classroom, month: month, day: day});
                                }}
                                title="207"
                            />
                    </View>
                    <View style = {styles.itemView}>
                        <Button onPress = {() => 
                                {
                                    setClassroom(208); 
                                    navigation.navigate('Forms', {classroom: classroom, month: month, day: day});
                                }}
                                title="208"
                            />
                    </View>
                </View>
                <View style = {styles.secondaryView}>
                    <View style={styles.itemView}>
                        <Button onPress = {() => 
                                {
                                    setClassroom(209); 
                                    navigation.navigate('Forms', {classroom: classroom, month: month, day: day});
                                }}
                                title="209"
                            />
                    </View>
                    <View style = {styles.itemView}>
                        <Button onPress = {() => 
                                {
                                    setClassroom(210); 
                                    navigation.navigate('Forms', {classroom: classroom, month: month, day: day});
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
                                setClassroom(301); 
                                navigation.navigate('Forms', {classroom: classroom, month: month, day: day});
                            }}
                            title="301"
                        />
                    </View>
                    <View style = {styles.itemView}>
                        <Button onPress = {() => 
                                {
                                    setClassroom(302); 
                                    navigation.navigate('Forms', {classroom: classroom, month: month, day: day});
                                }}
                                title="302"
                            />
                    </View>
                </View>
                <View style = {styles.secondaryView}>
                    <View style={styles.itemView}>
                        <Button onPress = {() => 
                                {
                                    setClassroom(303); 
                                    navigation.navigate('Forms', {classroom: classroom, month: month, day: day});
                                }}
                                title="303"
                            />
                    </View>
                    <View style = {styles.itemView}>
                        <Button onPress = {() => 
                                {
                                    setClassroom(304); 
                                    navigation.navigate('Forms', {classroom: classroom, month: month, day: day});
                                }}
                                title="304"
                            />
                    </View>
                </View>
                <View style = {styles.secondaryView}>
                    <View style={styles.itemView}>
                        <Button onPress = {() => 
                                {
                                    setClassroom(305); 
                                    navigation.navigate('Forms', {classroom: classroom, month: month, day: day});
                                }}
                                title="305"
                            />
                    </View>
                    <View style = {styles.itemView}>
                        <Button onPress = {() => 
                                {
                                    setClassroom(306); 
                                    navigation.navigate('Forms', {classroom: classroom, month: month, day: day});
                                }}
                                title="306"
                            />
                    </View>
                </View>
                <View style = {styles.secondaryView}>
                    <View style={styles.itemView}>
                        <Button onPress = {() => 
                                {
                                    setClassroom(307); 
                                    navigation.navigate('Forms', {classroom: classroom, month: month, day: day});
                                }}
                                title="307"
                            />
                    </View>
                    <View style = {styles.itemView}>
                        <Button onPress = {() => 
                                {
                                    setClassroom(308); 
                                    navigation.navigate('Forms', {classroom: classroom, month: month, day: day});
                                }}
                                title="308"
                            />
                    </View>
                </View>
                <View style = {styles.secondaryView}>
                    <View style={styles.itemView}>
                        <Button onPress = {() => 
                                {
                                    setClassroom(309); 
                                    navigation.navigate('Forms', {classroom: classroom, month: month, day: day});
                                }}
                                title="309"
                            />
                    </View>
                    <View style = {styles.itemView}>
                        <Button onPress = {() => 
                                {
                                    setClassroom(310); 
                                    navigation.navigate('Forms', {classroom: classroom, month: month, day: day});
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
                                setClassroom(401); 
                                navigation.navigate('Forms', {classroom: classroom, month: month, day: day});
                            }}
                            title="401"
                        />
                    </View>
                    <View style = {styles.itemView}>
                        <Button onPress = {() => 
                                {
                                    setClassroom(402); 
                                    navigation.navigate('Forms', {classroom: classroom, month: month, day: day});
                                }}
                                title="402"
                            />
                    </View>
                </View>
                <View style = {styles.secondaryView}>
                    <View style={styles.itemView}>
                        <Button onPress = {() => 
                                {
                                    setClassroom(403); 
                                    navigation.navigate('Forms', {classroom: classroom, month: month, day: day});
                                }}
                                title="403"
                            />
                    </View>
                    <View style = {styles.itemView}>
                        <Button onPress = {() => 
                                {
                                    setClassroom(404); 
                                    navigation.navigate('Forms', {classroom: classroom, month: month, day: day});
                                }}
                                title="404"
                            />
                    </View>
                </View>
                <View style = {styles.secondaryView}>
                    <View style={styles.itemView}>
                        <Button onPress = {() => 
                                {
                                    setClassroom(405); 
                                    navigation.navigate('Forms', {classroom: classroom, month: month, day: day});
                                }}
                                title="405"
                            />
                    </View>
                    <View style = {styles.itemView}>
                        <Button onPress = {() => 
                                {
                                    setClassroom(406); 
                                    navigation.navigate('Forms', {classroom: classroom, month: month, day: day});
                                }}
                                title="406"
                            />
                    </View>
                </View>
                <View style = {styles.secondaryView}>
                    <View style={styles.itemView}>
                        <Button onPress = {() => 
                                {
                                    setClassroom(407); 
                                    navigation.navigate('Forms', {classroom: classroom, month: month, day: day});
                                }}
                                title="407"
                            />
                    </View>
                    <View style = {styles.itemView}>
                        <Button onPress = {() => 
                                {
                                    setClassroom(408); 
                                    navigation.navigate('Forms', {classroom: classroom, month: month, day: day});
                                }}
                                title="408"
                            />
                    </View>
                </View>
                <View style = {styles.secondaryView}>
                    <View style={styles.itemView}>
                        <Button onPress = {() => 
                                {
                                    setClassroom(409); 
                                    navigation.navigate('Forms', {classroom: classroom, month: month, day: day});
                                }}
                                title="409"
                            />
                    </View>
                    <View style = {styles.itemView}>
                        <Button onPress = {() => 
                                {
                                    setClassroom(410); 
                                    navigation.navigate('Forms', {classroom: classroom, month: month, day: day});
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
    },
    btn: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#cce6ff",
        marginHorizontal: 12,
        marginVertical: 8,
        borderRadius: 8,
    },
    texto: {
        color: "#003366",
        textAlign: "center",
        fontSize: 25,
        fontWeight: "bold",
    }
})

export default ClassRoomSelect;