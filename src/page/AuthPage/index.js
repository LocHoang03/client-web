import {
  AuthContainer,
  AuthContent,
  Title,
  Text,
  DivInformation,
  DivDetail,
  ButtonVerify,
  DivHeader,
  DivResend,
} from './styles.js';
import { Form, Input, message } from 'antd';
import HeaderPaymentComponent from '../../components/HeaderPaymentComponent/index.js';
import { API_RESEND_CODE, API_VERIFY_LOGIN } from '../../configs/apis.js';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { CheckLoginContext } from '../../contexts/LoginContext/index.js';
import { Helmet } from 'react-helmet-async';

function AuthPage() {
  const [count, setCount] = useState(0);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const { userInfo } = useContext(CheckLoginContext);

  useEffect(() => {
    let timer;
    if (count - 1 >= 0) {
      timer = setTimeout(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [count]);

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Confirmed successfully.',
      duration: 1,
    });
  };
  const error = (msg) => {
    messageApi.open({
      type: 'error',
      content: msg ? msg : 'Confirmation code is incorrect!!',
      duration: 2.5,
    });
  };

  const onFinish = async (values) => {
    const response = await fetch(API_VERIFY_LOGIN, {
      method: 'POST',
      body: JSON.stringify({
        code: values.code,
      }),
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('tokenUser'),
        'Content-type': 'application/json',
      },
    });
    const responseJson = await response.json();
    if (responseJson.success) {
      success();
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } else {
      error();
    }
  };
  const onFinishFailed = (errorInfo) => {};

  const handleSetSendRequest = async () => {
    const data = {
      email: userInfo.email,
    };
    const response = await fetch(API_RESEND_CODE, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('tokenUser'),
      },
    });
    const json = await response.json();
    if (json.success) {
      setCount(60);
    } else {
      error('Not enough time to request again!!');
    }
  };

  return (
    <>
      {contextHolder}
      <AuthContainer>
        <Helmet>
          <title>Auth Code</title>
          <link rel="canonical" href={process.env.REACT_APP_PUBLIC_HOST} />
        </Helmet>
        <DivHeader>
          <div>
            <HeaderPaymentComponent />
          </div>
        </DivHeader>
        <AuthContent>
          <DivInformation>
            <Title>Two-factor authentication</Title>
            <Text>
              Open your authentication app and enter the code for DigitalOcean.
            </Text>
            <DivDetail>
              <Form
                name="verifyForm"
                labelCol={{
                  flex: '110px',
                }}
                labelAlign="left"
                labelWrap
                wrapperCol={{
                  flex: 1,
                }}
                colon={false}
                style={{
                  maxWidth: 600,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}>
                <Form.Item
                  name="code"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter the confirmation code!!',
                    },
                  ]}>
                  <Input placeholder="Enter 6 digit code" />
                </Form.Item>

                <Form.Item label="">
                  <ButtonVerify type="primary" htmlType="submit">
                    Verify
                  </ButtonVerify>
                </Form.Item>
              </Form>
              <DivResend>
                {count > 0 ? (
                  <p>Submit your request later {count}</p>
                ) : (
                  <p>
                    Haven't received the code?
                    <button onClick={handleSetSendRequest}>
                      Request resend
                    </button>
                  </p>
                )}
              </DivResend>
            </DivDetail>
          </DivInformation>
        </AuthContent>
      </AuthContainer>
    </>
  );
}

export default AuthPage;
