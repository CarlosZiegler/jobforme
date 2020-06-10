/* eslint-disable react/button-has-type */
import React, { useContext, useEffect, useState } from 'react';
import Filters from '@components/Filters';
import Topbar from '@components/Topbar';
import Layout from '@components/Layout';
import Card from '@components/card';
import { auth, getAllUsers } from '@services/FireBase';
import Router from 'next/router';
import * as Styles from '@styles/dashboard';
import { UserContext } from '@services/Providers/UserProvider';
import { searchDataDB } from '@utils/searchData';

function Dashboard() {
  const [allUsers, setAllUsers] = useState([]);
  const [showProfiles, setShowProfiles] = useState([]);
  const [qtdProfiles, setQtdProfiles] = useState(null);

  const handlerSearchOnChange = async event => {
    const result = searchDataDB(allUsers, event.target.value);
    setShowProfiles(result);
  };


  useEffect(() => {
    const fetchDataFromFirebase = async () => {
      const result = await getAllUsers();
      setShowProfiles(result);
      setAllUsers(result);
      setQtdProfiles(showProfiles.length);
    };
    fetchDataFromFirebase();
  }, []);


  const user = useContext(UserContext);
  React.useEffect(() => {
    if (user === null) {
      Router.push('/login');
    }
  }, [user]);

  const Logout = () => {
    if (!auth) {
      Router.push('/login');
    }
    auth.signOut().then(() => {
      Router.push('/login');
    });
  };

  return (
    <Layout>
      {user && allUsers ? (
        <>
          <Topbar functionTopbar={Logout} />
          <Filters
            handlerOnchange={handlerSearchOnChange}
          />
          {qtdProfiles > 0 && (
            <div className="container">
              <span className="profile-count">
                Cadastrados:
                {
                  qtdProfiles
                }
              </span>
            </div>
          )}
          <Styles.Container>
            {showProfiles
              && showProfiles.map(({ displayName, jobPosition, linkedin, email, city }) => (
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

          </Styles.Container>
        </>
      ) : <Topbar />}

    </Layout>
  );
}
export default Dashboard;
