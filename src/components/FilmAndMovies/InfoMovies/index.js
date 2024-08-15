import { Title, TextFilm, TagCategory } from './styles';

function InfoMovies({ data }) {
  return (
    <>
      <Title>{data?.film?.title}</Title>
      <TextFilm>
        Release date:&nbsp;
        {data?.film?.releaseDate}
      </TextFilm>
      <TextFilm>Director: {data?.film?.director}</TextFilm>
      <TextFilm>Cast: {data?.film?.cast}</TextFilm>
      <TextFilm>Duration: {data?.film?.duration} minute</TextFilm>
      <TextFilm>
        <span>Rating:&nbsp;</span>
        <span>
          {data?.film?.rating}/5 ({data?.film?.totalRating} evaluate)
        </span>
      </TextFilm>
      <TextFilm>
        Country:{' '}
        {data?.film?.country.map((item, id) => {
          return <TagCategory key={id}>{item}</TagCategory>;
        })}
      </TextFilm>
      <TextFilm>
        Category:{' '}
        {data?.category?.map((item, id) => {
          return <TagCategory key={id}>{item}</TagCategory>;
        })}
      </TextFilm>
    </>
  );
}

export default InfoMovies;
