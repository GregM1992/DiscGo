import React from 'react';
import PropTypes from 'prop-types';

// TODO: make an all disc details card to link disc card to to see stats for each disc

export default function DiscCard({ discObj }) {
  return (
    <div>

      <div className="discDiv" style={{ backgroundColor: `${discObj.background_color}`, color: `${discObj.color}` }}>
        {discObj.name}
      </div>

    </div>
  );
}

DiscCard.propTypes = {
  discObj: PropTypes.shape({
    name: PropTypes.string,
    brand: PropTypes.string,
    id: PropTypes.string,
    color: PropTypes.string,
    background_color: PropTypes.string,
  }).isRequired,
};
