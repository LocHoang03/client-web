import {
  DivVideo,
  TitleVideo,
  DivAction,
  ButtonAction,
  DivServer,
  DivContentVideo,
  RatingAction,
  DivListEpisode,
} from './styles';
import { Tag, Rate } from 'antd';
import { FacebookShareButton } from 'react-share';
import ReactPlayer from 'react-player/lazy';
import { useNavigate } from 'react-router-dom';

function VideoActionMovies({
  data,
  isLike,
  handleClickLikeSeries,
  handleClickLikeMovies,
  handleRatingSeries,
  handleRatingMovies,
  isRating,
  dataValueUserRating,
  type,
  listDataSeries,
  number,
  seriesId,
}) {
  const navigate = useNavigate();
  const handleLike = () => {
    if (type === 'movies') {
      handleClickLikeMovies();
    } else {
      handleClickLikeSeries();
    }
  };
  const handleChangeEpisode = (episode) => {
    navigate('/watching-series/' + seriesId + '/' + episode);
  };
  return (
    <>
      <TitleVideo>{data?.film?.title || data?.seriesId?.title}</TitleVideo>
      <DivVideo>
        <ReactPlayer
          url={data?.film?.videoUrl?.url || data?.videoUrl?.url}
          playing={true}
          controls={true}
          volume={true}
          config={{
            file: {
              attributes: {
                crossOrigin: 'anonymous',
              },
            },
          }}
        />
      </DivVideo>
      <DivContentVideo>
        <DivAction>
          <ButtonAction onClick={() => handleLike()}>
            {isLike ? (
              <Tag color="#FFD700">Liked</Tag>
            ) : (
              <Tag color="#3b5999">Like</Tag>
            )}
          </ButtonAction>
          <ButtonAction>
            <Tag color="#3b5999">
              <FacebookShareButton url="facebook.com" hashtag="#showhub">
                Share
              </FacebookShareButton>
            </Tag>
          </ButtonAction>
          <RatingAction>
            <label>Rating:</label>&nbsp;&nbsp;
            <div>
              <Rate
                disabled={isRating ? true : false}
                value={dataValueUserRating}
                allowHalf
                onChange={(value) => {
                  if (type === 'movies') {
                    handleRatingMovies(value);
                  } else {
                    handleRatingSeries(value);
                  }
                }}
              />
            </div>
          </RatingAction>
        </DivAction>
        <DivServer>
          <label>Vietsub #1</label>: &nbsp;
          <Tag color="#fbc50c">Full</Tag>
        </DivServer>
        {type === 'series' && (
          <DivListEpisode>
            <p>Episode list: </p>
            <div>
              {listDataSeries &&
                listDataSeries.length &&
                listDataSeries.map((item, id) => {
                  return (
                    <button
                      key={id}
                      onClick={() => handleChangeEpisode(item.filmSerialNumber)}
                      className={
                        number.toString() ===
                          item.filmSerialNumber.toString() && 'episode-current'
                      }>
                      {item.filmSerialNumber}
                    </button>
                  );
                })}
            </div>
          </DivListEpisode>
        )}
      </DivContentVideo>
    </>
  );
}

export default VideoActionMovies;
