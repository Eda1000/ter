import styled from 'styled-components';

interface SidebarProps {
  isActive: boolean;
}

export const Container = styled.aside<SidebarProps>`
  display: flex;
  z-index: 3;

  flex-direction: column;

  position: absolute;
  top: 4rem;
  bottom: 0;
  left: ${(props) => (props.isActive ? 0 : -360)}px;

  max-width: min-content;
  max-height: fit-content;
  padding: 2rem;
  background-color: var(--blue);
  border-radius: 0 0 1rem 0;
  box-shadow: 0px 3px 6px #00000029;

  transition: all 0.5s;

  div {
    display: flex;
    align-items: center;

    img{
      width: 25px;

    }

    a {
      color: #FFFFFF;
      font-size: 1.1rem;
      font-weight: 500;
      text-decoration: none;
      text-transform: uppercase;
      letter-spacing: 0.1rem;

      margin-left: 1rem;
    }

    svg {
      font-size: 2.3rem;
      color: var(--orange);

      width: 40px;
    }

    & + div {
      margin-top: 0.8rem;
      border-top: 1px solid var(--background);
      padding-top: 0.8rem;
    }
  }

  @media (min-width: 1080px) {
    display: none;
  }
`;
