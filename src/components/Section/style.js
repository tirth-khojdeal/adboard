import styled from "styled-components";

export const Sec = styled.div`
  margin-left: 12px;
  margin-right: 12px;
  overflow-x:auto;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: rgb(0 0 0 / 20%) 0px 3px 3px -2px,
    rgb(0 0 0 / 14%) 0px 3px 4px 0px, rgb(0 0 0 / 12%) 0px 1px 8px 0px;
  .tr-card {
    background-color: #fff;
    padding: 10px;
    padding-bottom: 100px;
  }
  .bg-main {
    color: white;
    font-size: 20px;
    background: linear-gradient(
      0deg,
      rgba(119, 6, 57, 1) 0%,
      rgba(237, 11, 113, 1) 80%
    );
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    padding: 8px;
    text-align: left;
  }
`;
