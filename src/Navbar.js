import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export const Navbar = (props) => {
  return (
    <View style={styles.navbar}>
      <Text style={styles.text}>{props.title}</Text>

    </View>
  )
}

const styles = StyleSheet.create({
  navbar: {
    height: 70,
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#2C7BE5'
  },
  text: {
    color: 'white',
    fontSize: 20
  }
})
