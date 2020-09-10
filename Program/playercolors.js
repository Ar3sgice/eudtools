// Player colors

var _plC_sel = 0;
var playerColorsComboList = [
															["","#dd0000","111 111 23 23 98 94 171 170 168"],
															["","#74A47C","77 77 77 76 38 37 35 35 34"],
															["","#9090B8","154 154 154 151 151 149 146 47 44"],
															["","#FCFC7C","136 136 136 132 131 129 147 99 68"],
															["","#00E4FC","128 128 128 128 52 52 49 157 157"],
															["","#6490FC","199 199 198 197 196 195 194 193 192"],
															["","#7CACFC","126 126 126 196 125 122 121 119 222"],
															["","#2FFF24","117 117 117 186 185 184 183 182 181"],
															["","#E1FF68","61 61 166 166 186 101 209 207 220"],
															["","#F0F0F0","255 255 255 255 84 244 241 71 66"],
															["","#9A9A9A","241 241 213 70 69 236 67 140 64"],
															["","#FC9468","115 115 113 110 108 102 95 90 216"],
															["RGB","#222222","255 111 117 53 61 128 164 255 0"],
															["Blink","#222222","248 248 248 249 249 250 250 251 251"]
														];

var _plC_rawRgbData = "00 00 00 00 43 2F 2B 00 97 4B 37 00 EB 53 17 00 A7 3B 23 00 63 27 1F 00 7B 3B 27 00 A8 08 08 00 63 27 1F 00 23 1F 1F 00 23 1F 1F 00 23 1F 1F 00 23 1F 1F 00 43 27 27 00 3A 00 3A 00 19 00 19 00 2C 24 18 00 48 24 14 00 5C 2C 14 00 70 30 14 00 68 3C 24 00 7C 40 18 00 78 4C 2C 00 A8 08 08 00 8C 54 30 00 84 60 44 00 A0 54 1C 00 C4 4C 18 00 BC 68 24 00 B4 70 3C 00 D0 64 20 00 DC 94 34 00 E0 94 54 00 EC C4 54 00 34 44 28 00 40 6C 3C 00 48 6C 50 00 4C 80 50 00 50 8C 5C 00 5C A0 78 00 00 00 18 00 00 10 34 00 00 08 50 00 24 34 48 00 30 40 54 00 14 34 7C 00 34 4C 6C 00 40 58 74 00 48 68 8C 00 00 70 9C 00 58 80 A4 00 40 68 D4 00 18 AC B8 00 24 24 FC 00 64 94 BC 00 70 A8 CC 00 8C C0 D8 00 94 DC F4 00 AC DC E8 00 AC FC FC 00 CC F8 F8 00 FC FC 00 00 F4 E4 90 00 FC FC C0 00 0C 0C 0C 00 18 14 10 00 1C 1C 20 00 28 28 30 00 38 30 24 00 38 3C 44 00 4C 40 30 00 4C 4C 4C 00 5C 50 40 00 58 58 58 00 68 68 68 00 78 84 6C 00 68 94 6C 00 74 A4 7C 00 98 94 8C 00 90 B8 94 00 98 C4 A8 00 B0 B0 B0 00 AC CC B0 00 C4 C0 BC 00 CC E0 D0 00 F0 F0 F0 00 1C 10 08 00 28 18 0C 00 34 10 08 00 34 20 0C 00 38 10 20 00 34 28 20 00 44 34 08 00 48 30 18 00 60 00 00 00 54 28 20 00 50 40 14 00 5C 54 14 00 84 04 04 00 68 4C 34 00 7C 38 30 00 70 64 20 00 7C 50 50 00 A4 34 1C 00 94 6C 00 00 98 5C 40 00 8C 80 34 00 98 74 54 00 B8 54 44 00 B0 90 18 00 B0 74 5C 00 F4 04 04 00 C8 78 54 00 FC 68 54 00 E0 A4 84 00 FC 94 68 00 FC CC 2C 00 10 FC 18 00 0C 00 20 00 1C 1C 2C 00 24 24 4C 00 28 2C 68 00 2C 30 84 00 20 18 B8 00 34 3C AC 00 68 68 94 00 64 90 FC 00 7C AC FC 00 00 E4 FC 00 9C 90 40 00 A8 94 54 00 BC A4 5C 00 CC B8 60 00 E8 D8 80 00 EC C4 B0 00 FC FC 38 00 FC FC 7C 00 FC FC A4 00 08 08 08 00 10 10 10 00 18 18 18 00 28 28 28 00 34 34 34 00 4C 3C 38 00 44 44 44 00 48 48 58 00 58 58 68 00 74 68 38 00 78 64 5C 00 60 60 7C 00 84 74 74 00 84 84 9C 00 AC 8C 7C 00 AC 98 94 00 90 90 B8 00 B8 B8 E8 00 F8 8C 14 00 10 54 3C 00 20 90 70 00 2C B4 94 00 04 20 64 00 48 1C 50 00 08 34 98 00 68 30 78 00 88 40 9C 00 0C 48 CC 00 BC B8 34 00 DC DC 3C 00 10 00 00 00 24 00 00 00 34 00 00 00 48 00 00 00 60 18 04 00 8C 28 08 00 C8 18 18 00 E0 2C 2C 00 E8 20 20 00 E8 50 14 00 FC 20 20 00 E8 78 24 00 F8 AC 3C 00 00 14 00 00 00 28 00 00 00 44 00 00 00 64 00 00 08 80 08 00 24 98 24 00 3C 9C 3C 00 58 B0 58 00 68 B8 68 00 80 C4 80 00 94 D4 94 00 0C 14 24 00 24 3C 64 00 30 50 84 00 38 5C 94 00 48 74 B4 00 54 84 C4 00 60 94 D4 00 78 B4 EC 00 24 14 14 00 30 1C 18 00 3C 24 1C 00 04 04 04 00 14 14 14 00 18 14 14 00 1C 18 18 00 20 1C 1C 00 24 20 20 00 28 20 1C 00 28 24 24 00 2C 28 28 00 30 2C 2C 00 34 30 30 00 3C 30 30 00 40 38 38 00 14 0C 0C 00 28 0C 0C 00 28 18 14 00 34 20 1C 00 50 0C 0C 00 44 2C 24 00 70 0C 0C 00 94 0C 0C 00 B0 28 00 00 10 0C 10 00 24 20 24 00 2C 24 20 00 28 24 28 00 30 24 24 00 2C 28 2C 00 34 28 28 00 30 2C 30 00 38 2C 2C 00 34 30 34 00 38 34 38 00 40 34 34 00 40 30 3C 00 3C 38 3C 00 44 34 40 00 48 38 38 00 40 3C 40 00 48 38 44 00 48 44 4C 00 54 40 48 00 60 48 4C 00 23 23 FF 00 23 23 FF 00 23 23 FF 00 23 23 FF 00 23 23 FF 00 23 23 FF 00 23 23 FF 00 23 23 FF 00 23 23 FF 00 FF FF FF 00";
var _plC_rgbData = [];

