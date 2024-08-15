import React, { useEffect, useState } from 'react';
import {
  DivSearch,
  ButtonSearch,
  FormSearch,
  InputSearch,
  DivSelect,
  ListFilm,
  Item,
  RowItem,
  ColItem,
  ImageItem,
  TextFilm,
  TextCountry,
  DivInfo,
} from './styles';
import { SearchOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllMovies } from '../../redux/action/home/movies';
import { fetchAllSeries } from '../../redux/action/home/series';

function InputSearchLayout(props) {
  const [searchKey, setSearchKey] = useState('');
  const [films, setFilms] = useState();
  const [onFocus, setOnFocus] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const movies = useSelector((state) => state.moviesSlice);
  const series = useSelector((state) => state.seriesSlice);

  useEffect(() => {
    dispatch(fetchAllMovies());
    dispatch(fetchAllSeries());
  }, [dispatch]);

  useEffect(() => {
    if (movies && series) {
      let arrayData = [];
      let count = 0;
      let maxItems = searchKey === '' ? 15 : Infinity;

      for (let item of movies.data) {
        if (item.title.toLowerCase().includes(searchKey.toLowerCase())) {
          arrayData.push({ data: item, type: 'movies' });
          count++;
          if (count >= maxItems) break;
        }
      }
      count = 0;
      if (count < maxItems) {
        for (let item of series.data) {
          if (item.title.toLowerCase().includes(searchKey.toLowerCase())) {
            arrayData.push({ data: item, type: 'series' });
            count++;
            if (count >= maxItems) break;
          }
        }
      }

      setFilms(arrayData);
    }
  }, [searchKey, movies, series]);

  const handleSearchFilm = (e) => {
    e.preventDefault();
    navigate(`/search?result=${searchKey}`, {
      state: {
        searchKey: searchKey,
      },
    });
    setSearchKey('');
  };

  const handleFocusInput = () => {
    setOnFocus(true);
  };
  const handleBlurInput = () => {
    setOnFocus(false);
  };

  const handleOnchangeInput = async (e) => {
    setSearchKey(e.target.value);
  };

  const handleInputClick = (event) => {
    // Ngăn chặn sự kiện bong bóng lên ButtonLeft
    event.stopPropagation();
  };

  const handleClickFilm = (type, filmId) => {
    if (type === 'movies') {
      navigate('/film/' + filmId);
    } else {
      navigate('/series/' + filmId);
    }
  };

  return (
    <DivSearch onClick={handleInputClick}>
      <FormSearch onSubmit={handleSearchFilm}>
        <InputSearch
          name="search"
          placeholder="Search name film"
          value={searchKey}
          onFocus={handleFocusInput}
          onBlur={handleBlurInput}
          onChange={handleOnchangeInput}
        />
        <ButtonSearch type="submit">
          <SearchOutlined />
        </ButtonSearch>
      </FormSearch>
      {onFocus && (
        <DivSelect>
          <ListFilm>
            {films && films.length > 0 ? (
              films.map((item, id) => {
                return (
                  <Item key={id}>
                    <button
                      onClick={() => handleClickFilm(item.type, item.data._id)}>
                      <RowItem>
                        <ColItem span={5}>
                          <ImageItem
                            src={item.data.imageUrl.url}
                            alt={item.data.title}
                          />
                        </ColItem>
                        <ColItem span={19}>
                          <TextFilm>{item.data.title}</TextFilm>
                          <TextCountry>
                            {item.data.country.join('-')}-
                            {item.data.releaseDate}
                          </TextCountry>
                        </ColItem>
                      </RowItem>
                    </button>
                  </Item>
                );
              })
            ) : (
              <DivInfo>No movies found matching the request!!</DivInfo>
            )}
          </ListFilm>
        </DivSelect>
      )}
    </DivSearch>
  );
}

export default InputSearchLayout;
