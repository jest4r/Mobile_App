import {Text, View, ScrollView, TouchableOpacity, Image, StyleSheet, TextInput, FlatList} from 'react-native';
import React, { useEffect } from 'react';
import Icon from '@react-native-vector-icons/fontawesome';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const Item = ({item}) => {
    const navigation = useNavigation();
    return (
        <View style={styles.item}>
            <TouchableOpacity onPress={() => navigation.navigate('Details', {bookDetail: item})}>
                <Image source={{uri: item.image}} style={styles.bookImage}/>
            </TouchableOpacity>
            <Text style={styles.bookTitle}>{item.title}</Text>
            <Text style={styles.author}>{item.author}</Text>
            <Text style={styles.author}>{item.price}</Text>
        </View>
    )
}
export default function HomeScreen() {
    const [Bookstore, setBookstore] = React.useState([]);
    const fetchBookstore = async () => {
        try {
            const response = await axios.get('https://mobile-fake-api.vercel.app/bookstore');
            setBookstore(response.data);
        } catch (error) {
            console.error(error);
        }
    }
    React.useEffect(() => {
        fetchBookstore();
    }, []);

    const [Bookshelf, setBookshelf] = React.useState([]);
    const fetchBookshelf = async () => {
        try {
            const response = await axios.get('https://mobile-fake-api.vercel.app/bookshelf');
            setBookshelf(response.data);
        } catch (error) {
            console.error(error);
        }
    }
    React.useEffect(() => {
        fetchBookshelf();
    }, []);

    
    return (
        <ScrollView style={styles.container}>
            <View>
                <Icon style={styles.searchIcon} name='search' size={20} color='grey'/>
                <TextInput placeholder='Search' style={styles.searchInput}/>
                <Icon style={styles.MicIcon} name='microphone' size={20} color='grey'/>
                <View style={styles.header}>
                    <Text style={styles.title}> Bookshelf </Text>
                    <View style={styles.viewAll}> 
                        <Text> View all</Text>
                        <Icon style={styles.chevronIcon} name='chevron-right' size={15} color='lightgrey'/>
                    </View>
                </View>
                <View>
                <FlatList
                    data={Bookshelf}
                    renderItem={({item}) => <Item item={item} />}
                    keyExtractor={item => item.id}
                    horizontal
                    style={styles.reading}
                />
                <View style={styles.header}>
                    <Text style={styles.bookShelf}> Bookstore </Text>
                    <View style={styles.viewAll}> 
                        <Text> View all</Text>
                        <Icon style={styles.chevronIcon} name='chevron-right' size={15} color='lightgrey'/>
                    </View>
                </View>
                <View>
                <FlatList
                    data={Bookstore}
                    renderItem={({item}) => <Item item={item} />}
                    keyExtractor={item => item.id}
                    numColumns={3}
                    style={styles.reading}
                />
            </View>
            </View>
        </View>
    </ScrollView>
    )
}
    
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
    },
    searchInput: {
        height: 40,
        backgroundColor: '#D3D3D3',
        borderRadius: 10,
        paddingLeft: 35,
    },
    searchIcon: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 1,
    },
    MicIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 20,
    },
    bookShelf: {
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 20,
    },
    viewAll: {
        fontSize: 15,
        color: 'grey',
        marginTop: 20,
        marginRight: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    chevronIcon: {
        paddingLeft: 8,
    },
    item: {
        marginRight: 20,
        marginBottom: 20,
    },
    bookImage: {
        width: 100,
        height: 150,
    },
    bookTitle: {
        fontWeight: 'bold',
        marginTop: 10,
        fontSize: 15,
    },
    author: {
        color: 'grey',
        fontSize: 12,
        marginTop: 5,
    },

})
    