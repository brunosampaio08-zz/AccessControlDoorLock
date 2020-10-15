//React imports
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';

//Firebase imports
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';

//Navigation imports
import {StackActions} from '@react-navigation/native';

//Other
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/AntDesign';

const ReservationForms = ({route, navigation}) => {
    const {classroom, month, day} = route.params;

    const [firstClass, setFirstClass] = useState(false); //08:00 as 10:00
    const [secondClass, setSecondClass] = useState(false); //10:00 as 12:00
    const [thirdClass, setThirdClass] = useState(false); //12:00 as 13:30
    const [fourthClass, setFourthClass] = useState(false); //13:30 as 15:30
    const [fifthClass, setFifthClass] = useState(false); //15:30 as 17:30
    const [sixthClass, setSixthClass] = useState(false); //17:30 as 19:00
    const [seventhClass, setSeventhClass] = useState(false); //19:00 as 21:00
    const [eigthClass, setEigthClass] = useState(false); //21:00 as 23:00

    const submitReservations = async () => {
        const currUser = firebase.auth().currentUser;
        
        await firebase.firestore().collection('USERS').doc(currUser.uid).get().then(async userSnapshot => {
            if(firstClass){
                firebase.firestore().collection('SCHEDULE').
                    where('MES', '==', month).get().then(monthSnap => {
                        monthSnap.forEach(monthDoc => {
                            firebase.firestore().collection('SCHEDULE').doc(monthDoc.id).
                                collection('MONTH_SCHED').where('DIA', '==', day.toString()).get().then(daySnap => {
                                    daySnap.forEach(dayDoc => {
                                        console.log(dayDoc);
                                        firebase.firestore().collection('SCHEDULE').doc(monthDoc.id).
                                            collection('MONTH_SCHED').doc(dayDoc.id).collection('DAY_SCHED').
                                                where('HORA_INIT', '==', '08:00').get().then(finalSnap => {
                                                    
                                                    if(finalSnap.empty){
                                                        firebase.firestore().collection('SCHEDULE').doc(monthDoc.id).
                                                            collection('MONTH_SCHED').doc(dayDoc.id).
                                                                collection('DAY_SCHED').add({
                                                                    HORA_INIT: '08:00',
                                                                    HORA_FIM: '10:00',
                                                                    USER: userSnapshot.ref,
                                                                    SALA: 'REF',
                                                                })
                                                    }
                                                })
                                    })
                                })
                        })
                    }).catch(err => {
                        console.log(err);
                    })
            }
            if(secondClass){
                firebase.firestore().collection('SCHEDULE').
                    where('MES', '==', month).get().then(monthSnap => {
                        monthSnap.forEach(monthDoc => {
                            firebase.firestore().collection('SCHEDULE').doc(monthDoc.id).
                                collection('MONTH_SCHED').where('DIA', '==', day.toString()).get().then(daySnap => {
                                    daySnap.forEach(dayDoc => {
                                        console.log(dayDoc);
                                        firebase.firestore().collection('SCHEDULE').doc(monthDoc.id).
                                            collection('MONTH_SCHED').doc(dayDoc.id).collection('DAY_SCHED').
                                                where('HORA_INIT', '==', '10:00').get().then(finalSnap => {
                                                    console.log('FINAL');
                                                    if(finalSnap.empty){
                                                        firebase.firestore().collection('SCHEDULE').doc(monthDoc.id).
                                                            collection('MONTH_SCHED').doc(dayDoc.id).
                                                                collection('DAY_SCHED').add({
                                                                    HORA_INIT: '10:00',
                                                                    HORA_FIM: '12:00',
                                                                    USER: userSnapshot.ref,
                                                                    SALA: 'REF',
                                                                })
                                                    }
                                                })
                                    })
                                })
                        })
                    }).catch(err => {
                        console.log(err);
                    })
                
            }
            if(thirdClass){
                firebase.firestore().collection('SCHEDULE').
                    where('MES', '==', month).get().then(monthSnap => {
                        monthSnap.forEach(monthDoc => {
                            firebase.firestore().collection('SCHEDULE').doc(monthDoc.id).
                                collection('MONTH_SCHED').where('DIA', '==', day.toString()).get().then(daySnap => {
                                    daySnap.forEach(dayDoc => {
                                        console.log(dayDoc);
                                        firebase.firestore().collection('SCHEDULE').doc(monthDoc.id).
                                            collection('MONTH_SCHED').doc(dayDoc.id).collection('DAY_SCHED').
                                                where('HORA_INIT', '==', '12:00').get().then(finalSnap => {
                                                    console.log('FINAL');
                                                    if(finalSnap.empty){
                                                        firebase.firestore().collection('SCHEDULE').doc(monthDoc.id).
                                                            collection('MONTH_SCHED').doc(dayDoc.id).
                                                                collection('DAY_SCHED').add({
                                                                    HORA_INIT: '12:00',
                                                                    HORA_FIM: '13:30',
                                                                    USER: userSnapshot.ref,
                                                                    SALA: 'REF',
                                                                })
                                                    }else{
                                                        Alert.alert('Error', message, ['Ok']);
                                                    }
                                                })
                                    })
                                })
                        })
                    }).catch(err => {
                        console.log(err);
                    })
            }
            if(fourthClass){
                firebase.firestore().collection('SCHEDULE').
                    where('MES', '==', month).get().then(monthSnap => {
                        monthSnap.forEach(monthDoc => {
                            firebase.firestore().collection('SCHEDULE').doc(monthDoc.id).
                                collection('MONTH_SCHED').where('DIA', '==', day.toString()).get().then(daySnap => {
                                    daySnap.forEach(dayDoc => {
                                        console.log(dayDoc);
                                        firebase.firestore().collection('SCHEDULE').doc(monthDoc.id).
                                            collection('MONTH_SCHED').doc(dayDoc.id).collection('DAY_SCHED').
                                                where('HORA_INIT', '==', '13:30').get().then(finalSnap => {
                                                    console.log('FINAL');
                                                    if(finalSnap.empty){
                                                        firebase.firestore().collection('SCHEDULE').doc(monthDoc.id).
                                                            collection('MONTH_SCHED').doc(dayDoc.id).
                                                                collection('DAY_SCHED').add({
                                                                    HORA_INIT: '13:30',
                                                                    HORA_FIM: '15:30',
                                                                    USER: userSnapshot.ref,
                                                                    SALA: 'REF',
                                                                })
                                                    }
                                                })
                                    })
                                })
                        })
                    }).catch(err => {
                        console.log(err);
                    })
            }
            if(fifthClass){
                firebase.firestore().collection('SCHEDULE').
                    where('MES', '==', month).get().then(monthSnap => {
                        monthSnap.forEach(monthDoc => {
                            firebase.firestore().collection('SCHEDULE').doc(monthDoc.id).
                                collection('MONTH_SCHED').where('DIA', '==', day.toString()).get().then(daySnap => {
                                    daySnap.forEach(dayDoc => {
                                        console.log(dayDoc);
                                        firebase.firestore().collection('SCHEDULE').doc(monthDoc.id).
                                            collection('MONTH_SCHED').doc(dayDoc.id).collection('DAY_SCHED').
                                                where('HORA_INIT', '==', '15:30').get().then(finalSnap => {
                                                    console.log('FINAL');
                                                    if(finalSnap.empty){
                                                        firebase.firestore().collection('SCHEDULE').doc(monthDoc.id).
                                                            collection('MONTH_SCHED').doc(dayDoc.id).
                                                                collection('DAY_SCHED').add({
                                                                    HORA_INIT: '15:30',
                                                                    HORA_FIM: '17:30',
                                                                    USER: userSnapshot.ref,
                                                                    SALA: 'REF',
                                                                })
                                                    }
                                                })
                                    })
                                })
                        })
                    }).catch(err => {
                        console.log(err);
                    })
                
            }
            if(sixthClass){
                firebase.firestore().collection('SCHEDULE').
                    where('MES', '==', month).get().then(monthSnap => {
                        monthSnap.forEach(monthDoc => {
                            firebase.firestore().collection('SCHEDULE').doc(monthDoc.id).
                                collection('MONTH_SCHED').where('DIA', '==', day.toString()).get().then(daySnap => {
                                    daySnap.forEach(dayDoc => {
                                        console.log(dayDoc);
                                        firebase.firestore().collection('SCHEDULE').doc(monthDoc.id).
                                            collection('MONTH_SCHED').doc(dayDoc.id).collection('DAY_SCHED').
                                                where('HORA_INIT', '==', '17:30').get().then(finalSnap => {
                                                    console.log('FINAL');
                                                    if(finalSnap.empty){
                                                        firebase.firestore().collection('SCHEDULE').doc(monthDoc.id).
                                                            collection('MONTH_SCHED').doc(dayDoc.id).
                                                                collection('DAY_SCHED').add({
                                                                    HORA_INIT: '17:30',
                                                                    HORA_FIM: '19:00',
                                                                    USER: userSnapshot.ref,
                                                                    SALA: 'REF',
                                                                })
                                                    }
                                                })
                                    })
                                })
                        })
                    }).catch(err => {
                        console.log(err);
                    })
                
            }
            if(seventhClass){
                firebase.firestore().collection('SCHEDULE').
                    where('MES', '==', month).get().then(monthSnap => {
                        monthSnap.forEach(monthDoc => {
                            firebase.firestore().collection('SCHEDULE').doc(monthDoc.id).
                                collection('MONTH_SCHED').where('DIA', '==', day.toString()).get().then(daySnap => {
                                    daySnap.forEach(dayDoc => {
                                        console.log(dayDoc);
                                        firebase.firestore().collection('SCHEDULE').doc(monthDoc.id).
                                            collection('MONTH_SCHED').doc(dayDoc.id).collection('DAY_SCHED').
                                                where('HORA_INIT', '==', '19:00').get().then(finalSnap => {
                                                    console.log('FINAL');
                                                    if(finalSnap.empty){
                                                        firebase.firestore().collection('SCHEDULE').doc(monthDoc.id).
                                                            collection('MONTH_SCHED').doc(dayDoc.id).
                                                                collection('DAY_SCHED').add({
                                                                    HORA_INIT: '19:00',
                                                                    HORA_FIM: '21:00',
                                                                    USER: userSnapshot.ref,
                                                                    SALA: 'REF',
                                                                })
                                                    }else{

                                                    }
                                                })
                                    })
                                })
                        })
                    }).catch(err => {
                        console.log(err);
                    })
                
            }
            if(eigthClass){
                firebase.firestore().collection('SCHEDULE').
                    where('MES', '==', month).get().then(monthSnap => {
                        monthSnap.forEach(monthDoc => {
                            firebase.firestore().collection('SCHEDULE').doc(monthDoc.id).
                                collection('MONTH_SCHED').where('DIA', '==', day.toString()).get().then(daySnap => {
                                    daySnap.forEach(dayDoc => {
                                        console.log(dayDoc);
                                        firebase.firestore().collection('SCHEDULE').doc(monthDoc.id).
                                            collection('MONTH_SCHED').doc(dayDoc.id).collection('DAY_SCHED').
                                                where('HORA_INIT', '==', '21:00').get().then(finalSnap => {
                                                    console.log('FINAL');
                                                    if(finalSnap.empty){
                                                        firebase.firestore().collection('SCHEDULE').doc(monthDoc.id).
                                                            collection('MONTH_SCHED').doc(dayDoc.id).
                                                                collection('DAY_SCHED').add({
                                                                    HORA_INIT: '21:00',
                                                                    HORA_FIM: '23:00',
                                                                    USER: userSnapshot.ref,
                                                                    SALA: 'REF',
                                                                })
                                                    }
                                                })
                                    })
                                })
                        })
                    }).catch(err => {
                        console.log(err);
                    })
            }
        }).catch(err => {
            console.log(err);
        });
        
        const popAction = StackActions.pop(3);
        navigation.dispatch(popAction);
    }

    return (
        <View style={styles.mainView}>
            <Text>
                08:00 às 10:00
            </Text>
            <CheckBox
                value={firstClass}
                onValueChange={(newValue) => setFirstClass(newValue)}
            />
            <Text>
                10:00 às 12:00
            </Text>
            <CheckBox
                value={secondClass}
                onValueChange={(newValue) => setSecondClass(newValue)}
            />
            <Text>
                12:00 às 13:30
            </Text>
            <CheckBox
                value={thirdClass}
                onValueChange={(newValue) => setThirdClass(newValue)}
            />
            <Text>
                13:30 às 15:30
            </Text>
            <CheckBox
                value={fourthClass}
                onValueChange={(newValue) => setFourthClass(newValue)}
            />
            <Text>
                15:30 às 17:30
            </Text>
            <CheckBox
                value={fifthClass}
                onValueChange={(newValue) => setFifthClass(newValue)}
            />
            <Text>
                17:30 às 19:00
            </Text>
            <CheckBox
                value={sixthClass}
                onValueChange={(newValue) => setSixthClass(newValue)}
            />
            <Text>
                19:00 às 21:00
            </Text>
            <CheckBox
                value={seventhClass}
                onValueChange={(newValue) => setSeventhClass(newValue)}
            />
            <Text>
                21:00 às 23:00
            </Text>
            <CheckBox
                value={eigthClass}
                onValueChange={(newValue) => setEigthClass(newValue)}
            />
            <TouchableOpacity style = {styles.bnt} onPress={submitReservations}>
                <Text style = {styles.btnText}>
                    <Icon name = "pluscircleo" size = {24} color = "black"/>
                    Add Reservations
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    mainView: {
        flex:1,
        alignItems: "center"
    },
    bnt: {
        backgroundColor: '#c2bad8',
        padding: 9,
        margin: 5
    },
    btnText: {
        color: 'darkslateblue',
        fontSize: 20,
        textAlign: 'center'
    }
});

export default ReservationForms;