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
  align-items: center;
  position: relative;
  width: 100%;
  max-width: 895px;
  margin: 2em 0;
`
export const PageTitle = styled.h1`
  margin: 5px 0;
	font-size: 29px;
	font-weight: 700;
	color: var(--main);
`

export const AddNewPositionButton = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-around;
	width: 125px;
	min-height: 47px;
	margin: 5px 15px;
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
export const TableWrapper = styled.div`
  width: 100%;
  max-width: 1020px;
  border-radius: 19px;
  box-shadow: 0 0 6px rgba(0,0,0,.16);
  @media(min-width: 568px){
  padding: 0 30px;
  }
`;

export const Action = styled.span`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 80px;
    font-size: 1.1rem;
    color: var(--gray300);
    cursor: pointer;
    border-bottom: 1px solid transparent;
    transition: all .5s;

    img{
      width:19px;
      height:19px;
    }

    &:hover{
      border-bottom: 1px solid var(--gray300);
    }

    @media (max-width: 768px){
      display: block;
      width: unset;
      img{
        margin-right: 5px;
      }
      &:hover{
        border-bottom: 1px solid transparent;
      }
    }
`;

export const BackgroundShadow = styled.div`
  padding: 0.5rem 0;
  background: #FFFFFF;
  box-shadow: 0px 3px 15px #00000045;
  border-radius: 25px;
`;
