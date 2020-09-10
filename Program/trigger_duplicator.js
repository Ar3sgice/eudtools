// [begin;step] [begin] [$array_name]

// arrayData: "a:\r\nabcd1\r\nabcd2\r\nabcd3\r\nb:\r\nbbb1\r\nbbb2"

function duplicatorParse()
{
	$("trigger_output").value += duplicateTrigger($("inputarea_trigdupl").value, parseInt($("input_trigdupl_count").value), $("inputarea_trigdupl_arrays").value);
}

function duplicatorInit()
{
	if($("inputarea_trigdupl").value == "" && $("inputarea_trigdupl_arrays").value == "")
	{
		$("inputarea_trigdupl").value = "use [3;2] for incremental variables;\n\n[^] for binary countoffs;\n\n[=i] for programmes;\n\n[$array1] for arrays;\n\n[#1] for switch binaries.";
		$("inputarea_trigdupl_arrays").value = "array1:\nTerran Marine\nTerran Firebat\narray2:\nMarine for 3$\nFirebat for 5$";
	}
	$("parse_trigdupl").onclick = duplicatorParse;
}

function duplicateTrigger(trg, times, arrayData)
{
	var out = "";
	var arrays = {};
	var ci = "";
	var ap = arrayData.split(/\r?\n/);
	for(var i=0;i<ap.length;i++)
	{
		if(ap[i].match(/:$/))
		{
			ci = ap[i].replace(/:$/,"").toLowerCase();
			arrays[ci] = [];
		}
		else if(ci)
		{
			arrays[ci].push(ap[i]);
		}
	}
	for(var i=0;i<times;i++)
	{
		var dat = trg;
		var switches = 0;
		while(dat.match(/\[[0-9;\-]+\]/)) // increments
		{
			var m = dat.match(/\[([0-9;\-]+)\]/)[1];
			if(m.match(/;/))
			{
				var sp = m.split(";");
				var n = parseInt(sp[0]) + i * parseInt(sp[1]);
			}
			else
			{
				var n = parseInt(m) + i;
			}
			dat = dat.replace("[" + m + "]", n);
		}
		while(dat.match(/\[\^[0-9;\-]*\]/)) // countoffs
		{
			var m = dat.match(/\[\^([0-9;\-]*)\]/)[1];
			if(m == "")
			{
				var n = Math.pow(2, times-1-i);
			}
			else if(m.match(/;/)) // init;factor
			{
				var sp = m.split(";");
				var n = parseInt(sp[0]) * Math.pow(parseInt(sp[1]), i);
			}
			else // positive countoff
			{
				var n = parseInt(m) * Math.pow(2, i);
			}
			if(false && n > 0x7FFFFFFF)
			{
				n -= 0x100000000;
			}
			dat = dat.replace("[^" + m + "]", n);
		}
		while(dat.match(/\[#[0-9\-]*\]/)) // switch binary
		{
			var m = dat.match(/\[#([0-9\-]*)\]/)[1];
			if(m == "")
			{
				var s = switches;
			}
			else if(isFinite(parseInt(m)))
			{
				var s = parseInt(m) - 1;
			}
			else {
				var s = switches;
			}
			switches++;
			if((i >> s) & 1) {
				dat = dat.replace("[#" + m + "]", "Set");
			}
			else {
				dat = dat.replace("[#" + m + "]", "Not Set");
			}
		}
		while(dat.match(/\[\$[a-z0-9]+\]/i)) // arrays
		{
			var b = dat.match(/\[\$([a-z0-9]+)\]/i)[1]
			var m = b.toLowerCase();
			if(arrays[m])
			{
				var n = arrays[m][i % arrays[m].length];
			}
			else
			{
				var n = "";
			}
			dat = dat.replace("[$" + b + "]", n);
		}
		while(dat.match(/\[\=[^\]]+\]/)) // run program
		{
			var m = dat.match(/\[\=([^\]]+)\]/)[1];
			try
			{
				var n = eval(m);
			}
			catch(E)
			{
				var n = "";
			}
			dat = dat.replace("[=" + m + "]", n);
		}
		out += dat + "\r\n";
	}
	return out;
}