/* eslint-disable react/button-has-type */
import React, { useContext } from 'react';
import Topbar from '@components/Topbar';
import Layout from '@components/Layout';
import { auth } from '@services/FireBase';
import Router from 'next/router';
import * as Styles from '@styles/dashboard';
import { FiArrowLeft } from 'react-icons/fi';
import { UserContext } from '../src/services/Providers/UserProvider';

function Dashboard() {
  const user = useContext(UserContext);
  React.useEffect(() => {
    if (user === null) {
      Router.push('/login');
    }
  }, [user]);
  return (

    <Layout>
      {user ? (
        <>
          <Topbar />
          <Painel user={user} />
        </>
      ) : null }

    </Layout>
  );
}

const Sair = () => {
  auth.signOut().then(() => {
    Router.push('/login');
  });
};
const Painel = (props) => {
  const { user } = props;
  const { name } = user;
  return (
    <>
      <Styles.Container>
        <Styles.Button onClick={() => Sair()}>
          <FiArrowLeft />
          {' '}
Sair
        </Styles.Button>
        <Styles.Intro>
          <h1>
Bem vindo
            {' '}
            {name}
            {' '}
          </h1>

        </Styles.Intro>

      </Styles.Container>

    </>
  );
};

export default Dashboard;
