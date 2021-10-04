import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";

import { Header, Consent, Footer } from "./components/common";
import "./App.scss";

const defaultTheme = createMuiTheme();

function App() {
  const theme = {
    ...defaultTheme,
    logo: "",
    primaryColor: "#7a1668",
    secondaryColor: "#513f35",
    featureColor1: "#0b8797",
    featureColor2: "#d0eaed",
  };
  const footerDefault = { countyName: "", phoneNumber: "", mail: "" };
  const [tema, setTema] = React.useState(theme);
  const [footerInfo, setFooterInfo] = React.useState(footerDefault);
  const [consents, setConsents] = React.useState([]);
  const [errorText, setErrorText] = React.useState("");

  const getBranding = React.useCallback(() => {
    setErrorText("");
    fetch(`api/branding`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.errorId) {
          const error = new Error("promise chain cancelled");
          error.message = `Det har skjedd en feil, prøv å logge inn på nytt.\n\n
          Ved gjentatte feilmeldinger, ta kontakt med din it-support og oppgi dette id-nummeret: ${data.errorId}`;
          throw error;
        }
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
            countyName: data.countyName,
          };
        });
      })
      .catch((error) => {
        setErrorText(error.message);
        console.error("Error:", error);
      });
  }, []);

  const getConsents = React.useCallback(() => {
    setErrorText("");
    fetch(`api/consents`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.errorId) {
          const error = new Error("promise chain cancelled");
          error.message = `
                Det har skjedd noe galt med innhenting av samtykkelisten din,
                prøv å logge inn på nytt.\n\n
                Ved gjentatte feilmeldinger, ta kontakt med din it-support og
                oppgi dette id-nummeret: ${data.errorId}`;
          throw error;
        }
        setConsents(data);
      })
      .catch((error) => {
        setErrorText(error.message);
        console.error("Error:", error);
      });
  }, []);

  React.useEffect(() => {
    getBranding();
    getConsents();
  }, [getBranding, getConsents]);

  return (
    <ThemeProvider theme={tema}>
      <div className="App">
        <Header />
        <div className="main">
          <div className="row">
            <Consent
              consents={consents}
              footerInfo={footerInfo}
              errorText={errorText}
            />
          </div>
        </div>
        <Footer footerInfo={footerInfo} />
      </div>
    </ThemeProvider>
  );
}

export default App;
