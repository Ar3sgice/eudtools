'use strict';

var unitSelectElements = [];
var selectedUnitIndex = -1;
var selectedUnitElement = null;

var currentButtonset = [];
var selectedButtonIndex = -1;
var selectedButtonElement = null;

var currentEditedButtonsets = [];

var redirectedUnits = [];

var unitIDs = [];
var unitIDsExt = [];
var upgradeIDs = [];
var techIDs = [];
var iconNames = [];
var buttonData = [];
var buttonPointers = [];
var statStrings = [];


var loaded = false;

const traitNames = ["position", "icon", "reqfun", "actfun", "reqvar", "actvar", "actstr", "reqstr"];
const buttonsetStartPtr = 0x515BE8;

const addButtonTypes = ["Default", "Copy Current", "Create Unit", "Build Terran", "Build Protoss", "Build Zerg", "Use Spell", "Upgrade", "Research", "Basic Unit Commands", "Copy From"]

function qs(text) {
	return document.querySelector(text);
}

function gi(text) {
	return document.getElementById(text);
}

function leftPad(str, n, pad) {
	return pad.repeat(Math.max(0, n-str.length)) + str;
}

function bytes2word(byte1, byte2) {
	return (byte2 << 8) + byte1;
}

function bytes2dword(byte1, byte2, byte3, byte4) {
	return (byte4 << 24) + (byte3 << 16) + (byte2 << 8) + byte1;
}

function words2dword(word1, word2) {
	return (word2 << 16) + word1;
}

function dword2bytes(dw) {
	return [dw & 255, (dw >>> 8) & 255, (dw >>> 16) & 255, (dw >>> 24) & 255];
}

function word2bytes(w) {
	return [w & 255, (w >>> 8) & 255];
}

function dword2words(dw) {
	return [dw & 65535, (dw >>> 16) & 65535];
}


function parseTbl(tblBuffer) {
	let decoder = new TextDecoder("EUC-KR");
	let statTxtBytes = Array.from(new Uint8Array(tblBuffer));
	let totalStrings = bytes2word(...statTxtBytes.slice(0, 2));
	let out = [];
	for(let i=1; i<=totalStrings; i++) {
		let offset = bytes2word(...statTxtBytes.slice(i * 2, i *2 + 2));
		let nextOffset = (i == totalStrings) ? statTxtBytes.length : bytes2word(...statTxtBytes.slice(i * 2 + 2, i *2 + 4));
		let j = offset;
		let stringArray = [];
		let c = 255;
		while(j < nextOffset) {
			c = statTxtBytes[j++];
			stringArray.push(c);
		}
		stringArray.pop();
		let rawStr = decoder.decode(new Uint8Array(stringArray));
		out.push(
			rawStr.replace(/[\x00-\x1f]/g, rep => rep=="\x0a" ? "\n" : "<" + leftPad(rep.charCodeAt(0).toString(16).toUpperCase(), 2, "0") + ">")
		);
	}
	return out;
}

async function loadStatTbl() {
	let statTxtAB = await fetch("stat_txt.tbl").then(f => f.arrayBuffer());
	statStrings = ["No text (crashes on ACT)"].concat(parseTbl(statTxtAB));
}

function parseRawButtonData(a) {
	return {
		"position" : a[0],
		"icon" : a[1],
		"reqfun" : words2dword(a[2], a[3]),
		"actfun" : words2dword(a[4], a[5]),
		"reqvar" : a[6],
		"actvar" : a[7],
		"actstr" : a[8],
		"reqstr" : a[9]
	}
}

function parseRawButtonPtr(n, a) {
	return {
		length: n,
		start: a == 0 ? 0 : (a - buttonsetStartPtr) / 2,
		pointer: a
	};
}

