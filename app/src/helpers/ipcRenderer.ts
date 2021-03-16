import { IpcRenderer } from 'electron';

declare global {
    interface Window {
        require: (module: 'electron') => {
            ipcRenderer: IpcRenderer
        };
    }
}

const { ipcRenderer } = window.require ? window.require('electron') : { ipcRenderer: null };
export default ipcRenderer;