/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { updateBaggedDisc } from '../../api/discData';

const initialState = {
  aces: 0,
  favorite: false,
  birdies: 0,
  longestThrow: '',
};

export default function DiscStatForm({ statObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();

  useEffect(() => {
    if (statObj.firebaseKey) setFormInput(statObj);
  }, [statObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const shotValue = (name === 'aces' || name === 'birdies') ? parseInt(value, 10) : value;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: shotValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateBaggedDisc(formInput).then(() => {
      router.push(`/myBag/${statObj.bagId}`);
    });
  };

  return (
    <>
      <Form className="discStatForm" onSubmit={handleSubmit}>
        <div className="discForm">
          <Form.Group className="mb-3">
            <Form.Label>Aces</Form.Label>
            <Form.Control
              className="inputField"
              type="number"
              placeholder="Aces"
              name="aces"
              value={formInput.aces}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Label>Birdies</Form.Label>
          <Form.Control
            className="inputField"
            type="number"
            placeholder="Birdies"
            name="birdies"
            value={formInput.birdies}
            onChange={handleChange}
          />
          <Form.Label>Longest Throw</Form.Label>
          <div className="longestThrow">
            <Form.Control
              className="inputField"
              type="text"
              placeholder="Longest Throw"
              name="longestThrow"
              value={formInput.longestThrow}
              onChange={handleChange}
            />
            <p className="ft">ft</p>
          </div>
          <Form.Check
            className="text-black mb-3"
            type="switch"
            id="favorite"
            name="favorite"
            label="Favorite?"
            checked={formInput.favorite}
            onChange={(e) => {
              setFormInput((prevState) => ({
                ...prevState,
                favorite: e.target.checked,
              }));
            }}
          />
          <Button className="bagDiscBtn" variant="outline-secondary" type="submit">
            Done?
          </Button>
        </div>
        <div className="flightPath">
          <img src={statObj.pic} alt="probable flight path" />
        </div>
      </Form>
    </>
  );
}

DiscStatForm.propTypes = {
  statObj: PropTypes.shape({
    aces: PropTypes.number,
    birdies: PropTypes.number,
    longestThrow: PropTypes.string,
    bagId: PropTypes.string,
    firebaseKey: PropTypes.string,
    pic: PropTypes.string,
    favorite: PropTypes.bool,
  }),
};

DiscStatForm.defaultProps = {
  statObj: initialState,
};
