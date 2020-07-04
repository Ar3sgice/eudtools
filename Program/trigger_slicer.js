function slicerParse()
{
	$("trigger_output").value += sliceTrigger($("input_trigslice_player").value, $("inputarea_trigslice_cond").value, $("inputarea_trigslice_act").value);
}

function slicerInit()
{
	if($("inputarea_trigslice_cond").value == "" && $("inputarea_trigslice_act").value == "")
	{
		$("inputarea_trigslice_act").value = "Actions";
		$("inputarea_trigslice_cond").value = "Conditions";
	}
	$("parse_trigslice").onclick = slicerParse;
}

function sliceTrigger(player, cond, actRaw)
{
	var preserved = false;
	var preserveSpace = false;
	var comment = "";
	var commentLong = false;
	var out = "";

	let act = actRaw.split(/\r?\n/).map(line => line.trim()).map(line => {
		if(line.toLowerCase().indexOf("preserve trigger") == 0) {
			preserved = true;
			preserveSpace = true;
			return "";
		}
		else if(line.toLowerCase().indexOf("preservetrigger") == 0) {
			preserved = true;
			preserveSpace = false;
			return "";
		}
		else if(/comment *\(\".*\" *\)/i.test(line)) {
			comment = line.match(/\(\"(.*)\" *\)/)[1];
			commentLong = false;
			return "";
		}
		else if(/comment *\(\".*\" *, *0 *, *0 *, *0 *, *0 *, *0\)/i.test(line)) {
			comment = line.match(/\(\"(.*)\" *, *0 *, *0 *, *0 *, *0 *, *0\)/);
			commentLong = true;
			return "";
		}
		return line;
	}).filter(line => line.length > 1);

	let actCount = 64 - (preserved ? 1 : 0) - (comment.length > 0 ? 1 : 0);
	while(act.length) {
		out += "Trigger(\"" + player + "\"){\n";
		out += "Conditions:\n";
		out += cond + "\n";
		out += "Actions:\n";
		out += act.splice(0, actCount).map(line => "\t" + line).join("\n") + "\n";
		if(preserved && preserveSpace) {
			out += "\tPreserve Trigger();\n";
		}
		else if(preserved && !preserveSpace) {
			out += "\tPreserveTrigger();\n";
		}
		if(comment.length > 0 && commentLong) {
			out += "\tComment(\"" + comment + "\", 0, 0, 0, 0, 0);\n";
		}
		else if(comment.length > 0 && !commentLong) {
			out += "\tComment(\"" + comment + "\");\n";
		}
		out += "}\n\n";
		out += "//-----------------------------------------------------------------//\n\n";
	}
	return out;
}