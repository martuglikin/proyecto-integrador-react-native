import React, { Component } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { db, auth } from '../firebase/config';
import traductor from "../components/traductor";

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
    };
  }

  componentDidMount(){
    auth.onAuthStateChanged(user => {
      if(user != null){
        this.props.navigation.navigate('HomeMenu');
      }
    })
  }
  
  onSubmit() {
    const email = this.state.email;
    const username = this.state.username;
    const password = this.state.password;

    console.log('Datos de registro:', { email, username, password });
    if (email.includes('@') === false) {
      this.setState({ error: 'Email mal formateado' });
      return;
    }
    if (password.length < 6) {
      this.setState({ error: 'La password debe tener una longitud mínima de 6 caracteres' });
      return;
    }

    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ error: '' }); // no hay error porq no se entro a los ifs
        this.props.navigation.navigate('HomeMenu'); // o tu pantalla Home
      })
      .catch((error) => {
        this.setState({ error: traductor(error) });
        console.log(error)
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Ingresar</Text>

        <TextInput
          style={styles.field}
          keyboardType="email-address"
          placeholder="email"
          onChangeText={(text) => this.setState({ email: text })}
          value={this.state.email}
        />

        <TextInput
          style={styles.field}
          keyboardType="default"
          placeholder="contraseña"
          secureTextEntry={true}
          onChangeText={(text) => this.setState({ password: text })}
          value={this.state.password}
        />

        <Pressable style={styles.button} onPress={() => this.onSubmit()}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>

        <Pressable
          onPress={() => this.props.navigation.navigate('Register')}
          style={[styles.button, styles.button2]}
        >
          <Text style={styles.buttonText}>No tengo cuenta</Text>
        </Pressable>


        <View>
          {this.state.error ? (
            <Text style={styles.errorText}>
              {this.state.error}
            </Text>
          ) : null}
        </View>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, alignSelf: 'stretch', padding: 16, justifyContent: 'center' }, //alignSelf: stretch - The element is positioned to fit the container (w3Schools)
  title: { fontSize: 22, fontWeight: '700', textAlign: 'center', marginBottom: 16 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: '700' },
  field: {
    height: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderStyle: 'solid',
    borderRadius: 6,
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#28a745', padding: 10,
    borderRadius: 4, borderWidth: 1, borderColor: '#28a745',
    alignSelf: 'center', minWidth: 180, marginTop: 10
  },
  button2:{ backgroundColor: '#6c757d', borderColor: '#6c757d', marginTop: 10 },
  errorText: { color: "red", textAlign: 'center', marginTop: 10 },
});

export default Login;