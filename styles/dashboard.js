import styled from 'styled-components';

export const Container = styled.div`
  max-width:960px;
  margin:0 auto;
  display: flex;
  flex-wrap:wrap;
  justify-content:center;
`;

export const Intro = styled.div`

  h1 {
    font-weight: 100;
    align-items: center;
    text-align: center;
  }
`;

export const Button = styled.button`
  font-size: 0.89rem;
  border: 0.125rem solid #fff;
  border-radius: 5rem;
  padding: 0.6rem 1.2rem;
  color: #fff;
  cursor: pointer;
  float: right;

  &:hover {
    background: #1457d4;
    border-color: #1457d4;
  }
`;
