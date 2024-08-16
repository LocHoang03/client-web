import { useEffect, useState } from 'react';
import { DivFilm } from './styles';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllMovies } from '../../redux/action/home/movies';
import { fetchAllCategory } from '../../redux/action/category/category';
import Content from '../../components/Content';
import { API_GET_NEW_MOVIES } from '../../configs/apis';
import LoadingPage from '../LoadingPage';
import Banner from '../../components/Banner';
import SearchComponent from '../../components/Search';
import fetchDataLook from '../../utils/fetdataLook';
import { Helmet } from 'react-helmet-async';

const MoviesPage = (props) => {
  const [data, setData] = useState();
  const [dataVideo, setDataVideo] = useState();
  const [dataBanner, setDataBanner] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [options, setOptions] = useState([]);
  const [options1, setOptions1] = useState([]);
  const [options2, setOptions2] = useState([]);

  const dispatch = useDispatch();
  const movies = useSelector((state) => state.moviesSlice);
  const category = useSelector((state) => state.categorySlice);
  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(API_GET_NEW_MOVIES);
      const data = await response.json();
      setDataVideo(data.data);
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    };
    Promise.all([
      dispatch(fetchAllMovies()),
      dispatch(fetchAllCategory()),
      fetchMovies(),
      fetchDataLook(setOptions, setOptions1, setOptions2),
    ]);
  }, [dispatch]);

  useEffect(() => {}, []);

  useEffect(() => {
    if (movies && category) {
      let arrayData = [];
      for (let cate of category.data) {
        let objectData = { title: null, film: [] };
        objectData.title = cate.name;
        for (let item of movies.data) {
          if (Array.isArray(item.listCategoryId)) {
            if (
              item.listCategoryId.some((cate1) =>
                cate1?._id?.includes(cate._id),
              )
            ) {
              objectData.film.push(item);
            }
          }
        }
        arrayData.push(objectData);
      }
      setData(arrayData);
    }
  }, [movies, category]);

  useEffect(() => {
    if (dataVideo && category) {
      let arrData = [];
      for (let item of dataVideo) {
        let arrayCategory = [];
        for (let cate of category.data) {
          if (item.listCategoryId.includes(cate._id)) {
            arrayCategory.push(cate.name);
          }
        }

        arrData.push({
          name: item.title,
          category: arrayCategory,
          description: item.description,
          filmId: item._id,
        });
      }
      setDataBanner(arrData);
    }
  }, [dataVideo, category]);

  if (
    !movies ||
    !category ||
    !data ||
    !dataVideo ||
    !options ||
    !options1 ||
    !options2
  ) {
    return <LoadingPage />;
  }

  return (
    <DivFilm>
      <Helmet>
        <title>Movies Showhub</title>
        <link rel="canonical" href={process.env.REACT_APP_PUBLIC_HOST} />
      </Helmet>
      <Banner dataVideo={dataVideo} isLoading={isLoading} data={dataBanner} />
      <SearchComponent
        options={options}
        options1={options1}
        options2={options2}
      />
      {data &&
        data.map((item, id) => {
          if (item.film.length > 4) {
            return (
              <Content
                title={item.title}
                listFilm={item.film}
                key={id}
                type="movies"
              />
            );
          }
        })}
    </DivFilm>
  );
};

export default MoviesPage;
