import React from 'react'

import linkedinIcon from '../../assets/linkedin.svg'
import houseIcon from '../../assets/house.svg'
import emailIcon from '../../assets/email.svg'

import './style.css'

function Card(props) {

    const { name, cargo, linkedin, email, cidade } = props

    return (
        <div className="card">
            <div className="card-header">
                <span class="header-detail red-detail"></span>
                <span class="header-detail yellow-detail"></span>
                <span class="header-detail green-detail"></span>
            </div>

            <div className="card-body">
                <h3 className="card-name">
                    {name}
                </h3>

                <section class="jobs">
                    <div class="section-title">
                        <h4>Cargos</h4>
                    </div>

                    <p>{cargo}</p>
                </section>

                <section class="contacts">
                    <div class="section-title">
                        <h4>Contatos</h4>
                    </div>

                    <p className="contact-info linkedin lowercase" title={linkedin}>
                        <img className="icon" src={linkedinIcon} alt="Linkedin Icon" />
                        <a href={linkedin} target='_blank' rel="noopener noreferrer" >
                            {
                                linkedin && linkedin.replace('https:', '')
                                    .replace('http:', '')
                                    .replace('//', '')
                                    .replace('www.', '')
                            }
                        </a>
                    </p>
                    <p className="contact-info email lowercase" title={email}>
                        <img className="icon" src={emailIcon} alt="Linkedin Icon" />
                        <a href={`mailto:${email}`} >{email}</a>
                    </p>
                    <p className="contact-info address" title={cidade}>
                        <img className="icon" src={houseIcon} alt="Linkedin Icon" />
                        <span>{cidade}</span>
                    </p>
                </section>
            </div>
        </div>
    )
}

export default Card
