/* eslint-disable react/button-has-type */
import React, { useContext } from 'react';
import Topbar from '@components/Topbar';
import Layout from '@components/Layout';
import { auth } from '@services/FireBase';
import Router from 'next/router';
import { UserContext } from '../src/services/Providers/UserProvider';

function Dashboard() {
  const user = useContext(UserContext);
  const [userData, setUserDate] = React.useState('');

  React.useEffect(() => {
    if (user === null) {
      Router.push('/Login');
    } else {
      setUserDate(user);
    }
  }, []);
  return (
    <Layout>
      <Topbar />
      <h1>Dashboard</h1>
      <p>
Bem vindo

      </p>
      <button onClick={(e) => auth.signOut()}>
         Sair
      </button>
    </Layout>
  );
}

export default Dashboard;
