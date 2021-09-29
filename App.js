import {StatusBar} from 'expo-status-bar';
import React, {useState, useEffect } from 'react';
import {StyleSheet, Text, View, ScrollView, FlatList, Button } from 'react-native';
import {Navbar} from './src/Navbar'
import {AddToDo} from './src/AddToDo'
import {Todo} from './src/Todo'
import {ConnectWeb} from './src/ConnectWeb'
import { BarCodeScanner } from 'expo-barcode-scanner';

var ws = new WebSocket('ws://192.168.1.40:9090/');
var web_id;
var client_id

export default function App() {

  const setWebId = title => {

    ws.onopen = () => {

    };
    web_id = title
  }

  ws.onmessage = (e) => {
    // a message was received
    var data = JSON.parse(e.data)
    console.log("Your ID = " + data.web_id);
    client_id = data.web_id
    console.log("Message: " + data.data);
    console.log("HUY");
    addTodo(data.data)
  };

  const [todos, setTodos] = useState([])

  const addTodo = title => {
    setTodos(prev => [
      ...prev, {
        id: Date.now().toString(),
        title
      }
    ])

    var message = '{"status": "debug","web_id": '+web_id+',"client_id": '+client_id+',"data": "'+title+'"}'
    ws.send(message); // send a message

    ws.onerror = (e) => {
      // an error occurred
      console.log(e.message);
    };

    ws.onclose = (e) => {
      // connection closed
      console.log(e.code, e.reason);
    };
    console.log("Send message WS")
  }

  const removeTodo = id => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    var scanDataJson = JSON.parse(data)
    alert(`Web ID ${scanDataJson.web_id} `);
    setWebId(scanDataJson.web_id)
    console.log("Scan QR")
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (<View >
    <Navbar title="DT BOX Client"/>
    <View style={styles.container}>
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 400, width: 400 }} />
      </View>
      <ConnectWeb onSubmit={setWebId}/>
      <AddToDo onSubmit={addTodo}/>
      <FlatList keyExtractor={item => item.id} data={todos} renderItem={({item}) => <Todo todo={item} onRemove={removeTodo}/>}/>

    </View>
    <StatusBar style="auto"/>
  </View>);
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 20
  },
  text: {
    color: '#0c5211',
    fontSize: 26
  },
  barcodebox: {
    flexDirection: 'column',
    justifyContent: 'center',
    overflow: 'hidden',

    height: 300,
    width: 300,
    margin: 20,
    borderRadius: 10,

  }
});
