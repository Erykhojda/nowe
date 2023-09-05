import React from "react";
import YourCampaign from "./YourCampaign";
import classes from "./Form.module.css";
import Form from "./Form";

const CampaignBuilder = () => {
	const local = "local"
	localStorage.setItem("local", local)

	// function setCookie(name, value, days) {
	// 	const expirationDate = new Date();
	// 	expirationDate.setDate(expirationDate.getDate() + days);

	// 	const cookieValue = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=/`;
	// 	document.cookie = cookieValue;
	// }
	// setCookie('cookie', 'ciasteczka', 7);

	// function getCookie(name) {
	// 	const cookies = document.cookie.split(';');
	// 	for (const cookie of cookies) {
	// 		const [cookieName, cookieValue] = cookie.trim().split('=');
	// 		if (cookieName === name) {
	// 			return cookieValue;
	// 		}
	// 	}
	// 	return null; // Zmienna nie znaleziona
	// }

	// const wartośćZmiennej = getCookie('cookie');
	// if (wartośćZmiennej !== null) {
	// 	return (
	// 		<>
	// 			<section className={classes.campaign}>
	// 				<Form />
	// 			</section>

	// 			<YourCampaign />
	// 		</>
	// 	);
	// } else {
	// 	return (
	// 		<div><p>Nie ma cookies</p></div>
	// 	)
	// }
	const localq = localStorage.getItem("local")
	return (
		<>
			<h1>{localq}</h1>
			<section className={classes.campaign}>
				<Form />
			</section>

			<YourCampaign />
		</>
	);

};

export default CampaignBuilder;
