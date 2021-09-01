/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { isValidElementType } from 'react-is';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({
  component: Component,
  restricted,
  authenticated,
  ...rest
}) => (
  // restricted = false meaning public route
  // restricted = true meaning restricted route
  <Route
    {...rest}
    render={(props) =>
      (restricted && authenticated ? (
        <Redirect to="/" />
      ) : (
        <Component {...props} />
      ))}
  />
);

PublicRoute.propTypes = {
  restricted: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired,
  component: (props) => {
    const { component } = props;
    if (component && !isValidElementType(component)) {
      return new Error(
        "Invalid prop 'component' supplied to 'publicRoute': the prop is not a valid React component",
      );
    }
    return null;
  },
};

PublicRoute.defaultProps = {
  component: null,
};

export default PublicRoute;
