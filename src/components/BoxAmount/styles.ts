import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 12px;
  margin: 6px;
  background: #fafafa;
  width: 200px;

  h3 {
    margin: 0 0 4px 0;
    font-size: 16px;
    font-weight: bold;
  }

  p {
    margin: 2px 0;
    font-size: 14px;
  }
`;
