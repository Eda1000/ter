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
	max-width: 480px;
    margin: 2em 0;
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

export const ShowAllAreasButton = styled.div`
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
    font-family: 'Ubuntu', sans-serif !important;
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
	margin: 2em 0px;
    @media(max-width: 759px){
        justify-content: center;
    }
`

export const InfoGroup = styled.section`
	display: flex;
    flex-wrap: wrap;
    width: 100%;
    max-width: 290px;
    max-height: 240px;
    margin-bottom: 15px;
    margin-right: 15px;
`

export const Label = styled.label`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	width: 100%;
	max-width: 320px;
	min-height: 130px;
	padding: 5px 0px;
	font-size: 25px;
	color: #002E75;
    text-align: left;
`

export const Input = styled.input`
	width: 100%;
	min-height: 65px;
	padding:  5px 0;
    border: 0;
	font-size: 1rem;
	border-bottom: 1px solid #888888;
	color: #4F4F4F;
    transition: all .5s;
    &:focus{
        outline: none;
	    border-bottom: 1px solid var(--lightblue);

    }

`
export const TextArea = styled.textarea`
	width: 100%;
	height: 65px;
	padding:  5px 0;
    border: 0;
	font-size: 1rem;
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
	justify-content: flex-end;
    margin-top: 5em;

`

export const MainButtons = styled.div`
	display: flex;
    flex-wrap: wrap;
	justify-content: space-between;
    width: 100%;
    max-width: 350px;
    @media(max-width: 759px){
        margin: auto;
    }

`

export const SaveButton = styled(ShowAllAreasButton)`
    justify-content: space-around;
    width: 155px;
    padding: 0 30px;
	background: var(--green);
`;

export const BackButton = styled(ShowAllAreasButton)`
    width: 155px;
	background: var(--main);
`;

export const AddRuleContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
	justify-content: space-around;
	width: 100%;
	max-width: 700px;
	min-height: 310px;
	padding: 30px 25px;
	border-radius: 33px;
	box-shadow: 0px 6px 6px rgba(0,0,0,.26);

`

export const RulesTitleRow = styled(TitleRow)`
    max-width: 250px;
`;

export const NewAreaButton = styled(ShowAllAreasButton)`
    justify-content: space-around;
    width: 125px;
    padding: 0 20px;
`;

export const TableWrapper = styled.div`
    width: 100%;
    max-width: 1080px;
`;

export const Table = styled.table`
    width: 100%;
    vertical-align: middle;
    text-align: left;
    border-collapse: collapse;
    border-spacing: 0;
    font-size: 1rem;
    border-radius: 20px;
    p{
        margin: 0;
        line-height: .9;
    }
    th{
        border-bottom: 2px solid #D9D9D9;
    }
    tr:not(:last-child){
        border-bottom: 2px solid #D9D9D9;
    }
    
    th,
    td {
      padding: 10px 0;
    }
    th {
      font-size: 1.2rem;
      font-weight: 700;
      color: #002E75;
    }
    td {
      font-size: 1rem;
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
        color: #002E75;
        padding-right: 5px;
        text-align: left;
        font-weight: 600;
        width: 50%;
      }

        tr:last-child{
            td:last-child{
                border-radius: 0 0 19px 19px;
            }
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

    @media (min-width: 769px){
        p{
            width: 152px;
        }
    }
`;

export const FeedBackTableRow = styled.tr`
    @media (min-width: 769px){
        border-bottom: 2px solid #D9D9D9;
        p{
            width: 110px;
        }
        span{
            position: relative;
            left: 80px;
        }
    }
`;

export const ModalContent = styled.div`
    
`;

export const ModalTitle = styled(PageTitle)`
    @media(min-width: 768px){
        text-align: left;
    }
`;

export const ModalLabel = styled(Label)`
    font-size: 20px;
    min-height: unset;
`;

export const ModalInformations = styled(Informations)`
    margin: 1em 0;
`;

export const ModalButtonsWrapper = styled(ButtonsWrapper)`
    margin-top: 0;
`;

export const ConfirmButton = styled(SaveButton)`
    padding: 0px 20px;
`;

export const DeleteButton = styled(ShowAllAreasButton)`
    width: 155px;
	background: #FF0720;
`;

