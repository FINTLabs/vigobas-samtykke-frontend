import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { appSettings } from "../../../Config";
import "./Footer.scss";

const useStyles = makeStyles((theme) => ({
  bottom_seperator: {
    backgroundColor: theme.secondaryColor,
    width: "100%",
    border: "none",
    height: "1.5px",
    margin: "0",
    alignItems: "center",
  },
  strongText: {
    color: theme.secondaryColor,
  },
  aHover: {
    "&:hover": {
      borderBottom: `1px solid ${theme.primaryColor}`,
      color: theme.primaryColor,
    },
    borderBottom: `1px solid ${theme.secondaryColor}`,
    color: theme.secondaryColor,
  },
}));
const Footer = ({ footerInfo }) => {
  const classes = useStyles();
  return (
    <footer className="footer">
      <section className="row">
        <hr className={classes.bottom_seperator} />
        <section className="footer-info">
          <p>
            <strong className={classes.strongText}>
              {appSettings.OrgName}
            </strong>
          </p>
          <p>
            <a
              href="mailto:@appSettings.RequestSenderEmail"
              className={classes.aHover}
            >
              {footerInfo.mail}
            </a>{" "}
            | tlf. {footerInfo.phoneNumber}
          </p>
        </section>
      </section>
    </footer>
  );
};
export default Footer;