async function loadOriginalButtons() {
	let buttonPointerRaw = await fetch("../Data/button_ptr.dat").then(f => f.arrayBuffer());
	let buttonPtrU32A = new Uint32Array(buttonPointerRaw);
	for(let p=0; p<buttonPtrU32A.length; p+=3) {
		buttonPointers.push(parseRawButtonPtr(buttonPtrU32A[p], buttonPtrU32A[p + 1]));
	}

	let buttonRaw = await fetch("../Data/button.dat").then(f => f.arrayBuffer());
	let buttonU16A = new Uint16Array(buttonRaw);

	console.assert(buttonPointers.map(q => q.start).every(s => s >= 0 && s <= buttonU16A.length), "ButtonPointer all inside memory region");

	buttonPointers.forEach(bp => {
		let length = bp.length;
		let start = bp.start;
		let out = [];
		for(let p = start; p < start + 10 * length; p += 10) {
			out.push(parseRawButtonData(buttonU16A.slice(p, p + 10)));
		}
		buttonData.push(out);
	});

	console.assert(!buttonData.map(q => q.map(s => s.position).some(pos => pos == 0)).some(a => a), "ButtonData no position 0");
	console.assert(buttonData.map(q => q.map(s => s.position).some(pos => pos == 1)).some(a => a), "ButtonData has position 1");
	console.assert(!buttonData.map(q => q.map(s => s.position).some(pos => pos >= 10)).some(a => a), "ButtonData no position 10");
}

function clearButtonset() {
	currentButtonset = [];
	qs("#button-list").innerHTML = "";
}

async function createUnitArea(handler)
{
	let unitIDListRaw = await fetch("../Data/units_dat.txt").then(s => s.text());
	let unitIDList = unitIDListRaw.split(/\r?\n/).filter(s => s.indexOf(",") != -1).map(s => s.split(/, */));

	unitIDsExt = unitIDList.map(item => item[1]);
	unitIDs = unitIDsExt.slice(0, 229);

	var divSelect = document.createElement("div");
	divSelect.className = "divselect select-units";
	for(var i=0;i<unitIDList.length;i++)
	{
		var opt = document.createElement("div");
		opt.className = "divoption option-units";
		opt.addEventListener("click", handler.bind(null, unitIDList[i][0]));
		opt.textContent = "[" + i + "] " + unitIDList[i][1];
		unitSelectElements.push(opt);
		divSelect.appendChild(opt);
	}
	$("unitlist-container").appendChild(divSelect);
}

async function populateGlobalArrays() {
	let upgradeIDListRaw = await fetch("../Data/upgrades_dat.txt").then(s => s.text());
	upgradeIDs = upgradeIDListRaw.split(/\r?\n/).filter(s => s.indexOf(",") != -1).map(s => s.split(/, */)).map(s => s[1]);
	let techIDListRaw = await fetch("../Data/techdata_dat.txt").then(s => s.text());
	techIDs = techIDListRaw.split(/\r?\n/).filter(s => s.indexOf(",") != -1).map(s => s.split(/, */)).map(s => s[1]);
	let iconNameListRaw = await fetch("../Data/icon_names.txt").then(s => s.text());
	iconNames = iconNameListRaw.split(/\r?\n/);
}

function populateSelectElement(elem, array) {
	elem.innerHTML = "";
	array.forEach(item => {
		let c = document.createElement("option");
		c.textContent = item;
		elem.appendChild(c);
	});
	elem.selectedIndex = -1;
}

function populateVariable(type, addr) {
	let elem = qs("#trait-" + type + "-select");
	switch(addr) {
		case 0x428340:
		case 0x428960:
		case 0x428E00:
		case 0x428E60:
		case 0x4296B0:
		case 0x429720:

		case 0x4231F0:
		case 0x423210:
		case 0x423390:
		case 0x4234B0:
		case 0x423790:
		case 0x423860:
		case 0x423C30:
		case 0x423C40:
		case 0x423C50:
		case 0x423D10:
		case 0x423DD0:
		case 0x423EB0:
		populateSelectElement(elem, unitIDs);
		break;
		case 0x459AF0:
		populateSelectElement(elem, unitIDsExt);
		break;
		case 0x429070:
		case 0x4290F0:
		case 0x429170:
		case 0x4291C0:
		case 0x429210:
		case 0x4292C0:
		case 0x429370:
		case 0x4293E0:
		case 0x429470:
		case 0x4294E0:
		case 0x429500:
		case 0x429680:
		case 0x4296F0:

		case 0x4232B0:
		case 0x423350:
		case 0x423450:
		case 0x4234D0:
		case 0x423730:
		case 0x4239E0:
		case 0x423F70:
		populateSelectElement(elem, techIDs);
		break;
		case 0x429450:

		case 0x423310:
		populateSelectElement(elem, upgradeIDs);
		break;
		default:
		populateSelectElement(elem, []);
	}
}

function populateAddButtonType() {
		populateSelectElement(qs("#button-add-type"), addButtonTypes);
}

