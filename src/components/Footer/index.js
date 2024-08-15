import React, { useContext } from 'react';
import {
  DivFooter,
  RowFooter,
  ColFooterTop,
  ColFooterMiddle,
  ColFooterBot,
  DivContentFooter,
  Text,
  DivContentSocial,
  DivSocial,
  DivIcon,
  DivContentSupport,
  DivSupport,
  DivTextDownload,
  DivDownload,
} from './styles';

import { PhoneFilled, MessageOutlined } from '@ant-design/icons';
import LogoImage from '../Common/ImageBanner';

function Footer() {
  return (
    <DivFooter>
      <DivContentFooter>
        <RowFooter>
          <ColFooterTop span={8} xs={24} sm={24} md={24} lg={8}>
            <LogoImage height="130" width="90%" />
          </ColFooterTop>
          <ColFooterMiddle span={10} xs={24} sm={24} md={24} lg={10}>
            <Text>
              Managing agency: MobiFone Telecommunications Corporation -
              Address: No. 01 Pham Van A Street, Yen Hoa Ward, Cau Giay
              District, Ho Chi Minh City.
            </Text>
            <Text>
              Phone/Fax: +84967936728 - Email:{' '}
              <span>hoangphuocloc.phurieng@gmail.com</span>
            </Text>
            <Text>
              Business Registration Certificate Number: XXXXXXXXX issued by
              Hanoi Department of Planning and Investment for the first time on
              September 20, 2010, registered for the 10th change on March 10,
              2021
            </Text>
            <Text>
              License to Provide Radio and Television Services on the Internet
              No. 273/GP-BTTTT issued on May 12, 2021
            </Text>
          </ColFooterMiddle>
          <ColFooterBot span={6} xs={24} sm={24} md={24} lg={6}>
            <DivContentSocial>
              <DivSocial href={'/'}>
                <DivIcon>
                  <img
                    src="https://res.cloudinary.com/dzxupp48t/image/upload/v1714389998/image-webFilm/dhi49sn5wiftlsvifavo.png"
                    alt="tiktok"
                  />
                </DivIcon>
              </DivSocial>
              <DivSocial href={'/'}>
                <DivIcon>
                  <img
                    src="https://res.cloudinary.com/dzxupp48t/image/upload/v1714389998/image-webFilm/xuodqrizvjae9lzxhvhu.png"
                    alt="facebook"
                  />
                </DivIcon>
              </DivSocial>
            </DivContentSocial>
            <DivContentSupport>
              <DivSupport>
                <PhoneFilled /> <span>0101</span>
              </DivSupport>
              <DivSupport>
                <MessageOutlined /> <span>Support</span>
              </DivSupport>
            </DivContentSupport>
            <DivTextDownload>Download the application at</DivTextDownload>
            <DivDownload>
              <img
                src="https://res.cloudinary.com/dzxupp48t/image/upload/v1714388446/image-webFilm/mztdosa6cg3mn1t57i8a.png"
                alt="app store"
              />
              <img
                src="https://res.cloudinary.com/dzxupp48t/image/upload/v1714388436/image-webFilm/zbapk67tmyjx2ry5lpae.png"
                alt="goggle-play"
              />
            </DivDownload>
          </ColFooterBot>
        </RowFooter>
      </DivContentFooter>
    </DivFooter>
  );
}

export default Footer;
