import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Paper from "@material-ui/core/Paper";
import RadioGroup from "@material-ui/core/RadioGroup";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Radio from "@material-ui/core/Radio";
import { green } from "@material-ui/core/colors";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";

import { dateformatter } from "../../_utilities/date";

const useStyles = makeStyles((theme) => ({
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

const ConsentTable = ({
  consents,
  handleChange,
  isFetching,
  createConsent,
}) => {
  const classes = useStyles();
  return (
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
            <TableRow key={consent.systemIdValue} className={classes.tableRow}>
              <TableCell align="center">{consent.processorName}</TableCell>
              <TableCell align="center">{consent.personalDataName}</TableCell>
              <TableCell align="center">
                {dateformatter(consent.expirationDate.start)}
              </TableCell>
              <TableCell align="center">
                {dateformatter(consent.expirationDate.slutt)}
              </TableCell>
              <TableCell align="center">
                {(consent.expirationDate === null ||
                  consent.active === undefined) && (
                  <Button
                    className={classes.root}
                    onClick={() => createConsent(i, consent)}
                    variant="outlined"
                    color="primary"
                    endIcon={<AddIcon />}
                  >
                    Gi samtykke
                  </Button>
                )}
                {consent.expirationDate !== null &&
                  (consent.active === true || consent.active === false) && (
                    <RadioGroup
                      row
                      aria-label="consentRadio"
                      name="consent1"
                      value={consent.active}
                      onChange={(e) => handleChange(e, i, consent)}
                    >
                      <FormControlLabel
                        value={true}
                        control={<GreenRadio />}
                        label="Ja"
                        disabled={isFetching}
                      />
                      <FormControlLabel
                        value={false}
                        control={<Radio />}
                        label="Nei"
                        disabled={isFetching}
                      />
                    </RadioGroup>
                  )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ConsentTable;
