/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createBaggedDisc, updateBaggedDisc } from '../../api/discData';
import { getBags } from '../../api/bagData';

export default function ExtDiscStatForm({ extDiscObj }) {
  const [formInput, setFormInput] = useState({});
  const [bags, setBags] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (extDiscObj.id)setFormInput(extDiscObj);
    getBags(user.uid).then(setBags);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createBaggedDisc(formInput).then(({ name }) => {
      const patchPayload = { firebaseKey: name };
      updateBaggedDisc(patchPayload).then(() => router.push(`/myBag/${formInput.bagId}`));
    });
  };

  return (
    <>
      <Form className="addDiscForm" onSubmit={handleSubmit}>
        <div className="unchangeableSection">
          <Form.Group>
            <Form.Label className="inputLabel">Name</Form.Label>
            <Form.Control
              className="discInfo"
              type="text"
              placeholder={extDiscObj.name}
              name="name"
              value={formInput.name}
              onChange={handleChange}
              disabled
            />
          </Form.Group>
          <Form.Label className="inputLabel">Brand</Form.Label>
          <Form.Control
            className="discInfo"
            type="text"
            placeholder={formInput.brand}
            name="brand"
            value={formInput.brand}
            onChange={handleChange}
            disabled
          />
          <Form.Label className="inputLabel">Speed</Form.Label>
          <Form.Control
            className="discInfo"
            type="text"
            placeholder={formInput.speed}
            name="speed"
            value={formInput.speed}
            onChange={handleChange}
            disabled
          />
          <Form.Label className="inputLabel">Glide</Form.Label>
          <Form.Control
            className="discInfo"
            type="text"
            placeholder={formInput.glide}
            name="glide"
            value={formInput.glide}
            onChange={handleChange}
            disabled
          />
          <Form.Label className="inputLabel">Turn</Form.Label>
          <Form.Control
            className="discInfo"
            type="text"
            placeholder={formInput.turn}
            name="turn"
            value={formInput.turn}
            onChange={handleChange}
            disabled
          />
          <Form.Label className="inputLabel">Fade</Form.Label>
          <Form.Control
            className="discInfo"
            type="text"
            placeholder={formInput.fade}
            name="fade"
            value={formInput.fade}
            onChange={handleChange}
            disabled
          />
        </div>
        <div className="selectables">
          <Form.Check
            className="text-white mb-3"
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
          <Form.Select
            label="Bag"
            name="bagId"
            onChange={handleChange}
            className="mb-3 chooseBag"
            value={formInput.bagId}
            required
          >
            <option value="" label="Add to which bag?" />
            {
            bags.map((bag) => (
              <option
                key={bag.firebaseKey}
                value={bag.firebaseKey}
                label={bag.bagName}
              />
            ))
          }
          </Form.Select>
        </div>
        <Button className="addDiscBtn button" variant="outline-secondary" type="submit">
          Done?
        </Button>
        <div className="flightPath">
          <img src={formInput.pic} alt="probable flight path" />
        </div>
      </Form>
    </>
  );
}

ExtDiscStatForm.propTypes = {
  extDiscObj: PropTypes.shape({
    id: PropTypes.string,
    brand: PropTypes.string,
    name: PropTypes.string,
    speed: PropTypes.string,
    glide: PropTypes.string,
    turn: PropTypes.string,
    fade: PropTypes.string,
    pic: PropTypes.string,
  }).isRequired,
};
