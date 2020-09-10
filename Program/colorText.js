function parseColorCodes(str)
{
	var p = "";
	while(p = str.match(/<([0-9a-f]*)>/i))
	{
		str = str.replace(/<([0-9a-f]*)>/i,String.fromCharCode(parseInt(p[1],16)));
	}
	return str;
}

function toColorCodes(str)
{
	var out = "";
	var len = str.length;
	for(var i=0;i<len;i++)
	{
		out += "<" + hexByte(str.charCodeAt(i)) + ">";
	}
	return out;
}

var colorCodeArray = ['','','#B8B8E8','#DCDC3C','#FFFFFF','#847474','#C81818',
	'#10FC18','#F40404','','','','','','#0C48CC','#2CB494',
	'#88409C','#F88C14','','','','#703014','#CCE0D0','#FCFC38','#088008','#FCFC7C', '' ,'#ECC4B0',
	'#4068D4','#74A47C','#9090B8','#00E4FC'];

function colorCodeStylesA(co)
{
	switch(co)
	{
		case 1:
		return ["</span>",-1];
		case 9:
		return ["\t",0];
		case 10:
		return ["\n",0];
		case 11:
		case 20:
		return ["<span style='visibility:invisible;'>",1];
		case 12:
		return ["<span style='display:none;'>",1];
		case 13:
		return ["\r",0];
		case 18:
		return ["<span style='position:relative;display:block;text-align:right'>",0];
		case 19:
		return ["<span style='position:relative;display:block;text-align:center'>",0];
		default:
		return ["<span style='color:" + colorCodeArray[co] + ";'>",1];
	}
}

function colorText(tx)
{
	var out = "";
	var len = tx.length;
	var temp = [];
	var ths = 0;
	var ths2 = 0;
	for(var i=0;i<len;i++)
	{
		if(tx.charCodeAt(i) < 32)
		{
			temp = colorCodeStylesA(tx.charCodeAt(i));
			out += temp[0];
			ths += temp[1];
			if(tx.charCodeAt(i) == 18 || tx.charCodeAt(i) == 19)
			{
				ths2++;
			}
		}
		else
		{
			out += tx.charAt(i);
		}
	}
	for(var i=0;i<ths;i++)
	{
		out += "</span>";
	}
	for(var i=0;i<ths2;i++)
	{
		out += "</span>";
	}
	return out;
}