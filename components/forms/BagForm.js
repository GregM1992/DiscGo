import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createNewBag, updateBagByBagId } from '../../newAPI/bagAPI';

const initialState = {
  bagName: '',
  favorite: false,
};

export default function BagForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.id) setFormInput(obj);
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
    if (obj.id) {
      updateBagByBagId(obj.id, formInput).then(() => {
        router.push('/myBag/bags');
      });
    } else {
      const payload = { ...formInput, userId: user.uid };
      createNewBag(payload).then(() => {
        router.push('/myBag/bags');
      });
    }
  };

  return (
    <>
      <h2 className="bagFormHeader">Name your bag!</h2>
      <Form className="bagForm" onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Control
            className="bagInputField"
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
        <Button className="button" variant="outline-secondary" type="submit">
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
    id: PropTypes.number,
  }),
};

BagForm.defaultProps = {
  obj: initialState,
};
