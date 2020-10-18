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

const calculateDay = (item) => {
    if(item.HORA_INIT == '00:01'){
        return item.DIA-1;
    }else{
        return item.DIA;
    }
}

const calculateHour = (hora) => {
    if(hora == '00:01'){
        return '21:00';
    }else if(hora == '23:59'){
        return '21:00';
    }else if(hora == '02:00'){
        return '23:00';
    }else if(hora == '11:00'){
        return '08:00';
    }else if(hora == '13:00'){
        return '10:00';
    }else if(hora == '15:00'){
        return '12:00';
    }else if(hora == '16:30'){
        return '13:30';
    }else if(hora == '18:30'){
        return '15:30';
    }else if(hora == '20:30'){
        return '17:30';
    }else if(hora == '22:00'){
        return '19:00';
    }else{
        return '-1';
    }
}

const Item = ({ item, onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
      <View style={styles.item}>
      <Text style={styles.title}>{calculateDay(item)}/{item.MES}</Text>
      <Text style={styles.title}>{calculateHour(item.HORA_INIT)} - {calculateHour(item.HORA_FIM)}</Text>
      <Text style={styles.title}>{item.SALA}</Text>
      </View>
    </TouchableOpacity>
  );

const UserSchedulePage = () => {
    const [user, setUser] = useState();
    const [sched, setSched] = useState([]);
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
                            if(doc.data().SALA){
                                const sala = await doc.data().SALA.get();
                                if(doc.data().USER.isEqual(userDoc.ref)){
                                    if(doc.data().HORA_INIT == '00:00'){
                                        newSched.push({id:doc.id, 
                                            HORA_INIT: doc.data().HORA_INIT,
                                            HORA_FIM: doc.data().HORA_FIM,
                                            DIA: doc.data().DIA,
                                            MES: doc.data().MES,
                                            SALA: sala.data().SALA,
                                        });
                                    }else{
                                        newSched.push({id:doc.id, 
                                            HORA_INIT: doc.data().HORA_INIT,
                                            HORA_FIM: doc.data().HORA_FIM,
                                            DIA: doc.data().DIA,
                                            MES: doc.data().MES,
                                            SALA: sala.data().SALA,
                                        });
                                    }
                                    
                                }
                            } 
                        }

                    }
                    newSched.sort(compare);
                    setSched(newSched);
                    setLoading(false);
                }).catch(err => {
                    console.log(err);
                })
            })
        

        return subscribe;
        }
        
    ,[]);

    const compare = (a, b) => {
        if(a.DIA < b.DIA)
        {
            return -1;
        }
        else if(a.DIA > b.DIA)
        {
            return 1;
        }
        else
        {
            if (a.HORA_INIT < b.HORA_INIT)
            {
                return -1;
            }
            else if (a.HORA_INIT > b.HORA_INIT)
            {
                return 1;
            }
            else
            {
                if (a.HORA_FIM < b.HORA_FIM)
                {
                    return -1;
                }
                else if (a.HORA_FIM >= b.HORA_FIM)
                {
                    return 1;
                }
            }
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
        if(sched.length == 0)
        {
            return (
                listaVazia()
            )
        }else
        {
            return (
                <TouchableOpacity styles={styles.item}>
                    <View style={styles.item}>
                        <Text style={styles.title}> Selecione uma reserva para excluir. </Text>
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
                    <Text style={styles.title}>
                        Atualizando lista de reservas...
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
        color: "#0073e6",
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