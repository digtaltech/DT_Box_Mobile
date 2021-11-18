import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Button
} from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';


export default function QRScreen({ navigation }) {

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const {status} = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({type, data}) => {
    // setScanned(true); Block reader after scan QR
    try {
      var scanDataJson = JSON.parse(data)
      alert(`Web ID ${scanDataJson.web_id} `);
      // setWebId(scanDataJson.web_id)
      navigation.navigate('Data', { web_id: scanDataJson.web_id })
      console.log("Scan QR")
    } catch  {
      console.log("Not valid QR");
    }

    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };


    return (
        <View style={styles.container}>
          <View style={styles.barcodebox}>
            <BarCodeScanner onBarCodeScanned={scanned
                ? undefined
                : handleBarCodeScanned} style={{
                height: 400,
                width: 400
              }}/>
          </View>
            <Text
                onPress={() => navigation.navigate('Data', { web_id: 403 })}
                style={styles.text}>Scan QR for set connection</Text>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 20,
    alignItems: 'center'
  },
  text: {
    color: '#12263F',
    fontSize: 26,
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
