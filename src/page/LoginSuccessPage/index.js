import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingPage from '../LoadingPage';
import { API_LOGIN_AUTHENTICATION } from '../../configs/apis';
import { DivAuth, DivContent, PaymentHeader, DivFooter } from './styles';
import { Helmet } from 'react-helmet-async';
import HeaderPaymentComponent from '../../components/HeaderPaymentComponent';
import Footer from '../../components/Footer';

function LoginSuccessPage() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const { userId } = useParams();

  useEffect(() => {
    setIsLogin(false);
    const loginAuthentication = async () => {
      const response = await fetch(API_LOGIN_AUTHENTICATION, {
        method: 'POST',
        body: JSON.stringify({
          userId: userId,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const responseJson = await response.json();
      console.log(responseJson);
      if (responseJson.isBanned) {
        setIsLogin(true);
      } else {
        await localStorage.setItem('tokenUser', responseJson.token);
        if (localStorage.getItem('tokenUser')) {
          setTimeout(() => {
            navigate('/two-factor-authentication');
          }, 1000);
        }
      }
    };
    loginAuthentication();
  }, [isLogin, userId]);

  return (
    <>
      {!isLogin ? (
        <LoadingPage />
      ) : (
        <DivAuth>
          <Helmet>
            <title>Login failed</title>
            <link rel="canonical" href={process.env.REACT_APP_PUBLIC_HOST} />
          </Helmet>
          <PaymentHeader>
            <HeaderPaymentComponent />
          </PaymentHeader>
          <DivContent>
            <p>
              Your account has been locked. Please contact customer service for
              support!!
            </p>
          </DivContent>
          <DivFooter>
            <Footer />
          </DivFooter>
        </DivAuth>
      )}
    </>
  );
}

export default LoginSuccessPage;
