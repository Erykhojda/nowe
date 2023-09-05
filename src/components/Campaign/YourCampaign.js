import React, { useContext, Fragment } from "react";
import classes from "./YourCampaign.module.css";
import { InputContext } from "../Store/InputContext";
import { initWalletValue } from "../../App";

const YourCampaign = () => {
	const { data, setSelectedItem, setData, setIndexToReplace, setWalletValue } =
		useContext(InputContext);

	const handleAssign = (index) => {
		const currentData = data[index];
		setIndexToReplace(index);
		if (currentData) {
			setSelectedItem(currentData);
		}
	};

	const handleDelete = (index) => {
		const dataCopy = [...data];
		dataCopy.splice(index, 1);
		setData(dataCopy);
		setWalletValue(initWalletValue);
	};

	return (
		<section className={classes.campaign}>
			<div className={classes.contenerTable}>
				<table>
					<thead>
						<tr>
							<th>Item</th>
							<th>Campaign name</th>
							<th>Keywords</th>
							<th>Bid Amount</th>
							<th>City</th>
							<th>radius</th>
							<th>Edit/Delete</th>
						</tr>
					</thead>

					{data.length > 0 &&
						data?.map(
							({ item, name, bidAmount, keywords, city, radius }, index) => (
								<Fragment key={index}>
									<tbody>
										<tr>
											<td>{item}</td>
											<td>{name}</td>
											<td>{keywords}</td>
											<td>{bidAmount}</td>
											<td>{city}</td>
											<td>{radius}</td>
											<td>
												<button onClick={() => handleAssign(index)}>
													Edit
												</button>
												<button onClick={() => handleDelete(index)}>
													Delete
												</button>
											</td>
										</tr>
									</tbody>
								</Fragment>
							)
						)}
				</table>
			</div>
		</section>
	);
};

export default YourCampaign;
