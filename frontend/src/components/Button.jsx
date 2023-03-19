import React from 'react';

import styles from '../styles/components/Button.module.css';

export default function Button({ text }) {
    return <button className={styles.btn}>{text}</button>;
}
