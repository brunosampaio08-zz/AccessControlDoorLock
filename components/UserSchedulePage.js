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
                let newSched = [];
                firebase.firestore().collection('USERS').doc(currUser.uid).get().then(userDoc => {
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
                <View>
                    <FlatList
                        data={sched}
                        renderItem={({item}) => (
                            <UserScheduleItem item={item}/>
                        )}
                    />
              
                </View>
              
            ) : (
                <View>
                    <ActivityIndicator />
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