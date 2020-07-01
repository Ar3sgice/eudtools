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
	_plC_sel = (_plC_sel+1) % 9;
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
	return "url(\"Include/colors.png\") no-repeat scroll " + (-(i%16) * 24) + "px " + (-Math.floor(i/16) * 24) + "px #000000";
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
}

function playerColorsToTrigger()
{
	var triggerPattern_1 = "Comment(\"\", 0, ^1, ^2, 0, 4);";
	var triggerPattern_4 = "Comment(\"\", 0, ^1, ^2, 0, 3);";
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
	out += triggerPattern_4.replace(/\^1/g,mem1).replace(/\^2/g,num1) + "\r\n";
	out += triggerPattern_4.replace(/\^1/g,mem1 + 4).replace(/\^2/g,num2) + "\r\n";
	out += triggerPattern_1.replace(/\^1/g,mem2).replace(/\^2/g,num0) + "\r\n";
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
	$("playercolor_img").onclick = selectColor;
	$("parse_playercolor").onclick = playerColorsToTrigger;
	for(var i=0;i<9;i++)
	{
		$("input_playercolor" + i).onclick = _plC_cMe;
		$("div_playercolor" + i).onclick = _plC_cMe;
		_plC_BG(i);
	}
	_plC_CSA(_plC_UOp);
}