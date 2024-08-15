import React from 'react';
import { DivMenu, DivPage, ListNav, ItemNav, TextTitle } from './styles';
import { RightOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { API_LOGOUT } from '../../../../configs/apis';
function HeaderMenu(props) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await fetch(API_LOGOUT, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('tokenUser'),
        'Content-type': 'application/json',
      },
    });
    const responseJson = await response.json();

    if (responseJson.success && localStorage.getItem('tokenUser')) {
      localStorage.removeItem('tokenUser');
      navigate('/landing-page');
    }
  };
  return (
    <DivMenu>
      <TextTitle>ShowHub</TextTitle>
      <DivPage>
        <ListNav>
          <ItemNav>
            <Link to="/my-profile">
              <span>My profile</span>
              <span>
                <RightOutlined />
              </span>
            </Link>
          </ItemNav>
          <ItemNav>
            <Link to="/my-favorite-movies">
              <span>My favorite movies</span>
              <span>
                <RightOutlined />
              </span>
            </Link>
          </ItemNav>
          <ItemNav>
            <button onClick={handleLogout}>
              <span>Log out</span>
              <span>
                <RightOutlined />
              </span>
            </button>
          </ItemNav>
        </ListNav>
      </DivPage>
    </DivMenu>
  );
}

export default HeaderMenu;
