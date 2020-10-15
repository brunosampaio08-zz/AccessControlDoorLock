import React, { useState } from "react";
import {View, FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, Alert} from "react-native";

const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      sala: "sala 1",
      dia: "01",
      mes: "01",
      horaInicio: "01:00",
      horaFim: "02:00",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      sala: "sala 2",
      dia: "01",
      mes: "01",
      horaInicio: "01:00",
      horaFim: "02:00",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      sala: "sala 1",
      dia: "02",
      mes: "01",
      horaInicio: "01:00",
      horaFim: "02:00",
    },
    {
    id: "2",
    sala: "sala 1",
    dia: "01",
    mes: "01",
    horaInicio: "01:00",
    horaFim: "02:00",
    },
    {
    id: "3",
    sala: "sala 2",
    dia: "01",
    mes: "01",
    horaInicio: "01:00",
    horaFim: "02:00",
    },
    {
    id: "4",
    sala: "sala 1",
    dia: "02",
    mes: "01",
    horaInicio: "01:00",
    horaFim: "02:00",
    },
  ];

const Item = ({ item, onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
      <View style={styles.item}>
      <Text style={styles.title}>{item.dia}/{item.mes}</Text>
      <Text style={styles.title}>{item.horaInicio} - {item.horaFim}</Text>
      <Text style={styles.title}>{item.sala}</Text>
      </View>
    </TouchableOpacity>
  );

const App = () => {
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
                onPress: () => console.log("OK Pressed"),
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

export default App;
