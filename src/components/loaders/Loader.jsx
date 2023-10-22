// Loader.js
import React from 'react';
import './loader.css';

export const Loader = ({ isLoading }) => {
  return isLoading ? (
    <div className="loader-overlay">
      <div className="loader"></div>
    </div>
  ) : null;
};