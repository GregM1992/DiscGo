/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import Image from 'next/image';
import { deleteBagByBagId } from '../newAPI/bagAPI';
import heart from '../public/heart.svg';
import emptyheart from '../public/emptyheart.svg';
import dgb from '../public/DiscBag.png';

export default function BagCard({ bagObj, onUpdate }) {
  const deleteThisBag = () => {
    if (window.confirm(`Delete ${bagObj.bagName}?`)) {
      deleteBagByBagId(bagObj.id).then(() => onUpdate());
    }
  };
  return (
    <Card className="bagCard" style={{ width: '18rem' }}>
      <Link href={`/myBag/${bagObj.id}`} passHref>
        <Image className="bagImg" variant="top" src={dgb} alt="bag image" />
      </Link>
      <Card.Body>
        <Card.Title className="bagName">{bagObj.bagName}</Card.Title>
        <p className="card-text bold">
          {bagObj.favorite ? (
            <span>
              <img id="emptyheart" src={heart.src} alt="heart icon" />
              <br />
            </span>
          ) : <img id="faveicon" src={emptyheart.src} alt="heart icon" /> }{' '}
          {bagObj.favorite}
        </p>
        <Button className="button" variant="outline-secondary" onClick={deleteThisBag}>
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

BagCard.propTypes = {
  bagObj: PropTypes.shape({
    bagName: PropTypes.string,
    id: PropTypes.number,
    userId: PropTypes.string,
    favorite: PropTypes.bool,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
