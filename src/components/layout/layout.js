import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

const Layout = props => (
  <div>
    <Head />
    <div className="layout-contianer">
      {/* eslint-disable-next-line react/destructuring-assignment */}
      {props.children}
    </div>
  </div>
);

Layout.propTypes = {
  children: PropTypes.element.isRequired
};

export default Layout;