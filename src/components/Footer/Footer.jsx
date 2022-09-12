import styled from "styled-components";
import Icon from "../Icon/Icon";
import Logo from "../Logo/Logo";

const Footer = () => {
	return (
		<StyledFooter className="w-full flex items-center justify-between">
			<Logo footer />
			<a
				href="https://github.com/Origho-precious"
				className="flex items-center"
			>
				<Icon icon="github" />
				<p className="text-sm ml-3 text-grey hover:text-white duration-700 transition-colors">
					Code Repository
				</p>
			</a>
		</StyledFooter>
	);
};

const StyledFooter = styled.footer`
	padding: 0 10rem;
	height: 150px;
	background: #1e1b1b;
`;

export default Footer;
