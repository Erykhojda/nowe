import React, { useState } from "react";
import Header from "./components/Layout/Header";
import { InputContext } from "./components/Store/InputContext";
import CampaignBuilder from "./components/Campaign/CampaignBuilder";
import "./App.css";

export const initWalletValue = 9999;

function App() {
	const [data, setData] = useState([]);
	const [selectedItem, setSelectedItem] = useState(null);
	const [walletValue, setWalletValue] = useState(initWalletValue);
	const [indexToReplace, setIndexToReplace] = useState(-1);

	return (
		<div className="App">
			<InputContext.Provider
				value={{
					data,
					setData,
					selectedItem,
					setSelectedItem,
					walletValue,
					setWalletValue,
					indexToReplace,
					setIndexToReplace,
				}}
			>
				<Header></Header>
				<main>
					<CampaignBuilder />
				</main>
			</InputContext.Provider>
		</div>
	);
}

export default App;
