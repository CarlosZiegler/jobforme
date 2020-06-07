/* eslint-disable react/button-has-type */
import React, { useContext, useEffect, useState } from 'react';
import Topbar from '@components/Topbar';
import Layout from '@components/Layout';
import Card from '@components/card';
import { auth, getAllUsers } from '@services/FireBase';
import Router from 'next/router';
import * as Styles from '@styles/dashboard';
import { FiArrowLeft } from 'react-icons/fi';
import { UserContext } from '@services/Providers/UserProvider';


function Dashboard() {
  const [allUsers, setallUsers] = useState([]);

  useEffect(() => {
    const fetchDataFromFirebase = async () => {
      const result = await getAllUsers();
      console.log(result);
      return setallUsers(result);
    };
    fetchDataFromFirebase();
  }, []);


  const user = useContext(UserContext);
  React.useEffect(() => {
    if (user === null) {
      Router.push('/login');
    }
  }, [user]);


  return (
    <Layout>
      {user && allUsers ? (
        <>
          <Topbar />
          {allUsers && allUsers.map(({ displayName, jobPosition, linkedin, email, city }) => (
            <Card
              key={displayName}
              className="profile"
              name={displayName}
              cargo={jobPosition}
              linkedin={linkedin}
              email={email}
              cidade={city}
            />
          ))}
        </>
      ) : null}

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
