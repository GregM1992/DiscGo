import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Button, FormControl } from 'react-bootstrap';
import { useRouter } from 'next/router';
import DiscCard from '../../components/DiscCard';
import { getAllDiscs, searchDiscsByName } from '../../api/extDiscData';

function ShowAllDiscs() {
  const [discs, setDiscs] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const router = useRouter();

  const getAllTheDiscs = () => {
    getAllDiscs().then(setDiscs);
  };

  const handleSearch = (e) => {
    setSearchInput(e.target.value.toLowerCase());
  };

  const handleClick = (id) => {
    router.push(`/allDiscs/${id}`);
  };

  useEffect(() => {
    if (searchInput.trim() !== '') {
      searchDiscsByName(searchInput).then((filteredDisc) => {
        setDiscs(filteredDisc);
      });
    } else {
      getAllDiscs().then(setDiscs);
    }
    if (discs.length === 0) {
      setDiscs([]);
    }
  }, [searchInput]);

  return (
    <>
      <Form className="search-bar">
        <FormControl type="text" size="sm" onChange={handleSearch} value={searchInput} />
      </Form>
      <div className="text-center my-4" id="discContainer">

        {discs.map((disc) => (
          <Button className="discButton" key={disc.id} onClick={() => handleClick(disc.id)}>
            <DiscCard key={disc.id} discObj={disc} onUpdate={getAllTheDiscs} />
          </Button>
        ))}
      </div>
    </>
  );
}

export default ShowAllDiscs;
