import React from 'react';
import './styles.css';

import logo from '~/assets/images/studiowoz.png';
import logoText from '~/assets/images/studiowoz-text.png';

const Infos = () => {
    return (
        <div id="infos">
            <div className="logo">
                <img src={logo} alt="StudioWoz"/>
                <img className="text" src={logoText} alt="StudioWoz"/>
            </div>

            <div className="texts">
                <span><b>Version:</b> 1.0.0</span>
                <span><b>Date:</b> 2021-03-16</span>
                <span><b>Electron:</b> 11.2.3</span>
                <span><b>NodeJS:</b> 12.18.2</span>
            </div>
        </div>
    )
}

export default Infos;