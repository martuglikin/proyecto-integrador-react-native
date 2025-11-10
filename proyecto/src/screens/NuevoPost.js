import React, { Component } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config';

class NuevoPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mensaje: '',
      error: ''
    };
  }

  onSubmit() {
    const mensaje = this.state.mensaje;

    if (mensaje.length == 0) {
        this.setState({ error: 'El posteo no puede estar vacio.' });
        return;
        }
    
    db.collection('posts').add({ //en la coleccion posts guardo un documento
        email: auth.currentUser.email,
        message: mensaje,
        createdAt: Date.now(),
        likes: [],
        comentarios: []
      })

      .then(() => {
        console.log('Post creado');
        this.setState({ mensaje: '' });
        this.props.navigation.navigate("NavHomeComment");
      })

      .catch((error) => {
        this.setState({ error: error.message });
        console.log(error)
      });
  }

  render() {
    const mensaje = this.state.mensaje;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Nuevo post</Text>

        <TextInput
          style={[styles.field, styles.fieldLarge]}
          placeholder="Escribí tu mensaje..."
          onChangeText={ text => this.setState({mensaje: text}) }
          value={mensaje}
        />

        <Pressable style={styles.button} onPress={() => this.onSubmit()}>
          <Text style={styles.buttonText}>Publicar</Text>
        </Pressable>

        {this.state.error ? <Text style={styles.error}>{this.state.error}</Text> : null}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, alignSelf: 'stretch', padding: 16, paddingTop: 24 },
  title: { fontSize: 22, fontWeight: '700', textAlign: 'center', marginBottom: 12 },
  field: {
    height: 20,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderStyle: 'solid',
    borderRadius: 6,
    marginVertical: 10,
  },
  fieldLarge: {
    height: 100,
    textAlignVertical: 'top'
  },

  button: {
    backgroundColor: '#28a745',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#28a745',
    alignSelf: 'center',
    minWidth: 160,
  },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: '700' },
  error: { color: 'crimson', marginBottom: 8, textAlign: 'center' }
});

export default NuevoPost;