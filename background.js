// background.js 

let orderName = "Abdulrahman", 
	ups 	  = "M UPS ",
	usps 	  = "USPS 2",
	fedex	  = "FEDEX 1",
	maniName  = "Mousa, Abdulrahman",
	truckName = "RAHMAN";

chrome.runtime.onInstalled.addListener(() => {
	chrome.storage.sync.set({ orderName, ups, usps, fedex, maniName, truckName });
});

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete') {

	chrome.storage.sync.get(async store => {
		let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

		chrome.scripting.executeScript({
			target: {tabId: tab.id},
			function: injectedScript,
			args: [store]
		})
	})

	function injectedScript(storage) 
	{
		let parent = document.querySelector("#pageNavBarActions")
		let uniqueName = document.querySelector("#headerDetailPageTitle").dataset["originalTitle"].split("#")[0].trim();

		console.log("CBP Quickbase Extension - Abdulrahman Mousa (Loaded Successfully.)")

		if (parent.querySelector(".CBPExt")) return;
		if (uniqueName == "Edit Orders") 
		{
			function CompleteOrder(e) 
			{
				e.preventDefault();
				document.querySelector("#_fid_166").value = storage.orderName;
				document.querySelector("#_fid_50") .value = "Completed";
				document.querySelector("#_fid_108").value = "Markham";
				document.querySelector("#_fid_47").value = new Date().toLocaleDateString().replaceAll("/", "-");
			}

			let completeBtn = document.createElement("a");
			completeBtn.innerText = "(CBPExt) Complete"
			completeBtn.addEventListener("click", CompleteOrder);
			completeBtn.classList = "Tall Vibrant Success FS-Button CBPExt"
			parent.prepend(completeBtn);
		} else if (uniqueName == "Edit Manifests")
		{
			function CompleteManifest(e) 
			{
				let now = new Date();
				let date = now.toLocaleDateString().replaceAll("/", "-");
				let time = now.toLocaleTimeString('en-US', {
				  hour: '2-digit',
				  minute: '2-digit',
				});
				e.preventDefault();
				document.querySelector("#_fid_85").value = "IN TRANSIT";
				document.querySelector("#_fid_98").value = "SHIPPED";
				document.querySelector("#_fid_86").value = storage.ups;
				document.querySelector("#_fid_88").value = storage.fedex;
				document.querySelector("#_fid_87").value = storage.usps;
				document.querySelector("#iup_ctrl_90 > div > div.inputs > input").value = storage.maniName;
				document.querySelector("#_fid_91").value = `${date} ${time}`;
				document.querySelector("#_fid_92").checked = true;
			}

			let completeBtn = document.createElement("a");
			completeBtn.innerText = "(CBPExt) Complete";
			completeBtn.addEventListener("click", CompleteManifest);
			completeBtn.classList = "Tall Vibrant Success FS-Button CBPExt";
			parent.prepend(completeBtn);
		} else if (uniqueName == "Manifests")
		{
			// UPS AND FEDEX COPY START
			let copyBtn = document.createElement("a");
			copyBtn.innerText = "Copy UPS / Fedex";
			copyBtn.addEventListener("click", CopyUPS);
			copyBtn.classList = "Tall Vibrant Success FS-Button CBPExt";

			let upsLabel = document.querySelector("#sect_s7 > tbody > tr:nth-child(1)");
			upsLabel.append(copyBtn);


			// USPS COPY START
			let copyUspsBtn = document.createElement("a");
			copyUspsBtn.innerText = "Copy USPS";
			copyUspsBtn.addEventListener("click", CopyUSPS);
			copyUspsBtn.classList = "Tall Vibrant Success FS-Button CBPExt";

			let uspsLabel = document.querySelector("#sect_s7 > tbody > tr:nth-child(2)");
			uspsLabel.append(copyUspsBtn);

			function CopyUPS(e) {
				e.preventDefault();
				let copyString = "";
				copyString += document.querySelector("#tdf_6").innerText + "\t";
				copyString += document.querySelector("#tdf_4").innerText + "\t\t";
				copyString += storage.truckName;

				navigator.clipboard.writeText(copyString);
			}

			function CopyUSPS(e) {
				e.preventDefault();
				let copyString = "";
				copyString += document.querySelector("#tdf_6").innerText + "\t"; 	// Customer Name
				copyString += document.querySelector("#tdf_4").innerText + "\t\t"; 	// Manifest Number and skipping shipments #
				copyString += document.querySelector("#tdf_18").innerText + "\t";	// Bag
				copyString += storage.truckName; 									// Trucklist Receiver 

				navigator.clipboard.writeText(copyString);
			}
		}
	}
  }
})