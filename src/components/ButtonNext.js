import React from 'react';
import PropTypes from 'prop-types';

function ButtonNext(props) {
  const { onClick } = props;
  return (
    <div>
      <button type="button" onClick={ onClick }>Próxima</button>
    </div>
  );
}

ButtonNext.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ButtonNext;
