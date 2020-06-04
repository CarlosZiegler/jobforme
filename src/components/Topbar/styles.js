import styled from 'styled-components';

export const TopNav = styled.header`
  background: #272e44;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.07);
  width: 100%;
`;

export const Container = styled.div`
  position: relative;
  max-width: 960px;
  margin: 0 auto;
  padding-top: 15px;
  height: 70px;

  .logo {
    float: left;
    padding-bottom: 15px;
    h1 {
      font-size: 2rem;
      font-weight: 100;
      color: #FFF;
    }
  }
  .menu {
    float: right;
    padding-top: 12px;

    a {
      font-size: .89rem;
      border: 0.125rem solid #FFF;
      border-radius: 2rem;
      padding: 0.6rem 1.2rem;
      color: #FFF;

      &:hover {
        background: #1457d4;
        border-color: #1457d4
      }
    }

  }
`;
