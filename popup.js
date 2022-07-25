async function load() {
	let orderName 	= document.querySelector("#nameIn"),
		ups 		= document.querySelector("#upsIn"),
		usps 		= document.querySelector("#uspsIn"),
		fedex 		= document.querySelector("#fedexIn"),
		maniName	= document.querySelector("#maniNameIn"),
		truckName	= document.querySelector("#truckNameIn");

	let orderNameBtn = document.querySelector("#setOrderName"),
		maniNameBtn = document.querySelector("#setManiName"),
		truckNameBtn = document.querySelector("#setTruckName"),
		UpsBtn = document.querySelector("#setUPS"),
		UspsBtn = document.querySelector("#setUSPS"),
		FedexBtn = document.querySelector("#setFEDEX");

	chrome.storage.sync.get(store => {
		orderName.value 		= store["orderName"];
		ups.value  				= store["ups"];
		usps.value				= store["usps"];
		fedex.value				= store["fedex"];
		maniName.value 			= store["maniName"];
		truckName.value 		= store["truckName"];

		orderNameBtn.addEventListener("click", e => SetStorage("orderName", orderName.value));
		maniNameBtn .addEventListener("click", e => SetStorage("maniName", maniName.value));
		truckNameBtn.addEventListener("click", e => SetStorage("truckName", truckName.value));
		UpsBtn 		.addEventListener("click", e => SetStorage("ups", ups.value));
		UspsBtn 	.addEventListener("click", e => SetStorage("usps", usps.value));
		FedexBtn 	.addEventListener("click", e => SetStorage("fedex", fedex.value));
	})
}


function SetStorage(key, val)
{
	let alt = "";
	switch(key)
	{
		case "orderName":
			chrome.storage.sync.set({orderName: val});
			alt = "Order Name";
			break;
		case "maniName":
			chrome.storage.sync.set({maniName: val});
			alt = "Manifest Name";
			break;
		case "truckName":
			chrome.storage.sync.set({truckName: val});
			alt = "Truck List Name";
			break;
		case "ups":
			chrome.storage.sync.set({ups: val});
			alt = "UPS";
			break;
		case "usps":
			chrome.storage.sync.set({usps: val});
			alt = "USPS";
			break;
		case "fedex":
			chrome.storage.sync.set({fedex: val});
			alt = "Fedex";
			break;
	}
	let alert = document.createElement("div");

	alert.innerText = `${alt} was modified to ${val}`;
	setTimeout(e => alert.remove(), 3000);

	document.querySelector(".container").prepend(alert);
	
}


load();