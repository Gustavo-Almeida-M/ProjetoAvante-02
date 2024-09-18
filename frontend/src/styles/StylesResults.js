//Styles para o Grid e para o Concluidos
import styled from 'styled-components';

export const Table = styled.table`
  background-color: #fff;
  width: 100%;
  border-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 800px;
  margin: 20px auto;
  word-break: break-all;
`;


export const Thead = styled.thead``;
export const Tr = styled.tr`
  color: ${(props) => (props.color ? props.color : '#000')};
  hidden: ${(props) => (props.hidden ? props.hidden : 'visible')};
`;
export const Th = styled.th`
  padding-bottom: 5px;
`;

export const Td = styled.td`
  border-top: inset;
  padding-bottom: 15px;
  padding-top: ${(props) => (props.paddingTop ? props.paddingTop : '15px')};
  text-align: ${(props) => (props.alignCenter ? 'center' : 'start')};
  width: ${(props) => (props.width ? props.width : 'auto')};
  color: ${(props) => (props.color ? props.color : '#000')};
`;
export const TBody = styled.tbody`
  text-align: center;
`;