import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ddd;
  padding: 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: #f5f5f5;
  }

  img {
    width: 80px;
    height: 80px;
    object-fit: contain;
  }

  p {
    margin-top: 8px;
    font-size: 14px;
    font-weight: 500;
  }
`;
