import React, { useState } from "react";
import {View, FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, Alert} from "react-native";
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';

const Item = ({ item, onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
      <View style={styles.item}>
      <Text style={styles.title}>{item.DIA}/{item.MES}</Text>
      <Text style={styles.title}>{item.HORA_INIT} - {item.horaFim}</Text>
      {/* <Text style={styles.title}>{item.sala}</Text> */}
      </View>
    </TouchableOpacity>
  );

const UserScheduleItem = ({DATA}) => {
  const [selectedId, setSelectedId] = useState(null);

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
    firebase.firestore().collectionGroup('DAY_SCHED').get().then(snapshot => {
      snapshot.forEach(doc => {
        console.log(doc.id + "-------->" + id);
        if(doc.id == id){
          doc.ref.delete();
        }
      })
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
    if(DATA.length == 0)
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
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}     
        ListHeaderComponent = {inicioLista}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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

export default UserScheduleItem;
