import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import BaggedDiscCard from '../../components/BaggedDiscCard';
import { getAllBaggedDiscsByBag } from '../../api/discData';

export default function ViewBagsDiscs() {
  const [baggedDiscs, setBaggedDiscs] = useState([]);

  const router = useRouter();

  const { bagId } = router.query;

  const getBagsDiscs = () => {
    getAllBaggedDiscsByBag(bagId)?.then(setBaggedDiscs);
  };

  useEffect(() => {
    getBagsDiscs();
  }, [bagId]);

  return (
    <>
      <Link passHref href="/allDiscs/discs">
        <Button className="addDiscBtn" variant="outline-secondary"> Add Disc </Button>
      </Link>
      <div className="bagDetailsPage">
        {baggedDiscs?.map((disc) => (
          <BaggedDiscCard
            key={disc.firebaseKey}
            discObj={disc}
            onUpdate={getBagsDiscs}
          />
        ))}
      </div>
    </>
  );
}
