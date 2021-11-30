import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Switch from "@material-ui/core/Switch";
import { makeStyles } from "@material-ui/styles";

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
        <colgroup>
          <col style={{ width: "15%" }} />
          <col style={{ width: "15%" }} />
          <col style={{ width: "55%" }} />
          <col style={{ width: "15%" }} />
        </colgroup>
        <TableHead className={classes.tableHeader}>
          <TableRow className={classes.tableRow}>
            <TableCell align="left">
              <strong>Tjeneste</strong>
            </TableCell>
            <TableCell align="left">
              <strong>Personopplysning</strong>
            </TableCell>
            <TableCell align="left">
              <strong>Formål</strong>
            </TableCell>
            <TableCell align="center">
              <strong>Samtykke</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {consents.map((consent, i) => (
            <TableRow key={consent.systemIdValue} className={classes.tableRow}>
              <TableCell align="left">{consent.processorName}</TableCell>
              <TableCell align="left">{consent.personalDataName}</TableCell>
              <TableCell align="left">{consent.processing.formal}</TableCell>
              <TableCell align="center">
                {(consent.expirationDate === null ||
                  consent.active === undefined) && (
                  <Switch
                    checked={consent.active}
                    onChange={() => createConsent(i, consent)}
                    disabled={isFetching}
                    name="switch"
                  />
                )}
                {consent.expirationDate !== null &&
                  (consent.active === true || consent.active === false) && (
                    <Switch
                      checked={consent.active}
                      color="primary"
                      onChange={(e) => handleChange(e, i, consent)}
                      disabled={isFetching}
                      name="switch"
                    />
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
