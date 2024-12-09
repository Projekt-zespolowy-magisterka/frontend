import React from 'react';

const LogoSection = ({ showText = true }) => (
    <div
        className="d-flex align-items-center"
        style={{ padding: '10px', paddingLeft: '1rem' }}
    >
        <img
            src="/logo.svg"
            alt="StockMaster Logo"
            className="img-fluid"
            style={{ width: '50px', marginRight: showText ? '10px' : '0' }}
        />
        {showText && (
            <span className="h5 text-primary" style={{ fontFamily: 'Michroma, sans-serif' }}>
        StockMaster
      </span>
        )}
    </div>
);

export default LogoSection;
