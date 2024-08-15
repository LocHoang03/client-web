import { useEffect, useState } from 'react';
import {
  DivFilm,
  Title,
  ColPage,
  RowPage,
  DivContent,
  DivNull,
  DivSearch,
} from './styles';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllMovies } from '../../redux/action/home/movies';
import Film from '../../components/FilmAndMovies/FilmComponent';
import { useLocation } from 'react-router-dom';
import LoadingPage from '../LoadingPage';
import { InfoCircleOutlined } from '@ant-design/icons';
import SearchComponent from '../../components/Search';
import fetchDataLook from '../../utils/fetdataLook';
import { fetchAllSeries } from '../../redux/action/home/series';
import { Helmet } from 'react-helmet-async';

const ResultPage = (props) => {
  const [data, setData] = useState();
  const [width, setWidth] = useState(window.innerWidth);
  const [slide, setSlide] = useState(4);
  const [options, setOptions] = useState([]);
  const [options1, setOptions1] = useState([]);
  const [options2, setOptions2] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const state = location.state || {};

  const queryParams = new URLSearchParams(location.search);
  const result = queryParams.get('result');
  const category = queryParams.get('category');
  const country = queryParams.get('country');
  const year = queryParams.get('year');

  const dispatch = useDispatch();
  const movies = useSelector((state) => state.moviesSlice);
  const series = useSelector((state) => state.seriesSlice);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    if (width >= 1200) {
      setSlide(4);
    } else if (width >= 992 && width < 1200) {
      setSlide(6);
    } else if (width < 992 && width >= 768) {
      setSlide(6);
    } else if (width < 768 && width > 576) {
      setSlide(8);
    } else if (width < 576) {
      setSlide(12);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    Promise.all([
      dispatch(fetchAllMovies()),
      dispatch(fetchAllSeries()),
      fetchDataLook(setOptions, setOptions1, setOptions2),
    ]);
  }, [dispatch]);

  useEffect(() => {
    setIsLoading(true);
    const data = state.type === 'movie' ? movies : series;
    let arrayData = [];
    if (location?.state?.searchKey) {
      if (movies && series) {
        for (let item of movies.data) {
          if (
            location?.state?.searchKey &&
            item?.title
              .toLowerCase()
              .includes(location?.state?.searchKey.toLowerCase())
          ) {
            arrayData.push(item);
          }
        }
        for (let item of series.data) {
          if (
            location?.state?.searchKey &&
            item?.title
              .toLowerCase()
              .includes(location?.state?.searchKey.toLowerCase())
          ) {
            arrayData.push(item);
          }
        }
      }
    } else {
      for (let item of data.data) {
        if (
          result !== null &&
          category !== null &&
          country !== null &&
          year !== null
        ) {
          if (
            item?.title &&
            item?.title.toLowerCase().includes(result.toLowerCase()) &&
            item?.listCategoryId &&
            item?.listCategoryId.some((cate) => cate.includes(category)) &&
            item?.country &&
            item?.country.some((coun) =>
              coun.toLowerCase().includes(country.toLowerCase()),
            ) &&
            item?.releaseDate &&
            item?.releaseDate.toString().includes(year)
          ) {
            arrayData.push(item);
          }
        }
      }
    }

    setData(arrayData);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [location?.state?.searchKey, result, category, year, country]);

  if (!movies || !data || !options || !options1 || !options2 || isLoading) {
    return <LoadingPage />;
  }

  return (
    <DivFilm>
      <Helmet>
        <title>Result Film</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      <DivContent>
        <Title>
          Keyword search results: "
          {location.state && location.state.searchKey !== null
            ? location.state.searchKey
            : result}
          "
        </Title>
        <DivSearch>
          <SearchComponent
            options={options}
            options1={options1}
            options2={options2}
          />
        </DivSearch>
        {data && data.length > 0 ? (
          <RowPage justify="start">
            {data &&
              data.map((item, id) => {
                return (
                  <ColPage key={id} span={slide}>
                    <Film
                      title={item.title}
                      image={item.imageUrl.url}
                      idFilm={item._id}
                      type={'movies'}
                    />
                  </ColPage>
                );
              })}
          </RowPage>
        ) : (
          <DivNull>
            <InfoCircleOutlined /> No results were found
          </DivNull>
        )}
      </DivContent>
    </DivFilm>
  );
};

export default ResultPage;
