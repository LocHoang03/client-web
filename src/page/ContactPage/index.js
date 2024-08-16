import {
  DivContact,
  DivBanner,
  BannerContact,
  DivContent,
  DivTitle,
  Title,
  Title1,
  RowContent,
  ColContent,
  DivForm,
  Container,
  TitleLeft,
  TitleRight,
  DivListQuestion,
  InfoQuestion,
  TitleQuestion,
  DescriptionQuestion,
  ListCenter,
  ItemCenter,
  TitleCenter,
} from './styles';
import contactImage from '../../assets/images/contact_us.jpg';
import { Button, Form, Input, message } from 'antd';
import InputItem from '../../components/Common/InputItem';
import TextArea from 'antd/es/input/TextArea';
import { useContext, useEffect, useState } from 'react';
import { API_FETCH_ALL_COMMON_QUESTIONS } from '../../configs/apis';
import { API_CREATE_QUESTION_CUSTOMER } from '../../configs/apis';
import { CheckLoginContext } from '../../contexts/LoginContext';
import {
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
} from '@ant-design/icons';
import { Helmet } from 'react-helmet-async';

function ContactPage() {
  const [questions, setQuestions] = useState();
  const [openQuestions, setOpenQuestions] = useState();
  const [messageApi, contextHolder] = message.useMessage();

  const { userInfo } = useContext(CheckLoginContext);

  const [form] = Form.useForm();

  const success = (msg) => {
    messageApi.open({
      type: 'success',
      content: msg,
    });
  };

  const error = (msg) => {
    messageApi.open({
      type: 'error',
      content: msg,
    });
  };

  useEffect(() => {
    const fetchAllCommonQuestions = async () => {
      const response = await fetch(API_FETCH_ALL_COMMON_QUESTIONS);
      const responseJson = await response.json();
      setQuestions(responseJson.data);
    };
    fetchAllCommonQuestions();
  }, []);

  const handleOpenDescription = (id) => {
    setOpenQuestions((prev) => {
      if (prev === id) {
        return '';
      } else {
        return id;
      }
    });
  };

  const onFinish = async (values) => {
    const response = await fetch(API_CREATE_QUESTION_CUSTOMER, {
      method: 'POST',
      body: JSON.stringify({
        title: values.title,
        description: values.comment,
        userId: userInfo.userId,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('tokenUser'),
      },
    });
    const responseJson = await response.json();
    if (responseJson.success) {
      form.setFieldsValue({
        title: '',
        comment: '',
      });
      success(
        'Thank you for your feedback. We have received your information and will respond via email as soon as possible.',
      );
    } else {
      error('The system is experiencing a problem. Please try again later!!');
    }
  };
  const onFinishFailed = (errorInfo) => {};

  return (
    <DivContact>
      <Helmet>
        <title>Contact</title>
        <link rel="canonical" href={process.env.REACT_APP_PUBLIC_HOST} />
      </Helmet>
      {contextHolder}
      <DivBanner>
        <BannerContact src={contactImage} />
      </DivBanner>
      <Container>
        <DivContent>
          <DivTitle>
            <Title>Contact Us</Title>
            <Title1>Have any question? We'd love to hear from you</Title1>
          </DivTitle>
          <RowContent>
            <ColContent span={8} lg={8} md={12} sm={12} xs={24}>
              <div>
                <div>
                  <TitleLeft>Some frequently asked questions</TitleLeft>
                  <DivListQuestion>
                    {questions &&
                      questions.map((item, id) => {
                        return (
                          <InfoQuestion key={id}>
                            <TitleQuestion
                              onClick={() => handleOpenDescription(item._id)}>
                              {item.title}
                            </TitleQuestion>
                            {openQuestions === item._id && (
                              <DescriptionQuestion>
                                {item.description}
                              </DescriptionQuestion>
                            )}
                          </InfoQuestion>
                        );
                      })}
                  </DivListQuestion>
                </div>
              </div>
            </ColContent>
            <ColContent span={8} lg={8} md={12} sm={12} xs={24}>
              <div>
                <div>
                  <TitleCenter>Contact Info</TitleCenter>
                  <ListCenter>
                    <ItemCenter>
                      <div>
                        <PhoneOutlined />
                      </div>
                      <div>
                        <p>Telephone</p>
                        <p>
                          <a href="tel:+84967936728">0967936728</a>
                        </p>
                      </div>
                    </ItemCenter>
                    <ItemCenter>
                      <div>
                        <MailOutlined />
                      </div>
                      <div>
                        <p>Email</p>
                        <p>
                          <a href="mailto:hoangphuocloc.phurieng@gmail.com">
                            hoangphuocloc.phurieng@gmail.com
                          </a>
                        </p>
                      </div>
                    </ItemCenter>
                    <ItemCenter>
                      <div>
                        <EnvironmentOutlined />
                      </div>
                      <div>
                        <p>Address</p>
                        <p>
                          <address>
                            00 Le Trong Tan Street, Tay Thanh Ward, Tan Phu
                            District, Ho Chi Minh City
                          </address>
                        </p>
                      </div>
                    </ItemCenter>
                  </ListCenter>
                </div>
              </div>
            </ColContent>
            <ColContent span={8} lg={8} md={12} sm={24} xs={24}>
              <div>
                <TitleRight>Ask a question</TitleRight>
                <DivForm>
                  <Form
                    form={form}
                    name={'contactForm'}
                    labelCol={{
                      span: 24,
                    }}
                    wrapperCol={{
                      span: 24,
                    }}
                    style={{
                      textAlign: 'center',
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    layout="vertical"
                    autoComplete="off">
                    <InputItem
                      label="Title"
                      name="title"
                      message="Please input your title!"
                      input={<Input />}
                    />
                    <InputItem
                      label="Comment"
                      name="comment"
                      message="Please input your comment!"
                      input={
                        <TextArea
                          maxLength={200}
                          // onChange={onChange}
                          placeholder="Enter comments"
                          style={{
                            height: 100,
                            resize: 'none',
                          }}
                        />
                      }
                    />
                    <Form.Item
                      wrapperCol={{
                        span: 24,
                      }}>
                      <Button type="primary" htmlType="submit">
                        SEND MESSAGE
                      </Button>
                    </Form.Item>
                  </Form>
                </DivForm>
              </div>
            </ColContent>
          </RowContent>
        </DivContent>
      </Container>
    </DivContact>
  );
}

export default ContactPage;
