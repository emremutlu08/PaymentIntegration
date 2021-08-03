import * as React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import { PaymentsStripe as Stripe } from 'expo-payments-stripe';


export default function App() {


  const [product, setProduct] = React.useState({
    amount: 100, // 100 cents = 1$
    productName: "Coffee",
    customerName: "John",
    customerEmail: "john@john.com"
  })


  React.useEffect(()=>{
    Stripe.setOptionsAsync({
      publishableKey: 'pk_test_ASBlQbAY5o1USQOM7903bvXc00Ps9z7CdV'
    });
  })

  async function pay() {
    const token = await Stripe.paymentRequestWithCardFormAsync();
    console.log(token)

    const apiURL = "http://localhost:8282/pay";

    const body = {
      token, 
      product
    }

    const headers = {
      "Content-Type": "application/json"
    }

    return fetch(apiURL, {
      method: "post",
      headers,
      body: JSON.stringify(body)
    })
    .then(result=>{
      console.log(result)
    })
    .catch(error=>alert(error))

  }

  return (
    <View style={styles.container}>
      
      <Image
        source={{
          uri: "https://images.pexels.com/photos/1414304/pexels-photo-1414304.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
          width: 256,
          height: 256
        }}
        style={{
          borderRadius: 18
        }}
      />

      <TouchableOpacity
      onPress={pay}>

        <View style={styles.button}>
          <Text style={{color: "white"}}>Buy $1 coffee for me</Text>
        </View>

      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  button: {
    backgroundColor: "orange",
    padding: 20,
    marginTop: 20,
    borderRadius: 8
  }
});
