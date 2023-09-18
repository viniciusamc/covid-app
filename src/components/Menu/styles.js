import styled from "styled-components";

export const Header = styled.header`
  width: 100vw;
  height: 70px;
  background: blue;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-around;
`;

export const Status = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
`;

export const StatusItem = styled.label`
  list-style: none;
  color: #fff;
`;

export const Success = styled.label`
    color: #0f0;
`;

export const Error = styled.label`
    color: #f00
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 24px;
`;

export const Item = styled.li`
  list-style: none;
  cursor: pointer;
  color: #fff;
`;
