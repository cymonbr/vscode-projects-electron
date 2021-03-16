import React, { Fragment, useEffect, useState } from 'react';
import { FaPlus, FaSyncAlt, FaTrash } from 'react-icons/fa';
import ipcRenderer from '~/helpers/ipcRenderer';
import './styles.css';

// Components
import Header from '~/components/Header';
import Infos from '~/components/Infos';

const Dashboard: React.FC<any> = () => {
    const [infos, setInfos] = useState(false)
    const [store, setStore] = useState([])

    useEffect(() => {
        if (ipcRenderer) {
            ipcRenderer.on('projects', (event, arg) => setStore(arg))
            ipcRenderer.on('infos', (event, arg) => setInfos(arg))
        }
    }, [infos, store])

    return (
        <main id="dashboard">
            <Header infos={infos} setInfos={setInfos} />

            <div className="contents">
                <div className="btns">
                    <button
                        className="add"
                        title="Adicionar Novo"
                        onClick={() => ipcRenderer && ipcRenderer.send('addProject')}
                    >
                        <FaPlus size={12} /> Adicionar
                    </button>

                    <button
                        className="clear"
                        title="Limpar dados"
                        onClick={() => ipcRenderer && ipcRenderer.send('removeProject', 'all')}
                    >
                        <FaSyncAlt size={12} />
                    </button>
                </div>

                <div className="content">
                    {
                        store.length>0 && store.map((el: any, i: number) => (
                            <Fragment key={'item_line_' + i}>
                                { i>0 && <hr /> }
                                <div className="item">
                                    <div className="infos">
                                        <h2>{el.name}</h2>
                                        <div className="folder"><span>{el.path}</span></div>
                                    </div>

                                    <button onClick={() => ipcRenderer && ipcRenderer.send('removeProject', el.name)}>
                                        <FaTrash size={12} />
                                    </button>
                                </div>
                            </Fragment>
                        ))
                    }
                </div>

                { infos && <Infos /> }
            </div>
        </main>
    );
}

export default Dashboard;