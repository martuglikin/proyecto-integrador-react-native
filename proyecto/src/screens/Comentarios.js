import React, { Component } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, FlatList } from 'react-native';
import { auth, db } from '../firebase/config';

class Comentarios extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: null,         
      comentarios: [],
      texto: '',
    };
  }

  componentDidMount() {
    //obtenemos el postId por navegacion
    const postId = this.props.route.params.postId;


    // Post
    db.collection('posts')
      .doc(postId)
      .onSnapshot(doc => { // onSnapshot actualiza en tiempo real los cambios del post
        this.setState({
          post: { id: doc.id, data: doc.data() },
        });
      });

    // Comentarios del post
    db.collection('posts')
      .doc(postId)
      .collection('comments')
      .orderBy('createdAt', 'desc')
      .onSnapshot(docs => {
        let items = [];
        docs.forEach(doc => {
          items.push({ id: doc.id, data: doc.data() });
        });
        this.setState({ comentarios: items });
      });
  }

  onSubmit() {
    const postId = this.props.route.params.postId;

    db.collection('posts')
      .doc(postId)
      .collection('comments')
      .add({
        owner: auth.currentUser.email,
        text: this.state.texto,
        createdAt: Date.now(),
      })
      .then(() => this.setState({ texto: '' })) //limpiamos el input al terminar
      .catch(e => console.log(e));
  }

  render() {
    const post = this.state.post;
    const comentarios = this.state.comentarios;
    const texto= this.state.texto;

    return (
      <View style={styles.container}>

      {/* Tarjeta con info del post (solo si ya cargó) */}
        {post ? (
          (() => {
            const info = post.data; 
            const likes = info.likes || [];
            // Si el usuario actual está en likes, mostramos ❤️; si no, 🤍
            const heart = (auth.currentUser && likes.includes(auth.currentUser.email)) ? '❤️' : '🤍';

            return (
              <View style={styles.postCard}>
                <Text style={styles.postOwner}>{info.username || info.email || 'Autor desconocido'}</Text>
                <Text style={styles.postMsg}>{info.message}</Text>
                <Text style={styles.likesRow}>{heart} {likes.length} likes</Text>
              </View>
            );
          })()
        ) : null}

        <Text style={styles.title}>Comentarios</Text>

        <FlatList
          data={comentarios}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            const info = item.data;
            return (
              <View style={styles.commentCard}>
                <Text style={styles.commentOwner}>{info.owner}</Text>
                <Text style={styles.commentText}>{info.text}</Text>
              </View>
            );
          }}
        />

        <Text style={styles.subtitle}>Comentá aquí tu post…</Text>
        <TextInput
          style={styles.inputTexto}
          placeholder="Escribe aquí tu comentario…"
          onChangeText={text => this.setState({ texto: text })}
          value={texto}
        />

        <Pressable style={styles.button} onPress={() => this.onSubmit()}>
          <Text style={styles.buttonText}>Publicar comentario</Text>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, alignSelf: 'stretch', padding: 16, paddingTop: 24 },
  title: { fontSize: 18, fontWeight: '700', marginTop: 6, marginBottom: 8 },
  subtitle: { fontSize: 16, fontWeight: '600', marginTop: 10, marginBottom: 6 },

  postCard: {
    borderWidth: 1, borderColor: '#eee', borderRadius: 12,
    padding: 12, marginBottom: 10,
  },
  postOwner: { fontWeight: '700', marginBottom: 6 },
  postMsg: { fontSize: 16, lineHeight: 22, marginBottom: 8 },
  likesRow: { fontWeight: '700' },

  commentCard: {
    borderWidth: 1, borderColor: '#eee', borderRadius: 10,
    padding: 10, marginBottom: 8,
  },
  commentOwner: { fontWeight: '700', marginBottom: 4 },
  commentText: { fontSize: 15},

  button: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#28a745',
    alignSelf: 'center',
    minWidth: 200,
  },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: '700' },

  inputTexto: {
    height: 100,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderStyle: 'solid',
    borderRadius: 6,
    marginVertical: 10,
    textAlignVertical: 'top'
  }
});

export default Comentarios;
