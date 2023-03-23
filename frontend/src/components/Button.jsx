import React from 'react';

import styles from '../styles/components/Button.module.css';

function Button({ text, disabled }) {
    return (
        <button className={styles.btn} disabled={disabled}>
            {text}
        </button>
    );
}

Button.defaultProps = {
    text: 'Submit',
    disabled: false,
};

export default Button;
