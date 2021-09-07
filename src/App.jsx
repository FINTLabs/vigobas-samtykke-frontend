import React from "react";
import "./App.scss";
import { Header, Consent, Footer } from "./components/common";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";

const defaultTheme = createMuiTheme();

function App() {
  const theme = {
    ...defaultTheme,
    logo: "url('./content/images/company-logo.png')",
    primaryColor: "#7a1668",
    secondaryColor: "#513f35",
    featureColor1: "#0b8797",
    featureColor2: "#d0eaed",
  };

  const defaultInformation = {
    mail: "brukerstotte@vigo.no",
    phoneNumber: "+47 99 05 55 99",
    countyName: "Vigo IKS"
  };

  const [tema, setTema] = React.useState(theme);
  const [footerInfo, setFooterInfo] = React.useState(defaultInformation);
  const [consents, setConsents] = React.useState([]);

  React.useEffect(() => {
    fetch(`api/branding`, {
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
          };
        });
        setFooterInfo((info) => {
          return {
            ...info,
            phoneNumber: data.phoneNumber,
            mail: data.mail,
            countyName: data.countyName          
          };
        });
      })
      .catch(console.log);

    fetch(`api/consents`, {
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
            <Consent consents={consents} footerInfo={footerInfo}/>
          </div>
        </div>
        <Footer footerInfo={footerInfo} />
      </div>
    </ThemeProvider>
  );
}

export default App;
