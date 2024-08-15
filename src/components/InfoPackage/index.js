import { Button } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { API_GET_ORDER_FROM_USER_ID } from '../../configs/apis';
import { DivContainer, DivInfo, ListInfo, ItemInfo, DivAction } from './styles';
import { CheckLoginContext } from '../../contexts/LoginContext';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

function InfoPackage() {
  const [data, setData] = useState();

  const navigate = useNavigate();

  const { userInfo } = useContext(CheckLoginContext);

  useEffect(() => {
    const fetchOrderPackage = async () => {
      const response = await fetch(
        API_GET_ORDER_FROM_USER_ID + '/' + userInfo.userId,
      );
      const data = await response.json();
      setData(data.data[0]);
    };
    fetchOrderPackage();
  }, [userInfo]);

  const handleUpgradePackage = () => {
    navigate('/package-upgrade');
  };

  return (
    <DivContainer>
      <DivInfo>
        <ListInfo>
          <ItemInfo>Type Package: {data && data.packageId.typePack}</ItemInfo>
          <ItemInfo>Resolution: {data && data.packageId.resolution}</ItemInfo>
          <ItemInfo>
            Quality Picture: {data && data.packageId.qualityPicture}
          </ItemInfo>
          <ItemInfo>
            Monthly Price: {data && data.packageId.monthlyPrice} USD
          </ItemInfo>
          <ItemInfo>
            Device Support: {data && data.packageId.deviceSupport}
          </ItemInfo>
          <ItemInfo>
            Quantity Download: {data && data.packageId.deviceSupport}
          </ItemInfo>
          <ItemInfo>
            Quantity Watch: {data && data.packageId.deviceSupport}
          </ItemInfo>
          <ItemInfo>
            Time order: {dayjs(data && data.createAt).format('DD-MM-YYYY')}
          </ItemInfo>
          <ItemInfo>
            Expired time:{' '}
            {dayjs(data && data.expirationDate).format('DD-MM-YYYY')}
          </ItemInfo>
        </ListInfo>
      </DivInfo>
      <DivAction>
        <Button type="primary" onClick={handleUpgradePackage}>
          Package Upgrade
        </Button>
      </DivAction>
    </DivContainer>
  );
}

export default InfoPackage;
