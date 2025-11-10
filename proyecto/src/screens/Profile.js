import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import { auth, db } from '../firebase/config';
import Post from '../components/Post';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      misPosts: []
    };
  }

  componentDidMount() {
    const email = auth.currentUser.email;

    // Traer username
    db.collection('users')
      .where('email', '==', email)
      .limit(1)
      .onSnapshot(docs => {
        let nombre = '';
        docs.forEach(doc => { nombre = doc.data().username; });
        this.setState({ email, username: nombre });
      });

    // Traer mis posteos
    db.collection('posts')
      .where('email', '==', email)
      .onSnapshot(docs => {
        let res = [];
        docs.forEach(doc => res.push({ id: doc.id, data: doc.data() }));
        this.setState({ misPosts: res });
      });
  }

  eliminarPosteo(id) {
    db.collection('posts').doc(id).delete().catch(e => console.log(e));
  }

  // Logout y redirección
  logout() {
    auth.signOut()
      .then(() => this.props.navigation.navigate('Login'))
      .catch(e => console.log(e));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Mi Perfil</Text>
        <Text style={styles.row}><Text style={{ fontWeight: '700' }}>Usuario:</Text> {this.state.username}</Text>
        <Text style={styles.row}><Text style={{ fontWeight: '700' }}>Email:</Text> {this.state.email}</Text>

        <Text style={[styles.title, { marginTop: 16 }]}>Mis posteos</Text>

        <FlatList
          data={this.state.misPosts}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Post
              data={item}
              navigation={this.props.navigation}
              eliminarPosteo={(id) => this.eliminarPosteo(id)}
              mostrarBorrar={true}
            />
          )}
        />

        <Pressable style={styles.logout} onPress={() => this.logout()}>
          <Text style={styles.textoLogout}>Cerrar sesión</Text>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, alignSelf: 'stretch', padding: 16, paddingTop: 24 },
  title: { fontSize: 20, fontWeight: '700', textAlign: 'left', marginBottom: 8 },
  row: { marginBottom: 6 },
  logout: {
    backgroundColor: '#6c757d',
    padding: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#6c757d',
    marginTop: 12,
    alignSelf: 'center'
  },
  textoLogout: {
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center'
  }
});

export default Profile;