import React, { useRef, useState, useContext, useEffect } from "react";
import classes from "./Form.module.css";
import { InputContext } from "../Store/InputContext";
import { v4 as uuidv4 } from "uuid";
import { initWalletValue } from "../../App";

const isEmpty = (value) => value.trim() === "";

const Form = () => {
	const [itemValue, setItemValue] = useState("");
	const [bidAmount, setBidAmount] = useState(2);
	const [radiusValue, setRadiusValue] = useState(5);

	const {
		data,
		setData,
		selectedItem,
		setSelectedItem,
		setWalletValue,
		indexToReplace,
		setIndexToReplace,
	} = useContext(InputContext);

	const nameInputRef = useRef();
	const keywordsInputRef = useRef();
	const cityInputRef = useRef();

	useEffect(() => {
		if (selectedItem) {
			const { bidAmount, city, item, keywords, name, radius } = selectedItem;
			setBidAmount(bidAmount);
			setRadiusValue(radius);
			setItemValue(item);
			nameInputRef.current.value = name;
			cityInputRef.current.value = city;
			keywordsInputRef.current.value = keywords;
		}
	}, [selectedItem, setSelectedItem]);

	const [formInputsValidity, setFormInputsValidity] = useState({
		name: true,
		keywords: true,
		city: true,
	});

	const bidAmountChange = (e) => {
		const convertBid = Number(e.target.value);
		setBidAmount(convertBid);
	};

	const radiusValueChange = (e) => {
		const convertRadius = Number(e.target.value);
		setRadiusValue(convertRadius);
	};

	const clikcedItem = (id) => {
		setItemValue(id);
	};

	const confirmHandler = (e) => {
		e.preventDefault();

		const enteredName = nameInputRef.current.value;
		const enteredKeywords = keywordsInputRef.current.value;
		const enteredCity = cityInputRef.current.value;

		const enteredNameIsValid = !isEmpty(enteredName);
		const enteredKeywordsIsValid = !isEmpty(enteredKeywords);
		const enteredCityIsValid = !isEmpty(enteredCity);

		setFormInputsValidity({
			name: enteredNameIsValid,
			keywords: enteredKeywordsIsValid,
			city: enteredCityIsValid,
		});

		const formIsValid =
			enteredNameIsValid && enteredKeywordsIsValid && enteredCityIsValid;

		if (!formIsValid) {
			return;
		}

		const itemIndex = uuidv4();
		const totalAmount = bidAmount + radiusValue;

		const submitData = {
			index: itemIndex,
			item: itemValue,
			name: enteredName,
			keywords: enteredKeywords,
			bidAmount: bidAmount,
			city: enteredCity,
			radius: radiusValue,
			totalAmount,
		};

		setWalletValue(initWalletValue);

		if (selectedItem) {
			const dataCopy = JSON.parse(JSON.stringify(data));
			dataCopy.splice(indexToReplace, 1, submitData);

			setSelectedItem(null);
			setData(dataCopy);
			setIndexToReplace(-1);
			nameInputRef.current.value = "";
			keywordsInputRef.current.value = "";
			cityInputRef.current.value = "cracow";
			setItemValue();
			setBidAmount(2);
			setRadiusValue(5);
			return;
		}

		setData([...data, submitData]);

		nameInputRef.current.value = "";
		keywordsInputRef.current.value = "";
		cityInputRef.current.value = "cracow";
		setItemValue();
		setBidAmount(2);
		setRadiusValue(5);
	};

	const nameControlClasses = `${classes.control} ${
		formInputsValidity.name ? "" : classes.invalid
	}`;

	const keywordsControlClasses = `${classes.control} ${
		formInputsValidity.keywords ? "" : classes.invalid
	}`;

	return (
		<>
			<div className={classes.contenerItems}>
				<div
					className={
						itemValue === "Table"
							? classes.selectedTable
							: classes.contenerItems_item
					}
					onClick={() => clikcedItem("Table")}
				></div>
				<div
					className={
						itemValue === "Park"
							? classes.selectedPark
							: classes.contenerItems_item
					}
					onClick={() => clikcedItem("Park")}
				></div>
				<div
					className={
						itemValue === "Parallettes"
							? classes.selectedParallettes
							: classes.contenerItems_item
					}
					onClick={() => clikcedItem("Parallettes")}
				></div>
			</div>
			<form className={classes.form} onSubmit={confirmHandler}>
				<div className={nameControlClasses}>
					<label htmlFor="name">Campaign Name</label>
					<input type="text" id="name" ref={nameInputRef} />
					{!formInputsValidity.name && <p>Please enter a valid name!</p>}
				</div>
				<div className={keywordsControlClasses}>
					<label htmlFor="keywords">Keywords</label>
					<input
						type="text"
						id="keywords"
						placeholder="tanio, szybko, wygodnie"
						ref={keywordsInputRef}
					/>
					{!formInputsValidity.keywords && <p>Please enter a keywords!</p>}
				</div>
				<div className={classes.control}>
					<label htmlFor="bidAmount">
						Bid Amount: <p>{bidAmount} $</p>
					</label>

					<input
						onChange={bidAmountChange}
						type="range"
						id="bidAmount"
						value={bidAmount}
						min="2"
						max="100"
					/>
				</div>
				<div className={classes.control}>
					<label htmlFor="city">City</label>
					<select name="city" id="city" ref={cityInputRef}>
						<option value="cracow">Cracow</option>
						<option value="warsaw">Warsaw</option>
						<option value="wroclaw">Wroclaw</option>
					</select>
				</div>
				<div className={classes.control}>
					<label htmlFor="radius">
						Radius: <p>{radiusValue} km</p>
					</label>

					<input
						onChange={radiusValueChange}
						type="range"
						id="radius"
						value={radiusValue}
						min="5"
						max="100"
					/>
				</div>
				<div className={classes.actions}>
					<button type="submit" className={classes.submit}>
						Confirm
					</button>
					<p>Total Amount: {bidAmount + radiusValue}$</p>
				</div>
			</form>
		</>
	);
};

export default Form;