function populateAddButtonVariable(type) {
	let elem = qs("#button-add-id");
	switch(type) {
		case 0:
		case 1:
		case 9:
		populateSelectElement(elem, []);
		break;
		case 2:
		case 3:
		case 4:
		case 5:
		populateSelectElement(elem, unitIDs);
		break;
		case 10:
		populateSelectElement(elem, unitIDsExt);
		break;
		case 6:
		case 8:
		populateSelectElement(elem, techIDs);
		break;
		case 7:
		populateSelectElement(elem, upgradeIDs);
		break;
		default:
	}
	switch(type) {
		case 3:
		elem.selectedIndex = 106;
		break;
		case 4:
		elem.selectedIndex = 154;
		break;
		case 5:
		elem.selectedIndex = 131;
		break;
		default:
		elem.selectedIndex = -1;
		break;
	}
}

function getFirstEmptyPosition() {
	let positionsTaken = currentButtonset.map(b => b.position);
	for(let i=1; i<=9; i++) {
		if(positionsTaken.indexOf(i) == -1) {
			return i;
		}
	}
	return 1;
}

function searchButtonData(actfun, actvar) {
	let buttons = buttonData.reduce((t,a) => t.concat(a), []);
	let indexer = buttons.map(c => (c.actfun << 16) + c.actvar);
	let search = (actfun << 16) + actvar;
	let index = indexer.indexOf(search);
	if(index != -1) {
		return buttons[index];
	}
	else {
		return null;
	}
}

function addButton(type, id) {
	if(selectedUnitIndex == -1 || typeof redirectedUnits[selectedUnitIndex] != "undefined") {
		return;
	}
	switch(type) {
		case 0:
		currentButtonset.push({
			position: 1,
			icon: 0,
			reqfun: 4358864,
			actfun: 4342848,
			reqvar: 0,
			actvar: 0,
			actstr: 664,
			reqstr: 0
		});
		break;
		case 1:
		currentButtonset.push({
			position: parseInt(qs("#trait-position").value) || 0,
			icon: parseInt(qs("#trait-icon").value) || 0,
			reqfun: parseInt(qs("#trait-reqfun").value) || 0,
			actfun: parseInt(qs("#trait-actfun").value) || 0,
			reqvar: parseInt(qs("#trait-reqvar").value) || 0,
			actvar: parseInt(qs("#trait-actvar").value) || 0,
			actstr: parseInt(qs("#trait-actstr").value) || 0,
			reqstr: parseInt(qs("#trait-reqstr").value) || 0
		});
		break;
		case 2:
		var searchedUnit = searchButtonData(4338864, id);
		currentButtonset.push({
			position: getFirstEmptyPosition(),
			icon: id,
			reqfun: 4361824,
			actfun: 4338864,
			reqvar: id,
			actvar: id,
			actstr: searchedUnit ? searchedUnit.actstr : 575,
			reqstr: searchedUnit ? searchedUnit.reqstr : 0
		});
		break;
		case 3:
		var searchedUnit = searchButtonData(4341424, id);
		currentButtonset.push({
			position: getFirstEmptyPosition(),
			icon: id,
			reqfun: 4361824,
			actfun: 4341424,
			reqvar: id,
			actvar: id,
			actstr: searchedUnit ? searchedUnit.actstr : 646,
			reqstr: searchedUnit ? searchedUnit.reqstr : 0
		});
		break;
		case 4:
		var searchedUnit = searchButtonData(4341200, id);
		currentButtonset.push({
			position: getFirstEmptyPosition(),
			icon: id,
			reqfun: 4361824,
			actfun: 4341200,
			reqvar: id,
			actvar: id,
			actstr: searchedUnit ? searchedUnit.actstr : 630,
			reqstr: searchedUnit ? searchedUnit.reqstr : 0
		});
		break;
		case 5:
		var searchedUnit = searchButtonData(4341200, id);
		currentButtonset.push({
			position: getFirstEmptyPosition(),
			icon: id,
			reqfun: 4361824,
			actfun: 4340816,
			reqvar: id,
			actvar: id,
			actstr: searchedUnit ? searchedUnit.actstr : 613,
			reqstr: searchedUnit ? searchedUnit.reqstr : 0
		});
		break;
		case 6:
		var searchedTech = searchButtonData(4341616, id);
		currentButtonset.push({
			position: getFirstEmptyPosition(),
			icon: searchedTech ? searchedTech.icon : 237,
			reqfun: 4363488,
			actfun: 4341616,
			reqvar: id,
			actvar: id,
			actstr: searchedTech ? searchedTech.actstr : 0,
			reqstr: searchedTech ? searchedTech.reqstr : 0
		});
		break;
		case 7:
		var searchedUpgrade = searchButtonData(4338448, id);
		currentButtonset.push({
			position: getFirstEmptyPosition(),
			icon: searchedUpgrade ? searchedUpgrade.icon : 292,
			reqfun: 4363344,
			actfun: 4338448,
			reqvar: id,
			actvar: id,
			actstr: searchedUpgrade ? searchedUpgrade.actstr : 456 + id,
			reqstr: searchedUpgrade ? searchedUpgrade.reqstr : 0
		});
		break;
		case 8:
		var searchedTech = searchButtonData(4338512, id);
		currentButtonset.push({
			position: getFirstEmptyPosition(),
			icon: searchedTech ? searchedTech.icon : 237,
			reqfun: 4363520,
			actfun: 4338512,
			reqvar: id,
			actvar: id,
			actstr: searchedTech ? searchedTech.actstr : 324,
			reqstr: searchedTech ? searchedTech.reqstr : 0
		});
		break;
		case 9:
		var targetButtons = buttonData[3];
		targetButtons.forEach(button => {
			currentButtonset.push(objClone(button));
		});
		break;
		case 10:
		var targetButtons = currentEditedButtonsets[id] || buttonData[id];
		targetButtons.forEach(button => {
			currentButtonset.push(objClone(button));
		});
		break;
		default:
		break;
	}
	updateButtonList();
	checkEditedStatus();
}

