import { useContext, useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import {
  PaymentContainer,
  PaymentHeader,
  ServicePack,
  TitleService,
  DivPackage,
  RowPack,
  ColPack,
  DivFooter,
  DivNotification,
  DivActionContinue,
  ButtonContinue,
} from './styles';
import HeaderPaymentComponent from '../../components/HeaderPaymentComponent';
import PackageComponent from '../../components/PackageComponent';
import { useNavigate } from 'react-router-dom';
import { CheckLoginContext } from '../../contexts/LoginContext';
import LoadingPage from '../LoadingPage';
import {
  API_GET_ALL_PAYMENT_DATA,
  API_GET_ALL_ORDER,
} from '../../configs/apis';
import { Helmet } from 'react-helmet-async';

function PaymentPage(props) {
  const [dataChoosePayment, setDataChoosePayment] = useState();
  const [data, setData] = useState();
  const [dataDisabled, setDataDisabled] = useState();
  const [isBlock, setIsBlock] = useState(false);
  const { userInfo } = useContext(CheckLoginContext);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllPayment = async () => {
      const response = await fetch(API_GET_ALL_PAYMENT_DATA);
      const dataJson = await response.json();
      setDataChoosePayment(dataJson.data[0]);
      setData(dataJson.data);
    };
    fetchAllPayment();
  }, []);

  useEffect(() => {
    setIsBlock(false);
    const fetchPaymentDisabled = async () => {
      const response = await fetch(API_GET_ALL_PAYMENT_DATA);
      const dataJson = await response.json();

      const responsePackageMax = await fetch(
        API_GET_ALL_PAYMENT_DATA + '/package-max',
      );
      const dataJsonPackageMax = await responsePackageMax.json();

      const responseOrder = await fetch(
        API_GET_ALL_ORDER + '/' + userInfo.userId,
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('tokenUser'),
          },
        },
      );
      const dataJsonOrder = await responseOrder.json();

      let dataDisabledObj = [];

      dataJson.data.map((item, id) => {
        if (
          item._id.toString() >= dataJsonOrder.data.packageId._id.toString()
        ) {
          dataDisabledObj.push(item._id);
        }
        if (
          dataJsonPackageMax.packageId.toString() ===
          dataJsonOrder.data.packageId._id.toString()
        ) {
          setIsBlock(true);
        }
      });
      setDataDisabled(dataDisabledObj);
    };
    if (props.login) {
      fetchPaymentDisabled();
    }
  }, [props.login, userInfo]);

  const handleCLickContinue = async () => {
    await localStorage.setItem(
      'dataPayment',
      JSON.stringify(dataChoosePayment),
    );
    navigate('/option-checkout');
  };

  if (!dataChoosePayment || isBlock === undefined) {
    return <LoadingPage />;
  }
  return (
    <PaymentContainer>
      <Helmet>
        <title>Payment</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      {!props.login && (
        <PaymentHeader>
          <HeaderPaymentComponent />
        </PaymentHeader>
      )}
      <ServicePack>
        <TitleService>
          Choose the service package that's right for you
        </TitleService>
        <DivPackage>
          <RowPack>
            {data &&
              data.map((item, id) => {
                return (
                  <ColPack span={6} lg={6} md={8} sm={12} xs={24} key={id}>
                    <PackageComponent
                      item={item}
                      dataChoosePayment={dataChoosePayment}
                      setDataChoosePayment={setDataChoosePayment}
                      dataDisabled={dataDisabled}
                      login={props.login}
                    />
                  </ColPack>
                );
              })}
          </RowPack>
        </DivPackage>
        <DivNotification>
          <p>
            Whether you can watch in HD (720p), Full HD (1080p), Ultra HD (4K)
            and HDR depends on your internet service and device capabilities.
            Not all content is available in all resolutions. See our Terms of
            Use for more details.
          </p>
          <p>
            Only people who live with you can use your account. Watch on 4
            different devices at once with the Premium plan, 2 with the Standard
            plan, and 1 with the Basic and Mobile plans.
          </p>
        </DivNotification>
        <DivActionContinue>
          <ButtonContinue
            onClick={handleCLickContinue}
            disabled={isBlock ? true : false}
            block={isBlock}>
            Continue
          </ButtonContinue>
        </DivActionContinue>
      </ServicePack>
      {!props.login && (
        <DivFooter>
          <Footer />
        </DivFooter>
      )}
    </PaymentContainer>
  );
}

export default PaymentPage;
