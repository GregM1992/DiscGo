/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import Image from 'next/image';
import { deleteBaggedDisc } from '../api/discData';
import emptyheart from '../public/emptyheart.svg';
import heart from '../public/heart.svg';
import trash from '../public/trashcan.svg';

export default function BaggedDiscCard({ discObj, onUpdate }) {
  const deleteThisDiscFromBag = () => {
    if (window.confirm('Remove this Disc?')) {
      deleteBaggedDisc(discObj.firebaseKey).then(() => onUpdate());
    }
  };
  return (
    <div>
      <Card className="baggedDiscCard">
        <Card.Body className="baggedDiscCardBody">
          <Link href={`/singleDisc/${discObj.firebaseKey}`}>
            <div className="discDiv" style={{ backgroundColor: `${discObj.background_color}`, color: `${discObj.color}` }}>
              {discObj.name}
            </div>
          </Link>
          <div className="bcInfo">
            <Card.Title className="discName">{discObj.brand}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted" />
            <Card.Text className="flightNum">{discObj.speed} | {discObj.glide} | {discObj.turn} | {discObj.fade}</Card.Text>
            <Button className="trashcan" variant="outline" onClick={deleteThisDiscFromBag}>
              <Image src={trash} className="trashcan" />
            </Button>
            <p className="card-text bold">
              {discObj.favorite ? (
                <span>
                  <img id="emptyheart" src={heart.src} alt="heart icon" />
                  <br />
                </span>
              ) : <img id="faveicon" src={emptyheart.src} alt="heart icon" /> }{' '}
              {discObj.favorite}
            </p>
          </div>
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
