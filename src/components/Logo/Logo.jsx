import Icon from "../Icon/Icon";
import styled from "styled-components";

const Logo = ({ footer }) => {
	return (
		<Wrapper footer={footer} className="flex">
			<div className="relative z-10">
				<Icon size={60} icon="logo" />
			</div>
			<p className="text-md font-semibold mt-1.5 -ml-1">Biome Tokens</p>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	& > p {
		color: ${(props) => (!props?.footer ? "rgba(147, 145, 145, 1)" : "#fff")};
		font-size: 24px;
		line-height: 36px;
	}
`;

export default Logo;
