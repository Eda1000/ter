import styled from "styled-components";

interface ButtonProps {
  selected?: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

export const BoxImage = styled.img`
  width: 120px;
  height: auto;
`;

export const Button = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  background: ${({ selected }) => (selected ? "#4caf50" : "#2196f3")};
  color: white;

  &:hover {
    opacity: 0.9;
  }
`;
