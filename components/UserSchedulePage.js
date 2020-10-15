//React imports
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ActivityIndicator, FlatList} from 'react-native';

//Firebase imports
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';
import '@react-native-firebase/auth';

//Components imports
import UserScheduleItem from './UserScheduleItem'

const UserSchedulePage = () => {
    const [user, setUser] = useState();
    const [sched, setSched] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const currUser = firebase.auth().currentUser;
        
        setUser(currUser);

        const subscribe = firebase.firestore().collectionGroup('DAY_SCHED').
            onSnapshot(snapshot => {
                setLoading(true);
                firebase.firestore().collection('USERS').doc(currUser.uid).get().then(userDoc => {                
                    let newSched = [];
                    if(snapshot){
                        snapshot.forEach(doc =>{
                            if(doc.data().USER.isEqual(userDoc.ref)){
                                newSched.push({id:doc.id, ...doc.data()});
                            }
                    })
                    setSched(newSched);
                }
                }).catch(err => {
                    console.log(err);
                })
                
                setLoading(false);
            })
        

        return subscribe;
        }
        
    ,[]);

    return (
        <View style={styles.mainView}>
            { loading == false ?
            (
                <UserScheduleItem DATA={sched}/>
              
            ) : (
                <View>
                    <Text>
                        CARREGANDO
                    </Text>
                </View>
            ) 
            }
        </View>
    );

}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    activStyle: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});


export default UserSchedulePage;