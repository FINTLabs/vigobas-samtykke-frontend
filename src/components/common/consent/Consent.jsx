import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import ConsentTable from "./ConsentTable";
import "./Consent.scss";

const useStyles = makeStyles((theme) => ({
  errorHandler: {
    color: "#ff3333",
    marginBottom: "20px",
  },
  headerColor: {
    color: theme.primaryColor,
  },
  headerColor2: {
    color: theme.secondaryColor,
  },
}));

const Consent = ({ consents, footerInfo, errorText, setConsents }) => {
  const [isFetching, setIsFetching] = useState(false);

  const handleChange = (event, index, consent) => {
    setIsFetching(true);
    fetch(
      `api/${consent.systemIdValue}/${consent.processing.systemId.identifikatorverdi}/${event.target.value}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((consentPut) => {
        setConsents((prevConsents) => {
          let tempArr = [...prevConsents];
          tempArr[index] = consentPut;
          return [...tempArr];
        });
        setIsFetching(false);
      })
      .catch(console.log);
  };

  const createConsent = (index, consent) => {
    setIsFetching(true);
    fetch(`api/${consent.processing.systemId.identifikatorverdi}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((consentPost) => {
        setConsents((prevConsents) => [
          ...prevConsents,
          (prevConsents[index] = consentPost),
        ]);
        setIsFetching(false);
      })
      .catch(console.log);
  };

  const classes = useStyles();
  return (
    <section className="consent">
      <section className="row">
        <section className="row-1">
          {errorText !== "" && (
            <p className={classes.errorHandler}>{errorText}</p>
          )}
          <h1 className={classes.headerColor}>Velkommen!</h1>
          <p>
            Denne siden gir deg oversikt over dine samtykker hos{" "}
            {footerInfo.countyName}.{" "}
          </p>
        </section>
        <section className="row-3">
          <h2 className={classes.headerColor2}>Samtykker</h2>
          <section className="consent-table">
            <ConsentTable
              consents={consents}
              handleChange={handleChange}
              isFetching={isFetching}
              createConsent={createConsent}
            />
          </section>
        </section>
      </section>
    </section>
  );
};
export default Consent;
