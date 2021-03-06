import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../../actions/auth";

//material UI imports
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import styles from './index.module.css';

const Navbar = ({ logout, auth: { isAuthenticated, loading } }) => {
  const authLinks = (
    <ul id={styles.navOptions}>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user" />{" "}
          <span>Dashboard</span>
        </Link>
      </li>
      <li>
        <a onClick={logout}>
          <i className="fas fa-sign-out-alt" />{" "}
          <span>Logout</span>{" "}
          {/* hide-sm hides text on smaller screens */}
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul id={styles.navOptions}>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav id={styles.navContainer}>
            <Toolbar id={styles.toolbar}>
            <div id={styles.headerLeft}>
            <Link to="/">
          enactus
        </Link>
          </div>

          <div id={styles.headerRight}>
            <>
            {!loading && (
        <div>{isAuthenticated ? authLinks : guestLinks}</div>
      )}
            </>
          </div>
      {/* If not loading, evaluate fragment */}
   
      </Toolbar>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
