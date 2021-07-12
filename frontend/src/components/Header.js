import React from 'react';

const Header = (props) => {
  return (
    <header
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DCDCDC',
      }}
    >
      {props.title}
    </header>
  );
};

export default Header;
