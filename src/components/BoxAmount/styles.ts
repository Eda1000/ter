import styled from 'styled-components';

interface ContainerProps {
  isSelected?: boolean;
}

export const Container = styled.div<ContainerProps>`
  position: relative;
  box-shadow: 0px 6px 10px #00000047;
  border-radius: 1.5rem;
  background: #ffffff;
  cursor: pointer;
  width: 100%;

  border: 2px solid
    ${({ isSelected }) => (isSelected ? '#0044ff' : 'transparent')};
`;

export const BoxImage = styled.img`
  height: 12.5rem;
  max-width: fit-content;
`;

export const ImageWrapper = styled.div`
  border-radius: 1.5rem 1.5rem 0 0;
  width: 100%;
  max-height: 14rem;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;
`;

interface IconWrapperProps {
  isSelected?: boolean;
}

export const IconWrapper = styled.div<IconWrapperProps>`
  position: absolute;
  top: -1.5rem;
  right: -1.5rem;
  z-index: ${({ isSelected }) => (isSelected ? '1' : '-1')};

  background: #0e5edc;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #ffffff;
  font-size: 1.5rem;
`;

export const BottomSection = styled.section`
  padding: 1rem 0.8rem 2rem;
`;

export const BoxName = styled.h2`
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 0;
  color: #002e75;
`;

export const BoxSubText = styled.p`
  color: #002e75;
  font-size: 0.8rem;
`;

export const BoxFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 0.5rem;
  margin-top: 3.2rem;
`;

export const AmountButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  background-color: #0e5edc;
  color: #ffffff;
  font-size: 1.375rem;

  border: 0;
  width: 2.375rem;
  height: 2.375rem;
  border-radius: 100%;
`;

export const AmountInput = styled.input`
  border: none;

  width: 6rem;
  text-align: center;

  color: var(--blue);
  font-size: 2.125rem;

  border: 1px solid #dcdcdc;
  border-radius: 0.5rem;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  -moz-appearance: textfield;
  appearance: textfield;
`;
