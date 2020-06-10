/* eslint-disable global-require */
import styled from 'styled-components';

export const Base = styled.div`
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
  margin-top: 5%;
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
      border-radius:10px;
    }

    .region-info{
      display:flex;
      max-width:100%;
      margin:5px 0;
    }
    .region-item:last-child{
      width:100%;
      margin-left: 15px;
    }
    .selector-dropdown{
      width: 100%;
      height:2rem;
    }
    .text-login{
      margin-top:15px;
      text-align:center;
    }
  }

  .error {
     background: #e74c3c;
     padding: 0.8rem;
     color: #fff;
     margin-bottom: 5px;
  }


`;
