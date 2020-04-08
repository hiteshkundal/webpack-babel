import React from 'react'
import Logo from '../../images/eye.svg';

import styles from './App.scss';

const App = () => {
    return (
        <div className={styles.App}>
            <h1>I am react component.</h1>
            <img src={Logo} alt="eye" />
        </div>
    )
}

export default App;