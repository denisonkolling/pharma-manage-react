import styled from '@emotion/styled';

const Main = styled.main`
	display: flex;
	min-height: 90vh;
	height: 100%;
	width: 90vw;
	align-items: flex-start;
	justify-content: center;
	flex-wrap: wrap;
	background-color: #ffff;
	border-radius: 10px;
	position: relative;
	overflow: hidden;
	box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
	margin-top: 20px;
	margin-bottom: 20px;
	margin-left: auto;
	margin-right: auto;
`;

const MainStyled = ({ children }) => {
	return <Main>{children}</Main>;
};
export { MainStyled };
