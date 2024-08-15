import { CheckCircleFilled } from '@ant-design/icons';
import {
  ContentPack,
  TypePack,
  InfoType,
  Resolution,
  Describe,
  ListInfo,
  ItemInfo,
  DivItemInfo,
  CheckIcon,
} from './styles';

function PackageComponent({
  item,
  dataChoosePayment,
  setDataChoosePayment,
  dataDisabled,
  login,
}) {
  const handleChoosePackService = () => {
    setDataChoosePayment(item);
  };
  return (
    <ContentPack
      onClick={handleChoosePackService}
      className={
        `${
          dataChoosePayment._id === item._id
            ? 'choose-service-package-shadow '
            : ''
        }` +
        `${login ? 'disabled' : ''}` +
        `${
          dataDisabled && !dataDisabled.includes(item._id) ? 'non-disabled' : ''
        }`
      }>
      <TypePack
        className={
          dataChoosePayment._id === item._id && 'choose-service-package'
        }>
        <InfoType>{item.typePack}</InfoType>
        <Resolution>{item.resolution}</Resolution>
        {dataChoosePayment._id === item._id && (
          <CheckIcon>
            <CheckCircleFilled />
          </CheckIcon>
        )}
      </TypePack>
      <Describe>
        <ListInfo>
          <ItemInfo>
            <DivItemInfo>
              <div>monthly price</div>
              <div>{item.monthlyPrice}</div>
            </DivItemInfo>
          </ItemInfo>
          <ItemInfo>
            <DivItemInfo>
              <div>Picture and sound quality</div>
              <div>{item.qualityPicture}</div>
            </DivItemInfo>
          </ItemInfo>
          <ItemInfo>
            <DivItemInfo>
              <div>Resolution</div>
              <div>{item.resolution}</div>
            </DivItemInfo>
          </ItemInfo>
          {item.spatialSound && (
            <ItemInfo>
              <DivItemInfo>
                <div>Spatial audio (realistic sound)</div>
                <div>{item.SpatialSound}</div>
              </DivItemInfo>
            </ItemInfo>
          )}
          <ItemInfo>
            <DivItemInfo>
              <div>Supported devices</div>
              <div>{item.deviceSupport}</div>
            </DivItemInfo>
          </ItemInfo>
          <ItemInfo>
            <DivItemInfo>
              <div>Devices your family can watch at the same time</div>
              <div>{item.quantityWatch}</div>
            </DivItemInfo>
          </ItemInfo>
          <ItemInfo>
            <DivItemInfo>
              <div>Device is downloaded</div>
              <div>{item.quantityDownload}</div>
            </DivItemInfo>
          </ItemInfo>
        </ListInfo>
      </Describe>
    </ContentPack>
  );
}

export default PackageComponent;
