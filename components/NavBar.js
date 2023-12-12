/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav,
} from 'react-bootstrap';
import Image from 'next/image';
import dgb from '../public/DiscBag.png';

export default function NavBar() {
  return (
    <Navbar className="navBar" sticky="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container className="navContainer">
        <Link passHref href="/">
          <Navbar.Brand className="discGoNameLogo">
            <Image
              alt="Bag Logo"
              src={dgb}
              width="65rem"
              height="65rem"
              className="bagLogo"
            />{' '}DiscGo
          </Navbar.Brand>
        </Link>
        <Nav className="me-auto navLinks">
          {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
          <Link passHref href="/myBag/bags">
            <Nav.Link>My Bags </Nav.Link>
          </Link>
          <Link passHref href="/allDiscs/discs">
            <Nav.Link>All Discs</Nav.Link>
          </Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
