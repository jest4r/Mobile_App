import { View, Text, StyleSheet, ScrollView, Button} from 'react-native';
import React, { useState } from 'react';
import Icon from '@react-native-vector-icons/fontawesome';

export default function TrialScreen({ navigation, route}) {
    const {bookDetail} = route.params;
    const [currentPage, setCurrentPage] = useState(0);

    const bookPages = bookDetail.content;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>{bookDetail.title}</Text>
            </View>
            <ScrollView style={styles.content}>
                <Text style={styles.reading}>{bookPages[currentPage]}</Text>
                <View style={styles.pageControls}>
                    <View style={{marginRight: 10}}>
                        <Button 
                            color={currentPage === 0 ? '#CCCCCC' : '#007BFF'}
                            disabled={currentPage === 0}
                            onPress={() => currentPage > 0 && setCurrentPage(currentPage - 1)}
                            title="Previous Page"
                        />
                    </View>
                    <Text style={styles.pageNumber}>Page {currentPage + 1} of {bookPages.length}</Text>
                    <View style={{marginLeft: 10}}>
                        <Button 
                            color={currentPage === bookPages.length - 1 ? '#CCCCCC' : '#007BFF'}
                            disabled={currentPage === bookPages.length - 1}
                            onPress={() => currentPage < bookPages.length - 1 && setCurrentPage(currentPage + 1)}
                            title="Next Page"
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    content: {
        padding: 20,
    },
    reading: {
        fontSize: 16,
        lineHeight: 24,
    },
    pageControls: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        paddingVertical: 10,
        marginBottom: 20,
    },
    pageButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        color: '#fff',
        fontSize: 16,
    },
    disabledButton: {
        color: '#CCCCCC',
    },
    pageNumber: {
        fontSize: 14,
        color: '#666',
    }
});