function addButtonTypeSelectEvt() {
	populateAddButtonVariable(qs("#button-add-type").selectedIndex);
}

function error(str) {
	qs("#button-json-area").value = str;
	throw str;
}

function traitsInputToObj() {
	let v = traitNames.map(trait => qs("#trait-" + trait).value == "" ? 0 : parseInt(qs("#trait-" + trait).value));
	if(v.some(val => !isFinite(val))) {
		error("Invalid input!");
		return null;
	}
	return {
		position: v[0],
		icon: v[1],
		reqfun: v[2],
		actfun: v[3],
		reqvar: v[4],
		actvar: v[5],
		actstr: v[6],
		reqstr: v[7]
	};
}

function unitSelectHandler(id, evt) {
	if(selectedUnitElement) {
		selectedUnitElement.classList.remove("option-selected");
	}
	let newSelected = evt.target;
	selectedUnitElement = newSelected;
	selectedUnitIndex = id;
	selectedUnitElement.classList.add("option-selected");

	selectedButtonIndex = -1;
	selectedButtonElement = null;


	if(typeof redirectedUnits[id] != "undefined") {
		qs("#redirect-units-select").selectedIndex = redirectedUnits[id];
		setCurrentButtonsetToUnit(redirectedUnits[id]);
	}
	else {
		qs("#redirect-units-select").selectedIndex = -1;
		setCurrentButtonsetToUnit(id);
	}

	evt.stopPropagation();
	evt.preventDefault();
}

function buttonSelectHandler(id, evt) {
	if(selectedButtonElement) {
		selectedButtonElement.classList.remove("option-selected");
	}
	let newSelected = evt.target;
	selectedButtonElement = newSelected;
	selectedButtonIndex = id;
	selectedButtonElement.classList.add("option-selected");

	updateButton(currentButtonset[id]);

	evt.stopPropagation();
	evt.preventDefault();
}

function setIconImage(iconImg, iconID) {
	if(iconID == -1) {
		iconImg.style.display = "none";
	}
	else {
		iconImg.style.display = "block";
		iconImg.style.top = (-34 * Math.floor(iconID / 200)) + "px";
		iconImg.style.left = (-36 * (iconID % 200)) + "px";
	}
}

function setIconPreview(pos, iconID) {
	setIconImage(qs("#icon-preview-img-" + pos), iconID);
}

function updateIconPreviews() {
	for(let i=1; i<=9; i++) {
		setIconPreview(i, -1);
	}
	currentButtonset.forEach(button => {
		if(button.position >= 1 && button.position <= 9) {
			setIconPreview(button.position, button.icon);
		}
	})
}

