import React from 'react';
import PropTypes from 'prop-types';

export default function DiscCard({ discObj }) {
  return (
    <div>
      <div id="discDiv">
        <text>{discObj.brand}{discObj.name}</text>
      </div>
    </div>
  );
}

DiscCard.propTypes = {
  discObj: PropTypes.shape({
    name: PropTypes.string,
    brand: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
};
