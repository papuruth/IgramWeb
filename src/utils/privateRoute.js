/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React from 'react';
import { isValidElementType } from 'react-is';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({
  component: Component,
  authenticated,
  location,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      (authenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: location },
          }}
        />
      ))}
  />
);

const { oneOfType, bool } = PropTypes;

PrivateRoute.propTypes = {
  component: (props) => {
    const { component } = props;
    if (component && !isValidElementType(component)) {
      return new Error(
        "Invalid prop 'component' supplied to 'privateRoute': the prop is not a valid React component",
      );
    }
    return null;
  },
  authenticated: bool.isRequired,
  location: oneOfType([PropTypes.object]),
};

PrivateRoute.defaultProps = {
  component: null,
  location: {},
};

export default PrivateRoute;
