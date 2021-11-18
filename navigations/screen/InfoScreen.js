import * as React from 'react';
import {View, Text, StyleSheet,Linking } from 'react-native';

export default function InfoScreen({navigation}) {
  return (<View style={styles.block}>
    <Text style={styles.text}>Привет, если вы обнаружили ошибки или хотите оставить отзыв, пожалуйста, свяжитесь со мной в Telegram <Text onPress={() => Linking.openURL('http://t.me/digtech')} style={styles.link}>@digtech</Text> </Text>
    <Text style={styles.text} onPress={() => navigation.navigate('QR Scan')} >Hi, if you found bugs or want to give feedback, please contact me in Telegram  <Text onPress={() => Linking.openURL('http://t.me/digtech')} style={styles.link}>@digtech</Text> </Text>
  </View>);
}
const styles = StyleSheet.create({
  block: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 20
  },
  text: {
    color: "#12263F",
    paddingBottom: 20,
    fontSize: 20
  },
  link: {
    color: "#2C7BE5",
  }
})
