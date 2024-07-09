import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { checkUser, registerUser } from '../../utils/auth';
import { useAuth } from '../../utils/context/authContext';

function RegisterForm() {
  const user = useAuth();
  const [formData, setFormData] = useState({
    uid: user.user.uid,
    userName: '',
    email: user.userEmail,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(formData).then(checkUser(user.user.uid)).then(() => {
      window.location.reload();
    });
  };

  const handleChange = ({ target }) => {
    setFormData((prev) => ({ ...prev, [target.name]: target.value }));
  };

  return (
    <Form className="registerForm" onSubmit={handleSubmit}>
      <Form.Group className="mb-3 registerInputs topInput" controlId="formBasicEmail">
        <Form.Control
          as="textarea"
          name="userName"
          required
          placeholder="Enter your Username"
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant="outline-success" className="registerButton" type="submit">
        Submit
      </Button>
    </Form>
  );
}

RegisterForm.propTypes = {
  user: PropTypes.shape({
    userId: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export default RegisterForm;
