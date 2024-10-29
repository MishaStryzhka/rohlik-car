import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>404 - Stránka nenalezena</h1>
      <p>Omlouváme se, ale stránka, kterou hledáte, neexistuje.</p>
      <Link to="/">Zpět na domovskou stránku</Link>
    </div>
  );
};

export default NotFound;
