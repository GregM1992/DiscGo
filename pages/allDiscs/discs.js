import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Button, FormControl } from 'react-bootstrap';
import { useRouter } from 'next/router';
import DiscCard from '../../components/DiscCard';
import { getAllDiscs, searchDiscsByBrand, searchDiscsByName } from '../../api/extDiscData';

function ShowAllDiscs() {
  const [discs, setDiscs] = useState([]);
  const [nameSearchInput, setNameSearchInput] = useState('');
  const [brandSearchInput, setBrandSearchInput] = useState('');
  const router = useRouter();

  const getAllTheDiscs = () => {
    getAllDiscs().then(setDiscs);
  };

  const handleNameSearch = (e) => {
    setNameSearchInput(e.target.value.toLowerCase());
  };
  const handleBrandSearch = (e) => {
    setBrandSearchInput(e.target.value.toLowerCase());
  };

  const handleClick = (id) => {
    router.push(`/allDiscs/${id}`);
  };

  useEffect(() => {
    if (nameSearchInput.trim() !== '') {
      searchDiscsByName(nameSearchInput).then((filteredDisc) => {
        setDiscs(filteredDisc);
      });
    } else {
      getAllDiscs().then(setDiscs);
    }
    if (discs.length === 0) {
      setDiscs([]);
    }
  }, [nameSearchInput]);

  useEffect(() => {
    if (brandSearchInput.trim() !== '') {
      searchDiscsByBrand(brandSearchInput).then((filteredDisc) => {
        setDiscs(filteredDisc);
      });
    } else {
      getAllDiscs().then(setDiscs);
    }
    if (discs.length === 0) {
      setDiscs([]);
    }
  }, [brandSearchInput]);

  return (
    <>
      <h2 className="allDiscHeader"> All Discs</h2>
      <Form className="search-bar">
        <FormControl placeholder="Search by Name" type="text" size="sm" onChange={handleNameSearch} value={nameSearchInput} />
      </Form>
      <Form className="search-bar">
        <FormControl placeholder="Search by Brand" type="text" size="sm" onChange={handleBrandSearch} value={brandSearchInput} />
      </Form>
      <div className="text-center my-4" id="discContainer">
        {discs.map((disc) => (
          <Button className="discButton" variant="transparent" key={disc.id} onClick={() => handleClick(disc.id)}>
            <DiscCard key={disc.id} discObj={disc} onUpdate={getAllTheDiscs} />
          </Button>
        ))}
      </div>
    </>
  );
}

export default ShowAllDiscs;
