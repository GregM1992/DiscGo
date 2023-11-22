import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
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
  console.warn(baggedDiscs);
  return (
    <div>
      {baggedDiscs?.map((disc) => (
        <BaggedDiscCard
          key={disc.firebaseKey}
          discObj={disc}
          onUpdate={getBagsDiscs}
        />
      ))}
    </div>
  );
}
