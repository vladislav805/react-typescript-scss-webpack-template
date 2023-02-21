import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from '@components/App/App';

import './common.scss';

const rootElement = document.getElementById('root');

if (rootElement !== null) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(<App />);
}
