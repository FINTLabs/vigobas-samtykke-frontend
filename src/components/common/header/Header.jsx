import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import "./Header.scss";

const useStyles = makeStyles((theme) => ({
  logoCounty: {
    backgroundImage: `url('../../../content/images/${theme.logo}')`,
    backgroundPosition: "30px left",
    backgroundRepeat: "no-repeat",
    float: "left",
    width: "300px",
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
}));

function Header() {
  const classes = useStyles();

  return (
    <header className="header">
      <section className="row">
        <section className={/*classes.logoCounty*/ "logo logo-county"} />
        <section className="logo logo-portal">
          <section className={classes.logoText}>Samtykke</section>
        </section>
        <hr className={classes.top_seperator} />
      </section>
    </header>
  );
}
export default Header;
