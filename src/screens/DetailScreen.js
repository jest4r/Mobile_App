import {Text, View, TouchableOpacity, Image, StyleSheet, TextInput, FlatList, ScrollView} from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import React from 'react';
import Icon from '@react-native-vector-icons/fontawesome';
import { addProduct } from '../store/productSlice';

const Item = ({item}) => {
    return (
        <View style={styles.item}>
            <Image source={{uri: item.image}} style={styles.avatar}/>
            <View style={styles.detail}>
                <Text style={styles.author}>{item.author}</Text>
                <Text style={styles.comment}>{item.comment}</Text>
            </View>
        </View>
    )
}

const DATA = [
    {
        id: '1',
        comment: 'This book completely transformed how I approach my daily habits. The scientific insights are fascinating!',
        author: 'Sarah Johnson',
        image: 'https://randomuser.me/api/portraits/women/18.jpg'
    },
    {
        id: '2',
        comment: 'I appreciated the practical examples that show how to break bad habits. Very actionable advice.',
        author: 'Michael Chen',
        image: 'https://randomuser.me/api/portraits/men/22.jpg'
    },
    {
        id: '3',
        comment: 'The case studies about companies using habit formation for marketing were eye-opening.',
        author: 'Emma Williams',
        image: 'https://randomuser.me/api/portraits/women/33.jpg'
    },
    {
        id: '4',
        comment: 'Started applying the habit loop concept to my morning routine with great results!',
        author: 'David Rodriguez',
        image: 'https://randomuser.me/api/portraits/men/45.jpg'
    },
    
]

export default function DetailScreen({navigation, route}) {
    const {bookDetail} = route.params;
    const dispatch = useDispatch();
    
    const onAddBook = () => {
        dispatch(addProduct(bookDetail));
        navigation.navigate('Cart');
    }
    return (
    <View>
        <ScrollView style={styles.container}>
            <View style={styles.bookcontainer}>
                <Image
                    style={styles.book}
                    source={{uri: bookDetail?.image}}
                />
                <View style={styles.detail} >
                    <Text style={styles.title}> 
                        {bookDetail?.title}
                    </Text>
                    <Text style={styles.subtitle}>
                        {bookDetail?.author}                   
                    </Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button}>
                            <Text>Self Development</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Text>Psychological</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.rating}>
                        <Icon name="star" size={15} color="gold" />
                        <Icon name="star" size={15} color="gold" />
                        <Icon name="star" size={15} color="gold" />
                        <Icon name="star" size={15} color="gold" />
                        <Icon name="star" size={15} color="gold" />
                        <Text style={styles.number}>
                            5
                        </Text>
                        <Text>
                            (268)
                        </Text>
                    </View>
                    <View style={styles.fee}>
                        <Icon style={styles.dollar} name={'dollar'} size={14} color='cyan' />
                        <Text style={{color: 'cyan', fontWeight: 'bold', fontSize: 18}}> {bookDetail?.price} </Text>
                    </View>
                </View>
            </View>
            <Text style={styles.intro}>
                Introduction
            </Text>
            <Text style={styles.specific}>
                {bookDetail?.description}
                <Text style={styles.readmore}> Read more </Text>
                <Icon style={styles.chevron} name={'chevron-down'} size={12}/>
            </Text>
            <View style={styles.catalog}>
                <Text style={styles.catalogText}>
                    Catalog: Next Chapter
                </Text>
                <Icon style ={{marginRight: 10}} name={'list'} size={20} color='cyan'/>
            </View>            
            <View style={{
                borderBottomWidth: 1,
                borderBottomColor: '#DDDDDD',
                width: '95%',
                marginVertical: 15
            }}/>
            <View style={styles.shelf}>
                <Text style={styles.catalogText}>
                    Add to bookshelf
                </Text>
                <Icon style ={{marginRight: 10}} name={'plus-square-o'} size={20} color='cyan'/>
            </View>
            <View style={{
                borderBottomWidth: 1,
                borderBottomColor: '#DDDDDD',
                width: '95%',
                marginVertical: 15
            }}/>
            <View style={styles.comments}>
                <Text style={styles.commentText}>Comments </Text>
                <Text style={styles.writeComment}> write a comment </Text>
            </View>
                <FlatList
                    data={DATA}
                    renderItem={({item}) => <Item item={item} />}
                    keyExtractor={item => item.id}
                    numColumns={1}
                />
        </ScrollView>
        <View style={styles.buyContainer}>
            <TouchableOpacity style={styles.trial}> 
                <Text> Free Trials </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buy} onPress={onAddBook}>
                <Text> Buy Now </Text>
            </TouchableOpacity>
        </View>
    </View>
    );
}

const styles = StyleSheet.create({
    buyContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderTopWidth: 1,
        borderTopColor: '#DDDDDD',
        height: 65
    },
    trial: {
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'cyan',
        alignItems: 'center',
        width: '150'
    },
    buy: {
        backgroundColor: 'cyan',
        padding: 10,
        alignItems: 'center',
        borderRadius: 10,
        width: '150'
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'between',
        alignItems: 'flex-start',
        marginTop: 20,
        width: '95%'
    },
    avatar: {
        borderRadius: 50,
        width: 50,
        height: 50,
        marginRight: 20
    },
    comment: {
        fontSize: 15,
        fontWeight: '200',
        lineHeight: 20,
    },
    author: {
        fontSize: 20,
        fontWeight: '150'
    },
    comments: {
        flexDirection: 'row',
        gap: 100,
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginTop: 15
    },
    commentText: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    writeComment: {
        fontSize: 15,
        fontWeight: '400',
        color: 'cyan'
    },
    catalog: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    shelf: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        gap: 200,
        alignItems: 'center'
    },
    catalogText: {
        fontSize: 20,
        fontWeight: 'bold',
        alignItems: 'center'
    },
    container: {
      marginLeft: 20,
      marginBottom: 65

    },
    bookcontainer: {
      flexDirection: 'row',
      justifyContent: 'between',
      alignItems: 'flex-start',
      marginTop: 20
    },
    book: {
      width: 100,
      height: 150,
      marginRight: 20
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    subtitle: {
        fontSize: 15,
        fontWeight: '200'
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        borderRadius: 5
      },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 15
    },
    rating: {
        flexDirection: 'row', 
        marginTop: 5,
        justifyContent: 'space-between',
        gap: 5,
        alignItems: 'center'
    },
    number: {
        color: 'gold',
        fontSize: 15
    },
    detail: {
        justifyContent: "space-between",
        alignItems: 'flex-start',
        gap: 7
    },
    fee: {
        color: 'blue',
        flexDirection: 'row',
        alignItems: 'center'
    },
    intro: {
        fontWeight: 'bold', 
        marginBottom: 10,
        fontSize: 30, 
        marginTop: 10
    },
    specific: {
        fontSize: 15,
        fontWeight: '200',
        lineHeight: 25,
        paddingRight: 10
    },
    readmore: {
        fontSize: 15,
        fontWeight: '500'
    },
    chevron: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        marginLeft: 5,
    }
  });