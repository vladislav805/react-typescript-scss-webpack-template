import * as React from 'react';
import styles from './App.scss';

export default class App extends React.Component<unknown, unknown> {
    render(): JSX.Element {
        return (
            <p className={styles['app-text']}>Hello, world!</p>
        );
    }
}
