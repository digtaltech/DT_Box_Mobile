import React, {useState} from 'react'
import {View, StyleSheet, TextInput, Button, Alert} from 'react-native'

export const ConnectWeb = ({onSubmit}) => {

  const [value, setValue] = useState('')

  const pressHandler = () => {
    if (value.trim()) {
      onSubmit(value)
      setValue('')
    }
    else {
      Alert.alert('Название задачи не может быть пустым')
    }

  }

  return (
    <View style={styles.block}>
      <TextInput
        style={styles.input}
        onChangeText={setValue}
        value={value}
        placeholder="Введите ID Web Client"
        />
      <Button
       title='Добавить'
       color="#2C7BE5"
       onPress={pressHandler}/>
    </View>

  )
}

const styles = StyleSheet.create({
  block: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  input: {
    width: '70%',
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: "#D2DDEC",
    borderRadius: 8,
    paddingLeft: 10
  },
  button: {

  }
})
