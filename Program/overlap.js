                          /*  0   1   2   3   4   5   6   7   8   9   A   B   C   D   E   F  */
var displayWidths = [/* 0 */  0,  0,  0,  0,  0,  0,  0,  0,  0, -1, -1,  0,  0, -1,  0,  0,
                     /* 1 */  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
                     /* 2 */  5,  2,  4,  6,  6,  8,  8,  2,  3,  3,  6,  6,  3,  3,  2,  4,
                     /* 3 */  6,  4,  6,  6,  6,  6,  6,  6,  6,  6,  2,  3,  5,  6,  5,  6,
                     /* 4 */  9,  7,  6,  7,  7,  6,  6,  8,  6,  2,  5,  7,  5,  7,  6,  8,
                     /* 5 */  6,  8,  6,  7,  6,  6,  7, 10,  7,  8,  6,  3,  5,  3,  6,  6,
                     /* 6 */  3,  6,  6,  5,  6,  6,  4,  6,  5,  2,  3,  5,  2,  8,  5,  6,
                     /* 7 */  6,  6,  5,  6,  4,  5,  6,  8,  6,  6,  5,  4,  2,  4,  5,  8,
                     /* 8 */  3,  6,  6,  5,  6,  6,  4,  6,  5,  2,  3,  5,  2,  8,  5,  6, 
                     /* 9 */  3,  6,  6,  5,  6,  6,  4,  6,  5,  7,  3,  5,  2,  8,  5,  6, 
                     /* A */  6,  2,  6,  6,  6,  6, -1,  6,  4,  8,  5,  7,  6,  4,  8,  5, 
                     /* B */  5,  4,  4,  4,  3,  6,  6,  2,  3,  3,  4,  7,  8,  9,  9,  5, 
                     /* C */  7,  7,  7,  7,  7,  7, 10,  7,  6,  6,  6,  6,  3,  3,  4,  4, 
                     /* D */  8,  6,  8,  8,  8,  8,  8,  7,  8,  6,  6,  6,  6,  8,  6,  6, 
                     /* E */  6,  6,  6,  6,  6,  6,  9,  5,  6,  6,  6,  6,  3,  2,  4,  4, 
                     /* F */  6,  5,  6,  6,  6,  6,  6,  6,  6,  5,  5,  5,  5,  6,  6,  6   ];

/* for 0x20 (space), width is different for two situations as it doesn't have the padding (1) */

/* types:

   Unit Name:    overlapText(t, 0, 150, true);
   Display Text: overlapText(t, 1, 619, true);
   Objectives:   overlapText(t, 1, 220, true);
   Description:  overlapText(t, 1, 188, true);
                                                 */

function overlapText(t, pad, tl, outputScmdText)
{
	var totalWidth = 0;
	var sText = "";
	var k = 0;
	var out = "";
	if(t.length == 0)
	{
		return "";
	}
	while(t.match(/<[0-9a-f]{1,4}>/i))
	{
		try
		{
			var matchData = t.match(/<([0-9a-f]{1,4})>/i)[1];
			t = t.replace(new RegExp("<" + matchData + ">", "ig"), String.fromCharCode(parseInt(matchData, 16)));
		}
		catch(E)
		{
			break;
		}
	}
	for(var i=0;i<t.length;i++)
	{
		if(t.charCodeAt(i) > 255)
		{
			return "Invalid Character: " + t.charAt(i);
		}
		k = displayWidths[t.charCodeAt(i)];
		if(k == -1)
		{
			return "Invalid String! Error at: " + i;
		}
		totalWidth += k;
		if(pad && k && (t.charCodeAt(i) != 32)) // padding
		{
			totalWidth++;
		}
	}
	totalWidth *= 2; // because it is to repeat itself
	if(totalWidth > tl)
	{
		return "Overflow!";
	}
	else
	{
		if(!pad)
		{
			var stackSuffix = "";
			while(totalWidth + 10 <= tl)
			{
				stackSuffix += "W";
				totalWidth += 10;
			}
			while(totalWidth + 2 <= tl)
			{
				stackSuffix += ".";
				totalWidth += 2;
			}
			out = "\x13" + t + "\x12" + t + "\x14" + stackSuffix;
		}
		else
		{
			var stackSuffix = "";
			while(totalWidth + 13 <= tl)
			{
				stackSuffix += "@";
				totalWidth += 10;
			}
			var endPoint = ["","_","_",".",",","f","k","a","A","m","@","W","uu"];
			stackSuffix += endPoint[tl - totalWidth];
			out = "\x13" + t + "\x12" + t + "\x14" + stackSuffix;
		}
	}
	if(outputScmdText)
	{
		var put = "";
		for(var i=0;i<out.length;i++)
		{
			if(out.charCodeAt(i) < 16)
			{
				put += "<0" + toHex(out.charCodeAt(i)) + ">";
			}
			else if(out.charCodeAt(i) < 32 || out.charCodeAt(i) > 127)
			{
				put += "<" + toHex(out.charCodeAt(i)) + ">";
			}
			else
			{
				put += out.charAt(i);
			}
		}
		return put + "\r\n";
	}
	else
	{
		return out + "\r\n";
	}
}