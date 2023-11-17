/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { deleteBaggedDisc } from '../api/discData';
import emptyheart from '../public/emptyheart.svg';
import heart from '../public/heart.svg';

export default function BaggedDiscCard({ discObj, onUpdate }) {
  const deleteThisDiscFromBag = () => {
    if (window.confirm('Remove this Disc?')) {
      deleteBaggedDisc(discObj.firebaseKey).then(() => onUpdate());
    }
  };
  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <div className="discDiv" style={{ backgroundColor: `${discObj.background_color}`, color: `${discObj.color}` }}>
            {discObj.name}
          </div>
          <Card.Title>{discObj.brand}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted" />
          <Card.Text> {discObj.speed}|{discObj.glide}|{discObj.turn}|{discObj.fade}|</Card.Text>
          <Button variant="primary" onClick={deleteThisDiscFromBag}>
            DELETE
          </Button>
          <Link href={`/singleDisc/${discObj.firebaseKey}`}>VIEW</Link>
          <p className="card-text bold">
            {discObj.favorite ? (
              <span>
                <img id="emptyheart" src={heart.src} alt="heart icon" />
                <br />
              </span>
            ) : <img id="faveicon" src={emptyheart.src} alt="heart icon" /> }{' '}
            {discObj.favorite}
          </p>
        </Card.Body>
      </Card>
    </div>
  );
}

BaggedDiscCard.propTypes = {
  discObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    favorite: PropTypes.bool,
    id: PropTypes.string,
    bagId: PropTypes.string,
    name: PropTypes.string,
    brand: PropTypes.string,
    speed: PropTypes.string,
    glide: PropTypes.string,
    turn: PropTypes.string,
    fade: PropTypes.string,
    color: PropTypes.string,
    background_color: PropTypes.string,
    pic: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
