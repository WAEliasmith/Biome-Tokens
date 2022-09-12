import styled from "styled-components";

const Timer = ({ time }) => {
	return (
		<Wrapper className="rounded-full flex flex-col items-center justify-center">
			<h3 className="text-xl text-primary">{time}</h3>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	width: 90px;
	height: 90px;
	background: #f5f5f5;
  border: 4px solid #FFD1C2;
`;

export default Timer;
