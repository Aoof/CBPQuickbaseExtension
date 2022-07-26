async function load() {
	let orderName 	= document.querySelector("#nameIn"),
		ups 		= document.querySelector("#upsIn"),
		usps 		= document.querySelector("#uspsIn"),
		fedex 		= document.querySelector("#fedexIn"),
		truckName	= document.querySelector("#truckNameIn"),
		maniLuid	= document.querySelector("#luid");

	let orderNameBtn 	= document.querySelector("#setOrderName"),
		truckNameBtn 	= document.querySelector("#setTruckName"),
		UpsBtn 			= document.querySelector("#setUPS"),
		UspsBtn 		= document.querySelector("#setUSPS"),
		FedexBtn 		= document.querySelector("#setFEDEX"),
		maniLuidBtn 	= document.querySelector("#setLuid");

	chrome.storage.sync.get(store => {
		orderName.value 		= store["orderName"];
		ups.value  				= store["ups"];
		usps.value				= store["usps"];
		fedex.value				= store["fedex"];
		truckName.value 		= store["truckName"];
		maniLuid.value			= store["luid"];

		orderNameBtn.addEventListener("click", e => SetStorage("orderName", orderName.value));
		truckNameBtn.addEventListener("click", e => SetStorage("truckName", truckName.value));
		UpsBtn 		.addEventListener("click", e => SetStorage("ups", ups.value));
		UspsBtn 	.addEventListener("click", e => SetStorage("usps", usps.value));
		FedexBtn 	.addEventListener("click", e => SetStorage("fedex", fedex.value));
		maniLuidBtn .addEventListener("click", e => SetStorage("luid", maniLuid.value));
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
		case "luid":
			chrome.storage.sync.set({luid: val});
			alt = "LUID";
			break;
	}
	let _alert = document.createElement("div");

	_alert.innerText = `${alt} was modified to ${val}`;
	setTimeout(e => _alert.remove(), 3000);

	document.querySelector(".container").prepend(_alert);
	
}


load();