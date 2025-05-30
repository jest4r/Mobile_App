import {useSelector, useDispatch} from 'react-redux';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Icon from '@react-native-vector-icons/fontawesome';
import { removeProduct } from '../store/productSlice';

const Item = ({ item, onSelect, isSelected }) => {
  return (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => onSelect(item.id)}>
        <Icon
          name={isSelected ? 'check-circle' : 'circle-thin'}
          size={24}
          color={isSelected ? '#4A90E2' : 'grey'}
          style={styles.checkbox}
        />
      </TouchableOpacity>
      <Image source={{ uri: item.image }} style={styles.book} />
      <View style={styles.detail}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.author}>By {item.author}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>
    </View>
  );
};


export default function CartScreen({ navigation, route}) {
  const dispatch = useDispatch();
  const {bookDetail} = route.params;
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const DATA = useSelector(state => state.product.books);
  const handleSelect = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(DATA.map((item) => item.id));
    }
    setSelectAll(!selectAll);
  };

  const calculateTotal = () => {
    return selectedItems
      .map((id) => DATA.find((item) => item.id === id).price)
      .reduce((sum, price) => sum + price, 0)
      .toFixed(2);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Cart</Text>
      </View>
      <View style={styles.selectAll}>
        <TouchableOpacity onPress={handleSelectAll}>
          <Icon
            name={selectAll ? 'check-circle' : 'circle-thin'}
            size={24}
            color={selectAll ? '#4A90E2' : 'grey'}
          />
        </TouchableOpacity>
        <Text style={styles.selectAllText}>Select All</Text>
      </View>
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <Item
            item={item}
            onSelect={handleSelect}
            isSelected={selectedItems.includes(item.id)}
          />
        )}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.footer}>
        <Text style={styles.subTotal}>Sub Total: ${calculateTotal()}</Text>
        <TouchableOpacity 
          style={styles.checkoutButton} 
          onPress={() => navigation.navigate('Payment', { 
            totalAmount: calculateTotal(),
            bookDetail: DATA.filter(item => selectedItems.includes(item.id))
          })}
        >
          <Text style={styles.checkoutText}>Checkout</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.deleteContainer}>
        <TouchableOpacity 
          style={styles.deleteButton}
          disabled={selectedItems.length === 0}
          onPress={() => {
            if (selectedItems.length > 0) {
              dispatch(removeProduct(selectedItems)); 
              setSelectedItems([]);
              if (selectAll) {
                setSelectAll(false); 
              }
              alert('Selected items removed from cart');
            }
          }}
        >
          <Icon name='trash-o' size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  selectAll: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  selectAllText: {
    fontSize: 18,
    marginLeft: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    marginRight: 10,
  },
  book: {
    width: 80,
    height: 120,
    borderRadius: 5,
    marginRight: 10,
  },
  detail: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  author: {
    fontSize: 14,
    color: 'grey',
    marginVertical: 5,
  },
  price: {
    fontSize: 16,
    color: '#4A90E2',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 10,
  },
  subTotal: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  checkoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  deleteContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
});