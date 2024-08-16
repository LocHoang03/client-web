import { Fragment, useEffect, useRef, useState } from 'react';
import {
  DivBanner,
  ButtonSlick,
  DivInfo,
  Title,
  Category,
  DivAction,
  ButtonWatch,
  ButtonDetail,
  Description,
  LeftInfo,
  RightInfo,
} from './styles';
import {
  CaretRightOutlined,
  InfoCircleOutlined,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { Carousel, Modal, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';

const { confirm } = Modal;

function Banner({ dataVideo, isLoading, data, type, order }) {
  const carouselRef = useRef(null);
  const videoRef = useRef([]);
  const [currentId, setCurrentId] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && dataVideo && videoRef.current[currentSlide]) {
      videoRef.current[currentSlide].play().catch((error) => {});
    }
  }, [isLoading, currentSlide, dataVideo]);
  const handleAfterChange = (current) => {
    setCurrentId(current);
    setCurrentSlide(current);
  };
  const handleWatchNow = (filmId) => {
    if (dataVideo && order?.data[0]?.packageId) {
      for (let i = 0; i < dataVideo.length; i++) {
        if (dataVideo[i]._id === filmId) {
          const packageId = order.data[0].packageId._id;
          const listPackageIds = dataVideo[i].listPackageIdBand;
          if (listPackageIds.includes(packageId)) {
            confirm({
              title: 'Operation failed!!',
              content: `Your service package cannot watch this movie, please upgrade to a higher service 
          package to be able to watch this movie. Have you recently upgraded your current package?`,
              okText: 'Yes',
              cancelText: 'No',
              onOk() {
                navigate('/package-upgrade');
              },
              onCancel() {},
            });
          } else {
            if (type !== 'series') {
              navigate('/film/watching-movies/' + filmId);
            } else {
              navigate('/watching-series/' + filmId + '/' + 1);
            }
          }
        }
      }
    }
  };

  const handleDetail = (filmId) => {
    if (type !== 'series') {
      navigate('/film/' + filmId);
    } else {
      navigate('/series/' + filmId);
    }
  };

  return (
    <DivBanner className="container-data-slider">
      <Carousel
        dots={true}
        dotPosition="bottom"
        fade={true}
        ref={carouselRef}
        slidesToShow={1}
        afterChange={handleAfterChange}
        style={{ width: '100%' }}>
        {dataVideo &&
          dataVideo.map((item, id) => {
            return (
              <Fragment key={id}>
                <video
                  ref={(el) => (videoRef.current[id] = el)}
                  muted
                  loop
                  autoPlay
                  className="video-player"
                  key={id}>
                  <source src={item.videoUrl.url} type="video/mp4" />
                </video>
              </Fragment>
            );
          })}
      </Carousel>
      <DivInfo>
        <LeftInfo>
          <Title>
            Name film: "{data && data.length && data[currentId].name}"
          </Title>
          <Category>
            Category:{' '}
            {data &&
              data.length &&
              data[currentId].category.map((item, id) => {
                return (
                  <Tag color="processing" key={id}>
                    {item}{' '}
                  </Tag>
                );
              })}
          </Category>
          <Description>
            Description: {data && data.length && data[currentId].description}
          </Description>
          <DivAction>
            <ButtonWatch onClick={() => handleWatchNow(data[currentId].filmId)}>
              <CaretRightOutlined /> Watch now
            </ButtonWatch>
            <ButtonDetail onClick={() => handleDetail(data[currentId].filmId)}>
              <InfoCircleOutlined /> Detail
            </ButtonDetail>
          </DivAction>
        </LeftInfo>
        <RightInfo>
          <ButtonSlick
            onClick={() => {
              if (currentId > 0) {
                setCurrentId((prev) => prev - 1);
              } else {
                setCurrentId(4);
              }
              carouselRef.current.prev();
            }}
            className="btn-slider-left-banner">
            <LeftOutlined />
          </ButtonSlick>
          <ButtonSlick
            next="next"
            onClick={() => {
              if (currentId < 4) {
                setCurrentId((prev) => prev + 1);
              } else {
                setCurrentId(0);
              }
              carouselRef.current.next();
            }}
            className="btn-slider-right-banner">
            <RightOutlined />
          </ButtonSlick>
        </RightInfo>
      </DivInfo>
    </DivBanner>
  );
}

export default Banner;
