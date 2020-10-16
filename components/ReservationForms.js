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
    const [available, setAvailable] = useState([true, true, true, true, true, true, true, true]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        firebase.firestore().collection('SALAS').
            where('SALA', '==', classroom).get().then(async classSnap => {
                let classDoc
                if(classSnap.empty){
                    classDoc = await firebase.firestore().collection('SALAS').
                        add({SALA: classroom});
                }else{
                    classDoc = classSnap.docs[0].ref;
                }
                firebase.firestore().collection('SCHEDULE').
                    where('MES', '==', month).get().then(monthSnap => {
                        const monthDoc = monthSnap.docs[0];
                        firebase.firestore().collection('SCHEDULE').doc(monthDoc.id).
                            collection('MONTH_SCHED').where('DIA', '==', day.toString()).get().
                                then(daySnap => {
                                    const dayDoc = daySnap.docs[0];
                                    firebase.firestore().collection('SCHEDULE').doc(monthDoc.id).
                                        collection('MONTH_SCHED').doc(dayDoc.id).collection('DAY_SCHED').
                                                where('SALA', '==', classDoc).get().
                                                    then(finalSnap => {
                                                        console.log(monthDoc.id);
                                                        console.log(dayDoc.id);
                                                        console.log(classDoc);
                                                        let currAvailable = available;
                                                        console.log(finalSnap);
                                                        finalSnap.forEach(doc => {
                                                            console.log(doc.data().HORA_INIT);
                                                            if(doc.data().HORA_INIT == '08:00'){
                                                                currAvailable[0] = false;
                                                            }else if(doc.data().HORA_INIT == '10:00'){
                                                                currAvailable[1] = false;
                                                            }else if(doc.data().HORA_INIT == '12:00'){
                                                                currAvailable[2] = false;
                                                            }else if(doc.data().HORA_INIT == '13:30'){
                                                                currAvailable[3] = false;
                                                            }else if(doc.data().HORA_INIT == '15:30'){
                                                                currAvailable[4] = false;
                                                                setAvailable(currAvailable);
                                                            }else if(doc.data().HORA_INIT == '17:30'){
                                                                currAvailable[5] = false;
                                                            }else if(doc.data().HORA_INIT == '19:00'){
                                                                currAvailable[6] = false;
                                                            }else if(doc.data().HORA_INIT == '21:00'){
                                                                currAvailable[7] = false;
                                                            }
                                                        })
                                                        setAvailable(currAvailable);
                                                        setLoading(false);
                                                    })
                                })
                    }).catch(err => {
                        console.log(err);
                    })
            }).catch(err => {
                console.log(err);
            });
    }, [])

    const submitReservations = async () => {
        const currUser = firebase.auth().currentUser;

        let classDoc = await firebase.firestore().collection('SALAS').
            where('SALA', '==', classroom).get();

        if(classDoc.empty){
            classDoc = await firebase.firestore().collection('SALAS').
                add({SALA: classroom});
        }else{
            classDoc = classDoc.docs[0].ref;
        }
        
        await firebase.firestore().collection('USERS').doc(currUser.uid).get().then(async userSnapshot => {
            if(firstClass){
                firebase.firestore().collection('SCHEDULE').
                    where('MES', '==', month).get().then(monthSnap => {
                        monthSnap.forEach(monthDoc => {
                            firebase.firestore().collection('SCHEDULE').doc(monthDoc.id).
                                collection('MONTH_SCHED').where('DIA', '==', day.toString()).get().then(daySnap => {
                                    daySnap.forEach(dayDoc => {
                                        firebase.firestore().collection('SCHEDULE').doc(monthDoc.id).
                                            collection('MONTH_SCHED').doc(dayDoc.id).collection('DAY_SCHED').
                                                where('HORA_INIT', '==', '08:00').
                                                    where('SALA', '==', classDoc).get().
                                                        then(finalSnap => {
                                                            
                                                            if(finalSnap.empty){
                                                                firebase.firestore().collection('SCHEDULE').doc(monthDoc.id).
                                                                    collection('MONTH_SCHED').doc(dayDoc.id).
                                                                        collection('DAY_SCHED').add({
                                                                            HORA_INIT: '08:00',
                                                                            HORA_FIM: '10:00',
                                                                            MES: month,
                                                                            DIA: day,
                                                                            USER: userSnapshot.ref,
                                                                            SALA: classDoc,
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
                                        firebase.firestore().collection('SCHEDULE').doc(monthDoc.id).
                                            collection('MONTH_SCHED').doc(dayDoc.id).collection('DAY_SCHED').
                                                where('HORA_INIT', '==', '10:00').
                                                    where('SALA', '==', classDoc).get().
                                                        then(finalSnap => {
                                                            if(finalSnap.empty){
                                                                firebase.firestore().collection('SCHEDULE').doc(monthDoc.id).
                                                                    collection('MONTH_SCHED').doc(dayDoc.id).
                                                                        collection('DAY_SCHED').add({
                                                                            HORA_INIT: '10:00',
                                                                            HORA_FIM: '12:00',
                                                                            USER: userSnapshot.ref,
                                                                            SALA: classDoc,
                                                                            MES: month,
                                                                            DIA: day,
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
                                        firebase.firestore().collection('SCHEDULE').doc(monthDoc.id).
                                            collection('MONTH_SCHED').doc(dayDoc.id).collection('DAY_SCHED').
                                                where('HORA_INIT', '==', '12:00').
                                                    where('SALA', '==', classDoc).get().
                                                        then(finalSnap => {
                                                            if(finalSnap.empty){
                                                                firebase.firestore().collection('SCHEDULE').doc(monthDoc.id).
                                                                    collection('MONTH_SCHED').doc(dayDoc.id).
                                                                        collection('DAY_SCHED').add({
                                                                            HORA_INIT: '12:00',
                                                                            HORA_FIM: '13:30',
                                                                            USER: userSnapshot.ref,
                                                                            SALA: classDoc,
                                                                            MES: month,
                                                                            DIA: day,
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
            if(fourthClass){
                firebase.firestore().collection('SCHEDULE').
                    where('MES', '==', month).get().then(monthSnap => {
                        monthSnap.forEach(monthDoc => {
                            firebase.firestore().collection('SCHEDULE').doc(monthDoc.id).
                                collection('MONTH_SCHED').where('DIA', '==', day.toString()).get().then(daySnap => {
                                    daySnap.forEach(dayDoc => {
                                        firebase.firestore().collection('SCHEDULE').doc(monthDoc.id).
                                            collection('MONTH_SCHED').doc(dayDoc.id).collection('DAY_SCHED').
                                                where('HORA_INIT', '==', '13:30').
                                                    where('SALA', '==', classDoc).get().then(finalSnap => {
                                                    if(finalSnap.empty){
                                                        firebase.firestore().collection('SCHEDULE').doc(monthDoc.id).
                                                            collection('MONTH_SCHED').doc(dayDoc.id).
                                                                collection('DAY_SCHED').add({
                                                                    HORA_INIT: '13:30',
                                                                    HORA_FIM: '15:30',
                                                                    USER: userSnapshot.ref,
                                                                    SALA: classDoc,
                                                                    MES: month,
                                                                    DIA: day,
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
                                        firebase.firestore().collection('SCHEDULE').doc(monthDoc.id).
                                            collection('MONTH_SCHED').doc(dayDoc.id).collection('DAY_SCHED').
                                                where('HORA_INIT', '==', '15:30').
                                                where('SALA', '==', classDoc).get().then(finalSnap => {
                                                    if(finalSnap.empty){
                                                        firebase.firestore().collection('SCHEDULE').doc(monthDoc.id).
                                                            collection('MONTH_SCHED').doc(dayDoc.id).
                                                                collection('DAY_SCHED').add({
                                                                    HORA_INIT: '15:30',
                                                                    HORA_FIM: '17:30',
                                                                    USER: userSnapshot.ref,
                                                                    SALA: classDoc,
                                                                    MES: month,
                                                                    DIA: day,
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
                                        firebase.firestore().collection('SCHEDULE').doc(monthDoc.id).
                                            collection('MONTH_SCHED').doc(dayDoc.id).collection('DAY_SCHED').
                                                where('HORA_INIT', '==', '17:30').
                                                where('SALA', '==', classDoc).get().then(finalSnap => {
                                                    if(finalSnap.empty){
                                                        firebase.firestore().collection('SCHEDULE').doc(monthDoc.id).
                                                            collection('MONTH_SCHED').doc(dayDoc.id).
                                                                collection('DAY_SCHED').add({
                                                                    HORA_INIT: '17:30',
                                                                    HORA_FIM: '19:00',
                                                                    USER: userSnapshot.ref,
                                                                    SALA: classDoc,
                                                                    MES: month,
                                                                    DIA: day,
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
                                        firebase.firestore().collection('SCHEDULE').doc(monthDoc.id).
                                            collection('MONTH_SCHED').doc(dayDoc.id).collection('DAY_SCHED').
                                                where('HORA_INIT', '==', '19:00').
                                                where('SALA', '==', classDoc).get().then(finalSnap => {
                                                    if(finalSnap.empty){
                                                        firebase.firestore().collection('SCHEDULE').doc(monthDoc.id).
                                                            collection('MONTH_SCHED').doc(dayDoc.id).
                                                                collection('DAY_SCHED').add({
                                                                    HORA_INIT: '19:00',
                                                                    HORA_FIM: '21:00',
                                                                    USER: userSnapshot.ref,
                                                                    SALA: classDoc,
                                                                    MES: month,
                                                                    DIA: day,
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
            if(eigthClass){
                firebase.firestore().collection('SCHEDULE').
                    where('MES', '==', month).get().then(monthSnap => {
                        monthSnap.forEach(monthDoc => {
                            firebase.firestore().collection('SCHEDULE').doc(monthDoc.id).
                                collection('MONTH_SCHED').where('DIA', '==', day.toString()).get().then(daySnap => {
                                    daySnap.forEach(dayDoc => {
                                        firebase.firestore().collection('SCHEDULE').doc(monthDoc.id).
                                            collection('MONTH_SCHED').doc(dayDoc.id).collection('DAY_SCHED').
                                                where('HORA_INIT', '==', '21:00').
                                                where('SALA', '==', classDoc).get().then(finalSnap => {
                                                    if(finalSnap.empty){
                                                        firebase.firestore().collection('SCHEDULE').doc(monthDoc.id).
                                                            collection('MONTH_SCHED').doc(dayDoc.id).
                                                                collection('DAY_SCHED').add({
                                                                    HORA_INIT: '21:00',
                                                                    HORA_FIM: '23:00',
                                                                    USER: userSnapshot.ref,
                                                                    SALA: classDoc,
                                                                    MES: month,
                                                                    DIA: day,
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

    if(loading){
        return(
            <View>
                <Text>
                    CARREGANDO HORARIOS
                </Text>
            </View>
        )
    }

    return (
        <View style={styles.mainView}>
            {available[0] == true ? (
                <View> 
                    <Text>
                        08:00 às 10:00
                    </Text>
                    <CheckBox
                        value={firstClass}
                        onValueChange={(newValue) => setFirstClass(newValue)}
                    />    
                </View>
            ) : null}
            {available[1] == true ? (
                <View>
                    <Text>
                        10:00 às 12:00
                    </Text>
                    <CheckBox
                        value={secondClass}
                        onValueChange={(newValue) => setSecondClass(newValue)}
                    />
                </View>
            ) : null}
            {available[2] == true ? (
                <View>
                    <Text>
                        12:00 às 13:30
                    </Text>
                    <CheckBox
                        value={thirdClass}
                        onValueChange={(newValue) => setThirdClass(newValue)}
                    />
                </View>
            ) : null}
            {available[3] == true ? (
                <View>
                    <Text>
                        13:30 às 15:30
                    </Text>
                    <CheckBox
                        value={fourthClass}
                        onValueChange={(newValue) => setFourthClass(newValue)}
                    />
                </View>
            ) : null}
            {available[4] == true ? (
                <View>
                    <Text>
                        15:30 às 17:30
                    </Text>
                    <CheckBox
                        value={fifthClass}
                        onValueChange={(newValue) => setFifthClass(newValue)}
                    />
                </View>
            ): null}
            {available[5] == true? (
                <View>
                    <Text>
                        17:30 às 19:00
                    </Text>
                    <CheckBox
                        value={sixthClass}
                        onValueChange={(newValue) => setSixthClass(newValue)}
                    />
                </View>
            ):null}
            {available[6] == true ? (
                <View>
                    <Text>
                        19:00 às 21:00
                    </Text>
                    <CheckBox
                        value={seventhClass}
                        onValueChange={(newValue) => setSeventhClass(newValue)}
                    />
                </View>
            ):null}
            {available[7] == true ? (
                <View>
                    <Text>
                        21:00 às 23:00
                    </Text>
                    <CheckBox
                        value={eigthClass}
                        onValueChange={(newValue) => setEigthClass(newValue)}
                    />
                </View>
            ):null}
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