function setUnitRedirect(fromUnit, toUnit) {
	redirectedUnits[fromUnit] = toUnit;
}

function cancelUnitRedirect(fromUnit) {
	delete redirectedUnits[fromUnit];
}

function setUnitRedirectEvt() {
	let fromUnit = selectedUnitIndex;
	let toUnit = qs("#redirect-units-select").selectedIndex;
	if(fromUnit == -1 || toUnit == -1 || !selectedUnitElement) {
		return;
	}
	setUnitRedirect(fromUnit, toUnit);
	setCurrentButtonsetToUnit(toUnit);
	selectedUnitElement.classList.add("option-redirected");
}

function cancelUnitRedirectEvt() {
	let fromUnit = selectedUnitIndex;
	if(fromUnit == -1 || !selectedUnitElement) {
		return;
	}
	qs("#redirect-units-select").selectedIndex = -1;
	cancelUnitRedirect(fromUnit);
	setCurrentButtonsetToUnit(fromUnit);
	selectedUnitElement.classList.remove("option-redirected");
}

function objClone(obj) {
	return JSON.parse(JSON.stringify(obj));
}

function objEqual(obj1, obj2) {
	return JSON.stringify(obj1) == JSON.stringify(obj2);
}

function addToButtonList(button, i) {
	var opt = document.createElement("div");
	opt.className = "divoption option-button";
	opt.addEventListener("click", buttonSelectHandler.bind(null, i));
	opt.textContent = "[" + button.position + "] " + iconNames[button.icon];
	if(typeof redirectedUnits[selectedUnitIndex] != "undefined") {
		opt.className += " option-redirected";
	}
	if(i == selectedButtonIndex) {
		opt.className += " option-selected";
		selectedButtonElement = opt;
	}
	qs("#button-list").appendChild(opt);
}

function updateButtonList() {
	qs("#button-list").innerHTML = "";
	currentButtonset.forEach((button, i) => addToButtonList(button, i));
	updateIconPreviews();
}

function sortButtons() {
	if(selectedUnitIndex == -1 || typeof redirectedUnits[selectedUnitIndex] != "undefined") {
		return;
	}
	let newMapping = currentButtonset.map((a,i) => [i,a]).sort((a,b) => a[1].position - b[1].position);
	let newIndex = newMapping.map(c => c[0]).indexOf(selectedButtonIndex);
	currentButtonset = newMapping.map(c => c[1]);
	selectedButtonIndex = newIndex;
	updateButtonList();
	checkEditedStatus();
}

function deleteSelectedButton() {
	if(selectedUnitIndex == -1 || typeof redirectedUnits[selectedUnitIndex] != "undefined") {
		return;
	}
	currentButtonset.splice(selectedButtonIndex, 1);
	selectedButtonIndex = -1;
	selectedButtonElement = null;
	updateButtonList();
	checkEditedStatus();
}

function resetButtons() {
	if(selectedUnitIndex == -1 || typeof redirectedUnits[selectedUnitIndex] != "undefined") {
		return;
	}
	currentButtonset = objClone(buttonData[selectedUnitIndex]);
	updateButtonList();
	checkEditedStatus();
}

function addButtonEvt(evt) {
	addButton(qs("#button-add-type").selectedIndex, qs("#button-add-id").selectedIndex);
}

function sortButtonsEvt(evt) {
	sortButtons();
}

function deleteSelectedButtonEvt(evt) {
	deleteSelectedButton();
}

function resetButtonsEvt(evt) {
	resetButtons();
}


function updateButton(button) {
	qs("#trait-position").value = button.position;
	qs("#trait-reqfun").value = button.reqfun;
	qs("#trait-actfun").value = button.actfun;

	try {
		qs("#trait-reqfun-select").selectedIndex = bf_list[0].map(b => b[0]).indexOf(button.reqfun);
	}
	catch(e) {
		qs("#trait-reqfun-select").selectedIndex = -1;
	}
	try {
		qs("#trait-actfun-select").selectedIndex = bf_list[1].map(b => b[0]).indexOf(button.actfun);
	}
	catch(e) {
		qs("#trait-actfun-select").selectedIndex = -1;
	}

	populateVariable("reqvar", button.reqfun);
	populateVariable("actvar", button.actfun);

	["icon", "reqvar", "actvar", "actstr", "reqstr"].forEach(type => {
		qs("#trait-" + type).value = button[type];
		qs("#trait-" + type + "-select").selectedIndex = button[type];
	})
}

