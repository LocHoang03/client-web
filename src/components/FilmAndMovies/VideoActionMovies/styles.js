import styled from 'styled-components';

export const TitleVideo = styled.h2`
  width: 100%;
  text-align: center;
  font-size: 26px;
  margin: 0 0 20px;
`;

export const DivVideo = styled.div`
  width: 100%;
  & div {
    width: 100% !important;
    height: 100% !important;
    border-radius: 20px !important;
    overflow: hidden !important;
  }
`;

export const DivContentVideo = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

export const DivAction = styled.div`
  margin-top: 20px;
`;

export const ButtonAction = styled.button`
  width: 70px;
  cursor: pointer;
  padding: 0;
  background: transparent;
  margin-right: 10px;
  &:hover {
    color: rgba(255, 255, 255, 0.7);
    text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
  }

  & span {
    font-size: 14px;
    text-align: center;
    width: 100%;
    padding: 4px 4px;
    font-weight: 500;
  }
`;

export const DivServer = styled.div`
  margin-top: 30px;
  text-align: left;

  & label {
    font-size: 16px;
  }

  & span {
    padding: 5px 20px;
    font-size: 16px;
  }
`;

export const RatingAction = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  background-color: var(--white-bg);
  padding: 8px;
  border-radius: 5px;
  & label {
    font-size: 16px;
    color: var(--black);
  }
`;

export const DivListEpisode = styled.div`
  margin-top: 30px;
  text-align: left;

  & p {
    font-size: 18px;
  }

  & > div {
    margin-top: 5px;
  }
  & button {
    margin-top: 5px;
    margin-right: 10px;
    padding: 7px 14px;
    font-size: 16px;
    border-radius: 5px;
    background-color: rgb(215 176 40);
    color: var(--white-bg);
    cursor: pointer;

    &:hover {
      background-color: #1c79ff !important;
    }
  }
`;
