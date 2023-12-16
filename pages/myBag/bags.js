/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { getBags } from '../../api/bagData';
import BagCard from '../../components/BagCard';

function ShowBags() {
  const [bags, setBags] = useState([]);

  const { user } = useAuth();

  const getAllBags = () => {
    getBags(user.uid).then(setBags);
  };

  useEffect(() => {
    getAllBags();
  }, []);

  return (
    <div className="text-center bagPage">
      <h2>{user.displayName}'s Bags</h2>
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