function refreshUnitList() {
	for(let i=0; i<unitIDsExt.length; i++) {
		if(currentEditedButtonsets[i]) {
			unitSelectElements[i].classList.add("option-edited");
		}
		else {
			unitSelectElements[i].classList.remove("option-edited");
		}
		if(typeof redirectedUnits[i] != "undefined") {
			unitSelectElements[i].classList.add("option-redirected");
		}
		else {
			unitSelectElements[i].classList.remove("option-redirected");
		}
	}
}

function refreshAll() {;
	refreshUnitList();
	clearButtonset();
	updateIconPreviews();
	selectedButtonIndex = -1;
	selectedButtonElement = null;
}

function checkEditedStatus() {
	let id = selectedUnitIndex;

	let originalButtonset = buttonData[id];
	if(objEqual(originalButtonset, currentButtonset)) {
		delete currentEditedButtonsets[id];
		unitSelectElements[id].classList.remove("option-edited");
	}
	else {
		// this will not create a new reference, but it's fine to keep it in sync.
		currentEditedButtonsets[id] = currentButtonset;
		unitSelectElements[id].classList.add("option-edited");
	}
}

function saveButtonEdit() {
	let id = selectedUnitIndex;
	if(typeof redirectedUnits[id] != "undefined") {
		return;
	}
	if(selectedButtonIndex >= 0 && currentButtonset[selectedButtonIndex]) {
		currentButtonset[selectedButtonIndex] = traitsInputToObj();
	}
	checkEditedStatus();
}

function setCurrentButtonsetToUnit(unit) {
	if(currentEditedButtonsets[unit]) {
		currentButtonset = currentEditedButtonsets[unit];
	}
	else {
		currentButtonset = objClone(buttonData[unit]);
	}
	updateButtonList();
}

function buttonsetAdd(type, uid) {
	currentButtonset.push();
}

function evtSelectIndex(type, evt) {
	switch(type) {
		case "icon":
		case "reqvar":
		case "actvar":
		case "reqstr":
		case "actstr":
		qs("#trait-" + type).value = qs("#trait-" + type + "-select").selectedIndex;
		break;
		case "reqfun":
		try {
			var addr = bf_list[0][qs("#trait-" + type + "-select").selectedIndex][0];
			qs("#trait-" + type).value = addr;
			populateVariable("reqvar", addr);
		}
		catch(e) {
			qs("#trait-" + type).value = 0;
		}
		break;
		case "actfun":
		try {
			var addr = bf_list[1][qs("#trait-" + type + "-select").selectedIndex][0];
			qs("#trait-" + type).value = addr;
			populateVariable("actvar", addr);
		}
		catch(e) {
			qs("#trait-" + type).value = 0;
		}
		break;
		default:
	}
	saveButtonEdit();
	switch(type) {
		case "position":
		case "icon":
		updateButtonList();
		default:
	}
}

function evtUpdateIndex(type, evt) {
	var tval = parseInt(qs("#trait-" + type).value);
	switch(type) {
		case "icon":
		case "reqvar":
		case "actvar":
		case "reqstr":
		case "actstr":
		if(isFinite(tval) && tval >= 0 && tval < 10000) {
			qs("#trait-" + type + "-select").selectedIndex = tval;
		}
		break;
		case "reqfun":
		if(isFinite(tval) && tval >= 4000000 && tval < 5999999) {
			try {
				qs("#trait-" + type + "-select").selectedIndex = bf_list[0].map(b => b[0]).indexOf(tval);
				populateVariable("reqvar", tval);
			}
			catch(e) {
				qs("#trait-" + type + "-select").selectedIndex = -1;
			}
		}
		break;
		case "actfun":
		if(isFinite(tval) && tval >= 4000000 && tval < 5999999) {
			try {
				qs("#trait-" + type + "-select").selectedIndex = bf_list[1].map(b => b[0]).indexOf(tval);
				populateVariable("actvar", tval);
			}
			catch(e) {
				qs("#trait-" + type + "-select").selectedIndex = -1;
			}
		}
		break;
		default:
	}
	saveButtonEdit();
	switch(type) {
		case "position":
		case "icon":
		updateButtonList();
		default:
	}
}

