/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';

class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null
    return { statusCode }
  }

  render() {
    const {statusCode} = this.props;
    let errorMessage = `An error ${statusCode} occurred on server`;

    if(statusCode === 403) {
      errorMessage = 'Forbidden Page';
    } else if(statusCode === 404) {
      errorMessage = 'Page Not Found';
    } else if(statusCode === 500) {
      errorMessage = 'Intenal Server Error';
    }
    
    return (
      <div style={{ width: '100%' }}>
          <h1 style={{ textAlign: 'center' }}>{statusCode} Error</h1>
          <h2 style={{ textAlign: 'center' }}>{errorMessage}</h2>
      </div>
    );
  }
}

Error.propTypes = {
  statusCode: PropTypes.number.isRequired
};

export default Error