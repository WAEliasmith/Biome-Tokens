import { useMemo } from "react";
import styled from "styled-components";

const Button = ({
	children,
	outline,
	type = "button",
	className,
	variant,
	style,
	...props
}) => {
	const variantTheme = useMemo(() => {
		switch (variant) {
			case "mint":
				return {
					background: "#00D289",
				};
			case "red":
				return {
					background: "#FF3333",
				};
			case "disabled":
				return {
					color: "#939191",
					background: "#E2E6E9",
				};
			case "secondary":
				return {
					background: "#661CE7",
				};
			default:
				return {
					background: "#FF6433",
				};
		}
	}, [variant]);

	return (
		<StyledButton
			style={{ ...variantTheme, ...style }}
			className={`${className} text-white block px-10 rounded-lg font-semibold hover:opacity-75 transition-opacity duration-500 ease-in`}
			type={type}
			{...props}
		>
			{children}
		</StyledButton>
	);
};

const StyledButton = styled.button`
	height: 58px;

	&:disabled{
		cursor: not-allowed;
	}
`;

export default Button;
