import styled from "styled-components";

interface ContainerProps {
  isSelected?: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;

  button {
    padding: 6px 12px;
    margin: 4px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background: #2196f3;
    color: white;

    &:hover {
      background: #1976d2;
    }
  }
`;

export const IconWrapper = styled.div<ContainerProps>`
  margin-top: 10px;
  font-size: 22px;
  color: ${({ isSelected }) => (isSelected ? "#4caf50" : "#ccc")};
`;
