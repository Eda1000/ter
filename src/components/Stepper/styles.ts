import styled from 'styled-components';

export const Container = styled.header`
  max-width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: min-content min-content min-content min-content min-content;
  gap: 1.4rem;

  padding: 0 2rem 1rem;

  section {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    /* cursor: pointer; */
    pointer-events: none;

    h3 {
      font-size: 1.5rem;
      font-weight: 400;
      color: #888888;
      margin-left: 0.4rem;
      margin-bottom: 0;

      @media (max-width: 1120px) {
        font-size: 1.3rem;
      }

      @media (max-width: 840px) {
        display: none;
      }
    }

    svg {
      color: #888888;
      width: 4rem;
      font-size: 1.5rem;
    }

    div {
      background-color: #cecece;
      min-width: 3.7rem;
      width: 100%;
      height: 3px;
      margin-left: 0.8rem;

      @media (max-width: 1280px) {
        min-width: 2.5rem;
      }

      @media (max-width: 966px) {
        min-width: 1rem;
      }

      @media (max-width: 840px) {
        min-width: 3.7rem;
      }

      @media (max-width: 650px) {
        min-width: 1.2rem;
      }

      @media (max-width: 450px) {
        min-width: 1rem;
      }

      @media (max-width: 320px) {
        min-width: 0.5rem;
      }

      @media (max-width: 280px) {
        min-width: 0rem;
      }
    }

    img {
      @media (max-width: 450px) {
        max-width: 25px;
      }
    }

    &.activeStep {
      h3,
      img {
        color: var(--blue);
      }

      div {
        background-color: #0e5edc;
      }

      svg {
        color: var(--blue);
      }
    }
  }

  @media (max-width: 1160px) {
    gap: 1rem;
  }

  @media (max-width: 280px) {
    padding: 0 1.4rem 1rem;
  }
`;

export const Division = styled.hr`
  margin: 0 2rem;
  background: rgba(0, 46, 117, 0.29);
`;
