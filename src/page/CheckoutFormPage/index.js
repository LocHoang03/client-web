import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './Form';
import {
  DivContainer,
  DivCheckout,
  DivHeader,
  DivFooter,
  DivInfo,
  DivContent,
  Title,
  DivProductInfo,
  ListInfo,
  ItemInfo,
} from './styles';
import { Spin } from 'antd';
import HeaderPaymentComponent from '../../components/HeaderPaymentComponent';
import Footer from '../../components/Footer';
import { API_POST_PAYMENT } from '../../configs/apis';
import { Helmet } from 'react-helmet-async';

const stripePromise = loadStripe(process.env.REACT_APP_API_PUBLIC_KEY_STRIPE, {
  locale: 'en',
});

const CheckoutFormPage = (() => {
  const Component = (props) => {
    const [clientSecret, setClientSecret] = useState();
    const [data, setData] = useState();

    const appearance = {
      theme: 'flat',
    };
    const options = {
      clientSecret,
      appearance,
    };

    useEffect(() => {
      const postPayment = async () => {
        const response = await fetch(API_POST_PAYMENT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(JSON.parse(localStorage.getItem('dataPayment'))),
        });

        const responseJson = await response.json();
        if (responseJson && responseJson.success) {
          setClientSecret(responseJson.clientSecret);
        }
      };
      postPayment();
    }, []);

    useEffect(() => {
      const fetchData = async () => {
        const data = await JSON.parse(localStorage.getItem('dataPayment'));
        setData(data);
      };
      fetchData();
    }, []);

    if (!clientSecret || !data) {
      return (
        <div className="loading-component">
          <div>
            <Spin tip="Loading" size="large">
              <div className="content" />
            </Spin>
          </div>
        </div>
      );
    }

    return (
      <DivCheckout>
        <Helmet>
          <title>Checkout</title>
          <link rel="canonical" href="https://www.tacobell.com/" />
        </Helmet>
        {!props.login && (
          <DivHeader>
            <div>
              <HeaderPaymentComponent />
            </div>
          </DivHeader>
        )}
        <DivContainer>
          <DivInfo>
            <DivContent>
              <div>
                <Title>Order product information</Title>
              </div>
              <DivProductInfo>
                <ListInfo>
                  <ItemInfo>Type Package: {data.typePack}</ItemInfo>
                  <ItemInfo>Resolution: {data.resolution}</ItemInfo>
                  <ItemInfo>Quality Picture: {data.qualityPicture}</ItemInfo>
                  <ItemInfo>Monthly Price: {data.monthlyPrice} USD</ItemInfo>
                  <ItemInfo>Device Support: {data.deviceSupport}</ItemInfo>
                </ListInfo>
              </DivProductInfo>
            </DivContent>
          </DivInfo>
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm clientSecret={clientSecret} />
          </Elements>
        </DivContainer>
        {!props.login && (
          <DivFooter>
            <Footer />
          </DivFooter>
        )}
      </DivCheckout>
    );
  };

  return Component;
})();

export default CheckoutFormPage;
