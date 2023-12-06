import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Button, Dropdown, FormControl } from 'react-bootstrap';
import { useRouter } from 'next/router';
import DiscCard from '../../components/DiscCard';
import { getAllDiscs, searchDiscsByName } from '../../api/extDiscData';

function ShowAllDiscs() {
  const [discs, setDiscs] = useState([]);
  const [nameSearchInput, setNameSearchInput] = useState('');
  const [brands, setBrands] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const router = useRouter();

  const getAllTheDiscs = () => {
    getAllDiscs().then(setDiscs);
  };

  const handleNameSearch = (e) => {
    setNameSearchInput(e.target.value.toLowerCase());
  };
  const handleCheckboxChange = (e, brand) => {
    const { checked } = e.target;

    let updatedBrands;
    if (checked) {
      updatedBrands = [...selectedBrands, brand]; // adds the checked brand to the updated brands array
    } else {
      updatedBrands = selectedBrands.filter((selectedBrand) => selectedBrand !== brand); // removes unchecked brands
    }

    setSelectedBrands(updatedBrands);

    const filteredDiscs = discs.filter((disc) => {
      if (updatedBrands.length === 0) {
        getAllDiscs().then(setDiscs(filteredDiscs));
      }
      return updatedBrands.includes(disc.brand);
    });

    setDiscs(filteredDiscs);
    console.warn(selectedBrands);
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
    getAllDiscs().then((allDiscs) => {
      const uniqueBrands = [...new Set(allDiscs.map((disc) => disc.brand))];
      setBrands(uniqueBrands);
    });
  }, [discs]);

  return (
    <>
      <h2 className="allDiscHeader"> All Discs</h2>
      <Form className="search-bar">
        <FormControl placeholder="Search by Name" type="text" size="sm" onChange={handleNameSearch} value={nameSearchInput} />
      </Form>
      <Form className="search-bar" onClick={(e) => e.stopPropagation()}>
        <Dropdown>
          <Dropdown.Toggle variant="light" id="dropdown-brands">
            Select Brands
          </Dropdown.Toggle>
          <Dropdown.Menu style={{ maxHeight: '200px', overflowY: 'scroll' }}>
            {brands.map((brand) => (
              <Dropdown.Item key={brand}>
                <Form.Check
                  type="checkbox"
                  id={`brand-${brand}`}
                  label={brand}
                  onChange={(e) => handleCheckboxChange(e, brand)}
                  checked={selectedBrands.includes(brand)}
                />
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
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
