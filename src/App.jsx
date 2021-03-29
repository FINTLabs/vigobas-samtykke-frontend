import React from 'react';
import './App.scss';
import { Header, Navbar, Consent, Footer } from './components/common';
import { appSettings } from './Config';

function App() {

  const [consents, setConsents] = React.useState([]);
  var user = { name:"John Doe" }
  React.useEffect(() => {
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
      .then(response => {
        console.log(response.headers)
      })
      .catch(console.log)
  }, []);

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
