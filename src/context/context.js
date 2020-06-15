import React from 'react';

const appData = {
    isLoggedIn: '',
    setIsLoggedIn: () => {},
    setIsLoggedOut: () => {}
};

export default React.createContext(appData);