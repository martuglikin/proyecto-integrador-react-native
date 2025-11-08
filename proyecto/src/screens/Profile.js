import React, { Component } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Profile</Text>
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

export default Profile;