import React from 'react';

import { appButtonCn, appCn, appTextCn } from './App.const';

import './App.scss';

export const App: React.FC = () => {
    const [count, setCount] = React.useState<number>(0);

    const onIncrement = React.useCallback(() => setCount(count + 1), [count]);

    return (
        <div className={appCn}>
            <p className={appTextCn}>Hello, world!</p>
            <button
                type="button"
                className={appButtonCn}
                onClick={onIncrement}
            >
                {count}
            </button>
        </div>
    );
};