function _plC_imgInit() {
	let c1 = _plC_rawRgbData.split(" ").map(a => parseInt(a, 16));
	let c2 = [];
	while(c1.length >= 4) {
		c2.push(c1.splice(0, 4));
	}
	_plC_rgbData = c2;
	c2.forEach(item => {
		let elem = document.createElement("div");
		elem.className = "playercolor_imgGrid";
		elem.style.background = "rgb(" + item[0] + ", " + item[1] + ", " + item[2] + ")";
		$("playercolor_imgcontainer").appendChild(elem);
	});
}

function selectColor(evt)
{
	evt = evt || window.event;
	var elem = evt.srcElement || evt.target;
	var divElem = $("playercolor_imgcontainer"); // img element uses absolute position, and cannot have access to offsetLeft/offsetTop.
	var xOffset = evt.clientX - divElem.offsetLeft;
	var yOffset = evt.clientY - divElem.offsetTop;
	var colorCode = Math.floor(yOffset / 24) * 16 + Math.floor(xOffset / 24);
	$("input_playercolor" + _plC_sel).value = colorCode;
	_plC_BG(_plC_sel);
	// _plC_sel = (_plC_sel+1) % 9;
	// $("input_playercolor" + _plC_sel).select();
	_plC_sel = (_plC_sel+1) % 2;
	$("input_playercolor" + _plC_sel).select();
}

function _plC_cMe(evt)
{
	evt = evt || window.event;
	var opt = evt.srcElement || evt.target;
	var sid = opt.id.toString();
	var code = parseInt(sid.charAt(sid.length-1));
	$("input_playercolor" + code).select();
	_plC_sel = code;
}

