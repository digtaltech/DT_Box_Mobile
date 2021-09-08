import {StatusBar} from 'expo-status-bar';
import React, {useState} from 'react';
import {StyleSheet, Text, View, ScrollView, FlatList} from 'react-native';
import {Navbar} from './src/Navbar'
import {AddToDo} from './src/AddToDo'
import {Todo} from './src/Todo'
import {ConnectWeb} from './src/ConnectWeb'

var ws = new WebSocket('ws://192.168.1.40:9090/');
var web_id;

export default function App() {

  const setWebId = title => {

    ws.onopen = () => {

    };
    web_id = title
  }

  const [todos, setTodos] = useState([])

  const addTodo = title => {
    setTodos(prev => [
      ...prev, {
        id: Date.now().toString(),
        title
      }
    ])
    // var ws = new WebSocket('ws://192.168.1.40:9090/');
    // ws.onopen = () => {
    //   // connection opened
    //   var message = '{"status": "debug","web_id": 27,"client_id": 2,"data": "'+title+'"}'
    //   ws.send(message); // send a message
    // };
    // var ws = new WebSocket('ws://192.168.1.40:9090/');
    var message = '{"status": "debug","web_id": '+web_id+',"client_id": 2,"data": "'+title+'"}'
    ws.send(message); // send a message
    ws.onmessage = (e) => {
      // a message was received
      var data = JSON.parse(e.data)
      console.log("Your ID = " + data.web_id);
      console.log("Message: " + data.data);
    };

    ws.onerror = (e) => {
      // an error occurred
      console.log(e.message);
    };

    ws.onclose = (e) => {
      // connection closed
      console.log(e.code, e.reason);
    };
    console.log("fff")
  }





  const removeTodo = id => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }

  return (<View >
    <Navbar title="DT BOX Client"/>
    <View style={styles.container}>
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
  }
});
