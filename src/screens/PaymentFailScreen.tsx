import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type PaymentFailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PaymentFail'>;

type PaymentFailScreenProps = {
  navigation: PaymentFailScreenNavigationProp;
};

const PaymentFailScreen: React.FC<PaymentFailScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>Payment Failed.</Text>
      <Button title="Retry Payment" onPress={() => navigation.navigate('VNPay')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default PaymentFailScreen;
