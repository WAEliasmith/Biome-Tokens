import { ReactSVG } from "react-svg";
import styled from "styled-components";
import logo from "../../assets/tree.svg";
import avatar from "../../assets/avatar.svg";
import dice from "../../assets/dice.svg";
import github from "../../assets/github.svg";
import header from "../../assets/header.svg";
import join from "../../assets/join.svg";
import near from "../../assets/near.svg";
import winning from "../../assets/winning.svg";
import create from "../../assets/create.svg";
import arrow from "../../assets/arrow.svg";
import { useMemo } from "react";

const Icon = ({ color, icon, className, size, style, onClickHandler }) => {
	const svg = useMemo(() => {
		switch (icon) {
			case "logo":
				return logo;
			case "avatar":
				return avatar;
			case "dice":
				return dice;
			case "github":
				return github;
			case "header":
				return header;
			case "join":
				return join;
			case "near":
				return near;
			case "winning":
				return winning;
			case "create":
				return create;
			case "arrow":
				return arrow;
			default:
				return logo;
		}
	}, [icon]);

	return (
		<I
			onClick={onClickHandler}
			color={color}
			className={`inline-flex items-center cursor-pointer ${className}`}
			style={style}
		>
			<ReactSVG
				beforeInjection={(svg) => {
					svg.setAttribute(
						"style",
						`width: ${size}px; height: ${size}px; margin-top:3px; margin:0;`
					);
				}}
				src={`${svg}`}
			/>
		</I>
	);
};

const I = styled.i`
	svg path {
		fill: ${(props) => props.color};
	}
`;

export default Icon;
