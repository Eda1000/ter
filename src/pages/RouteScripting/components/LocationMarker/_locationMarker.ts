import styled from 'styled-components';

import map_marker from '../../../../assets/general/map_marker.svg';

interface InfoProps {
  color?: string;
  showInfo?: boolean;
}

export const MarkerWrapper = styled.div`
  &.marker-wrapper {
    position: relative;
  }

  .icon {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
`;

export const Marker = styled.div`
  display: flex;

  position: relative;
  z-index: 9990;
  transform: translate(-50%, -100%);

  width: 70px;
  height: 53px;

  background: ${({ tagColor }: { tagColor: string }) =>
    tagColor && `${tagColor}`};

  mask-position: center;
  mask-repeat: no-repeat;
  mask-size: contain;
  mask-image: url(${map_marker});

  cursor: pointer;
`;

export const HorseIcon = styled.img`
  position: absolute;
  top: 15px;
  left: 50%;
  transform: translateX(-50%);

  width: 18px;
  height: 18px;
`;

export const Number = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);

  width: 25px;
  height: 25px;

  color: ${({ tagColor }: { tagColor: string }) => tagColor && `${tagColor}`};

  font-size: 18px;
  font-weight: bold;
  background: #fff;

  border-radius: 30px;
`;

export const InfoWrapper = styled.div`
  &.info-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export const Info = styled.div<InfoProps>`
  position: relative;

  display: ${({ showInfo }) => (showInfo ? 'block' : 'none')};
  position: absolute;
  z-index: 9991;
  top: -100%;
  left: 50%;
  transform: translate(-50%, -105%);

  width: 300px;
  min-height: 150px;

  padding: 10px;

  color: #fff;
  font-size: 0.7rem;

  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 3px 30px #0000005e;

  &:before {
    content: ' ';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: -15px;

    border-top: 15px solid #fff;
    border-right: 15px solid transparent;
    border-left: 15px solid transparent;
    border-bottom: none;
  }

  .info__loading-data-wrapper {
    display: flex;
    flex-direction: column;
    gap: 3px;

    input {
      font-size: 0.8rem !important;
    }
  }

  .info__loading-data-wrapper__info {
    color: #000;

    img {
      width: 10px;
      margin-right: 5px;
    }
  }

  .info__color-indicator {
    width: 30%;
    background-color: ${({ color }) => color && `${color}`};
    border-radius: 20px;
    padding: 4px 13px;

    text-align: center;
  }

  .actionButtons {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;

    .anchor__freeze {
      display: flex;
      align-items: center;

      padding: 10px 5px;

      color: #ff9700;
      cursor: pointer;
    }

    .anchor__confirm-load {
      display: flex;
      align-items: center;

      padding: 10px 5px;

      color: #3ad40c;
      cursor: pointer;
    }
  }

  .noteBox {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;

    background-color: #ffffcc;
    border-top: 24px solid #f3f391;
    height: 110px;
    width: 95px;
    font-size: 10px;
    margin-top: -40px;
  }
`;

export const ButtonRadius = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;

  display: flex;
  justify-content: center;
  align-items: center;

  /* margin: 40px 0 0 400px; */
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #0440a0;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

export const Input = styled.input`
  width: 100%;
  min-height: 30px;

  padding: 5px 0;

  font-size: 18px;
  color: #4f4f4f;

  border: 0;
  border-bottom: 1px solid #888888;
  transition: all 0.5s;

  &:focus {
    outline: none;
    border-bottom: 1px solid var(--lightblue);
  }
`;
