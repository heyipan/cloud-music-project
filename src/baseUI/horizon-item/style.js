import styled from "styled-components";

import style from "../../assets/global-style";

export const List = styled.div`
  display: inline-block;
  height: 30px;
  > span:first-of-type {
    display: inline-block;
    padding: 5px 0;
    margin-right: 5px;
    color: grey;
    font-size: ${style["font-size-m"]};
    vertical-align: middle;
  }
`;

export const ListItem = styled.span`
  display: inline-block;
  font-size: ${style["font-size-m"]};
  padding: 5px 8px;
  border-radius: 10px;
  &.selected {
    color: ${style["theme-color"]};
    border: 1px solid ${style["theme-color"]};
    opacity: 0.8;
  }
`;
