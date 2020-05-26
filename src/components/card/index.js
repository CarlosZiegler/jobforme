import React from 'react';

function Card(props) {
  const {
    name, cargo, linkedin, email, cidade,
  } = props;

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-name">
          {name}
        </h3>
        <p className="card-position">
          {cargo}
        </p>
      </div>
      <div className="card-body">
        <p className="contact-info lowercase">
          <a href={linkedin} target="_blank" rel="noopener noreferrer">
            <img className="link icon" src={linkedin?.includes('linkedin') ? '/linkedin.svg' : '/link.svg'} alt="Linkedin Icon" />
          </a>
        </p>
        <p className="contact-info lowercase">
          <img className="icon" src="/email.svg" alt="email Icon" />
          <a href={`mailto:${email}`}>{email}</a>
        </p>
        <p className="contact-info">
          <img className="icon" src="/house.svg" alt="house Icon" />
          {cidade}
        </p>
      </div>
    </div>
  );
}

export default Card;
