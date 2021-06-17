import React from 'react';
import PropTypes from 'prop-types';

function ButtonNext(props) {
  const { onClick } = props;
  console.log(onClick);
  return (
    <div>
      <button type="button" onClick={ onClick }>PROSSEGUIR</button>
    </div>
  );
}

ButtonNext.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ButtonNext;
