import React, { useState } from 'react';
import {
  DivAuth,
  DivContent,
  DivContainer,
  DivBanner,
  DivForm,
  TextBanner,
  Text,
  DivLink,
  TextContent,
  DivError,
} from './styles';
import ItemForm from '../../components/Common/ItemForm';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, Input, message } from 'antd';
import LogoImage from '../../components/Common/ImageBanner';
import { API_LOGIN } from '../../configs/apis';
import { Helmet } from 'react-helmet-async';

function LoginPage() {
  const [textError, setTextError] = useState();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Login success.',
      duration: 1,
    });
  };
  const error = () => {
    messageApi.open({
      type: 'error',
      content:
        'Your account has been locked, please contact customer service for assistance!!',
      duration: 2.5,
    });
  };

  const onFinish = async (values) => {
    setTextError();
    const response = await fetch(API_LOGIN, {
      method: 'POST',
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const responseJson = await response.json();
    if (responseJson.success) {
      if (responseJson.isBanned) {
        error();
      } else {
        await localStorage.setItem('tokenUser', responseJson.token);
        if (localStorage.getItem('tokenUser')) {
          success();
          setTimeout(() => {
            navigate('/two-factor-authentication');
          }, 1000);
        }
      }
    } else {
      setTextError(responseJson.message);
    }
  };
  const onFinishFailed = (errorInfo) => {};

  const handleFocus = () => {
    setTextError();
  };

  return (
    <DivAuth>
      <Helmet>
        <title>Login Showhub</title>
        <link rel="canonical" href={process.env.REACT_APP_PUBLIC_HOST} />
      </Helmet>
      {contextHolder}
      <DivContainer>
        <DivBanner>
          <TextBanner>
            <LogoImage height="60" width="400" />
          </TextBanner>
        </DivBanner>
        <DivContent>
          <TextContent>Sign in to ShowHub</TextContent>
          <DivForm>
            <Form
              name="loginForm"
              labelCol={{
                span: 24,
              }}
              wrapperCol={{
                span: 24,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off">
              <ItemForm
                label="Email"
                name="email"
                message="Please input your email!"
                input={<Input onFocus={handleFocus} />}
              />

              <ItemForm
                label="Password"
                name="password"
                message="Please input your password!"
                input={<Input.Password onFocus={handleFocus} />}
              />

              <Form.Item
                className="btn-login"
                wrapperCol={{
                  span: 24,
                }}>
                <Button htmlType="submit">Sign in</Button>
              </Form.Item>
              <DivError>{textError}</DivError>
              <DivLink>
                <Text>
                  New to ShowHub? <Link to="/auth/signup">Sign up</Link>
                </Text>
                <Text>
                  <Link to="/auth/forgot-password">Forgot password ?</Link>
                </Text>
              </DivLink>
            </Form>
          </DivForm>
        </DivContent>
      </DivContainer>
    </DivAuth>
  );
}

export default LoginPage;
