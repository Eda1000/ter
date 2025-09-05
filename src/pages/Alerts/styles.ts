import styled from 'styled-components';

interface Props {
	route: string
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
	max-width: 400px;
    margin: 2em 0;
    @media(max-width: 1024px){
		justify-content: center;
		margin: auto;
    }
`

export const PageTitle = styled.h1`
    margin: 5px 5px 0 0;
	font-size: 1.8rem;
    text-align: center;
	font-weight: 700;
	color: var(--main);

`

export const ShowAllStatusButton = styled.button`
	display: flex;
    justify-content: center;
	align-items: center;
	width: 100%;
    max-width: 250px;
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
    @media(max-width: 1024px){
        max-width: 205px !important;
        margin: 5px auto;
    }
`

export const AlertsWrapper = styled.section`
	width: 100%;
  max-width: 800px;
	margin: 2em 0px;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  font-family: 'Open Sans', sans-serif;

  @media(max-width: 1024px){
    justify-content: center;
  }
`

export const AlertContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
	justify-content: space-between;
	width: 100%;
	max-width: 675px;
	min-height: 210px;
    margin: 15px 0;
	padding: 15px 15px 15px 25px;
	border-radius: 9px;
	font-size: 1rem;
	background: #E0ECFF;

`

export const AlertTitle = styled.h3`
	font-size: 1.3rem;
    font-weight:300;
	color: var(--blue);

`

export const RouteTag = styled.div<Props>`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 60px;
	min-height: 18px;
	padding: 1px 1px;
	border-radius: 12px;
    text-transform: uppercase;
	font-size: 12px;
	font-weight: 700;
	color: #fff;
	background: ${props => {
		if (props.route === '1') { return '#D120AD' }
		if (props.route === '2') { return '#5985FF' }
		if (props.route === '3') { return '#FF9700' }
	}
	};
`

export const Customer = styled.h4`
	font-size: .75rem;
	font-weight: 700;
	color: #000;
    text-transform: uppercase;
`

export const Details = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;
	justify-content: space-between;

`

export const Invoice = styled.div`
    display: flex;
    align-items:center;
    font-size: .75rem;
    font-weight: 400;
    img{
        width: 9px;
        height: auto;
        margin-right: 5px;
    }
    b{
        font-weight: 700;
    }
`

export const CurrentLocation = styled(Invoice)`
    text-transform: uppercase;
`;

export const EstimatedArrival = styled(Invoice)`

`;

export const TimeCounter = styled.div`
	display: flex;
	justify-content: flex-end;
	width: 100%;
	font-size: 12px;
	color: #5D83BF;

`
export const NoAlertFeedBack = styled.div`
	width: 100%;
	max-width: 390px;
	min-height: 70px;
  margin-top: 3em;

  display: flex;
	align-items: center;
	justify-content: center;

	border-radius: 35px;
	font-size: 1.1rem;
	color: #A2B0C7;
  text-align: center;
	background: #E8EFF9;

  @media (max-width: 1024px){
    margin: 3em auto 0 auto;
  }
`



