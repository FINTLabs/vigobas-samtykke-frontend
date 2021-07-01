import React from 'react';
import './App.scss';
import { Header, Navbar, Consent, Footer } from './components/common';
import { appSettings } from './Config';
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";

const defaultTheme = createMuiTheme();


function App() {
  const theme = {
    ...defaultTheme,
    primaryColor: "#7a1668",
  };
  const [tema, setTema] = React.useState(theme);
  const [consents, setConsents] = React.useState([]);
  //const [logo, setLogo] = React.useState('company-logo.png')
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
      //setLogo(data.logo);
      setTema({...tema, primaryColor: data.primaryColor})
      console.log(theme.primaryColor);
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
    <ThemeProvider theme={tema}>
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
    </ThemeProvider>
  );
}

export default App;
