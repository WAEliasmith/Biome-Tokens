import styled from "styled-components";
// import Button from "../Button/Button";

const Navigator = ({ next, prev, pageNum }) => {
	return (
		<Nav className="py-6 flex justify-center items-center">
			{/* <Button disabled={!prev} variant={prev ? "secondary" : "disabled"}>
				PREV
			</Button>
			<h3 className="mx-10">Page - {pageNum}</h3>
			<Button disabled={!next} variant={next ? "secondary" : "disabled"}>
				NEXT
			</Button> */}
		</Nav>
	);
};

const Nav = styled.div`
	background: #c4c4c4;
`;

export default Navigator;
