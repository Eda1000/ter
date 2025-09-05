import styled from 'styled-components';

interface Props {
  color: string;
}

export const Container = styled.div`
  &.routering-dragger {
    flex: 1;

    position: relative;

    width: 50vw;
    min-height: 200px;

    animation: entering 0.7s;

    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
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

export const AvailableRoutes = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  height: 48px;

  padding: 0px 16px;

  [data-rbd-droppable-id='available-points'] {
    display: flex;
    gap: 8px;
    min-width: 100%;
    min-height: 30px;
  }

  .point {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 30px;
    height: 30px;

    color: #808080;
    font-size: 0.8rem;
    font-weight: bold;

    background: #fff;

    border: 2.5px solid #808080;
    border-radius: 20px;
  }
`;

export const SequenceWrapper = styled.div`
  &.sequence {
    display: flex;
    align-items: center;
  }
`;

export const RouteSequence = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  height: 54px;

  padding: 0 16px;

  /* Selector for Droppable lib div */
  div {
    display: flex;
    align-items: center;
    gap: 8px;

    min-width: 30px;
    height: 45px;
  }

  .point {
    display: flex;
    justify-content: center;
    align-items: center;

    position: relative;

    width: 30px;
    height: 30px;

    color: ${({ color }: { color: string }) => color && color};
    font-size: 0.8rem;
    font-weight: bold;

    background: #fff;
    border: 2.5px solid ${({ color }: { color: string }) => color && color};
    border-radius: 20px;
  }

  .starting-point {
    background-color: ${({ color }: { color: string }) => color && color};

    img {
      width: 50%;
    }
  }

  /* Selector for Draggable div */
  div:not(:last-child) {
    .point {
      &:after {
        content: '';

        position: absolute;
        left: calc(100% + 2.5px);

        width: 8px;

        border-bottom: 5px solid
          ${({ color }: { color: string }) => color && color};

        transition: width 0.5s;
        transition-delay: 0.2s;
      }

      &:active {
        &:after {
          opacity: 0;
          width: 0px;
        }
      }
    }
  }
`;

export const ButtonContainer = styled.div`
  width: 100%;
  margin: 15px 15px;

  margin-top: auto;
`;

export const SaveRoutesButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  width: 280px;
  height: 50px;

  margin: 20px auto 0;

  color: #fff;
  font-size: 16px;
  font-weight: 700;

  border-radius: 8px;
  border: 0;

  cursor: pointer;
  background-color: var(--blue);
  transition: all 0.2s;

  &:hover {
    color: #fff;
    box-shadow: 0px 0px 3px rgb(0 0 0 /16%);
    filter: brightness(0.9);
  }

  &:disabled {
    filter: brightness(1.1);
    cursor: not-allowed;
  }
`;

export const Swicth = styled.div`
  width: fit-content;
  height: fit-content;
  padding: 10px 0;
  display: flex;

  span {
    font-size: 1.1rem;
    font-weight: 400;
	  color: #002E75;
    margin-left: 15px;
  }

  input[type=checkbox]{
    height: 0;
    width: 0;
    visibility: hidden;
  }

  label {
    cursor: pointer;
    text-indent: -9999px;
    width: 60px;
    height: 30px;
    background: grey;
    display: block;
    border-radius: 100px;
    position: relative;
  }

  label:after {
    content: '';
    position: absolute;
    top: 3px;
    left: 5px;
    width: 24px;
    height: 24px;
    background: #fff;
    border-radius: 90px;
    transition: 0.3s;
  }

  input:checked + label {
    background: #3ad40c;
  }

  input:checked + label:after {
    left: calc(100% - 5px);
    transform: translateX(-100%);
  }

  label:active:after {
    width: 50px;
  }
`;

export const SwitchContainer = styled.div<Props>`
  width: fit-content;
  height: fit-content;
  margin-left: auto;
  padding: 10px 12px;

  display: flex;
  gap: 15px;

  .switch__input {
    accent-color: ${({ color }) => color};
  }

  .switch__label {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;

    color: ${({ color }) => color};
    font-weight: bold;
  }

  .switch__button {
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: ${({ color }) => color};
    color: #fff;
    border-radius: 5px;

    padding: 5px;

    cursor: pointer;

    &:hover {
      filter: brightness(1.1);
    }
  }
`;
