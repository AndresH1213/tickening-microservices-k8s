import axios from 'axios';

const landingPage = ({ currentUser }) => {
  axios.get('/api/users/currentuser').catch(console.log);
  return <h1>Landing Page</h1>;
};

landingPage.getInitialProps = async () => {
  const response = await axios.get('/api/users/currentuser');

  return response.data;
};

export default landingPage;
