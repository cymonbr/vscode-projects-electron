import React, { useEffect, useState } from 'react';
import { FaTimes, FaInfoCircle, FaInfinity } from 'react-icons/fa';
import ipcRenderer from '~/helpers/ipcRenderer';
import './styles.css';

interface Props {
    infos: boolean;
    setInfos: Function;
}

const Header = ({ infos, setInfos }: Props) => {
    const [state, setState] = useState<boolean | null>(null)

    function changeConfig(state: boolean) {
        ipcRenderer && ipcRenderer.send('configs', { action: 'win', state });
    }

    function getElectron(action: string) {
        ipcRenderer && ipcRenderer.send('header', action);
    }

    useEffect(() => {
        if (ipcRenderer) {
            state===null && ipcRenderer.send('configs', {action: 'winInit'})
            ipcRenderer.on('configs', (event, arg) => setState(arg.winStart))
        }
    }, [state])

    return (
        <div id="header">
            <div className="buttons">
                <button
                    className={`eng${state ? ' active' : ''}`}
                    onClick={() => changeConfig(!state)}
                    title={state ? 'Desativar início com sistema' : 'Ativar início com sistema'}
                >
                    <FaInfinity size={12} />
                </button>

                <button className={`info${infos ? ' active' : ''}`} onClick={() => setInfos(!infos)}>
                    <FaInfoCircle size={12} />
                </button>
            </div>

            <h1>VSCode Projects</h1>

            <div className="buttons right">
                <button className="btnClose" onClick={() => getElectron('close')}>
                    <FaTimes size={12} />
                </button>
            </div>
        </div>
    )
}

export default Header;