import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  justify-content: space-evenly;
  padding: 1.6rem 1rem;

  background-color: var(--blue);

  img {
    max-width: 8rem;
    justify-self: center;
  }


  div {
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      max-width: 1.3rem;
      justify-self: center;
      @media(max-width:1200px){
        display:none;
      }
    }

    a {
      color: #FFFFFF;
      font-size: clamp(.8rem,1.2vw, 1.1rem);
      font-weight: 500;
      text-decoration: none;
      text-transform: uppercase;
      letter-spacing: 0.1rem;
      margin: 0.2rem 0 .3rem 0.2rem;

      transition: filter 0.2s;

      &:hover {
        filter: brightness(0.7)
      }
    }

    &:nth-child(){
        
    }
  }

  @media (max-width: 1080px) {
    display: none;
  }
`;

export const MobileHeader = styled.header`
  display: none;
  opacity: 0;
  position: relative;

  padding: 1rem;
  background-color: var(--blue);

  button {
    border: 0;
    background-color: transparent;
    position: absolute;
    top: 0;
    bottom: 0;

    svg {
      font-size: 2.4rem;
      color: #FFF;
    }
  }

  a {
    margin: 0 auto;
    max-width: 8rem;

    img {
      max-width: 100%;
    }
  }

  @media (max-width: 1080px) {
    display: flex;
    opacity: 1;
  }
`;
