import * as React from 'react';

import styles from './App.scss';

export const App: React.FC = () => {
    const [count, setCount] = React.useState<number>(0);

    const onIncrement = React.useCallback(() => setCount(count + 1), [count]);

    return (
        <div className={styles['App']}>
            <p className={styles['App-Text']}>Hello, world!</p>
            <button
                type="button"
                className={styles['App-Button']}
                onClick={onIncrement}
            >
                {count}
            </button>
        </div>
    );
};
