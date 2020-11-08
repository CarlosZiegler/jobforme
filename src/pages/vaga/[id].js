/* eslint-disable operator-linebreak */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import api from '@services/Api';
import Navbar from '@components/Navbar';
import Footer from '@components/Footer';
import Conditional from '@components/Conditional';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Vacancy({ vacancy }) {
  const router = useRouter();
  return (
    <>
      <Navbar />
      <div className="main-content">
        <Conditional when={vacancy !== undefined}>
          <h1>{vacancy.title}</h1>
          <span>
            {vacancy.tags &&
              vacancy.tags.map((tag, index) => (
                <span className="result-info" key={`${index}_${tag}`}>
                  {tag}
                </span>
              ))}
          </span>
          <h3>{vacancy.location}</h3>
          <Link href={`${vacancy.contact.linkedIn}`}>
            <a className="btn-primary">Contactar recrutador</a>
          </Link>
          <h2>Description:</h2>
          <p>{vacancy.description}</p>
          <span onClick={() => router.back()} className="btn-primary">
            Voltar
          </span>
          <Footer />
        </Conditional>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const { data: vacancies } = await api.get('/vacancies');
  const paths = vacancies.map(vacancy => `/vaga/${vacancy._id}`);
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { data: vacancy } = await api.get(`/vacancy/${params.id}`);
  return { props: { vacancy } };
}
