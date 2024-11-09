import React, { useEffect } from 'react';
import {
  DivLandingPage,
  DivActionAuth,
  DivInformation,
  TextBanner,
  DivContentAuth,
  DivBanner,
  DivContent,
  TextTitle,
  TextContent,
  TextContent2,
  ButtonLogin,
  RowInformation,
  ColInformation,
  TitleInformation,
  TextInformation,
  ImageInformation,
} from './styles';
import { Link } from 'react-router-dom';
import banner1 from '../../assets/images/img-login.jpg';
import imageInfo1 from '../../assets/images/laptop-landing.jpg';
import imageInfo2 from '../../assets/images/tv-landing.jpg';
import { RightOutlined } from '@ant-design/icons';
import LogoImage from '../../components/Common/ImageBanner';
import { Helmet } from 'react-helmet-async';

function LandingPage() {
  useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
  });
  return (
    <DivLandingPage>
      <Helmet>
        <title>Landing Page</title>
        <link rel="canonical" href={process.env.REACT_APP_PUBLIC_HOST} />
      </Helmet>
      <DivActionAuth backgroundImage={banner1}>
        <DivContentAuth>
          <DivBanner>
            <TextBanner>
              <LogoImage height="100" width="400" />
            </TextBanner>
          </DivBanner>
          <DivContent>
            <TextTitle>
              Thưởng thức những bộ phim đình đám, chương trình truyền hình nổi
              bật và hơn thế nữa chỉ từ 30 đô la.
            </TextTitle>
            <TextContent>
              Tham gia ngay hôm nay, hủy bỏ bất cứ lúc nào.
            </TextContent>
            <TextContent2>
              Bạn đã sẵn sàng để xem chưa? Đăng nhập để kích hoạt lại tư cách
              thành viên của bạn.
            </TextContent2>
            <ButtonLogin>
              <Link to="/auth/login">
                Bắt đầu <RightOutlined />
              </Link>
            </ButtonLogin>
          </DivContent>
        </DivContentAuth>
      </DivActionAuth>
      <DivInformation>
        <RowInformation>
          <ColInformation span={12} md={12} lg={12} xs={24}>
            <TitleInformation>Thưởng thức trên TV của bạn</TitleInformation>
            <TextInformation>
              Xem trên TV thông minh, Playstation, Xbox, Chromecast, Apple TV,
              Đầu phát Blu-ray và hơn thế nữa.
            </TextInformation>
          </ColInformation>
          <ColInformation span={12} md={12} lg={12} xs={24}>
            <ImageInformation src={imageInfo1} />
          </ColInformation>
        </RowInformation>
      </DivInformation>
      <DivInformation>
        <RowInformation>
          <ColInformation span={12} md={12} lg={12} xs={24}>
            <TitleInformation>Xem mọi nơi</TitleInformation>
            <TextInformation>
              Truyền phát phim và chương trình truyền hình không giới hạn trên
              điện thoại, máy tính bảng, máy tính xách tay của bạn và truyền
              hình.
            </TextInformation>
          </ColInformation>
          <ColInformation span={12} md={12} lg={12} xs={24}>
            <ImageInformation src={imageInfo2} />
          </ColInformation>
        </RowInformation>
      </DivInformation>
    </DivLandingPage>
  );
}

export default LandingPage;
