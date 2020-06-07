import React from 'react';
import { FiMapPin, FiMail } from 'react-icons/fi';
import { FaLinkedin } from 'react-icons/fa';

function Card(props) {
  const { name, cargo, linkedin, email, cidade } = props;

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-name">{name}</h3>

        <p className="card-position">{cargo}</p>

      </div>
      <div className="card-body">
        <div className="contact-info lowercase linkedin">
          <a href={linkedin} target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="icon" />
          </a>
          <p className="contact-info_city">
            <FiMapPin className="icon" />
            {cidade}
          </p>

        </div>
        <p className="contact-info lowercase">
          <a href={`mailto:${email}`}>
            <FiMail className="icon" />
            {email}
          </a>
        </p>
        <p className="contact-info" />
      </div>
    </div>
  );
}

export default Card;
