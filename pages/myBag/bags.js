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

  console.warn(bags);
  useEffect(() => {
    getAllBags();
  }, []);

  return (
    <div className="text-center my-4">
      <Link href="/myBag/new" passHref>
        <Button>Add Bag</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {bags.map((bag) => (
          <BagCard key={bag.firebaseKey} bagObj={bag} onUpdate={getAllBags} />
        ))}
      </div>

    </div>
  );
}

export default ShowBags;
