import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: calc(100vh - 100px);

  position: relative;
  transition: height 1.5s;

  animation: entering 0.5s;
`;

export const ActionButtonsWrapper = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;

  position: absolute;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;

  padding: 5px 10px;

  background-color: #fff;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 5px;
`;

export const ResetButton = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  width: 205px;
  max-width: 250px;
  min-height: 47px;

  margin: 5px 5px;
  padding: 5px 10px;

  border-radius: 7px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);

  color: #fff !important;
  font-size: 1.1rem;
  font-weight: 500;
  text-align: center;

  background: var(--orange);
  cursor: pointer;

  &:hover {
    filter: brightness(1.1);
  }

  @media (max-width: 759px) {
    max-width: 205px !important;
    margin: 5px auto;
  }
`;

export const RoutesInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;

  position: fixed;
  z-index: 9;

  bottom: 0;
  right: 0;
  left: 0;

  height: 100vh;

  pointer-events: none;

  animation: entering 1s;

  #dinamic-spacer-element {
    width: 10px;
    height: calc(100vh - 200px);

    pointer-events: none;
  }

  .routes-info__top-border {
    display: flex;
    justify-content: center;
    align-items: center;

    position: relative;
    z-index: 9999;

    width: 100%;
    height: 15px;

    margin-bottom: -20px;

    color: #fff;

    pointer-events: all;
    cursor: row-resize;
  }

  .routes-info__info-wrapper {
    display: flex;
    flex: 1;

    position: relative;

    background-color: #fff;

    min-height: 50px;

    pointer-events: all;

    border-top: 15px solid var(--orange);

    overflow: auto;
    scroll-snap-type: proximity;

    ::-webkit-scrollbar {
      width: 8px;
      height: 10px;
    }

    ::-webkit-scrollbar-track {
      background: #d8d9dc;
      border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb {
      background: #0e5edc73;
      border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: #0e5edc73;
    }
  }
`;
