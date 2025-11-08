import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Component } from 'react';

class Post extends Component {
  constructor(props){
    super(props)
    this.state={}
  }
  componentDidMount(){
    console.log(this.props)
  }
  render (){
    return (
    <View style={styles.card}>
      <Text style={styles.author}>
        {this.props.data.data.email}
      </Text>
      <Text style={styles.message}>{this.props.data.data.message}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1, borderColor: '#ddd', borderRadius: 8,
    padding: 12, marginBottom: 10,
  },
  author: { fontWeight: '700', marginBottom: 6 },
  message: { fontSize: 16, lineHeight: 22 },
});

export default Post;