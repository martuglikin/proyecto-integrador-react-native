import React, { Component } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config';
import firebase from 'firebase';


class Post extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userLiked: false,
    };
  }
  componentDidMount() {
    const userEmail = auth.currentUser.email;
    const likes = this.props.data.data.likes || [];
    if (likes.includes(userEmail)) {
      this.setState({ userLiked: true });
    } else {
      this.setState({ userLiked: false });
    }
  }
  likear() {
    const postId = this.props.data.id;
    const userEmail = auth.currentUser.email;
    if (this.state.userLiked) {
      db.collection('posts')
        .doc(postId)
        .update({ likes: firebase.firestore.FieldValue.arrayRemove(userEmail) })
        .then(() => this.setState({ userLiked: false }))
        .catch(e => console.log(e));
    } else {
      db.collection('posts')
        .doc(postId)
        .update({ likes: firebase.firestore.FieldValue.arrayUnion(userEmail) })
        .then(() => this.setState({ userLiked: true })).catch(e => console.log(e));
    }
  }
  irAComentar() {
    this.props.navigation.navigate('Comentarios', { postId: this.props.data.id });
  }
  render() {
    const info = this.props.data.data;
    const likes = info.likes || [];
    const heart = this.state.userLiked ? '❤️' : '🤍';
    return (
      <View style={styles.card}>
        <Text style={styles.autor}>{info.username || info.email || 'Autor desconocido'}</Text>
        <Text style={styles.message}>{info.message}</Text>
        <View style={styles.contendor}>
          {this.props.mostrarLikeComments ?
            <View style={styles.contendor}>
              <Pressable style={styles.btn} onPress={() => this.likear()}>
                <Text style={styles.textoBtn}>{heart} {likes.length} likes</Text>
              </Pressable>

              <Pressable style={styles.comentarBtn} onPress={() => this.irAComentar()}>
                <Text style={styles.textoBtn}>Comentar</Text>
              </Pressable>

            </View>
            : null}


          {this.props.mostrarBorrar ? (
            <Pressable
              style={styles.btnBorrar}
              onPress={() => this.props.eliminarPosteo(this.props.data.id)}
            >
              <Text style={styles.textoBtn}>Borrar</Text>
            </Pressable>
          ) : null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: { borderWidth: 1, borderColor: '#ddd', borderRadius: 12, padding: 12, marginBottom: 12 },
  autor: { fontWeight: '700', marginBottom: 6 },
  message: { fontSize: 16, lineHeight: 22, marginBottom: 10 },
  contendor: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' },
  btn: {
    backgroundColor: '#eef6ff',
    borderColor: '#cfe4ff',
    borderWidth: 1,
    borderRadius: 16,
    padding: 10,
    marginRight: 10,
    marginTop: 6,
  },
  comentarBtn: {
    backgroundColor: '#f2f2f2',
    borderColor: '#e3e3e3',
    borderWidth: 1,
    borderRadius: 16,
    padding: 10,
    marginRight: 10,
    marginTop: 6,
  },
  btnBorrar: {
    backgroundColor: '#ffeaea',
    borderColor: '#ffc8c8',
    borderWidth: 1,
    borderRadius: 16,
    padding: 10,
    marginRight: 10,
    marginTop: 6,
  },
  textoBtn: { fontWeight: '700' },
});

export default Post;