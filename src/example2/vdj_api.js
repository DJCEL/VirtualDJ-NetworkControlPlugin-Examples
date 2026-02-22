
/* =============================================
		VDJ API (local)
============================================= */
const url_virtualdj = `http://127.0.0.1:80`;


function OnExecute(vdjscript) {
	try {
		const request = `${url_virtualdj}/execute?script=${encodeURIComponent(vdjscript)}`;
		return request;
	}
	catch {
		alert("Failed to execute() in VDJ_API");
		return null;
	}
}

function OnQuery(vdjscript) {
	try {
		const request = `${url_virtualdj}/query?script=${encodeURIComponent(vdjscript)}`;
		return request;
	}
	catch {
		alert("Failed to query() in VDJ_API");
		return null;
	}
}

/* =============================================
		VDJ API (server)
============================================= */
/*const VDJ = {
	url_base: "http://127.0.0.1:80",
	
	execute(vdjscript) {
		try {
			const r = await fetch(`${this.url_base}/execute?script=${encodeURIComponent(vdjscript)}`);
			return await r.text();
		}
		catch {
			alert("Failed to execute() in VDJ_API");
			return null;
		}
	},
	
	async query(vdjscript) {
		try {
			const r = await fetch(`${this.url_base}/query?script=${encodeURIComponent(vdjscript)}`, {cache: "no-store"});
			return await r.text();
		}
		catch {
			alert("Failed to query() in VDJ_API");
			return null;
		}
	}
	
};
*/
/* =============================================
		Executes
============================================= */

function OnExecuteMain(vdjscript) {
	const request = OnExecute(vdjscript);
	document.getElementById("resultExecute").src = request;
}

function OnQueryMain(Id, vdjscript) {
	const request = OnQuery(vdjscript);
	document.getElementById(Id).src = request;
}

function OnExecuteButton(vdjscript) {
	OnExecuteMain(vdjscript);
}

function OnExecuteButtonDown(vdjscript) {
	OnExecuteMain(vdjscript);
}

function OnExecuteSlider(self, vdjscript) {
	const vdjscriptLevel = self.value / 100;
	const vdjscriptSlider = `${vdjscript} ${vdjscriptLevel.toFixed(2)}`;
	OnExecuteMain(vdjscriptSlider);
}

/* =============================================
		Ping VirtualDJ
============================================= */
let VDJ_ONLINE = false;

function setOnline(state) {
	if (state == VDJ_ONLINE) return;
	VDJ_ONLINE = state;
	
	if(state == false) 
	{
		document.getElementById("resultExecute").src = "OFFLINE - Waiting for VirtualDJ";
	}
}


async function pingVDJ() {
	try {
		OnQueryMain("vdj_build", 'get_build');
		var x = document.getElementById("vdj_build").value;
		//alert(isNaN(x));
		if(x > 1000) setOnline(true);
		else setOnline(false);
	} catch {
		setOnline(false);
	}
}

var myVar1 = setInterval(pingVDJ, 1000);


/* =============================================
		Queries
============================================= */
function OnQueryRefresh() {
	OnQueryMain("left_title", 'deck left get_title_remix');
	OnQueryMain("left_artist", 'deck left get_artist');
	OnQueryMain("right_title", 'deck right get_title_remix');
	OnQueryMain("right_artist", 'deck right get_artist');
	OnQueryMain("browser_folders_1", 'get_browsed_folder');
	OnQueryMain("browser_folders_2", 'get_browsed_folder_scrollsize');
	OnQueryMain("browser_folders_3", 'get_browsed_folder_scrollpos');
	OnQueryMain("browser_folders_4", 'get_browsed_folder_selection_index');
	OnQueryMain("browser_folders_5", 'get_browsed_folder_tab');
	OnQueryMain("browser_files_1", 'get_browsed_title_artist');
	OnQueryMain("browser_files_2", 'get_browsed_scrollsize');
	OnQueryMain("browser_files_3", 'get_browsed_scrollpos');
	OnQueryMain("browser_files_4", 'get_browsed_selection_index');
}

async function refreshDecks() {
	OnQueryRefresh();
}


var myVar2 = setInterval(refreshDecks, 1000);


/* =============================================
		BUTTON HANDLER (NON INSTANT)
============================================= */
/*function press(vdjscript) {
	VDJ.execute(vdjscript);
}*/

/* =============================================
		SLIDER LIVE (requestAnimationFrame)
============================================= */
/*let SliderValue = null;
let SliderScript = null

function setSlider(el, vdjscript) {
	sliderValue = (el.value / 100).toFixed(2);
	sliderScript = vdjscript;
}

function sliderLoop() {
	if (slider !== null) {
		VDJ.execute(`${sliderScript} ${sliderValue}`);
		sliderValue = null;
	}
	requestAnimationFrame(sliderLoop);
}

sliderLoop();
*/
