/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
import React from 'react';
import api from '@services/Api';
import Navbar from '@components/Navbar';
import Footer from '@components/Footer';
import Link from 'next/link';

export default function Vacancy({ vacancy }) {
  return (
    <>
      <Navbar />
      <h1>{vacancy.title}</h1>
      {vacancy.tags && vacancy.tags.map((tag, index) => <p key={`${index}_${tag}`}>{tag}</p>)}
      <h3>{vacancy.location}</h3>
      <Link href={`${vacancy.contact.linkedIn}`}>
        <a className="btn-primary">Contactar recrutador</a>
      </Link>
      <h2>Description:</h2>
      <p>{vacancy.description}</p>
      <Footer />
    </>
  );
}

export async function getStaticPaths() {
  const { data: vacancies } = await api.get('/vacancies');
  const paths = vacancies.map(vacancy => `/vaga/${vacancy._id}`);
  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const { data: vacancy } = await api.get(`/vacancy/${params.id}`);
  return { props: { vacancy } };
}
