import styled from "styled-components";

const Input = ({ type = "text", ...props }) => {
	return <StyledInput className="text-sm" type={type} {...props} />;
};

const StyledInput = styled.input`
  border: none;
  outline: none;
  height: 55px;
  display: block;
  width: 100%;
  padding: 0 2rem;
`;

export default Input;