function _plC_m(i)
{
	if(_plC_rgbData.length == 0) {
		return "none";
	}
	else {
		return "rgb(" + _plC_rgbData[i][0] + ", " + _plC_rgbData[i][1] + ", " + _plC_rgbData[i][2] + ")";
	}
	// return "url(\"Include/colors.png\") no-repeat scroll " + (-(i%16) * 24) + "px " + (-Math.floor(i/16) * 24) + "px #000000";
}

function _plC_BG(i)
{
	$("div_playercolor" + i).style.background = _plC_m(parseInt($("input_playercolor" + i).value));
}

function _plC_r(evt)
{
	evt = evt || window.event;
	var opt = evt.srcElement || evt.target;
	var sid = opt.id.toString();
	var code = parseInt(sid.charAt(sid.length-1));
	$("div_playercolor" + code).style.background = _plC_m(parseInt($("input_playercolor" + code).value));
}

function playerColorsCall()
{
	$("playercolor_area").style.display = "block";
	for(var i=0;i<9;i++)
	{
		_plC_BG(i);
	}
	$("input_playercolor1").select();
	_plC_sel = 1;
	// $("input_playercolor0").select();
	// _plC_sel = 0;
}

function playerColorsToTrigger()
{
	var triggerPattern_1 = "Masked MemoryAddr(^1, Set To, ^2, ^3);";
	var triggerPattern_4 = "MemoryAddr(^1, Set To, ^2);";
	var _p = function(i){return parseInt($("input_playercolor"+i).value);};
	var num1 = (_p(4) << 24) + (_p(3) << 16) + (_p(2) << 8) + _p(1);
	var num2 = (_p(8) << 24) + (_p(7) << 16) + (_p(6) << 8) + _p(5);
	var num0 = _p(0);
	var player = parseInt($("input_playercolor_id").value) - 1;
	if(parseInt($("input_offset").value, 10) == 5288862) {
		var mem1 = 5288862 + player * 8;
		var mem2 = 5288958 + player;
	}
	else {
		var mem1 = 5774710 + player * 8;
		var mem2 = 5774806 + player;
	}
	if(num1 > 0x7FFFFFFF)
	{
		num1 -= 0x100000000;
	}
	if(num2 > 0x7FFFFFFF)
	{
		num1 -= 0x100000000;
	}
	var out = "";
	/* in SC:R, only COLOR1 and MINIMAP is needed. */
	out += calculateTrigger(triggerPattern_1, mem1, num1 & 0xFF, 1, true, 0);
	// out += calculateTrigger(triggerPattern_4, mem1 + 2, (num1 >>> 16) + ((num2 & 0xFFFF) << 16), 4, true, 0);
	// out += calculateTrigger(triggerPattern_1, mem1 + 6, num2 >>> 16, 2, true, 0);
	out += calculateTrigger(triggerPattern_1, mem2, num0, 1, true, 0);
	$("trigger_output").value += out;
}

function _plC_UOp(evt)
{
	evt = evt || window.event;
	var optDiv = evt.srcElement || evt.target;
	var optID = optDiv.optionID;
	var sl = playerColorsComboList[optID][2].split(" ");
	for(var i=0;i<9;i++)
	{
		$("input_playercolor" + i).value = sl[i];
		_plC_BG(i);
	}
}

function _plC_CSA(handler)
{
	if(playerColorsComboList.length == 0)
	{
		return;
	}
	var divSelect = document.createElement("div");
	divSelect.className = "divselect playercolor_select";
	for(var i=0;i<playerColorsComboList.length;i++)
	{
		var opt = document.createElement("div");
		opt.className = "divoption playercolor_option";
		opt.optionID = i;
		opt.onclick = handler;
		if(playerColorsComboList[i][0].length == 0)
		{
			opt.style.height = "20px";
		}
		opt.innerHTML = playerColorsComboList[i][0];
		opt.style.background = playerColorsComboList[i][1];
		divSelect.appendChild(opt);
	}
	$("playercolor_select_container").appendChild(divSelect);
}

function playerColorsInit()
{
	$("playercolor_imgcontainer").onclick = selectColor;
	$("parse_playercolor").onclick = playerColorsToTrigger;
	for(var i=0;i<9;i++)
	{
		$("input_playercolor" + i).onclick = _plC_cMe;
		$("div_playercolor" + i).onclick = _plC_cMe;
		_plC_BG(i);
	}
	_plC_CSA(_plC_UOp);
	_plC_imgInit();
}