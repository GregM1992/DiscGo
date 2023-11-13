import React, { useEffect, useState } from 'react';
import DiscCard from '../../components/DiscCard';
import getAllDiscs from '../../api/discData';

function ShowAllDiscs() {
  const [discs, setDiscs] = useState([]);

  const getAllTheDiscs = () => {
    getAllDiscs().then(setDiscs);
  };

  useEffect(() => {
    getAllTheDiscs();
  }, []);

  return (
    <div className="text-center my-4">
      {discs.map((disc) => (
        <DiscCard key={disc.id} discObj={disc} onUpdate={getAllTheDiscs} />
      ))}
    </div>
  );
}

export default ShowAllDiscs;
