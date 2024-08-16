import { ArrowRightOutlined, CheckCircleFilled } from '@ant-design/icons';
import {
  PaySuccessContainer,
  PaySuccessContent,
  Title,
  DivIcon,
  DivInformation,
  DivDetail,
  ListInfoDetail,
  ItemDetail,
  DivThanks,
  TitleThanks,
  DivRedirect,
  ButtonRedirect,
} from './styles.js';
import { useEffect, useState, useContext } from 'react';
import { Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { CheckLoginContext } from '../../contexts/LoginContext/index.js';
import dayjs from 'dayjs';
import { API_GET_PACKAGE_PAYMENT } from '../../configs/apis.js';
import { Helmet } from 'react-helmet-async';

function PaySuccessPage(props) {
  const [dataPaymentSuccess, setDataPaymentSuccess] = useState();
  const [count, setCount] = useState(10);

  const { userInfo, setIsLogin } = useContext(CheckLoginContext);

  const navigate = useNavigate();

  useEffect(() => {
    const addPayment = async () => {
      const data = {
        userId: userInfo.userId,
      };
      const response = await fetch(API_GET_PACKAGE_PAYMENT, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('tokenUser'),
        },
      });
      const responseJson = await response.json();
      if (responseJson.success === true) {
        setDataPaymentSuccess(responseJson.data);
      }
    };
    addPayment();
  }, [userInfo]);

  useEffect(() => {
    let timer;
    if (count - 1 >= 0) {
      timer = setTimeout(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);
    } else {
      setIsLogin(2);
      localStorage.removeItem('login');
      navigate('/');
    }
    return () => clearTimeout(timer);
  }, [count]);

  const handleClickHomePage = () => {
    setIsLogin(2);
    localStorage.removeItem('login');
    navigate('/');
  };

  if (!dataPaymentSuccess) {
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
    <>
      <Helmet>
        <title>Pay Success</title>
        <link rel="canonical" href={process.env.REACT_APP_PUBLIC_HOST} />
      </Helmet>
      <PaySuccessContainer>
        <PaySuccessContent>
          <DivIcon>
            <CheckCircleFilled />
          </DivIcon>
          <DivInformation>
            <Title>Payment successful</Title>
            <DivDetail>
              <ListInfoDetail>
                <ItemDetail>
                  <p>Transaction id:</p>
                  <p>{dataPaymentSuccess._id}</p>
                </ItemDetail>
                <ItemDetail>
                  <p>Name package:</p>{' '}
                  <p>{dataPaymentSuccess.packageId.typePack}</p>
                </ItemDetail>

                <ItemDetail>
                  <p>Time order:</p>
                  <p>
                    {dayjs(dataPaymentSuccess.createAt).format('DD-MM-YYYY')}
                  </p>
                </ItemDetail>
                <ItemDetail>
                  <p>Expired time:</p>
                  <p>
                    {dayjs(dataPaymentSuccess.expirationDate).format(
                      'DD-MM-YYYY',
                    )}
                  </p>
                </ItemDetail>
                <ItemDetail>
                  <p>Price:</p>
                  <p>{dataPaymentSuccess.packageId.monthlyPrice} USD/month</p>
                </ItemDetail>
              </ListInfoDetail>
            </DivDetail>
          </DivInformation>
          <DivThanks>
            <TitleThanks>
              Thank you for subscribing to our movie package! Wishing you a
              wonderful entertainment experience.
            </TitleThanks>
          </DivThanks>
          <DivRedirect>
            <ButtonRedirect onClick={handleClickHomePage}>
              Go to home page <ArrowRightOutlined />
            </ButtonRedirect>
            <span>You will be redirected later {count}</span>
          </DivRedirect>
        </PaySuccessContent>
      </PaySuccessContainer>
    </>
  );
}

export default PaySuccessPage;
