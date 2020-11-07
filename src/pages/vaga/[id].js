/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
import React from 'react';
import api from '@services/Api';
import Navbar from '@components/Navbar';
import Footer from '@components/Footer';

import searchImg from '@assets/undraw_web_search.svg';

export default function Vacancy({ vacancy }) {
  console.log(vacancy);
  return (
    <>
      <Navbar />
      <div className="main-content">
        <h2>{vacancy.title}</h2>
        <p>{vacancy.description}</p>
        <h3>{vacancy.location}</h3>
        {vacancy.tags && vacancy.tags.map((tag, index) => <p key={`${index}_${tag}`}>{tag}</p>)}
      </div>
      <Footer />
    </>
  );
}

export async function getStaticPaths() {
  const res = await fetch('http://localhost:3333/vacancies');
  const vacancies = await res.json();
  const paths = vacancies.map(vacancy => `/vaga/${vacancy._id}`);
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`http://localhost:3333/vacancy/${params.id}`);
  const vacancy = await res.json();
  return { props: { vacancy } };
}
