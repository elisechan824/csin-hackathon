import React from "react";
import PropTypes from "prop-types";
import { Layout as RALayout, CheckForApplicationUpdate } from "react-admin";

export const Layout = ({ children }) => (
  <RALayout>
    {children}
    <CheckForApplicationUpdate />
  </RALayout>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};