import styled from "styled-components";
import {
  alignItems,
  flex,
  flexDirection,
  flexWrap,
  justifyContent,
  space,
  width
} from "styled-system";

export default styled.div`
  ${space};
  ${width};
  ${flexDirection};
  ${justifyContent};
  ${alignItems};
  display: ${({ display }) => display || "flex"};
  ${flex};
  ${flexWrap};
  position: relative;
  overflow-y: ${({ overflowY }) => overflowY || "initial"};
  overflow-x: ${({ overflowX }) => overflowX || "initial"};
`;