function getEditedButtonJSON() {
	let buttonset = [];
	let editedIDs = [];
	for(let i in currentEditedButtonsets) {
		editedIDs.push({
			id: parseInt(i),
			start: buttonset.length,
			count: currentEditedButtonsets[i].length
		});
		buttonset = buttonset.concat(currentEditedButtonsets[i]);
	}

	let redirects = [];
	for(let i in redirectedUnits) {
		redirects.push({
			from: parseInt(i),
			to: redirectedUnits[i]
		});
	}
	return JSON.stringify({
		"buttons" : buttonset,
		"units" : editedIDs,
		"redir" : redirects
	}, 2, " ");
}

function setEditedButtonJSON(json) {
	let obj = JSON.parse(json);
	let ebs = [];
	let rdu = [];
	obj.redir.forEach(a => {
		rdu[a.from] = a.to;
	});
	obj.units.forEach(u => {
		ebs[u.id] = obj.buttons.slice(u.start, u.start + u.count);
	});
	currentEditedButtonsets = ebs;
	redirectedUnits = rdu;
	refreshAll();
}

function generateJSONEvt() {
	qs("#button-json-area").value = getEditedButtonJSON();
}

function updateFromJSONEvt() {
	setEditedButtonJSON(qs("#button-json-area").value);
}

function hex0x(n) {
	return "0x" + leftPad(n.toString(16), 8, "0");
}

function buttonToTrigger(button, offset, template) {
	return template.replace(/\^1/g, hex0x(offset + 0x00)).replace(/\^2/g, words2dword(button.position, button.icon)) + "\n"
	     + template.replace(/\^1/g, hex0x(offset + 0x04)).replace(/\^2/g, button.reqfun) + "\n"
	     + template.replace(/\^1/g, hex0x(offset + 0x08)).replace(/\^2/g, button.actfun) + "\n"
	     + template.replace(/\^1/g, hex0x(offset + 0x0C)).replace(/\^2/g, words2dword(button.reqvar, button.actvar)) + "\n"
	     + template.replace(/\^1/g, hex0x(offset + 0x10)).replace(/\^2/g, words2dword(button.actstr, button.reqstr)) + "\n";
}

function unitToTrigger(unit, offset, template) {
	const unitButtonAddr = 0x5187E8;
	return template.replace(/\^1/g, hex0x(unitButtonAddr + 0x0C * unit.id + 0x00)).replace(/\^2/g, unit.count) + "\n"
	     + template.replace(/\^1/g, hex0x(unitButtonAddr + 0x0C * unit.id + 0x04)).replace(/\^2/g, offset + unit.start * 0x14) + "\n";
}

function redirToTrigger(unitID, count, redirAddr, template) {
	const unitButtonAddr = 0x5187E8;
	return template.replace(/\^1/g, hex0x(unitButtonAddr + 0x0C * unitID + 0x00)).replace(/\^2/g, count) + "\n"
	     + template.replace(/\^1/g, hex0x(unitButtonAddr + 0x0C * unitID + 0x04)).replace(/\^2/g, redirAddr) + "\n"
}

function convertJSONToTriggerActions(json, offset) {
	let obj = JSON.parse(json);

	if(!(obj.buttons && obj.units)) {
		return "ERROR: incorrect JSON object";
	}
	obj.redir = obj.redir || [];

	const triggerTemplate = "MemoryAddr(^1, Set To, ^2);";

	let out = "";
	out += obj.buttons.map((button, i) => buttonToTrigger(button, offset + i * 0x14, triggerTemplate)).join("");
	out += obj.units.map((unit, i) => unitToTrigger(unit, offset, triggerTemplate)).join("");

	let editedUnits = obj.units.map(u => u.id);
	for(let i=0; i<obj.redir.length; i++) {
		let unitID = obj.redir[i].from;
		let target = obj.redir[i].to;
		let index = editedUnits.indexOf(target);
		var redirAddr, count;
		if(index != -1) {
			count = obj.units[index].count;
			redirAddr = offset + obj.units[index].start * 0x14;
		}
		else {
			count = buttonPointers[target].length;
			redirAddr = buttonPointers[target].pointer;
		}
		out += redirToTrigger(unitID, count, redirAddr, triggerTemplate);
	}
	return out;
}

