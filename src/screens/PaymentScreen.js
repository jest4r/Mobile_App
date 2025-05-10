import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from '@react-native-vector-icons/fontawesome'; // Or any other icon set you prefer

export default function PaymentScreen({ route, navigation }) {
  // Assuming 'totalAmount' is passed from CartScreen or CheckoutScreen
  const { totalAmount } = route.params || { totalAmount: 0 }; // Default to 0 if not passed

  // Get current date and time for display
  const currentDate = new Date();
  const dateString = `${currentDate.getDate()} ${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getFullYear()}`;
  const timeString = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  const transactionId = `20180531${Math.floor(Math.random() * 100000000)}`; // Example transaction ID

  const handleDone = () => {
    // Navigate to Home screen or clear cart and navigate back
    // For example, navigate to a 'Home' screen in your main stack
    navigation.popToTop(); // Go to the first screen in the stack
    navigation.navigate('Home'); // Or your specific home screen name
  };

  const handleDetails = () => {
    // Navigate to a transaction details screen or show a modal
    alert('Details button pressed!');
  };

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
      <View style={styles.successContainer}>
        <View style={styles.iconCircle}>
          <Icon name="check" size={50} color="white" />
        </View>
        <Text style={styles.successText}>Payment Successful!</Text>
        <Text style={styles.transactionIdText}>Transaction ID: {transactionId}</Text>
      </View>

      <View style={styles.detailsCard}>
        <View style={styles.dateTimeContainer}>
          <View style={styles.dateTimeItem}>
            <Text style={styles.dateTimeLabel}>DATE</Text>
            <Text style={styles.dateTimeValue}>{dateString}</Text>
          </View>
          <View style={styles.dateTimeSeparator} />
          <View style={styles.dateTimeItem}>
            <Text style={styles.dateTimeLabel}>TIME</Text>
            <Text style={styles.dateTimeValue}>{timeString}</Text>
          </View>
        </View>

        <View style={styles.subTotalContainer}>
          <View>
            <Text style={styles.subTotalLabel}>Sub Total</Text>
            <Text style={styles.subTotalAmount}>
              {parseFloat(totalAmount).toFixed(2)}
              <Text style={styles.currencySymbol}>$</Text>
            </Text>
          </View>
          <TouchableOpacity style={styles.detailsButton} onPress={handleDetails}>
            <Text style={styles.detailsButtonText}>details</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bankCardContainer}>
          <Icon name="credit-card" size={24} color="#555" style={styles.cardIcon} />
          <View>
            <Text style={styles.bankCardText}>Bank Card</Text>
            <Text style={styles.bankCardNumber}>**** **** **** 1766 HSBC</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
        <Text style={styles.doneButtonText}>Done</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: '#f4f6f8',
    },
    container: {
        flexGrow: 1,
        alignItems: 'center',
        paddingBottom: 30,
    },
    backButton: {
        padding: 5,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
    },
    successContainer: {
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 20,
    },
    iconCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#008B8B', // Darker cyan (Dark Cyan)
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    successText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#008B8B', // Dark cyan
        marginBottom: 5,
    },
    transactionIdText: {
        fontSize: 14,
        color: '#6c757d',
    },
    detailsCard: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 20,
        width: '90%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        marginBottom: 30,
    },
    dateTimeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 15,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    dateTimeItem: {
        alignItems: 'center',
    },
    dateTimeLabel: {
        fontSize: 12,
        color: '#6c757d',
        marginBottom: 4,
    },
    dateTimeValue: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    dateTimeSeparator: {
        // Optional: if you want a visual separator line
        // width: 1,
        // backgroundColor: '#eee',
    },
    subTotalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingVertical: 10,
    },
    subTotalLabel: {
        fontSize: 14,
        color: '#6c757d',
    },
    subTotalAmount: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#008B8B', // Dark cyan
    },
    currencySymbol: {
        fontSize: 20, // Slightly smaller currency symbol
        fontWeight: 'normal',
    },
    detailsButton: {
        borderColor: '#00CED1', // A slightly lighter cyan for contrast
        borderWidth: 1,
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 15,
    },
    detailsButtonText: {
        color: '#00CED1', // A slightly lighter cyan for contrast
        fontSize: 14,
        fontWeight: '500',
    },
    bankCardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        padding: 15,
        borderRadius: 10,
    },
    cardIcon: {
        marginRight: 15,
    },
    bankCardText: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
    bankCardNumber: {
        fontSize: 12,
        color: '#6c757d',
    },
    doneButton: {
        backgroundColor: '#008B8B', // Dark cyan
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 25,
        width: '90%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    doneButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});