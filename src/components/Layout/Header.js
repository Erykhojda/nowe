import { useContext, useEffect } from "react";
import compaignImage from "../../assets/background-image.png";
import classes from "./Header.module.css";
import IconEmerald from "./IconEmerald";
import { InputContext } from "../Store/InputContext";

const Header = () => {
	const { data, walletValue, setWalletValue } = useContext(InputContext);

	useEffect(() => {
		if (data?.length >= 0) {
			const sumTotalValue = data.reduce(
				(partialSum, a) => partialSum + a.totalAmount,
				0
			);

			setWalletValue(walletValue - sumTotalValue);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);

	return (
		<>
			<header className={classes.header}>
				<div className={classes.headerContainer}>
					<h1>Eryk Ads</h1>
				</div>
				<div className={classes.headerContainer}>
					<p>
						<IconEmerald /> {walletValue}
					</p>
				</div>
			</header>
			<div className={classes["main-image"]}>
				<img src={compaignImage} alt="campaign" />
			</div>
		</>
	);
};

export default Header;
