import React from 'react';

export default function index({ handlerOnChange, value }) {
  return (
    <input type="text" value={value} className="search-input" onChange={handlerOnChange} placeholder="Ex: Desenvolvedor Frontend" />
  );
}
