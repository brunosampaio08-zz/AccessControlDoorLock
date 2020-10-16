//React imports
import React, {useState, useEffect} from 'react';
import {View, 
        StyleSheet, 
        ActivityIndicator, 
        FlatList, 
        StatusBar, 
        Text, 
        TouchableOpacity, 
        Alert} from 'react-native';

//Firebase imports
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';
import '@react-native-firebase/auth';

const Item = ({ item, onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
      <View style={styles.item}>
      <Text style={styles.title}>{item.DIA}/{item.MES}</Text>
      <Text style={styles.title}>{item.HORA_INIT} - {item.HORA_FIM}</Text>
      <Text style={styles.title}>{item.SALA}</Text>
      </View>
    </TouchableOpacity>
  );

const UserSchedulePage = () => {
    const [user, setUser] = useState();
    const [sched, setSched] = useState();
    const [loading, setLoading] = useState(true);
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        const currUser = firebase.auth().currentUser;
        
        setUser(currUser);

        const subscribe = firebase.firestore().collectionGroup('DAY_SCHED').
            onSnapshot(async snapshot => {
                setLoading(true);
                await firebase.firestore().collection('USERS').doc(currUser.uid).get().then(async userDoc => {                
                    let newSched = [];
                    if(snapshot){
                        for (const doc of snapshot.docs){
                            const sala = await doc.data().SALA.get();
                                if(doc.data().USER.isEqual(userDoc.ref)){
                                    newSched.push({id:doc.id, 
                                                    HORA_INIT: doc.data().HORA_INIT,
                                                    HORA_FIM: doc.data().HORA_FIM,
                                                    DIA: doc.data().DIA,
                                                    MES: doc.data().MES,
                                                    SALA: sala.data().SALA,
                                                });
                                }
                        }
                        newSched.sort(compare);
                        setSched(newSched);
                    }
                    setLoading(false);
                }).catch(err => {
                    console.log(err);
                })
            })
        

        return subscribe;
        }
        
    ,[]);

    const compare = (a, b) => {
        if(a.DIA < b.DIA){
            return -1;
        }else if(a.DIA > b.DIA){
            return 1;
        }else{
            return 0;
        }
    }

    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? "#80bfff" : "#cce6ff";
        return (
          <Item
            item={item}
            onPress={() => 
                {
                    setSelectedId(item.id)
                    onPress(item.id)
                }
            }
            style={{ backgroundColor }}
          />
        );
      };
    
      const deleteReserve = (id) => {
        setLoading(true);
        firebase.firestore().collectionGroup('DAY_SCHED').get().then(snapshot => {
          snapshot.forEach(doc => {
            console.log(doc.id + "-------->" + id);
            if(doc.id == id){
              doc.ref.delete();
            }
          })
          setLoading(false);
        }).catch(err => {
          console.log(err);
        })
      }
    
      const onPress = (id) => {
        Alert.alert(
            "Exclusão de reserva",
            "Deseja realmente excluir essa reserva?",
            [
                {
                    text: "Cancelar",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                },
                {
                    text: "Confirmar",
                    onPress: () => deleteReserve(id),
                    style: "OK",
                },
            ],
            {canceleble: false},
        )
    }
    
      const listaVazia = () => {
          return (
              <TouchableOpacity>
              <View style={styles.item}>
                  <Text style={styles.title}> Você não possui reservas. </Text>
              </View>
              </TouchableOpacity>
          )
      }
      
      const inicioLista = () => {
        if(!sched)
        {
            return (
                listaVazia()
            )
        }else
        {
            return (
                <TouchableOpacity styles={styles.item}>
                    <View style={styles.item}>
                        <Text style={styles.cabecalho}> Selecione uma reserva para excluir. </Text>
                    </View>
                </TouchableOpacity>
            )
        }
    }

    return (
        <View style={styles.mainView}>
            { loading == false ?
            (
                <View style={styles.container}>
                    <FlatList
                        data={sched}
                        renderItem={renderItem}
                        extraData={sched}
                        ListHeaderComponent = {inicioLista}
                        legacyImplementation={true}
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
    },
    
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
      },
      item: {
        padding: 5,
        marginVertical: 4,
        marginHorizontal: 8,
        alignItems : "center",
      },
      title: {
        alignItems: "center",
        fontSize: 16,
      },
      cabecalho: {
        padding: 5,
        marginVertical: 4,
        marginHorizontal: 8,
        alignItems : "center",
        fontSize: 16,
      },
});

export default UserSchedulePage;