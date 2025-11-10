import React, { Component } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        email: '', 
        username: '', 
        password: '', 
        error: '' 
    };
  }

  onSubmit() {
    const email = this.state.email;
    const username = this.state.username;
    const password = this.state.password;

    if (email.includes('@') === false) {
      this.setState({ error: 'Email mal formateado' });
      return;
    }
    if (password.length < 6) {
      this.setState({ error: 'La password debe tener una longitud mínima de 6 caracteres' });
      return;
    }
    if (username.length == 0) {
      this.setState({ error: 'El nombre de usuario es obligatorio' });
      return;
    }

    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        db.collection('users')
          .add({
            email: email,
            username: username,
            createdAt: Date.now(),
          })
          .then(() => {
            this.setState({ error: '' });
            this.props.navigation.navigate('Login');
          })
          .catch((error) => {
            this.setState({ error: error.message });
            console.log(error) // para ver errores que tira firebase
          });
      })
      .catch((error) => {
        this.setState({ error: error.message });
        console.log(error)
      });
  }

  render() {
    const email = this.state.email;
    const username = this.state.username;
    const password = this.state.password;
    const error = this.state.error

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Registro</Text>

        <TextInput
          style={styles.field}
          keyboardType='email-address'
          placeholder='email'
          onChangeText={ text => this.setState({email:text}) }
          value={email}
        />

        <TextInput
          style={styles.field}
          placeholder='usuario'
          onChangeText={ text => this.setState({username:text}) }
          value={username}
        />

        <TextInput
          style={styles.field}
          placeholder='contraseña'
          secureTextEntry={true}
          onChangeText={ text => this.setState({password:text}) }
          value={password}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Pressable style={styles.button} onPress={() => this.onSubmit()}>
          <Text style={styles.buttonText}>Registrate</Text>
        </Pressable>

        <Pressable
          onPress={() => this.props.navigation.navigate('Login')}
          style={[styles.button, styles.buttonDos]}
        >
          <Text style={styles.buttonText}>Ya tengo cuenta</Text>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 10, marginTop: 20, flex: 1, alignSelf: 'stretch', justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: '700', textAlign: 'center', marginBottom: 16 },
  field: {
    height: 20, paddingVertical: 15, paddingHorizontal: 10,
    borderWidth: 1, borderColor: '#ccc', borderStyle: 'solid',
    borderRadius: 6, marginVertical: 10,
  },
  button: {
    backgroundColor: '#28a745', paddingHorizontal: 10, paddingVertical: 6,
    borderRadius: 4, borderWidth: 1, borderColor: '#28a745',
    alignSelf: 'center', minWidth: 180, marginTop: 10
  },
  buttonDos: {
    backgroundColor: '#6c757d',
    borderColor: '#6c757d',
  },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: '700' },
  error: { color: 'crimson', marginBottom: 8, textAlign: 'center' },
});

export default Register;

