import React from 'react';

import { LinkButton } from '@components/Buttons';

import FindInput from './FindInput';

function Filters(props) {
  const { handlerOnchange, urlButton, textButton } = props;
  return (
    <div className="container" data-testid="filters">
      <section className="filters">
        <FindInput handlerOnchange={handlerOnchange} placeholder="Pesquisar" />
        {urlButton && <LinkButton href={urlButton} target="_blank" value={textButton} />}

      </section>
    </div>
  );
}

export default Filters;
