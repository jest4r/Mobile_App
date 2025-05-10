import {View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from '@react-native-vector-icons/fontawesome';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
export default function ReviewScreen(navigation) {
    const [rating, setRating] = React.useState(5);
    
    const handleRating = (selectedRating) => {
        setRating(selectedRating);
    };
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Write a review</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Details')}>
                    <Text style={styles.publish}>Publish</Text>
                </TouchableOpacity>
            </View>
        <View style={styles.star}>
            {[1, 2, 3, 4, 5].map((item) => (
                <Icon 
                    key={item}
                    name='star' 
                    size={25} 
                    color={item <= rating ? 'yellow' : 'gray'} 
                    style={styles.starIcon}
                    onPress={() => handleRating(item)}
                />
            ))}
        </View>

        <View style={styles.textInputContainer}>
            <TextInput style={styles.textInput} placeholder='Write your review here...'></TextInput>
        </View>
    </View>
    );
}   
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    publish: {
        fontSize: 18,
        color: 'cyan',
    },
    starIcon: {
        marginRight: 5,
    },
    star:{
        flexDirection:'row',
        justifyContent:'center',
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
    textInputContainer:{
        borderWidth: 1,
        borderColor:'cyan',
        borderRadius: 5,
        padding: 10,
    },
    textInput:{
        height: 300,
        textAlignVertical: 'top',
    },
});
