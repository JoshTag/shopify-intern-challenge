import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const AlertContainer = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background: #ff7d7d;
  padding: 1rem 3rem;
  color: #fff;
  border-radius: 3px;
  display: ${(props) => (props.showAlert ? 'block' : 'none')};
  /* transition: 0.3s; */
`;

// eslint-disable-next-line arrow-body-style
const Alert = ({ alert }) => {
  return (
    <AlertContainer showAlert={alert}>
      <span>You already have 5 nominations</span>
    </AlertContainer>
  );
};

Alert.propTypes = {
  alert: PropTypes.bool,
};

export default Alert;
