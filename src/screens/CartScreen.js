import {useSelector, useDispatch} from 'react-redux';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Icon from '@react-native-vector-icons/fontawesome';

const Item = ({ item, onSelect, isSelected }) => {
  return (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => onSelect(item.id)}>
        <Icon
          name={isSelected ? 'check-circle' : 'circle-thin'}
          size={24}
          color={isSelected ? 'cyan' : 'grey'}
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


export default function CartScreen({ navigation}) {
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
            color={selectAll ? 'cyan' : 'grey'}
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
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutText}>Checkout</Text>
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
    color: 'cyan',
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
    backgroundColor: 'cyan',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  checkoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});