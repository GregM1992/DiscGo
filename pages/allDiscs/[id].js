import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getDiscDetails } from '../../api/extDiscData';
import ExtDiscStatForm from '../../components/forms/ExtDiscStatForm';

export default function ViewBagsDiscs() {
  const [discDetails, setDiscDetails] = useState([]);

  const router = useRouter();

  const { id } = router.query;

  const showDiscDetails = () => {
    getDiscDetails(id).then(setDiscDetails);
  };

  useEffect(() => {
    showDiscDetails();
  }, [id]);

  return (

    <div>
      {discDetails.map((extDiscObj) => (
        <ExtDiscStatForm
          key={extDiscObj.id}
          extDiscObj={extDiscObj}
          onUpdate={showDiscDetails}
        />
      ))}
    </div>
  );
}
