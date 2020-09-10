const ReqOpcodes = [ // data, text
	[65280, "None"],
	[65281, "Or"],
	[65282, "Current unit is..."],
	[65283, "Must have..."],
	[65284, "Must have add-on"],
	[65285, "Is not lifted off"],
	[65286, "Is lifted off"],
	[65287, "Is not training or morphing"],
	[65288, "Is not constructing add-on"],
	[65289, "Is not researching"],
	[65290, "Is not upgrading"],
	[65291, "Is not constructing"],
	[65292, "Does not have add-on attached"],
	[65293, "Does not have exit"],
	[65294, "Has hangar space"],
	[65295, "Must be researched"],
	[65296, "Does not have loaded nuke"],
	[65297, "Is not burrowed"],
	[65298, "Can attack"],
	[65299, "Can set rally point"],
	[65300, "Can move"],
	[65301, "Has weapon"],
	[65302, "Is worker"],
	[65303, "Is flying building"],
	[65304, "Is transport"],
	[65305, "Is powerup"],
	[65306, "Is Subunit"],
	[65307, "Has spidermines"],
	[65308, "Is hero and enabled"],
	[65309, "Can hold position"],
	[65310, "Allow on hallucinations"],
	[65311, "Upgrade Lv-1 Require..."],
	[65312, "Upgrade Lv-2 Require..."],
	[65313, "Upgrade Lv-3 Require..."],
	[65314, "Grey"],
	[65315, "Blank"],
	[65316, "Must be Brood War"],
	[65317, "Is researched..."],
	[65318, "Is burrowed"],
	[65535, "[End of List/Sublist]"]
];

function reqwriterParse()
{
	$("trigger_output").value += reqwriter($("select_reqwrite_type").selectedIndex, parseInt($("input_reqwrite_uid").value), parseInt($("input_reqwrite_offset").value), $("inputarea_reqwrite").value);
}

function reqwriterInit()
{
	if($("inputarea_reqwrite").value == "")
	{
		$("inputarea_reqwrite").value = "ID: 0\nCurrent unit is...\nID: 111\nIs not constructing add-on\nIs not lifted off\n[End of List/Sublist]";
	}
	reqwriterAddOpcodeOptions();
	$("parse_reqwrite").onclick = reqwriterParse;
	$("select_reqwrite_add").onchange = reqwriterAdd;
}

function reqwriterError(text) {
	console.log(text);
}

function reqwriter(type, uid, offset, opcodes) {
	let textToOpcode = {};
	ReqOpcodes.forEach(line => {
		textToOpcode[line[1].toLowerCase()] = line[0];
	});
	window.tto = textToOpcode;

	let typeMemory = [0x514178, 0x5145C0, 0x514908, 0x514A48, 0x514CF8];
	let memory = (typeMemory[type] || 0) + 2*offset;

	let hasError = false;
	let opcodeData = opcodes.trim().split(/\r?\n/).map(text => {
		let lct = text.toLowerCase();
		if(isFinite(parseInt(text))) {
			return parseInt(text) & 65535;
		}
		else if(lct.indexOf("id") == 0) {
			let number = lct.match(/id:?[ \t]*([0-9a-fx]+)/)[1];
			return parseInt(number) & 65535;
		}
		else if(textToOpcode[lct]) {
			return textToOpcode[lct];
		}
		else {
			hasError = true;
			reqwriterError("Error: " + text);
			return -1;
		}
	});

	if(hasError) {
		return "";
	}

	return reqwriterPushArray(memory, opcodeData) + reqwriterDatOffset(type, uid, offset);
}

function reqwriterCalcTrigger(pattern, memory, value, length) {
	let out = "";
	let s_value = value;
	length = length || 4;

	let byteOrder = 0;
	if(memory % 4 != 0 && length < 4) {
		byteOrder = memory % 4;
		let multiplier = 1 << (byteOrder * 8);
		memory -= byteOrder;
		s_value *= multiplier;
	}

	switch(length)
	{
		case 2:
		let bitMask = 0xFFFF << (8 * byteOrder);
		out += pattern.replace(/\^1/g, memory).replace(/\^2/g, s_value).replace(/\^3/g, bitMask);
		break;
		case 4:
		default:
		out += pattern.replace(/\^1/g, memory).replace(/\^2/g, s_value);
		break;
		case -1:
		break;
	}
	out += "\n";
	return out;
}

function reqwriterDatOffset(type, uid, offset) {
	const datPointers = [0x660A70, 0x6558C0, 0x656198, 0x6562F8, 0x665580];
	const datLengths = [2, 2, 2, 2, 2];
	var triggerPattern_masked = "Masked MemoryAddr(^1, Set To, ^2, ^3);";
	return reqwriterCalcTrigger(triggerPattern_masked, datPointers[type] + datLengths[type] * uid, offset+1, 2);
}

function reqwriterPushArray(memory, arrayContent) {
	var triggerPattern_masked = "Masked MemoryAddr(^1, Set To, ^2, ^3);";
	var triggerPattern_4 = "MemoryAddr(^1, Set To, ^2);";
	var out = "";

	while(arrayContent.length >= 1 && memory % 4 != 0) {
		let t_shift = arrayContent.shift();
		out += reqwriterCalcTrigger(triggerPattern_masked, memory, t_shift, 2);
		memory += 2;
	}
	while(arrayContent.length >= 2) {
		let t_splice = arrayContent.splice(0, 2);
		out += reqwriterCalcTrigger(triggerPattern_4, memory, t_splice[0] + t_splice[1] * 65536, 4);
		memory += 4;
	}
	while(arrayContent.length >= 1) {
		let t_shift = arrayContent.shift();
		out += reqwriterCalcTrigger(triggerPattern_masked, memory, t_shift, 2);
		memory += 2;
	}

	return out;
}

function reqwriterAdd() {
	$("inputarea_reqwrite").value = $("inputarea_reqwrite").value.toString().trim() + "\n" + ReqOpcodes[$("select_reqwrite_add").selectedIndex][1];
	$("select_reqwrite_add").selectedIndex = -1;
}

function reqwriterAddOpcodeOptions()
{
	let mainElem = $("select_reqwrite_add");
	ReqOpcodes.forEach(item => {
		let data = item[0];
		let text = item[1];
		let elem = document.createElement("option");
		elem.textContent = text;
		elem.value = data;
		mainElem.appendChild(elem);
	});
}