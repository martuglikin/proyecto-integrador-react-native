import React, { Component } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config';

class NuevoPost extends Component {
  constructor(props) {
    super(props);
    this.state = { mensaje: '' };
  }

  onSubmit() {
    const email = auth.currentUser ? auth.currentUser.email : null;

    db.collection('posts')
      .add({
        email: email,
        message: this.state.mensaje,
        createdAt: Date.now(),
        likes: [], 
      })
      .then(() => this.setState({ mensaje: '' }));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Crear nuevo post</Text>

        <TextInput
          style={[styles.field, styles.fieldLarge]}
          multiline
          placeholder="Escribí tu mensaje..."
          onChangeText={text => this.setState({ mensaje: text })}
          value={this.state.mensaje}
        />

        <Pressable style={styles.button} onPress={() => this.onSubmit()}>
          <Text style={styles.buttonText}>Publicar post</Text>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, alignSelf: 'stretch', padding: 16, paddingTop: 24 },
  title: { fontSize: 22, fontWeight: '700', textAlign: 'center', marginBottom: 12 },
  field: {
    height: 20, paddingVertical: 15, paddingHorizontal: 10,
    borderWidth: 1, borderColor: '#ccc', borderStyle: 'solid',
    borderRadius: 6, marginVertical: 10,
  },
  fieldLarge: {
    height: 100,
    textAlignVertical: 'top'
  },
  button: {
    backgroundColor: '#28a745', paddingHorizontal: 10, paddingVertical: 6,
    borderRadius: 4, borderWidth: 1, borderColor: '#28a745', alignSelf: 'center', minWidth: 160,
  },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: '700' },
});

export default NuevoPost;
