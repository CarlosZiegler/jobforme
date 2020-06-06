/* eslint-disable global-require */
import styled from 'styled-components';

export const Base = styled.div`
 /*
 background: url(${require('../src/assets/images/base.jpg')}) no-repeat center center fixed;
 background-size: cover;
  */
  width: 100%;
  background: #3498db;
  height: 100vh;
`;

export const Container = styled.div`
  position: relative;
  max-width: 960px;
  margin: 0 auto;
  padding-top: 15px;
  height: 70px;
`;

export const Box = styled.div`
  width:  100%;
  max-width: 400px;
  margin: auto;
  margin-top: 15%;
  color: #000;
  background: #fff;
  padding: 4%;
  border-radius: 5px;

  h2 {
    font-size: 2rem;
    font-weight: 100;
  }

  p {
    font-size: 0.9rem;

    a {
      text-decoration: underline;
      cursor: pointer;
    }
  }

  form {
    margin-top: 20px;

    label {
      width: 100%;
      font-size: 1rem;
    }

    input {
      margin-top: 5px;
      margin-bottom: 5px;
      width: 100%;
      padding: .8rem;
      color: #444;
    }

    button {
      width: 100%;
      border: 0;
      padding: 0.7rem;
      background: #272e44;
      color: #fff;
      font-size: 1.2rem;
      margin-top: 10px;
      cursor: pointer;
    }
  }

  .error {
     background: #e74c3c;
     padding: 0.8rem;
     color: #fff;
     margin-bottom: 5px;
  }

`;
