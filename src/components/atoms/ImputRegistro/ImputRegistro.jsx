import React from 'react';
import { Input } from 'reactstrap';
import styles from './ImputRegistro.module.css';

function ImputRegistro({ inputText, inputType, name, value, onChange, onBlur, error }) {
  
  return (
    <div>
      <Input
        
        type={inputType}
        placeholder={inputText}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        style={{ borderColor: error ? 'red' : 'black' }}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}

export default ImputRegistro;
