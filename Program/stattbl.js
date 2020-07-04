function stattblParseCPT()
{
	$("trigger_output").value += stattblCPT(parseInt($("input_stattbl_player").value), $("inputarea_stattbl_cond").value);
}

function stattblParse()
{
	let result = stattblEdits(parseInt($("input_stattbl_offset").value),
											  parseInt($("input_stattbl_str1").value),
											  parseInt($("input_stattbl_str2").value),
											  $("input_stattbl_content1").value,
											  $("input_stattbl_content2").value);
	$("trigger_output").value += result.triggers;
	$("input_stattbl_offset").value = result.newOffset;
}

function stattblInit()
{
	if($("inputarea_stattbl_cond").value == "" && $("input_stattbl_content1").value == "" && $("input_stattbl_content2").value == "")
	{
		$("inputarea_stattbl_cond").value = "\tSwitch(\"Switch164\", Set);";
		$("input_stattbl_str1").value = "664";
		$("input_stattbl_str2").value = "665";
		$("input_stattbl_content1").value = "m<0><3>M<1>ove";
		$("input_stattbl_content2").value = "s<0><3>S<1>top";
	}
	$("parse_stattbl_cpt").onclick = stattblParseCPT;
	$("parse_stattbl").onclick = stattblParse;
	$("input_stattbl_str1").addEventListener("change", function() {
		let st = parseInt($("input_stattbl_str1").value);
		if(isNaN(st)) {
			return;
		}
		if(st % 1 == 0 && st % 2 != 0) {
			$("input_stattbl_str1").value = st - 1;
			$("input_stattbl_str2").value = st;
		}
		else if(st % 1 == 0 && st % 2 == 0) {
			$("input_stattbl_str2").value = st + 1;
		}
	});
	$("input_stattbl_str2").addEventListener("change", function() {
		let st = parseInt($("input_stattbl_str2").value);
		if(isNaN(st)) {
			return;
		}
		if(st % 1 == 0 && st % 2 == 0) {
			$("input_stattbl_str1").value = st;
			$("input_stattbl_str2").value = st + 1;
		}
		else if(st % 1 == 0 && st % 2 != 0) {
			$("input_stattbl_str1").value = st - 1;
		}
	});
	$("input_stattbl_offset").addEventListener("change", function() {
		let st = parseInt($("input_stattbl_offset").value);
		if(st % 1 == 0 && st % 4 != 0) {
			$("input_stattbl_offset").value = st - st % 4;
		}
	});
}

function stattblCPT(player, cond)
{
	var out = "";
	var separ = "\n\n//-----------------------------------------------------------------//\n\n";
	var trgHead = `Trigger("Player ${player}"){
Conditions:
${cond}

Actions:
	MemoryAddr(0x006509b0, Set To, 4293515047);
}
`; // 4293515047 == -(0x58a364)/4 DeathTableStart

	var trgMidS = `Trigger("Player ${player}"){
Conditions:
${cond}
	Masked MemoryAddr(0x006d1238, At least, VAL1, VAL1);

Actions:
	MemoryAddr(0x006509b0, Add, VAL2);
}`;
	var trgMid = Array(30).fill("").map((t,i) => trgMidS.replace(/VAL1/g, 2**(31-i)).replace(/VAL2/g, 2**(29-i))).join(separ);

	var trgTail = `Trigger("Player ${player}"){
Conditions:
${cond}

Actions:
	//--- PUT YOUR STRING EDIT TRIGGERS HERE ---//
	MemoryAddr(0x006509b0, Set To, ${player-1});
}`;

	return trgHead + separ + trgMid + separ + trgTail + separ;
}

function parseColorCodes(str) {
	return str.replace(/<[0-9a-fA-F]+>/g, function(pat) {
		return String.fromCharCode(parseInt(pat.substring(1, pat.length-1), 16) );
	});
}

function stattblEdits(offset, sp1, sp2, content1, content2) {
	// SP = StringPointer I regret for having named it STR
	let cptSp = sp1 >>> 1;

	// parse color codes
	content1 = parseColorCodes(content1);
	content2 = parseColorCodes(content2);

	// offset Sp
	let cptContent = offset >>> 2;
	let cptContentNext = 0;

	var buffer1, buffer2;
	var uintarr1 = [], uintarr2 = [];
	if(typeof iconv != "undefined") { // load iconv-lite-browserify to turn iconv on
		buffer1 = iconv.encode(content1, "EUC-KR");
		buffer2 = iconv.encode(content2, "EUC-KR");
		uintarr1 = [...buffer1];
		uintarr2 = [...buffer2];
	}
	else {
		uintarr1 = content1.split("").map(s => s.charCodeAt(0) & 0xFF);
		uintarr2 = content2.split("").map(s => s.charCodeAt(0) & 0xFF);
	}

	// string end
	uintarr1.push(0);
	uintarr2.push(0);
	let uintarrAll = uintarr1.concat(uintarr2);
	while(uintarrAll.length % 4 != 0) {
		uintarrAll.push(0);
	}

	// too long
	if(uintarrAll.length + offset > 0xFFFF) {
		console.error("Cannot exceed string limit (65535)");
		return;
	}

	let uint32arr = [];
	while(uintarrAll.length > 3) {
		let a0 = uintarrAll.splice(0, 4);
		uint32arr.push(a0[0] + (a0[1] << 8) + (a0[2] << 16) + (a0[3] << 24));
	}
	cptContentNext = uint32arr.length - 1;

	// pointer for the second string
	let offset2 = offset + uintarr1.length;
	let offsetDw = offset + (offset2 << 16);

	// part 1
	let out = "";
	out += `\tMemoryAddr(0x006509b0, Add, ${cptSp});\n`;
	out += `\tSet Deaths("Current Player", "Terran Marine", Set To, ${offsetDw});\n`;
	out += `\tMemoryAddr(0x006509b0, Subtract, ${cptSp});\n`;

	// part 2
	out += `\tMemoryAddr(0x006509b0, Add, ${cptContent});\n`;
	out += uint32arr.map(val => `\tSet Deaths("Current Player", "Terran Marine", Set To, ${val});\n`)
	                .join("\tMemoryAddr(0x006509b0, Add, 1);\n");
	out += `\tMemoryAddr(0x006509b0, Subtract, ${cptContent + cptContentNext});\n`;
	return {
		triggers: out,
		newOffset: offset + (1 + cptContentNext) * 4
	};
}