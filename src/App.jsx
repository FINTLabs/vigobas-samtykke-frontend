import React from 'react';
import './App.scss';
import { Header, Navbar, Consent, Footer } from './components/common';
import { appSettings } from './Config';

function App() {

  const [consents, setConsents] = React.useState([]);
  const [logo, setLogo] = React.useState('company-logo.png')
  const [branding, setBranding] = React.useState({
    logoCounty: '',
    primaryColor: '',
    primaryColorLight: '',
    secondaryColor: '',
    featureColor1: '',
    featureColor2: ''
  });
  var user = { name:"John Doe" }

  React.useEffect(() => {
    fetch(`${appSettings.ApiUri}branding`, {
      'method': 'GET',
      'headers': {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then((data) => {
      setLogo(data.logo);
      setBranding({
      ...branding, data
      });
      console.log(data);
    }).catch(console.log);

    fetch(`${appSettings.ApiUri}consents`, {
      'method': 'GET',
      'headers': {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then((data) => {
        setConsents(data);
      })
      .catch(console.log);

  }
  , []);


  return (
    <div className="App">
      <Header />
      <div className="main">
        <div className="row">
          <Navbar />
          <Consent consents={consents} user={user} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
