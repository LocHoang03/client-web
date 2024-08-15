import Footer from '../../components/Footer';
import {
  PaymentContainer,
  PaymentHeader,
  OptionPack,
  TitleOption,
  DivIconOption,
  DivText,
  DivFooter,
  DivActionCheckout,
  ButtonCheckout,
} from './styles';
import { LockOutlined, RightOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { useState } from 'react';
import HeaderPaymentComponent from '../../components/HeaderPaymentComponent';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

function OptionCheckoutPage(props) {
  const [data, setData] = useState();

  useEffect(() => {
    const dataPayment = JSON.parse(localStorage.getItem('dataPayment'));
    setData(dataPayment);
  }, []);
  const navigate = useNavigate();
  const handleClickCheckout = async () => {
    navigate('/checkout');
  };

  return (
    <PaymentContainer>
      <Helmet>
        <title>Option Checkout</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      {!props.login && (
        <PaymentHeader>
          <HeaderPaymentComponent />
        </PaymentHeader>
      )}
      <OptionPack>
        <DivIconOption>
          <LockOutlined />
        </DivIconOption>
        <TitleOption>Choose payment method</TitleOption>
        <DivText>
          <div>
            Your payment process is encrypted and you can change your payment
            method at any time.
          </div>
          <div>
            <div>Safe for peace of mind.</div>
            <div>Cancel online easily.</div>
          </div>
        </DivText>
        <DivActionCheckout>
          <ButtonCheckout onClick={handleClickCheckout}>
            <span>
              Credit
              <img
                src="https://res.cloudinary.com/dzxupp48t/image/upload/v1709902109/image-webFilm/di2u3ywiwhwubo7xjqt4.png"
                alt="credit"
              />
            </span>
            <span>
              <RightOutlined />
            </span>
          </ButtonCheckout>
        </DivActionCheckout>
      </OptionPack>
      {!props.login && (
        <DivFooter>
          <Footer />
        </DivFooter>
      )}
    </PaymentContainer>
  );
}

export default OptionCheckoutPage;
