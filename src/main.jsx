import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { SidebarProvider } from './context/sidebarContext.jsx';

ReactDOM.hydrate(
    <React.StrictMode>
        <SidebarProvider>
            <App />
        </SidebarProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
