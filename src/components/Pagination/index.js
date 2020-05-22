import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

export default function Pagination({ 
  handlePrevPage, 
  handleNextPage, 
  prevButtonDisabled, 
  nextButtonDisabled,
  ...rest 
}) {
  return (
    <section className="pagination" {...rest}>
      <button 
        type="button" 
        onClick={handlePrevPage} 
        disabled={prevButtonDisabled}>
        { !prevButtonDisabled && (<a href="#top-pagination">Anterior</a>) }
        { prevButtonDisabled && (<span>Anterior</span>) }
      </button>

      <button 
        type="button" 
        onClick={handleNextPage} 
        disabled={nextButtonDisabled}>
        { !nextButtonDisabled && (<a href="#top-pagination">Próximo</a>) }
        { nextButtonDisabled && (<span>Próximo</span>) }
      </button>
    </section>
  )
}

Pagination.propTypes = {
  handlePrevPage: PropTypes.func.isRequired,
  handleNextPage: PropTypes.func.isRequired,
  prevButtonDisabled: PropTypes.bool.isRequired,
  nextButtonDisabled: PropTypes.bool.isRequired,
}