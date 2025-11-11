import React, { Component } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-web';
import { db } from '../firebase/config';

import Post from "../components/Post";

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            loading: true
        }
    }

    componentDidMount() {
        //onSnapshot actualiza los cambios sin recargar, si se borra o agrega un post
        db.collection('posts').orderBy("createdAt", "desc").onSnapshot(docs => { //permite obtener los documentos de una consulta en orden descendente (mas nuevo al mas viejo)
            let posts = []
            docs.forEach(doc => {
                //guardo cada post en un array con su data
                posts.push({ id: doc.id, data: doc.data() })
            })
            //actualizo el estado, se vuelve a renderizar automaticamente
            this.setState({ posts: posts, loading: false })
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Home</Text>
                <FlatList data={this.state.posts} keyExtractor={item => item.id} renderItem={({ item }) => (<Post mostrarLikeComments={true} data={item} navigation={this.props.navigation} />)} /> {/*recorre el array de posts y para cada elemento renderiza un componente*/}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, alignSelf: 'stretch', padding: 16, justifyContent: 'center' },
    title: { fontSize: 22, fontWeight: '700', textAlign: 'center', marginBottom: 16 },
    btn: { padding: 12, backgroundColor: '#e5af2fff', borderRadius: 8, alignSelf: 'center' },
    btnText: { textAlign: 'center' },
});

export default Home;
