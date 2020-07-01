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
		$("inputarea_trigdupl").value = "use [3;2] for incremental variables;\r\n\r\n[^] for binary countoffs;\r\n\r\n[=i] for programmes;\r\n\r\n[$array1] for arrays.";
		$("inputarea_trigdupl_arrays").value = "array1:\r\nTerran Marine\r\nTerran Firebat\r\narray2:\r\nMarine for 3$\r\nFirebat for 5$";
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
		out += dat + "\r\n";
	}
	return out;
}