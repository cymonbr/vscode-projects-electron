import React from 'react';
import { FaWindowMinimize, FaTimes, FaInfoCircle } from 'react-icons/fa';
import ipcRenderer from '~/helpers/ipcRenderer';
import './styles.css';

ipcRenderer && ipcRenderer.on('header', (event, arg) => {
    console.log(arg)
})

const Header = () => {
    function getElectron(action: string) {
        ipcRenderer && ipcRenderer.send('header', action);
    }

    // return ipcRenderer ? () : <></>

    return (
        <div id="header">
            <div className="buttons">
                <button>
                    <FaInfoCircle size={12} />
                </button>
            </div>

            <h1>VSCode Projects</h1>

            <div className="buttons right">
                <button onClick={() => getElectron('min')}>
                    <FaWindowMinimize size={12} />
                </button>

                <button className="btnClose" onClick={() => getElectron('close')}>
                    <FaTimes size={12} />
                </button>
            </div>
        </div>
    )
}

export default Header;