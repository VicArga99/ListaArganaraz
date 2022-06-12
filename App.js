import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, Modal, TouchableOpacity } from 'react-native';


export default function App() {
  const [text, setText] = useState("");
  const [list, setList] = useState([]);
  const [itemSelected, setItemSelected] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  const handleOnChangeText = (text) => {
    setText(text);
  };

  const addItem = () => {
    if (text !== "") {
    setList((currentList) => [
    ...currentList,
    { id: Math.random(), value: text},
  ]);
    setText("");
  }
  };

  const renderItem = ({item}) => (
    <View key={item.id} style={styles.containerItemList}>
    <Text style={styles.itemList}>{item.value}</Text>
    <TouchableOpacity 
    onPress={() => onHandlerModal(item.id)} 
    style={styles.deleteButton}> 
    <Text style={styles.deleteButtonText}>X</Text>
    </TouchableOpacity>
  </View>

  );

  const keyExtractor = (item)  => item.id.toString();

  const onHandlerDelete = (id) => {
    setList((currentList) => currentList.filter((item) => item.id  !== id ));
    setItemSelected ({});
    setModalVisible(!modalVisible);

  };

  const onHandlerModal = (id) => {
    setItemSelected(list.filter((item) => item.id === id)[0]);
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TextInput 
        placeholder='new task' 
        style={styles.input}
        placeholderTextColor= "#9ABCA7"
        value={text}
        onChangeText={(text) => handleOnChangeText(text)}
        />
        <Button title='ADD' onPress={() => addItem()} color = "#F7B2AD"/>
 </View>
       
     <FlatList 
     data ={list} 
     renderItem = {renderItem}
     keyExtractor= {keyExtractor}
     style={styles.containerList}
     />
     <Modal
     animationType='slide'
     visible={modalVisible}
     onRequestClose={() => null}
     >
      <View style={styles.modalCotent}>
      <View style={styles.modalTitleContainer}>
        <Text style={styles.modalTitle}> Delete Item</Text>
        <TouchableOpacity 
        style={styles.deleteButton} 
        onPress={()=> setModalVisible(!modalVisible)}>
          <Text>X</Text>
         </TouchableOpacity>
        </View>
        <Text style={styles.modalText}> Are you sure? </Text>
        <Text style={styles.modalMessage}>{itemSelected.value}</Text>
        <Button 
        title='Okay' 
        onPress={() => onHandlerDelete(itemSelected.id)} 
        color = "#F7B2AD"
        />
       </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },

  content:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    margintop: 80,
    marginHorizontal: 20,
},

  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#C676A7",
    flex: 0.85,
   },

   containerList: {
   marginHorizontal: 20,
  },

  itemList: {
    fontSize: 14,  
  },

  containerItemList: {
   flexDirection: 'row',
   justifyContent: 'space-between',
   alignItems: 'center',
   marginHorizontal: 20,
   marginVertical: 10,
  },

  deleteButton: {
    backgroundColor: "#9ABCA7",
    paddingVertical: 10,
    paddingHorizontal: 18,
  },

  deleteButtonText: {
    color: "#fff",
    fontsize: 14,
    fontWeight: 'bold',
  },

  modalCotent: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: 'center',
  },

 modalTitleContainer: {
 flexDirection: 'row',
 justifyContent: 'space-evenly',
 alignItems: 'center',
},
  modalTitle: {
   fontsize: 18,
   marginVertical: 20,
   marginHorizontal: 20,
  },

  modalText: {
    fontsize: 18,
    marginHorizontal: 20,
   },

   modalMessage: {
    fontsize: 18,
    marginHorizontal: 20,
    marginVertical: 20,
    fontWeight: 'bold',
   },
});
