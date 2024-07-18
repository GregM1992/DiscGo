/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { getUsersBags } from '../../newAPI/bagAPI';
import { getSingleUser } from '../../newAPI/userAPI';
import BagCard from '../../components/BagCard';

function ShowBags() {
  const [bags, setBags] = useState([]);
  const [appUser, setAppUser] = useState({});

  const { user } = useAuth();

  const getAllBags = () => {
    getUsersBags(user.uid).then(setBags);
  };
  const getUser = () => {
    getSingleUser(user.uid).then((data) => setAppUser(data));
  };

  useEffect(() => {
    getUser();
    getAllBags();
  }, [appUser.id]);

  if (bags.length < 1) {
    return (
      <div className="noBagsDiv"><p className="text-center"> There are no bags yet.</p>
        <Link href="/myBag/new" passHref>
          <Button variant="outline-secondary" className="button addBagIfNone">Add Bag</Button>
        </Link>
      </div>
    );
  } return (
    <div className="text-center bagPage">
      <h2>{appUser.userName}'s Bags</h2>
      <Link href="/myBag/new" passHref>
        <Button variant="outline-secondary" className="addBagBtn">Add Bag</Button>
      </Link>
      <div className="d-flex flex-wrap bagContainer">
        {bags.map((bag) => (
          <BagCard key={bag.firebaseKey} bagObj={bag} onUpdate={getAllBags} />
        ))}
      </div>

    </div>
  );
}

export default ShowBags;
