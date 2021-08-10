import React from "react";
import "./App.scss";
import { Header, Navbar, Consent, Footer } from "./components/common";
import { appSettings } from "./Config";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";

const defaultTheme = createMuiTheme();

function App() {
  const theme = {
    ...defaultTheme,
    logo: "url('../../../content/images/company-logo.png')",
    primaryColor: "#7a1668",
    secondaryColor: "#513f35",
    featureColor1: "#0b8797",
    featureColor2: "#d0eaed",
  };
  const information = {
    mail: "brukerstotte@vigo.no",
    phoneNumber: "+47 99 05 55 99",
  };
  const [tema, setTema] = React.useState(theme);
  const [info, setInfo] = React.useState(information);
  console.log(info); // TODO use these
  const [consents, setConsents] = React.useState([]);
  var user = { name: "John Doe" };
  React.useEffect(() => {
    fetch(`${appSettings.ApiUri}branding`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTema((tema) => {
          return {
            ...tema,
            logo: data.logo,
            primaryColor: data.primaryColor,
            secondaryColor: data.secondaryColor,
            featureColor1: data.featureColor1,
            featureColor2: data.featureColor2,
            phoneNumber: data.phoneNumber,
            mail: data.mail,
          };
        });
        setInfo((info) => {
          return {
            ...info,
            phoneNumber: data.phoneNumber,
            mail: data.mail,
          };
        });
        console.log(tema);
      })
      .catch(console.log);

    fetch(`${appSettings.ApiUri}consents`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setConsents(data);
      })
      .catch(console.log);
  }, []);
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
