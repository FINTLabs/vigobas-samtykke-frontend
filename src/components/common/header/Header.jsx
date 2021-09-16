import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import "./Header.scss";
import deafaultImage from "../../../content/images/company-logo.png";
import image1 from "../../../content/images/01-viken.png";

const useStyles = makeStyles((theme) => ({
  logoCounty: {
    backgroundImage: theme.isLogoFromUrl
      ? `url(${theme.logo})`
      : `url('${theme.logo === "01-viken.png" ? image1 : deafaultImage}')`,
    backgroundSize: "contain",
    backgroundPosition: "30px left",
    backgroundRepeat: "no-repeat",
    float: "left",
    width: "340px",
    height: "100px",
  },
  top_seperator: {
    backgroundColor: theme.secondaryColor,
    width: "100%",
    border: "none",
    height: "3.5px",
    margin: "0",
    alignItems: "center",
  },
  logoText: {
    backgroundColor: theme.featureColor2,
    color: theme.secondaryColor,
    fontWeight: 700,
    margin: "45px 0 0",
    padding: "6px 0px",
    textAlign: "center",
    textTransform: "uppercase",
    width: "328px",
  },
  headerRow: {
    height: "100%",
    paddingBottom: "2px",
    borderBottom: `solid ${theme.secondaryColor} 3.5px`,
    marginLeft: "6%",
    marginRight: "6%",
  },
}));

function Header() {
  const classes = useStyles();

  return (
    <header className="header">
      <section className={classes.headerRow}>
        <section className={classes.logoCounty} />
        <section className="logo logo-portal">
          <section className={classes.logoText}>Samtykke</section>
        </section>
      </section>
    </header>
  );
}
export default Header;
