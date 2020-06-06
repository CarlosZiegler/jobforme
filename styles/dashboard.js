import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  max-width: 960px;
  margin: 0 auto;
  padding-top: 15px;
  height: 70px;
`;

export const Intro = styled.div`
  width: 100%;
  background: #3498db;
  padding: 1rem;
  color: #fff;
  border-radius: 4px;
  box-shadow: 5px 3px 13px 3px rgba(0, 0, 0, 0.65);
  margin-top: 5%;

  h1 {
    font-weight: 100;
  }
`;

export const Button = styled.button`
  font-size: 0.89rem;
  border: 0.125rem solid #fff;
  border-radius: 2rem;
  padding: 0.6rem 1.2rem;
  color: #fff;
  cursor: pointer;
  float: right;

  &:hover {
    background: #1457d4;
    border-color: #1457d4;
  }
`;
