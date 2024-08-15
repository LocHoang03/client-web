import React, { useContext } from 'react';
import { DivFooter, RowFooter, ColFooter } from './styles';
import { Link } from 'react-router-dom';
import {
  ContactsOutlined,
  HomeOutlined,
  PlayCircleOutlined,
  ReadOutlined,
} from '@ant-design/icons';

function FooterMobile() {
  return (
    <DivFooter>
      <RowFooter>
        <ColFooter>
          <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
            <p>
              <HomeOutlined />
            </p>
            <p>Home</p>
          </Link>
        </ColFooter>
        <ColFooter>
          <Link to="/movies" style={{ textDecoration: 'none', color: 'white' }}>
            <p>
              <PlayCircleOutlined />
            </p>
            <p>Movies</p>
          </Link>
        </ColFooter>
        <ColFooter>
          <Link to="/series" style={{ textDecoration: 'none', color: 'white' }}>
            <p>
              <PlayCircleOutlined />
            </p>
            <p>Series</p>
          </Link>
        </ColFooter>
        <ColFooter>
          <Link
            to="/contact"
            style={{ textDecoration: 'none', color: 'white' }}>
            <p>
              <ContactsOutlined />
            </p>
            <p>Contact</p>
          </Link>
        </ColFooter>
        <ColFooter>
          <Link
            to="/terms-and-conditions"
            style={{ textDecoration: 'none', color: 'white' }}>
            <p>
              <ReadOutlined />
            </p>
            <p>T&C</p>
          </Link>
        </ColFooter>
      </RowFooter>
    </DivFooter>
  );
}

export default FooterMobile;
