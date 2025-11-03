import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Post({ data }) {
  return (
    <View style={styles.card}>
      <Text style={styles.author}>
        {data.username ? data.username : (data.email || 'Autor desconocido')}
      </Text>
      <Text style={styles.message}>{data.message}</Text>
    </View>
  );
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