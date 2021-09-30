import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Paper from "@material-ui/core/Paper";
import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { green } from "@material-ui/core/colors";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import { appSettings } from "../../../Config";
import "./Consent.scss";

const useStyles = makeStyles((theme) => ({
  headerColor: {
    color: theme.primaryColor,
  },
  headerColor2: {
    color: theme.secondaryColor,
  },
  table: {
    minWidth: 350,
  },
  root: {
    "& > *": {
      // margin: theme.spacing(1),
    },
  },
  tableRow: {
    borderBottom: `1px solid rgba(${theme.featureColor2}, 01)`,
  },
  tableHeader: {
    borderBottom: `2px solid rgba(${theme.featureColor1}, 1) !important`,
  },
  errorHandler: {
    color: "#ff3333",
    marginBottom: "20px",
  },
}));

const GreenRadio = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const dateformatter = (datetime) => {
  if (datetime != null) {
    var date = new Date(datetime.toString());
    return date.toLocaleString("no-NO");
  }
  return "Ingen gyldig dato";
};

const Consent = ({ consents, footerInfo, errorText }) => {
  // const theme = useTheme();

  const [date, setDate] = React.useState([]);
  const [yDate, setYDate] = React.useState([]);
  const [nDate, setNDate] = React.useState([]);

  const filteredConsents = consents.map((consent) => {
    return consent.active.toString();
  });

  const [selectedConsents, setSelectedConsents] =
    React.useState(filteredConsents);

  React.useEffect(() => {
    const defaultDate = consents.map((consent) => {
      if (consent.expirationDate === null) {
        return appSettings.Untreated;
      } else if (consent.expirationDate !== null) {
        switch (consent.active) {
          case undefined:
            return appSettings.Untreated;
          case true:
            return dateformatter(consent.expirationDate.start);
          case false:
            if (consent.systemIdValue !== null) {
              return dateformatter(consent.expirationDate.slutt);
            }
            return appSettings.Untreated;
          default:
            return "Error";
        }
      }
      return "error";
    });
    setDate(defaultDate);

    const filteredConsents = consents.map((consent) => {
      return consent.active.toString();
    });
    if (filteredConsents.length) {
      setSelectedConsents(filteredConsents);
    }
  }, [consents, setSelectedConsents]);

  //console.log(selectedConsents);

  const handleChange = (event, index, consent) => {
    const updatedConsents = selectedConsents;
    updatedConsents[index] = event.target.value;
    setSelectedConsents([...updatedConsents]);

    if (event.target.value === "true") {
      yDate[index] = dateformatter(new Date());
    } else if (event.target.value === "false") {
      const arr = [...nDate];
      arr[index] = dateformatter(new Date());
      setNDate(arr);
    }

    const updatedConsent = { ...consent };
    updatedConsent.active = updatedConsents[index];
    console.log("Updating this object", updatedConsent);

    fetch(
      `${appSettings.ApiUri}${updatedConsent.systemIdValue}/${updatedConsent.processing.systemId.identifikatorverdi}/${updatedConsent.active}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      //.then(setDate(prevDate => [...prevDate, prevDate[index] = dateformatter(new Date())]))
      .catch(console.log);
  };

  const createConsent = (event, index, consent) => {
    const consentCreating = { ...consent };
    console.log("Creating consent with: ", consentCreating);
    const updatedConsentsActive = selectedConsents;
    updatedConsentsActive[index] = true.toString();
    setSelectedConsents([...updatedConsentsActive]);

    setDate((prevDate) => [
      ...prevDate,
      (prevDate[index] = dateformatter(new Date())),
    ]);
    setYDate((prevDate) => [...prevDate, (prevDate[index] = date[index])]);

    fetch(
      `${appSettings.ApiUri}/${consentCreating.processing.systemId.identifikatorverdi}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      //.then(setDate(prevDate => [...prevDate, prevDate[index] = dateformatter(new Date())]))
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
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead className={classes.tableHeader}>
                  <TableRow className={classes.tableRow}>
                    <TableCell align="center">
                      <strong>Tjeneste</strong>
                    </TableCell>
                    <TableCell align="center">
                      <strong>Personopplysning</strong>
                    </TableCell>
                    <TableCell align="center">
                      <strong>Dato start</strong>
                    </TableCell>
                    <TableCell align="center">
                      <strong>Dato slutt</strong>
                    </TableCell>
                    <TableCell align="center">
                      <strong>Samtykke</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {consents.map((consent, i) => (
                    <TableRow
                      key={consent.systemIdValue}
                      className={classes.tableRow}
                    >
                      <TableCell align="center">
                        {consent.processorName}
                      </TableCell>
                      <TableCell align="center">
                        {consent.personalDataName}
                      </TableCell>
                      <TableCell align="center">
                        {date[i] === appSettings.Untreated && date[i]}
                        {selectedConsents[i] === "true" &&
                          consent.expirationDate !== null &&
                          yDate[i] === undefined &&
                          nDate[i] === undefined &&
                          dateformatter(consent.expirationDate.start)}
                        {selectedConsents[i] === "true" &&
                          yDate[i] !== undefined &&
                          yDate[i]}
                        {selectedConsents[i] === "false" &&
                          consent.expirationDate !== null &&
                          yDate[i] === undefined &&
                          dateformatter(consent.expirationDate.start)}
                        {selectedConsents[i] === "false" &&
                          yDate[i] !== null &&
                          yDate[i]}
                      </TableCell>
                      <TableCell align="center">
                        {selectedConsents[i] === "false" &&
                          consent.expirationDate !== null &&
                          nDate[i] === undefined &&
                          date[i]}
                        {selectedConsents[i] === "false" &&
                          nDate[i] !== null &&
                          nDate[i]}
                        {selectedConsents[i] === "true" && ""}
                      </TableCell>
                      <TableCell align="center">
                        {date[i] === appSettings.Untreated && (
                          <Button
                            className={classes.root}
                            onClick={(e) => createConsent(e, i, consent)}
                            variant="outlined"
                            color="primary"
                            endIcon={<AddIcon />}
                          >
                            Gi samtykke
                          </Button>
                        )}
                        {date[i] !== appSettings.Untreated &&
                          (consent.active === true ||
                            consent.active === false) && (
                            <RadioGroup
                              row
                              aria-label="consentRadio"
                              name="consent1"
                              value={
                                selectedConsents[i] ? selectedConsents[i] : ""
                              }
                              onChange={(e) => handleChange(e, i, consent)}
                            >
                              <FormControlLabel
                                value="true"
                                control={<GreenRadio />}
                                label="Ja"
                              />
                              <FormControlLabel
                                value="false"
                                control={<Radio />}
                                label="Nei"
                              />
                            </RadioGroup>
                          )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </section>
        </section>
      </section>
    </section>
  );
};
export default Consent;
