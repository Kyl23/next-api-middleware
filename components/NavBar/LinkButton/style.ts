import styled from "styled-components";
import { LayoutType } from "../../../style.props.config";

export const Anchor = styled.a<LayoutType>`
  width: ${(props) => (props.width ? props.width : "100%")};
  height: ${(props) => (props.height ? props.height : "100vh")};
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : "black"};
  color: ${(props) => (props.color ? props.color : "white")};
  font-size: ${(props) => (props.fontSize ? props.fontSize : "28px")};
  display: ${(props) => (props.display ? props.display : "flex")};
  margin: ${(props) => (props.margin ? props.margin : "0px")};
  padding: ${(props) => (props.padding ? props.padding : "0px")};
`;
