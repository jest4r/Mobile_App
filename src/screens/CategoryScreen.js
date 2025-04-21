import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';

const CategoryScreen = ({ navigation }) => {
    // Sample data with real image URLs from Unsplash
    const categories = [
        { 
            id: '1', 
            name: 'Fiction', 
            quantity: 145, 
            imageUrl: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=300&auto=format' 
        },
        { 
            id: '2', 
            name: 'Non-Fiction', 
            quantity: 89, 
            imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=300&auto=format' 
        },
        { 
            id: '3', 
            name: 'Science', 
            quantity: 67, 
            imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=300&auto=format' 
        },
        { 
            id: '4', 
            name: 'History', 
            quantity: 54, 
            imageUrl: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=300&auto=format' 
        },
        { 
            id: '5', 
            name: 'Biography', 
            quantity: 38, 
            imageUrl: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=300&auto=format' 
        },
        { 
            id: '6', 
            name: 'Fantasy', 
            quantity: 72, 
            imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=300&auto=format' 
        },
        { 
            id: '7', 
            name: 'Mystery', 
            quantity: 61, 
            imageUrl: 'https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?q=80&w=300&auto=format' 
        },
        { 
            id: '8', 
            name: 'Romance', 
            quantity: 83, 
            imageUrl: 'https://images.unsplash.com/photo-1474552226712-ac0f0961a954?q=80&w=300&auto=format' 
        },
        { 
            id: '9', 
            name: 'Thriller', 
            quantity: 49, 
            imageUrl: 'https://images.unsplash.com/photo-1507676385008-e7fb562d11f8?q=80&w=300&auto=format' 
        },
        { 
            id: '10', 
            name: 'Self-Help', 
            quantity: 42, 
            imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=300&auto=format' 
        },
        { 
            id: '11', 
            name: 'Comics', 
            quantity: 36, 
            imageUrl: 'https://images.unsplash.com/photo-1608889476561-6242cfdbf622?q=80&w=300&auto=format' 
        },
        { 
            id: '12', 
            name: 'Poetry', 
            quantity: 28, 
            imageUrl: 'https://images.unsplash.com/photo-1474631245212-32dc3c8310c6?q=80&w=300&auto=format' 
        },
    ];

    const renderCategoryItem = ({ item }) => (
        <TouchableOpacity 
            style={styles.categoryItem}
            onPress={() => navigation.navigate('BookList', { category: item })}
        >
            <View style={styles.imageContainer}>
                <Image 
                    source={{ uri: item.imageUrl }} 
                    style={styles.categoryImage} 
                    resizeMode="cover"
                />
            </View>
            <Text style={styles.categoryName}>{item.name}</Text>
            <Text style={styles.categoryQuantity}>{item.quantity} books</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Book Categories</Text>
            <FlatList
                data={categories}
                renderItem={renderCategoryItem}
                keyExtractor={item => item.id}
                numColumns={3}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
            />
            <Text style={styles.attribution}>
                Images courtesy of Unsplash
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F9F9',
        padding: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#344955',
    },
    listContainer: {
        paddingBottom: 20,
    },
    categoryItem: {
        flex: 1,
        margin: 8,
        height: 180,
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    imageContainer: {
        width: '100%',
        height: 100,
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 10,
    },
    categoryImage: {
        width: '100%',
        height: '100%',
    },
    categoryName: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 4,
        color: '#344955',
    },
    categoryQuantity: {
        fontSize: 13,
        color: '#888',
        textAlign: 'center',
    },
    attribution: {
        fontSize: 12,
        color: '#888',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 5,
    }
});

export default CategoryScreen;