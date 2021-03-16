import React, { useEffect, useState } from 'react';
import { FaPlus, FaSyncAlt, FaTrash } from 'react-icons/fa';
import ipcRenderer from '~/helpers/ipcRenderer';
import './styles.css';

// Components
import Header from '~/components/Header';

const Dashboard: React.FC<any> = () => {
    const [store, setStore]   = useState([])

    useEffect(() => {
        if (ipcRenderer) {
            ipcRenderer.on('store', (event, arg) => setStore(arg))
            ipcRenderer.on('projects', (event, arg) => setStore(arg))
        }
    }, [store])

    return (
        <main id="dashboard">
            <Header />

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
                            <>
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
                            </>
                        ))
                    }
                </div>
            </div>
        </main>
    );
}

export default Dashboard;