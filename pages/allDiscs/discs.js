import React, { useEffect, useState } from 'react';
import DiscCard from '../../components/DiscCard';
import { getAllDiscs } from '../../api/extDiscData';

function ShowAllDiscs() {
  const [discs, setDiscs] = useState([]);

  const getAllTheDiscs = () => {
    getAllDiscs().then(setDiscs);
  };

  useEffect(() => {
    getAllTheDiscs();
  }, []);

  return (
    <div className="text-center my-4" id="discContainer">
      {discs.map((disc) => (
        <DiscCard key={disc.id} discObj={disc} onUpdate={getAllTheDiscs} />
      ))}
    </div>
  );
}

export default ShowAllDiscs;
