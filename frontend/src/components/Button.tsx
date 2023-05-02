import React from 'react';

import styles from '../styles/components/Button.module.css';

interface ButtonProps {
    text?: string;
    disabled?: boolean;
}

function Button({ text = 'Submit', disabled = false }: ButtonProps) {
    return (
        <button className={styles.btn} disabled={disabled}>
            {text}
        </button>
    );
}

export default Button;
