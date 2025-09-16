import styled from "styled-components";

interface ButtonProps {
  selected?: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const BoxImage = styled.img`
  width: 200px;
  height: auto;
`;

export const Button = styled.button<ButtonProps>`
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background: ${(props) => (props.selected ? "#4caf50" : "#1976d2")};
  color: white;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    opacity: 0.9;
  }
`;
