import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import DiscStatForm from '../../components/forms/DiscStatForm';
import { getSingleBaggedDisc } from '../../api/discData';

export default function ViewBaggedDiscsStats() {
  const [baggedDiscsStats, setBaggedDiscsStats] = useState([]);

  const router = useRouter();

  const { firebaseKey } = router.query;

  const getBagsDiscStats = () => {
    getSingleBaggedDisc(firebaseKey).then(setBaggedDiscsStats);
  };

  useEffect(() => {
    getBagsDiscStats();
  }, [firebaseKey]);

  return (

    <div>
      {baggedDiscsStats.map((statObj) => (
        <DiscStatForm
          key={statObj.firebaseKey}
          statObj={statObj}
          onUpdate={getBagsDiscStats}
        />
      ))}
    </div>

  );
}
