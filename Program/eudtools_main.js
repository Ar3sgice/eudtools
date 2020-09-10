
var currentHighlight = null;
var currentHighlight2 = null;
var currentHighlightBF = null;
var currentHighlightCategory = null;
var currentSelected = 0;
var hlColor = "#444444";
var darkColor = "#222222";
var darkColorBF1 = "#222222";
var darkColorBF2 = "#333333";
var isDataExpanded = false;
var prohibitDataExpand = false;
var DeathTableStart = 0x58A364;

function calcMemory(offs,uid,len)
{
	len = len || 1;
	return offs + len * uid;
}
function calcMemoryDeaths(offs,uid,len)
{
	uid = uid || 0;
	len = len || 1;
	var mm = offs + len * uid;
	if(mm >= DeathTableStart)
	{
		mm -= DeathTableStart;
		var mt = mm % 4;
		mm >>= 2;
		var play = mm % 12;
		var unit = (mm - play) / 12;
		return [unit,play+1,(1<<(8*mt))];
	}
	else
	{
		return [0,0,0];
	}
}
function hexstrToTrig(str,startOffset,trgBase)
{
	var out="";
	var i;
	var c=str;
	var cv="";
	var a1=0;var a2=0;var a3=0;var a4=0;var a5=0;
	var offs=startOffset*1;
	while(c.length%8>1)
	{
		c+="00";
	}
	for(i=0;i<c.length;i+=8)
	{
		a1=hexCode(c.charAt(i)+c.charAt(i+1));
		a2=hexCode(c.charAt(i+2)+c.charAt(i+3));
		a3=hexCode(c.charAt(i+4)+c.charAt(i+5));
		a4=hexCode(c.charAt(i+6)+c.charAt(i+7));
		if(a4>=128)
		{
			a5=a4*16777216+a3*65536+a2*256+a1*1-4294967296;
		}
		else
		{
			a5=a4*16777216+a3*65536+a2*256+a1*1;
		}
		offs=startOffset*1+i/2;
		cv=trgBase.replace(/\^1/g,offs);
		out+=cv.replace(/\^2/g,a5);
	}
	return out;
}
function leftPad(str, n, pad) {
	return pad.repeat(Math.max(0, n-str.length)) + str;
}
function useCategory(k, evt)
{
	// select category
	evt = evt || window.event;
	var optDiv = evt.srcElement || evt.target;

	var handler = useOption;

	while(document.querySelector("#select_container>.select_memory")) {
		$("select_container").removeChild(document.querySelector("#select_container>.select_memory"));
	}
	var divSelect = document.createElement("div");
	divSelect.className = "divselect select_memory";
	for(var i=categorylist[k][0];i<categorylist[k][1];i++)
	{
		var opt = document.createElement("div");
		opt.className = "divoption option_memory";
		opt.optionID = i;
		opt.onclick = handler;
		if(memorylist[i][3].length == 0)
		{
			opt.style.height = "1em";
		}
		opt.innerHTML = memorylist[i][3];
		divSelect.appendChild(opt);
	}
	$("select_container").appendChild(divSelect);

	if(currentHighlightCategory)
	{
		currentHighlightCategory.style.background = darkColor;
	}
	optDiv.style.background = hlColor;
	currentHighlightCategory = optDiv;
}
function useOption(evt)
{
	evt = evt || window.event;
	var optDiv = evt.srcElement || evt.target;
	var optID = optDiv.optionID;
	currentSelected = optID;

	// default areas to display:none
	$("upg_area").style.display = "none";
	$("selgroup_area").style.display = "none";
	$("keygroup_area").style.display = "none";
	$("req_area").style.display = "none";
	$("buttonfunction_area").style.display = "none";
	$("icecc_area").style.display = "none";
	$("etg_area").style.display = "none";
	$("textstack_area").style.display = "none";
	$("trigdupl_area").style.display = "none";
	$("trigslice_area").style.display = "none";
	$("playercolor_area").style.display = "none";
	$("trigconv_area").style.display = "none";
	$("stattbl_area").style.display = "none";
	$("wireframes_area").style.display = "none";
	$("reqwrite_area").style.display = "none";
	$("plugin_area").style.display = "none";

	if(typeof allPlugins == "object") {
		for(let i in allPlugins) {
			if(allPlugins[i].area) {
				allPlugins[i].area.style.display = "none";
			}
		}
	}

	switch(memorylist[optID][2])
	{
		case 0:
		$("input_offset").value = 0;
		$("input_length").value = 0;
		$("input_memory").value = 0;
		break;
		case 1:
		$("input_offset").value = memorylist[optID][0];
		$("input_length").value = memorylist[optID][1];
		break;
		case 4: // function select involved
		$("input_offset").value = memorylist[optID][0];
		$("input_length").value = memorylist[optID][1];
		$("buttonfunction_area").style.display = "block";
		switch(memorylist[optID][0])
		{
			case 0x590004:
			createSelectAreaBF(useOptionBF,0);
			$("input_length").value = memorylist[optID][1] + "/20";
			break;
			case 0x590008:
			createSelectAreaBF(useOptionBF,1);
			$("input_length").value = memorylist[optID][1] + "/20";
			break;
			case 0x5193A4:
			createSelectAreaBF(useOptionBF,2);
			break;
			case 0x5193A8:
			createSelectAreaBF(useOptionBF,3);
			break;
		}
		break;
		case 5: // upgrades
		$("input_offset").value = memorylist[optID][0];
		$("input_length").value = memorylist[optID][1];
		$("upg_area").style.display = "block";
		break;
		case 6: // special ability flags
		$("input_offset").value = memorylist[optID][0];
		$("input_length").value = memorylist[optID][1];
		$("saf_floating").style.display = "block";
		break;
		case 7: // requirements
		$("input_offset").value = memorylist[optID][0];
		$("input_length").value = memorylist[optID][1];
		$("input_req").value = 0;
		$("req_area").style.display = "block";
		$("reqwrite_area").style.display = "block";
		break;
		case 8: // unitnode
		$("input_offset").value = memorylist[optID][0];
		$("input_length").value = memorylist[optID][1] + "/336";
		break;
		case 9: // locations
		$("input_offset").value = memorylist[optID][0];
		$("input_length").value = memorylist[optID][1] + "/20";
		break;
		case 10: // buttons
		$("input_offset").value = memorylist[optID][0];
		$("input_length").value = memorylist[optID][1] + "/20";
		break;
		case 11: // for General/Utilities sections
		$("input_length").value = memorylist[optID][1];
		switch(memorylist[optID][0])
		{
			case 0x6D1200:
			$("input_offset").value = memorylist[optID][0];
			$("icecc_area").style.display = "block";
			break;
			case 0x5A4844:
			$("input_offset").value = 0;
			$("etg_area").style.display = "block";
			break;
			case 0x64650c:
			$("input_offset").value = memorylist[optID][0];
			$("textstack_area").style.display = "block";
			break;
			case 0x581D76:
			$("input_offset").value = memorylist[optID][0];
			playerColorsCall();
			break;
			case 0x51A280:
			$("input_offset").value = 0;
			$("trigdupl_area").style.display = "block";
			break;
			case 0x519E50:
			$("input_offset").value = 0;
			$("trigslice_area").style.display = "block";
			break;
			case 0x51398C:
			$("input_offset").value = 0;
			$("trigconv_area").style.display = "block";
			break;
			case 0x6D1238:
			$("input_offset").value = 0;
			$("stattbl_area").style.display = "block";
			break;
			case 0x68C204:
			$("input_offset").value = 0;
			$("wireframes_area").style.display = "block";
			break;
		}
		break;
		case 12: // settings
		$("input_offset").value = 0;
		$("input_length").value = 4;
		$("settings_floating").style.display = "block";
		break;
		case 13: // player alliance self
		$("input_offset").value = memorylist[optID][0];
		$("input_length").value = memorylist[optID][1] + "/13";
		break;
		case 14: // selection/hotkey group
		$("input_offset").value = memorylist[optID][0];
		$("input_length").value = memorylist[optID][1];
		switch(memorylist[optID][0]) {
			case 0x6284E8:
			$("selgroup_area").style.display = "block";
			break;
			case 0x57FE60:
			$("keygroup_area").style.display = "block";
			break;
		}
		break;
		case 15: // unit dims
		$("input_offset").value = memorylist[optID][0];
		$("input_length").value = memorylist[optID][1] + "/8";
		break;
		case 16: // display text
		$("input_offset").value = memorylist[optID][0];
		$("input_length").value = memorylist[optID][1] + "/218";
		break;
		case 17: // plugins
		if(typeof allPlugins == "object" && allPlugins[memorylist[optID][0]]) {
			$("plugin_area").style.display = "block";
			if(typeof allPlugins[memorylist[optID][0]].resetOffset != "undefined") {
				$("input_offset").value = allPlugins[memorylist[optID][0]].resetOffset;
			}
			else {
				$("input_offset").value = memorylist[optID][0];
			}
			$("input_length").value = memorylist[optID][1];
			if(allPlugins[memorylist[optID][0]].act) {
				allPlugins[memorylist[optID][0]].act();
			}
			if(allPlugins[memorylist[optID][0]].area) {
				allPlugins[memorylist[optID][0]].area.style.display = "block";
			}
		}
		break;
		case 18: // building dims
		$("input_offset").value = memorylist[optID][0];
		$("input_length").value = memorylist[optID][1] + "/4";
		break;
		default:
	}
	if(currentHighlight)
	{
		currentHighlight.style.background = darkColor; // I can use className here to contain CSS in one file, but too lazy to change this
	}
	optDiv.style.background = hlColor;
	currentHighlight = optDiv;
	updateMemory();
}
async function useOption2(evt) // for filelist
{
	evt = evt || window.event;
	var optDiv = evt.srcElement || evt.target;
	var optID = optDiv.optionID;
	if(datalist[optID][1] == "") // CLS / for incomplete stuff
	{
		$("data_output").value = "";
	}
	else
	{
		var fr = await fetch("Data\\" + datalist[optID][1]).then(res => res.text());
		$("data_output").value = fr;
		if(datalist[optID][2]) { // font size
			$("data_output").style.fontSize = datalist[optID][2];
		}
	}
	if(currentHighlight2)
	{
		currentHighlight2.style.background = darkColor;
	}
	optDiv.style.background = hlColor;
	currentHighlight2 = optDiv;
}
function useOptionDataContent(evt) // incomplete; integrate with filelist for unitlist, weaponlist etc.
{
	evt = evt || window.event;
	var optDiv = evt.srcElement || evt.target;
	var optID = optDiv.optionID;
}
function useOptionBF(evt) // for button functions
{
	evt = evt || window.event;
	var optDiv = evt.srcElement || evt.target;
	var optID = optDiv.optionID;
	var selID = optDiv.selectID;
	$("input_value").value = bf_list[selID][optID][0];
	if(currentHighlightBF)
	{
		currentHighlightBF.style.background = (currentHighlightBF.optionID%2)?darkColorBF1:darkColorBF2; // to inherit from original setting.
	}
	optDiv.style.background = hlColor;
	currentHighlightBF = optDiv;
}
function createCategoryArea(handler)
{
	var divSelect = document.createElement("div");
	divSelect.className = "divselect select_category";
	for(var i=0;i<categorylist.length;i++)
	{
		var opt = document.createElement("div");
		opt.className = "divoption option_category";
		opt.optionID = i;
		opt.onclick = handler.bind(null, i);
		if(categorylist[i][2].length == 0)
		{
			opt.style.height = "1em";
		}
		opt.textContent = categorylist[i][2];
		divSelect.appendChild(opt);
	}
	$("category_container").appendChild(divSelect);
}
function createSelectArea(handler)
{
	var divSelect = document.createElement("div");
	divSelect.className = "divselect select_memory";
	for(var i=0;i<memorylist.length;i++)
	{
		var opt = document.createElement("div");
		opt.className = "divoption option_memory";
		opt.optionID = i;
		opt.onclick = handler;
		if(memorylist[i][3].length == 0)
		{
			opt.style.height = "1em";
		}
		opt.innerHTML = memorylist[i][3];
		divSelect.appendChild(opt);
	}
	$("select_container").appendChild(divSelect);
}
function createSelectArea2(handler) // for filelist
{
	var divSelect = document.createElement("div");
	divSelect.className = "divselect select_data";
	for(var i=0;i<datalist.length;i++)
	{
		var opt = document.createElement("div");
		opt.className = "divoption option_data";
		opt.optionID = i;
		opt.onclick = handler;
		opt.innerHTML = datalist[i][0];
		divSelect.appendChild(opt);
	}
	$("select_container").appendChild(divSelect);
}
function createSelectAreaBF(handler,bf_type) // for button fuctions
{
	currentHighlightBF = null;
	while($("buttonfunction_select_container").hasChildNodes()) // delete original select element if exists.
	{
		$("buttonfunction_select_container").removeChild($("buttonfunction_select_container").firstChild);
	}
	var divSelect = document.createElement("div");
	divSelect.className = "divselect select_bf";
	for(var i=0;i<bf_list[bf_type].length;i++)
	{
		var opt = document.createElement("div");
		opt.className = (i%2)?"divoption option_bf1":"divoption option_bf2"
		opt.selectID = bf_type;
		opt.optionID = i;
		opt.onclick = handler;
		opt.innerHTML = bf_list[bf_type][i][1];
		divSelect.appendChild(opt);
	}
	$("buttonfunction_select_container").appendChild(divSelect);
}
function updateMemory()
{
	var inpLength = 0;
	if($("input_length").value.indexOf("/") == -1) {
		inpLength = parseInt($("input_length").value);
	}
	else {
		let splitInpLength = $("input_length").value.split("/");
		inpLength = parseInt(splitInpLength[splitInpLength.length-1]);
	}
	var memval = calcMemory(parseInt($("input_offset").value),parseInt($("input_object").value),inpLength);
	$("input_memory").value = memval;
	$("input_hex").value = toHex(memval);
}
function delayUpdate()
{
	setTimeout(updateMemory,25);
}
function selectMe(evt)
{
	evt = evt || window.event;
	var optDiv = evt.srcElement || evt.target;
	optDiv.select();
}
var hexCodeStr = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
function toHex(num,ord)
{
	if(!isFinite(num)) {
		return toHex(0, ord);
	}
	ord = ord || 16;
	if(num < ord)
	{
		return hexCodeStr.charAt(num);
	}
	else
	{
		return toHex((num - (num % ord)) / ord) + toHex(num % ord);
	}
}
function safUpdate()
{
	var sum=0;
	for(var i=0;i<32;i++)
	{
		sum+=(!!$("saf_check" + (1+i)).checked) * (1 << i);
	}
	$("saf_text").value = sum;
	$("input_value").value = sum;
}
function safUpdate2()
{
	var code = parseInt($("saf_text").value);
	if(code > 0xFFFFFFFF)
	{
		$("saf_text").value &= 0xFFFFFFFF;
		safUpdate2();
	}
	else if(code < 0)
	{
		$("saf_text").value = (code & 0xFFFFFFFF) + 0x100000000;
		safUpdate2();
	}
	for(var i=0;i<32;i++)
	{
		if(code & (1 << i))
		{
			$("saf_check" + (1+i)).checked = true;
		}
		else
		{
			$("saf_check" + (1+i)).checked = false;
		}
	}
}
function settingsUpdate() {
	var useMasked = !!$("settings_usemasked").checked;
	if(useMasked) {
		$("label_origvalue").style.display = "none";
		$("input_origvalue").style.display = "none";
	}
	else {
		$("label_origvalue").style.display = "block";
		$("input_origvalue").style.display = "block";
	}
	saveSettings();
}
function saveSettings() {
	try {
		localStorage.setItem("eudscr_usemasked", $("settings_usemasked").checked ? "1" : "0");
	}
	catch(e){}
}
function loadSettings() {
	var item;
	if(item = localStorage.getItem("eudscr_usemasked")) {
		$("settings_usemasked").checked = (item == "1");
	}

	settingsUpdate();
}
function upgUpdate()
{
	switch(memorylist[currentSelected][0])
	{
		case 0x58D088:
		case 0x58D2B0:
		$("input_object").value = (parseInt($("input_upg_player").value) - 1) * 46 + parseInt($("input_upg_uid").value);
		if($("input_upg_uid").value == 60)
		{
			// find memory
		}
		break;
		case 0x58CE24:
		case 0x58CF44:
		$("input_object").value = (parseInt($("input_upg_player").value) - 1) * 24 + parseInt($("input_upg_uid").value);
		break;
		case 0x58F278:
		case 0x58F32C:
		$("input_object").value = (parseInt($("input_upg_player").value) - 1) * 15 + parseInt($("input_upg_uid").value) - 46;
		break;
		case 0x58F050:
		case 0x58F140:
		$("input_object").value = (parseInt($("input_upg_player").value) - 1) * 20 + parseInt($("input_upg_uid").value) - 24;
		break;
	}
	updateMemory();
}
function selgroupUpdate() {
	$("input_object").value = (parseInt($("input_selgroup_player").value) - 1) * 12 + parseInt($("input_selgroup_id").value) - 1;
	updateMemory();
}
function selgroupUpdate2() {
	$("input_value").value = parseInt($("input_selgroup_unit").value) * 336 + 0x59CCA8;
}
function keygroupUpdate() {
	$("input_object").value = (parseInt($("input_keygroup_player").value) - 1) * 216 + parseInt($("input_keygroup_hotkey").value) * 12 + parseInt($("input_keygroup_id").value) - 1;
	updateMemory();
}
function keygroupUpdate2() {
	$("input_keygroup_index").value = (parseInt($("input_keygroup_unit").value) == 0) ? 0 : 1700 - parseInt($("input_keygroup_unit").value);
	$("input_value").value = 2049 + parseInt($("input_keygroup_unit").value);
}
function keygroupUpdate3() {
	$("input_keygroup_unit").value = (parseInt($("input_keygroup_index").value) == 0) ? 0 : 1700 - parseInt($("input_keygroup_index").value);
	$("input_value").value = 2049 + parseInt($("input_keygroup_unit").value);
}
function reqUpdate()
{
	switch(memorylist[currentSelected][0])
	{
		case 0x514178:
		$("input_offset").value = array_units[$("input_req").value];
		if(array_units[$("input_req").value] > 0) {
			$("select_reqwrite_type").selectedIndex = 0;
			$("input_reqwrite_uid").value = $("input_req").value;
			$("input_reqwrite_offset").value = (array_units[$("input_req").value] - 0x514178) >>> 1;
		}
		break;
		case 0x5145C0:
		$("input_offset").value = array_upgrades[$("input_req").value];
		if(array_upgrades[$("input_req").value] > 0) {
			$("select_reqwrite_type").selectedIndex = 1;
			$("input_reqwrite_uid").value = $("input_req").value;
			$("input_reqwrite_offset").value = (array_upgrades[$("input_req").value] - 0x5145C0) >>> 1;
		}
		break;
		case 0x514908:
		$("input_offset").value = array_upgtech[$("input_req").value];
		if(array_upgtech[$("input_req").value] > 0) {
			$("select_reqwrite_type").selectedIndex = 2;
			$("input_reqwrite_uid").value = $("input_req").value;
			$("input_reqwrite_offset").value = (array_upgtech[$("input_req").value] - 0x514908) >>> 1;
		}
		break;
		case 0x514A48:
		$("input_offset").value = array_usetech[$("input_req").value];
		if(array_usetech[$("input_req").value] > 0) {
			$("select_reqwrite_type").selectedIndex = 3;
			$("input_reqwrite_uid").value = $("input_req").value;
			$("input_reqwrite_offset").value = (array_usetech[$("input_req").value] - 0x514A48) >>> 1;
		}
		break;
		case 0x514CF8:
		$("input_offset").value = array_orders[$("input_req").value];
		if(array_orders[$("input_req").value] > 0) {
			$("select_reqwrite_type").selectedIndex = 4;
			$("input_reqwrite_uid").value = $("input_req").value;
			$("input_reqwrite_offset").value = (array_orders[$("input_req").value] - 0x514CF8) >>> 1;
		}
		break;
	}
	$("input_object").value = 0;
	updateMemory();
}
function stackTextUpdate()
{
	var ts = $("input_textstack_text").value;
	$("input_textstack_unit").value = overlapText(ts, 0, 150, true);
	$("input_textstack_disp").value = overlapText(ts, 1, 619, true);
	$("input_textstack_objs").value = overlapText(ts, 1, 220, true);
	$("input_textstack_desc").value = overlapText(ts, 1, 188, true);
}
function expandDataOutput()
{
	$("data_output").className = "expanded";
	$("expand_data_output").className = "divbutton expanded";
	$("expand_data_output").innerHTML = "^";
	$("expand_data_output").onclick = retractDataOutput;
	isDataExpanded = true;
}
function retractDataOutput()
{
	$("data_output").className = "";
	$("expand_data_output").className = "divbutton";
	$("expand_data_output").innerHTML = "v";
	$("expand_data_output").onclick = expandDataOutput;
	isDataExpanded = false;
}
function toParseIceCC()
{
	$("trigger_output").value += parseIceCC($("inputarea_icecc").value, $("input_icecc_trigbase").value + "\n");
}
function hexToTrigger()
{
	$("trigger_output").value += hexstrToTrig($("inputarea_etg").value.toString().replace(/[^0-9a-f]/gi, ""), parseInt($("input_etg_ofs").value), $("input_etg_base").value + "\n");
}
function toMapString()
{
	// this feature under construction (make plugin first)
}
function calculateTrigger(pattern, memory, value, length, useMasked, origValue) {
	let out = "";
	let s_value = value;
	length = length || 4;
	useMasked = useMasked || false;
	let s_origvalue = origValue || 0;

	let byteOrder = 0;
	if(memory % 4 != 0 && length < 4) {
		byteOrder = memory % 4;
		let multiplier = 1 << (byteOrder * 8);
		memory -= byteOrder;
		s_value *= multiplier;
		s_origvalue *= multiplier;
	}

	switch(length)
	{
		case 1:
		if(useMasked) {
			let bitMask = 0xFF << (8 * byteOrder);
			out += pattern.replace(/\^1/g, memory).replace(/\^2/g, s_value).replace(/\^3/g, bitMask);
			break;
		}
		case 2:
		if(useMasked) {
			let bitMask = 0xFFFF << (8 * byteOrder);
			out += pattern.replace(/\^1/g, memory).replace(/\^2/g, s_value).replace(/\^3/g, bitMask);
			break;
		}
		case 3:
		if(useMasked) {
			let bitMask = 0xFFFFFF << (8 * byteOrder);
			out += pattern.replace(/\^1/g, memory).replace(/\^2/g, s_value).replace(/\^3/g, bitMask);
			break;
		}
		out += pattern.replace(/\^1/g, memory).replace(/\^2/g, s_value - s_origvalue);
		break;
		case 4:
		default:
		if(s_value > 0x7FFFFFFF)
		{
			s_value -= 0x100000000;
		}
		out += pattern.replace(/\^1/g, memory).replace(/\^2/g, s_value);
		break;
		case -1:
		break;
	}
	out += "\n";
	return out;
}
function toTriggerEvent() {
	if($("input_object").value.toString().indexOf(",") != -1) {
		let resetText = $("input_object").value;
		let resetOrigvalue = $("input_origvalue").value;
		let objects = $("input_object").value.toString().trim().split(/, */);
		let origvalues = null;
		if($("input_origvalue").value.toString().indexOf(",") != -1) {
			origvalues = $("input_origvalue").value.toString().trim().split(/, */);
		}
		objects.forEach((item, i) => {
			$("input_object").value = item;
			if(origvalues) {
				$("input_origvalue").value = origvalues[i % origvalues.length];
			}
			updateMemory();
			toTrigger();
		});
		$("input_object").value = resetText;
		$("input_origvalue").value = resetOrigvalue;
	}
	else {
		toTrigger();
	}
}
function toTrigger()
{
	var triggerPattern_1 = "MemoryAddr(^1, Add, ^2);";
	var triggerPattern_masked = "Masked MemoryAddr(^1, Set To, ^2, ^3);";
	var triggerPattern_4 = "MemoryAddr(^1, Set To, ^2);";
	var triggerPattern_err = "Comment(\"Error: ^1\", 0, 0, 0, 0, 0);";
	var triggerPattern_un = "ModifyUnitHitPoints(^4, Unit ^5, Player ^6, Location ^7, -31, ^1, ^2, ^3);";
	var out = "";
	var memory = parseInt($("input_memory").value);
	var s_offset = parseInt($("input_offset").value);
	var rawLength = $("input_length").value;
	if(rawLength.indexOf("/") == -1) {
		var s_length = parseInt($("input_length").value);
	}
	else {
		var s_length = parseInt($("input_length").value.split("/")[0]);
	}
	var s_value = parseInt($("input_value").value);
	var s_origvalue = parseInt($("input_origvalue").value);
	var useMasked = !!$("settings_usemasked").checked;

	if(isNaN(s_value)) // invalid value
	{
		s_value = $("input_value").value;
		if(s_value.charAt(0) == "\"" && s_value.charAt(s_value.length-1) == "\"") // input string
		{
			s_value = s_value.substr(1, s_value.length - 2);
			s_value = s_value.replace(/<[0-9a-fA-F]+>/g, function(pat) {
				return String.fromCharCode(parseInt(pat.substring(1, pat.length-1), 16) );
			});

			if(typeof iconv != "undefined") { // load iconv-lite-browserify to turn iconv on
				let s_buffer1 = iconv.encode(s_value, "UTF-8"); // Display Text uses UTF-8 in SC:R
				s_value = [...s_buffer1].map(char => String.fromCharCode(char)).join("");
			}

			var hexValue = "";
			for(var i=0;i<s_value.length;i++)
			{
				hexValue += leftPad(s_value.charCodeAt(i).toString(16), 2, "0");
			}
			hexValue += "00"; // null string terminator
			$("trigger_output").value += hexstrToTrig(hexValue, memory, triggerPattern_4 + "\n");
			return;
		}
		else if(s_value.charAt(0) == "'" && s_value.charAt(s_value.length-1) == "'") // hex string
		{
			$("trigger_output").value += hexstrToTrig(s_value.substr(1, s_value.length - 2), memory, triggerPattern_4 + "\n");
			return;
		}
		else
		{
			$("trigger_output").value += triggerPattern_err.replace(/\^1/g,"Invalid value!") + "\n";
			return;
		}
	}

	if($("input_value").value.toString().indexOf(",") != -1) { // array
		let arrayContent = $("input_value").value.toString().split(/, */).map(s => parseInt(s));
		if(s_length >= 4) {
			while(arrayContent.length >= 1) {
				let t_shift = arrayContent.shift();
				out += calculateTrigger(triggerPattern_4, memory, t_shift, 4, useMasked, 0);
				memory += 4;
			}
		}
		else if(s_length == 3) { // TODO (there is no memory with 3 probably will not do)
			while(arrayContent.length >= 1) {
				let t_shift = arrayContent.shift();
				out += calculateTrigger(triggerPattern_4, memory, t_shift, 3, useMasked, 0);
				memory += 3;
			}
		}
		else if(s_length == 2) {
			while(arrayContent.length >= 1 && memory % 4 != 0) {
				let t_shift = arrayContent.shift();
				out += calculateTrigger(useMasked ? triggerPattern_masked : triggerPattern_1, memory, t_shift, 2, useMasked, s_origvalue);
				memory += 2;
			}
			while(arrayContent.length >= 2) {
				let t_splice = arrayContent.splice(0, 2);
				out += calculateTrigger(triggerPattern_4, memory, t_splice[0] + t_splice[1] * 65536, 4, useMasked, 0);
				memory += 4;
			}
			while(arrayContent.length >= 1) {
				let t_shift = arrayContent.shift();
				out += calculateTrigger(useMasked ? triggerPattern_masked : triggerPattern_1, memory, t_shift, 2, useMasked, s_origvalue);
				memory += 2;
			}
		}
		else if(s_length == 1) {
			while(arrayContent.length >= 1 && memory % 4 != 0) {
				let t_shift = arrayContent.shift();
				out += calculateTrigger(useMasked ? triggerPattern_masked : triggerPattern_1, memory, t_shift, 1, useMasked, s_origvalue);
				memory ++;
			}
			while(arrayContent.length >= 4) {
				let t_splice = arrayContent.splice(0, 4);
				out += calculateTrigger(triggerPattern_4, memory, t_splice[0] + t_splice[1] * 256 + t_splice[2] * 65536 + t_splice[3] * 16777216, 4, useMasked, 0);
				memory += 4;
			}
			while(arrayContent.length >= 1) {
				let t_shift = arrayContent.shift();
				out += calculateTrigger(useMasked ? triggerPattern_masked : triggerPattern_1, memory, t_shift, 1, useMasked, s_origvalue);
				memory ++;
			}
		}
		$("trigger_output").value += out;
		return;
	}

	if(s_length <= 3) {
		var pattern = useMasked ? triggerPattern_masked : triggerPattern_1;
	}
	else {
		var pattern = triggerPattern_4;
	}

	out += calculateTrigger(pattern, memory, s_value, s_length, useMasked, s_origvalue);
	$("trigger_output").value += out;
}
function init()
{
	createCategoryArea(useCategory);
	createSelectArea(useOption);
	createSelectArea2(useOption2);
	$("input_object").onkeydown = delayUpdate;
	$("input_object").onpaste = delayUpdate;
	$("input_memory").onclick = selectMe;
	$("input_hex").onclick = selectMe;
	$("make_memory").onclick = updateMemory;
	$("make_trigger").onclick = toTriggerEvent;
	$("expand_data_output").onclick = expandDataOutput;
	$("parse_icecc").onclick = toParseIceCC;
	$("parse_etg").onclick = hexToTrigger;
	for(var i=0;i<32;i++)
	{
		$("saf_check" + (1+i)).onclick = function(){setTimeout(safUpdate,25);};
	}
	$("settings_usemasked").onchange = settingsUpdate;
	$("saf_text").onkeydown = function(){setTimeout(safUpdate2,25);};
	$("saf_text").onclick = selectMe;
	$("input_upg_player").onkeydown = function(){setTimeout(upgUpdate,25);};
	$("input_upg_uid").onkeydown = function(){setTimeout(upgUpdate,25);};
	$("input_selgroup_player").onkeydown = function(){setTimeout(selgroupUpdate,25);};
	$("input_selgroup_id").onkeydown = function(){setTimeout(selgroupUpdate,25);};
	$("input_selgroup_unit").onkeydown = function(){setTimeout(selgroupUpdate2,25);};
	$("input_keygroup_player").onkeydown = function(){setTimeout(keygroupUpdate,25);};
	$("input_keygroup_id").onkeydown = function(){setTimeout(keygroupUpdate,25);};
	$("input_keygroup_hotkey").onkeydown = function(){setTimeout(keygroupUpdate,25);};
	$("input_keygroup_unit").onkeydown = function(){setTimeout(keygroupUpdate2,25);};
	$("input_keygroup_index").onkeydown = function(){setTimeout(keygroupUpdate3,25);};
	$("input_req").onkeydown = function(){setTimeout(reqUpdate,25);};
	$("input_textstack_text").onkeydown = function(){setTimeout(stackTextUpdate,25);};
	$("input_textstack_text").onpaste = function(){setTimeout(stackTextUpdate,25);};
	$("input_textstack_unit").onclick = selectMe;
	$("input_textstack_disp").onclick = selectMe;
	$("input_textstack_objs").onclick = selectMe;
	$("input_textstack_desc").onclick = selectMe;
	duplicatorInit();
	slicerInit();
	converterInit();
	stattblInit();
	wireframesInit();
	reqwriterInit();
	playerColorsInit();

	if(typeof allPlugins == "object") {
		for(let i in allPlugins) {
			if(allPlugins[i].area) {
        		document.getElementById("plugin_area").appendChild(allPlugins[i].area);
			}
			if(allPlugins[i].init) {
				allPlugins[i].init();
			}
		}
	}

	loadSettings();
	$("saf_close").onclick = function(){document.getElementById('saf_floating').style.display='none';return false;};
	$("settings_close").onclick = function(){document.getElementById('settings_floating').style.display='none';return false;};
	setTimeout(function(){$("data_output").value = "";},25);
}