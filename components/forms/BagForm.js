import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createBag, updateBag } from '../../api/bagData';

const initialState = {
  bagName: '',
  favorite: false,
};

export default function BagForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...formInput, uid: user.uid };
    createBag(payload).then(({ name }) => {
      const patchPayload = { firebaseKey: name };
      updateBag(patchPayload).then(() => {
        router.push('/myBag/bags');
      });
    });
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Bag Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="What is this bags name?"
            name="bagName"
            value={formInput.bagName}
            onChange={handleChange}
          />
        </Form.Group>
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
        <Button variant="primary" type="submit">
          Done?
        </Button>
      </Form>
    </>
  );
}

BagForm.propTypes = {
  obj: PropTypes.shape({
    bagName: PropTypes.string,
    favorite: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }),
};

BagForm.defaultProps = {
  obj: initialState,
};
