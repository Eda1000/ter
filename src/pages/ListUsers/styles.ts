import styled from 'styled-components';

interface Props {

}

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    padding: 0 11.5%;
    background: #fff;
    padding-bottom: 2em;
`;

export const Content = styled.div`
    max-width: 1300px;
    margin: 4em 0;
    padding: 0 10px;
`

export const TitleRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    position: relative;
    width: 100%;
    max-width: 815px;
    margin: 2em 0;
    @media(max-width: 568px){
        justify-content: center;
    }
`
export const PageTitle = styled.h1`
  margin: 5px 0;
	font-size: 1.8rem;
  text-align: center;
	font-weight: 700;
	color: var(--main);
`

export const NewUsersButton = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-around;
	width: 125px;
	min-height: 47px;
	margin: 5px 5px;
	padding: 5px 10px;
	border-radius: 7px;
	border: unset;
	box-shadow: 0px 3px 6px rgba(0,0,0,.16);
  color: #fff;
	font-size: 1.1rem;
	font-weight: 500;
	text-align: center;
	background: var(--lightblue);
  cursor: pointer;
  &:hover{
      opacity: .9;
  }

`

export const SearchBoxContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    width: 100%;
    max-width: 470px;
    min-height: 58px;
    margin: 5px auto;
    padding: 10px 20px;
    border-radius: 29px;
    border: 2px solid var(--blue);
    img{
        cursor: pointer;
    }
`;

export const SearchBox = styled.input`
    width: 100%;
    border: unset;
    font-size: 25px;
    color: var(--blue);
    background: transparent;
    &::placeholder{
        color: #888888;
    }
    &:focus{
        outline: none;

    }

`
export const TableWrapper = styled.div`
    width: 100%;
    max-width: 960px;
    border-radius: 19px;
    box-shadow: 0 0 6px rgba(0,0,0,.16);
    @media(min-width: 568px){
    padding: 0 30px;
    }
`;
export const Table = styled.table`
    width: 100%;
    max-width: 960px;
    vertical-align: middle;
    text-align: left;
    border-collapse: collapse;
    border-spacing: 0;

    .columns:hover {
      background: #D4DBE7;
      cursor: pointer;
    }

    tr:not(:last-child){
      border-bottom: 2px solid #D4DBE7;
    }
    th,
    td {
      padding: 15px;
    }
    th {
      font-size: 1.1rem;
      font-weight: 500;
      color: #002E75;
      border-bottom: 2px solid #D4DBE7;
    }
    td {
      font-size: 1.1rem;
      color: #000;
    }
    td:last-child{
      color:#047D10;
      font-weight: 500;
    }

    @media (max-width: 768px) {
      tbody,
      tr,
      td {
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        text-align: right;
      }
      thead {
        display: none;
      }
      td {
        position: relative;
      }
      td:before {
        content: attr(data-label);
        position: absolute;
        color: #002E75;
        padding-right: 5px;
        text-align: left;
        font-weight: 600;
        width: 50%;
      }
    }

    @media (max-width: 568px){
      td:before {
        position: relative;
        text-align: left;
      }
      td{
          text-align: left;
          padding: 15px 15px;
      }
    }

    @media(min-width: 320px){
      overflow-x: scroll;
    }
`;
