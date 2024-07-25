import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import DiscStatForm from '../../components/forms/DiscStatForm';
import getSingleBaggedDiscInfo from '../../newAPI/baggedDiscAPI';

export default function ViewBaggedDiscsStats() {
  const [baggedDiscsStats, setBaggedDiscsStats] = useState({});

  const router = useRouter();

  const { baggedDiscId } = router.query;

  const getBagsDiscStats = () => {
    getSingleBaggedDiscInfo(baggedDiscId).then(setBaggedDiscsStats);
  };

  useEffect(() => {
    getBagsDiscStats();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baggedDiscId]);

  return (

    <div>
      <DiscStatForm
        key={baggedDiscsStats.id}
        statObj={baggedDiscsStats}
        onUpdate={getBagsDiscStats}
      />

    </div>

  );
}
