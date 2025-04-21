import React from 'react';
import { createRoot } from 'react-dom/client';

import { App } from '@components/App/App';

import './common.scss';

const rootElement = document.getElementById('root');

if (rootElement !== null) {
    const root = createRoot(rootElement);
    root.render(<App />);
}
