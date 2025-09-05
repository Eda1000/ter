import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  padding: 0 11.5%;
  background: #fff;
  padding-bottom: 2em;
`;

export const FormContent = styled.form`
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
	max-width: 520px;
  margin: 3em 0 1em;
  @media(max-width: 759px){
      justify-content: center;
  }
`
export const PageTitle = styled.h1`
  margin: 5px 5px 0 0;
	font-size: 1.8rem;
  text-align: center;
	font-weight: 700;
	color: var(--main);
`

export const SeeAllPositionsButton = styled.button`
	display: flex;
    justify-content: center;
	align-items: center;
	width: 100%;
    max-width: 210px;
	min-height: 47px;
	margin: 5px 5px;
	padding: 5px 10px;
	border-radius: 7px;
	box-shadow: 0px 3px 6px rgba(0,0,0,.16);
    color: #fff !important;
	font-size: 1.1rem;
	font-weight: 500;
	text-align: center;
	background: var(--lightblue);
    cursor: pointer;
    &:hover{
        opacity: .9;
    }
    @media(max-width: 759px){
        max-width: 205px !important;
        margin: 5px auto;
    }
`
export const Informations = styled.section`
	display: flex;
    flex-wrap: wrap;
	justify-content: space-between;
    width: 100%;
    max-width: 800px;
	margin: 2em 0px;
    @media(max-width: 759px){
        justify-content: center;
    }
`
export const InfoGroup = styled.section`
	display: flex;
    flex-direction: column;
    justify-content: space-around;
    flex-wrap: wrap;
    width: 100%;
    max-width: 680px;
`

export const Label = styled.label`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	width: 100%;
	max-width: 680px;
	min-height: 130px;
	padding: 5px 0px;
	font-size: 25px;
    font-weight: 400;
	color: #002E75;
`

export const Input = styled.input`
  width: 30%;
	min-height: 30px;
	padding:  5px 0;
    border: 0;
	font-size: 1.5rem;
	border-bottom: 1px solid #888888;
	color: #4F4F4F;
    transition: all .5s;
    &:focus{
        outline: none;
	    border-bottom: 1px solid var(--lightblue);

    }

`

export const ButtonsWrapper = styled.section`
	display: flex;
    flex-wrap: wrap;
	justify-content: space-between;
    max-width: 790px;

`
export const MainButtons = styled.section`
	display: flex;
    flex-wrap: wrap;
	justify-content: space-between;
    width: 100%;
    max-width: 400px;
    @media(max-width: 759px){
        margin: auto;
    }

`
export const SaveButton = styled(SeeAllPositionsButton)`
    width: 205px;
    justify-content: space-around;
	background: var(--green);
`;


