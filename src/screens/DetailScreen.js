import {Text, View, TouchableOpacity, Image, StyleSheet, TextInput, FlatList, ScrollView} from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import React, {useState} from 'react';
import Icon from '@react-native-vector-icons/fontawesome';
import { addProduct } from '../store/productSlice';
import axios from 'axios';
const Item = ({item}) => {
    return (
        <View style={styles.item}>
            <Image source={{uri: item.image}} style={styles.avatar}/>
            <View style={styles.detail}>
                <Text style={styles.author}>{item.author}</Text>
                <View style={styles.rating}>
                    {[...Array(5)].map((_, i) => (
                        <Icon 
                            key={i} 
                            name="star" 
                            size={15} 
                            color={i < item.rating ? "gold" : "#DDDDDD"} 
                        />
                    ))}
                    <Text style={styles.number}>
                        {item.rating}
                    </Text>
                </View>
                <Text style={styles.comment}>{item.comment}</Text>
            </View>
        </View>
    )
}

  

export default function DetailScreen({navigation, route}) {
    const {bookDetail} = route.params;
    const dispatch = useDispatch();
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpansion = () => {
        setIsExpanded(!isExpanded); // Toggle the state
    };

    const onAddBook = () => {
        dispatch(addProduct(bookDetail));
        navigation.navigate('Cart');
    }
    
    const onTrial = () => {
        navigation.navigate('Trial', {bookDetail});
    }
    const onRead = () => {
        navigation.navigate('Reading', {bookDetail});
    }

    const onReview = () => {
        navigation.navigate('Review', {bookDetail});
    }

    const toggleBook = () => {
        const [showBookDetails, setShowBookDetails] = useState(false);

        // Toggle book details visibility
        setShowBookDetails(!showBookDetails);

    }

    const toggleAuthor = () => {
        const [showAuthor, setShowAuthor] = useState(false);

        setShowAuthor(!showAuthor);
    }
    const [data, setData] = useState([]);
    const fetchData = async () => {
        try {
            const response = await axios.get('https://mobile-fake-api.vercel.app/reviews');
            setData(response.data);
        } catch (error) {
            console.error(error);
        }
    }
    React.useEffect(() => {
        fetchData();
    }, []);
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
                        {bookDetail?.categories && bookDetail.categories.map((category, index) => (
                            <TouchableOpacity key={index} style={styles.button}>
                                <Text>{category}</Text>
                            </TouchableOpacity>
                        ))}
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
            <Text style={styles.specific} numberOfLines={isExpanded ? undefined : 3}> 
                {bookDetail?.description}
            </Text>
            {/* Toggle Text and Icon */}
            <TouchableOpacity onPress={toggleExpansion} style={styles.readMoreContainer}>
                <Text style={styles.readmore}>
                    {isExpanded ? 'Read less' : 'Read more'} 
                </Text>
                <Icon style={styles.chevron} name={isExpanded ? 'chevron-up' : 'chevron-down'} size={12}/>
            </TouchableOpacity>

            <View style={styles.catalog}>
                <Text style={styles.catalogText}>
                    Book details and Edition
                </Text>
                <Icon onPress={toggleBook} style ={{marginRight: 10}} name={'list'} size={20} color='cyan'/>
            </View>            
            <View style={{
                borderBottomWidth: 1,
                borderBottomColor: '#DDDDDD',
                width: '95%',
                marginVertical: 15
            }}/>
            <View style={styles.shelf}>
                <Text style={styles.catalogText}>
                    About the author
                </Text>
                <Icon onPress={toggleAuthor} style ={{marginRight: 10}} name={'plus-square-o'} size={20} color='cyan'/>
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
                    data={data}
                    renderItem={({item}) => <Item item={item} />}
                    keyExtractor={item => item.id}
                    numColumns={1}
                />
        </ScrollView>
        <View style={styles.buyContainer}>
        {bookDetail?.status === 1 ? (
            <>
                <TouchableOpacity style={styles.trial} onPress={onReview}> 
                    <Text> Write Review </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buy} onPress={onRead}>
                    <Text> Read</Text>
                </TouchableOpacity>
            </>
        ) : (
            <>
                <TouchableOpacity style={styles.trial} onPress={onTrial}>
                    <Text> Free Trials</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buy} onPress={onAddBook}>
                    <Text> Buy Now  </Text>
                </TouchableOpacity>
            </>
        )}
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
    readMoreContainer: { // New style for the toggle area
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5, // Add some space
        alignSelf: 'flex-start', // Align to the left
    },
    readmore: {
        fontSize: 15,
        fontWeight: '500',
        color: 'cyan', // Make it look like a link
        marginRight: 5, // Space before icon
    },
    chevron: {
        // Removed absolute positioning
        color: 'cyan', // Match link color
    }
  });