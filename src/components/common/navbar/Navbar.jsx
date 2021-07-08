import React from "react";
import { appSettings } from "../../../Config";
import { makeStyles } from "@material-ui/core/styles";
import "./Navbar.scss";

const useStyles = makeStyles((theme) => ({
  aTag: {
    color: theme.secondaryColor,
    background: theme.featureColor2,
    "&:hover": {
      background: theme.primaryColor,
    },
  },
}));

function Navbar() {
  const classes = useStyles();

  return (
    <section className="col-lg8">
      <nav className="consent-navigation">
        <div>
          <a href={appSettings.VigoBasAboutMe} className={classes.aTag}>
            Om meg
          </a>
        </div>
      </nav>
    </section>
  );
}
export default Navbar;
