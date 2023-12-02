import { Button } from 'react-bootstrap';
import Image from 'next/image';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import courseImg from '../public/discgolf course Photo.jpg';

function Home() {
  const { user } = useAuth();

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center welcomeDiv"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '800px',
        margin: '0 auto',
      }}
    >
      <h2>Hey {user.displayName}!</h2>
      <h1> Welcome to DiscGo!</h1>
      <Image src={courseImg} className="welcomeImg" />
      <h2> A disc golf bag organizer!</h2>
      <p> To get started click on the My Bag tab in the nav bar and create a bag. </p>
      <p> Once a bag is created, navigate to the All Discs tab and search for the disc you would like to add. Once found you can click the disc and follow the instructions from there!</p>
      <Button variant="outline-danger" type="button" size="lg" className="copy-btn" onClick={signOut}>
        Sign Out
      </Button>
    </div>
  );
}

export default Home;
