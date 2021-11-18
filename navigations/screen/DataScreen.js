import {StatusBar} from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Button
} from 'react-native';
import {AddToDo} from '../../src/AddToDo'
import {Todo} from '../../src/Todo'
import {ConnectWeb} from '../../src/ConnectWeb'
import * as Clipboard from 'expo-clipboard';

var ws = new WebSocket('ws://192.168.1.40:9090/');

var web_id;
var client_id

export default function InfoScreen({route}) {

  const setWebId = title => {

    ws.onopen = () => {};
    web_id = title
  }
  console.log(route)
  if (route.params == undefined) {
    console.log("huy")
  } else if (web_id != route.params.web_id) {
    console.log("pizda")
    console.log(web_id)
    console.log(route.params.web_id)
    ws = new WebSocket('ws://192.168.1.40:9090/');
    setWebId(route.params.web_id)
  } else {
    // ws = new WebSocket('ws://192.168.1.40:9090/');
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

    var message = '{"status": "debug","web_id": ' + web_id + ',"client_id": ' + client_id + ',"data": "' + title + '"}'
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

  const copyTodo = title => {
    Clipboard.setString(title);
    console.log(title)
  }

  return (
    <View style={styles.container}>
      <AddToDo onSubmit={addTodo}/>
      <FlatList keyExtractor={item => item.id} data={todos} renderItem={({item}) => <Todo todo={item} onRemove={removeTodo} onCopy={copyTodo}/>}/>

      <StatusBar style="auto"/>
    </View>
);
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
    borderRadius: 10
  }
});