function calculateNextOffset(json, offset) {
	let obj = JSON.parse(json);

	if(!(obj.buttons && obj.units)) {
		return hex0x(offset);
	}

	let buttonCount = obj.buttons.length;
	let newOffset = offset + buttonCount * 0x14;
	return hex0x(offset) + " // Next " + hex0x(newOffset);
}

function triggerFormat(trg) {
	let lines = trg.split(/\r?\n/).map(line => line.trim()).filter(line => line.length > 0);
	return lines.map(line => {
		if(line.indexOf("Trigger") == 0) {
			return "\n" + line;
		}
		else if(line.indexOf("}") == 0) {
			return line + "\n";
		}
		else if(line.indexOf("Conditions") == 0 || line.indexOf("Actions") == 0) {
			return line;
		}
		else if(line.indexOf("/") == 0) {
			return line;
		}
		else {
			return "\t" + line;
		}
	}).join("\n").replace(/\n{3,}/g, "\n\n");
}

function generateTriggerEvt(evt) {
	let json = qs("#button-json-area").value;
	let offset = parseInt(qs("#input-offset").value);

	if(json.trim().length < 10) {
		qs("#output-trigger").value = "Please generate JSON first!"
		return;
	}
	if(!isFinite(offset)) {
		qs("#output-trigger").value = "Error: Invalid offset"
		return;
	}

	let out = convertJSONToTriggerActions(json, offset);

	if(out.indexOf("Error") == -1 && out.length > 1) {
		qs("#input-offset").value = calculateNextOffset(json, offset);
	}

	let player = qs("#input-player").value;
	let conds = qs("#input-cond").value;
	let acts = qs("#input-act").value;

	if(player.trim().length == 0) {
		qs("#output-trigger").value = out;
	}
	else {
		qs("#output-trigger").value = triggerFormat(sliceTrigger(player, conds, out + acts)).replace(/^\r?\n/g, "");
	}

}

function timeify(func) {
	return evt => setTimeout(func.bind(null, evt), 25);
}

function initTextValues() {
	if(qs("#output-trigger").value != "" || qs("#button-json-area").value != "") {
		return;
	}
	traitNames.forEach(t => {
		qs("#trait-" + t).value = "0";
	});
	qs("#input-player").value = "Player 8";
	qs("#input-cond").value = "Always();";
	qs("#input-act").value = `Comment("ButtonMaker Generated");`;
	qs("#input-offset").value = "0x590000";
}

async function init() {
	await Promise.all([
		createUnitArea(unitSelectHandler),
		populateGlobalArrays(),
		loadStatTbl(),
		loadOriginalButtons()
	]);
	populateSelectElement(qs("#redirect-units-select"), unitIDsExt);
	populateSelectElement(qs("#trait-icon-select"), iconNames);
	populateSelectElement(qs("#trait-reqfun-select"), bf_list[0].map(item => item[1]));
	populateSelectElement(qs("#trait-actfun-select"), bf_list[1].map(item => item[1]));
	populateSelectElement(qs("#trait-reqstr-select"), statStrings);
	populateSelectElement(qs("#trait-actstr-select"), statStrings);

	populateAddButtonType();
	qs("#button-add-type").addEventListener("change", addButtonTypeSelectEvt);

	["icon", "reqfun", "actfun", "reqvar", "actvar", "reqstr", "actstr"].forEach(item => {
		qs("#trait-" + item + "-select").addEventListener("change", evtSelectIndex.bind(null, item));
		qs("#trait-" + item).addEventListener("keydown", timeify(evtUpdateIndex.bind(null, item)));
	});
	qs("#trait-position").addEventListener("keydown", timeify(evtUpdateIndex.bind(null, "position")));

	qs("#redirect-action").addEventListener("click", setUnitRedirectEvt);
	qs("#redirect-cancel").addEventListener("click", cancelUnitRedirectEvt);

	qs("#button-add-action").addEventListener("click", addButtonEvt);
	qs("#button-sort-action").addEventListener("click", sortButtonsEvt);
	qs("#button-delete-action").addEventListener("click", deleteSelectedButtonEvt);
	qs("#button-reset-action").addEventListener("click", resetButtonsEvt);

	qs("#generate-json-action").addEventListener("click", generateJSONEvt);
	qs("#generate-trigger-action").addEventListener("click", generateTriggerEvt);
	qs("#button-json-area").addEventListener("paste", timeify(updateFromJSONEvt));

	initTextValues();

	loaded = true;
}