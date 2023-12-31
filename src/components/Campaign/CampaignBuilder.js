import React from "react";
import YourCampaign from "./YourCampaign";
import classes from "./Form.module.css";
import Form from "./Form";

const CampaignBuilder = () => {


	function setCookie(name, value, days) {
		const expirationDate = new Date();
		expirationDate.setDate(expirationDate.getDate() + days);

		const cookieValue = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=/`;
		document.cookie = cookieValue;
	}
	setCookie('cookie', 'ciasteczka', 7);

	function getCookie(name) {
		const cookies = document.cookie.split(';');
		for (const cookie of cookies) {
			const [cookieName, cookieValue] = cookie.trim().split('=');
			if (cookieName === name) {
				return cookieValue;
			}
		}
		return null; // Zmienna nie znaleziona
	}

	const wartośćZmiennej = getCookie('cookie');
	if (wartośćZmiennej !== null) {
		return (
			<>
				<section className={classes.campaign}>
					<h1>{wartośćZmiennej}</h1>
					<Form />
				</section>

				<YourCampaign />
			</>
		);
	} else {
		return (
			<div><p>Nie ma cookies</p></div>
		)
	}
	// return (
	// 	<>

	// 		<section className={classes.campaign}>
	// 			<h1>{localq}</h1>
	// 			<Form />
	// 		</section>

	// 		<YourCampaign />
	// 	</>
	// );

};

export default CampaignBuilder;
