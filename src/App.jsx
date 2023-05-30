import React, { useState, useEffect, useCallback } from "react";
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
  const [tema, setTema] = useState(theme);
  const [footerInfo, setFooterInfo] = useState(footerDefault);
  const [consents, setConsents] = useState([]);
  const [errorText, setErrorText] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  const getBranding = useCallback(() => {
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

  const getConsents = useCallback(() => {
    setErrorText("");
    setIsFetching(true);
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
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, []);

  useEffect(() => {
    getBranding();
  }, [getBranding]);

  useEffect(() => {
    getConsents();
  }, [getConsents]);

  const [basePath, setBasePath] = useState<string>();

    useEffect(() => {
        axios.get<any>('api/application/configuration')
            .then(value => {
                axios.defaults.baseURL = value.data.basePath;
                setBasePath(value.data.basePath);
            })
            .catch(reason => {
                console.log(reason);
                setBasePath('/');
            })
    }, [basePath]);

  return basePath ?
  (
    <ThemeProvider theme={tema}>
      <div className="App">
        <Header />
        <div className="main">
          <div className="row">
            <Consent
              consents={consents}
              footerInfo={footerInfo}
              errorText={errorText}
              setConsents={setConsents}
              isFetching={isFetching}
              setIsFetching={setIsFetching}
            />
          </div>
        </div>
        <Footer footerInfo={footerInfo} />
      </div>
    </ThemeProvider>
  ): <h1> Loading </h1>
}

export default App;
