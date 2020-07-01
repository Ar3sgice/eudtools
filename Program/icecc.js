/*                                                          *

 *  IceCC code to EUD trigger parser                        *

 *  usage: output = parseIceCC(inputText [, triggerBase]);  *

 *  hexCode(), hexByte() from common.js                     *

 *  hexstrToTrig() from eudtools_main.js                    *

 *                                                          */


var iceOffsetStarters=[14408,0,14548,14574,14632,14814,14852,7356,21226,15138,15446,15484,15776,15814,15998,16072,21266,16220,16246,16706,17492,16740,16832,16890,17016,17042,17148,17174,17368,17864,18264,18340,18624,7228,7282,0,21132,18302,20970,19332,18754,18662,19008,19106,19224,19478,19586,8714,20034,20126,20224,20322,20430,20604,20552,17394,18858,20774,20872,20676,21494,21528,21662,21848,21888,22146,27714,7818,27802,27870,28130,28530,28166,5494,5704,28558,28714,30022,28872,29330,28908,29244,29358,7084,29426,0,30368,30434,30654,30734,29844,29958,29548,29704,23574,23658,23734,23928,24006,24088,24180,24280,24404,24550,7754,24692,24784,24880,24976,25086,0,25434,25608,25162,25248,25358,8434,25690,25808,25908,25988,26474,26580,26690,26768,26802,26946,27088,26072,26168,26278,26354,0,5546,27164,27310,27452,27612,30776,30840,30904,30944,6812,6870,6934,6332,9502,9650,9920,10076,0,10172,10602,10262,10564,10782,10864,10962,11202,11476,11640,11058,5930,11804,11856,11712,12052,12136,12264,14036,12372,12456,12548,12636,12720,12812,8860,12896,14102,13012,13152,13236,13318,13402,14192,13504,14304,9336,13596,9394,13680,13890,12348,13764,0,0,0,0,7420,7580,8492,8244,8296,8348,8918,8970,9022,9270,21072,27392,12976,21108,13128,27428,9166,4834,7992,9192,7950,8818,8672,9120,9132,8124,8136,8064,8076,8184,8196,3464,22416,22886,22700,22178,22218,22324,6012,22954,23378,22580,22746,2610,22632,2866,3022,3044,5396,22504,22552,22280,4372,4246,7132,4390,5088,22832,23510,3814,23296,4294,3924,3850,3974,0,23034,6714,23208,22796,3596,6778,5040,5768,5732,6608,1904,31238,5978,4446,2088,6540,7018,4894,4948,2684,4986,5192,5278,5864,1858,31126,4852,1372,23478,2826,2914,2982,2468,2568,1970,2240,2164,2204,3722,3680,4018,6168,4122,4064,6406,6500,6140,6666,4746,5332,4512,4662,1424,3256,3150,3360,3408,2748,1766,1778,1612,1624,1674,1686,1550,1562,2350,2404,31192,5824,31214,1952,31256,31274,31296,31344,31402,31584,33088,33144,33206,31768,32040,32128,32352,32504,32660,32872,9452,36896,37244,0,37206,36702,34512,36870,37926,38208,38242,0,0,35636,35894,36062,36158,35410,33602,33342,36522,33650,33252,34680,34874,35098,37808,37692,37858,34378,34446,33438,33450,33462,33474,38360,38342,34076,33712,34318,33822,33940,34252,37760,38604,38658,38838,38706,38780,38384,38418,38466,38500,37102,36246,35250,35314,36330,36444,34622,0,0,0,0];
var iceTriggerPlugin = "Comment(\"TH]@58_:Re0@XF1fF003`XT8``00\", 0, 0, 7, 0, 1);";
var iceHeaderOffsets = {
	"Init" : 8,
	"Death" : 10,
	"GndAttkInit" : 12,
	"AirAttkInit" : 14,
	"Unused1" : 16,
	"GndAttkRpt" : 18,
	"AirAttkRpt" : 20,
	"CastSpell" : 22,
	"GndAttkToIdle" : 24,
	"AirAttkToIdle" : 26,
	"Unused2" : 28,
	"Walking" : 30,
	"WalkingToIdle" : 32,
	"SpecialState1" : 34,
	"SpecialState2" : 36,
	"AlmostBuilt" : 38,
	"Built" : 40,
	"Landing" : 42,
	"LiftOff" : 44,
	"IsWorking" : 46,
	"WorkingToIdle" : 48,
	"WarpIn" : 50,
	"Unused3" : 52,
	"StarEditInit" : 54,
	"Disable" : 56,
	"Burrow" : 58,
	"UnBurrow" : 60,
	"Enable" : 62
};
function parseIceCC(texts,dca)
{
	dca = dca || "Comment(\"\", 0, ^1, ^2, 0, 7);\r\n";
	var a=texts.replace(/\r/g,"").replace(/\#[^\r\n]*\n/g," ").replace(/\n/g," ").replace(/\t/g," ").split(/[\n| |\t]+/);
	var labels=["long00:","long01:","long02:","long03:","long04:","long05:"];
	var labelOffsets=[0,0,0,0,0,0];
	var labelROffsets=[31162,31008,31138,31071,31176,31168];
	var startOffset=20;
	var currentOffset=startOffset;
	var currentPtr=0;
	var currentText="";
	var currentId=0;
	var currentIdOffset=0;
	var isHeader=0;
	var out="";
	var labelPtr=6;
	var labelCc=0;
	var labelssw=0;
	var temp1="";
	var temp2="";
	var temp3="";
	var temp4="";
	var i=0;
	out+=iceTriggerPlugin+"\r\n";

	for(currentPtr=0;currentPtr<a.length;currentPtr++)
	{
		if(isHeader)
		{
			/* header parsing */
			currentText=a[currentPtr];
			switch(currentText)
			{
				case "IsId":
				currentId = parseInt(a[++currentPtr]);
				currentIdOffset = iceOffsetStarters[currentId];
				break;
				case "Type":
				out += dca.replace(/\"\"/g,"\""+currentId+"_type\"").replace(/\^1/g,currentIdOffset+4).replace(/\^2/g,parseInt(a[++currentPtr]));
				break;
				case ".headerend":
				isHeader=0;
				break;
				default:
				if(a[currentPtr+1]!="[NONE]" && iceHeaderOffsets[currentText])
				{
					labelOffsets[labelPtr] = currentIdOffset + iceHeaderOffsets[currentText];
					labels[labelPtr++] = a[++currentPtr] + ":";
				}
				break;
			}
			for(i=0;i<labels.length&&i<5;i++)
			{
			  if(a[currentPtr]+":" == labels[i] && labelROffsets[i])
			  {
			  	labelROffsets[labelPtr-1] = labelROffsets[i];
			  	break;
			  }
			}
		}
		else
		{
			/* main part, mainly switch cases */
			currentText=a[currentPtr];
			switch(currentText)
			{
				case ".headerstart":
					isHeader=1;
					break;
				case "playfram":
				case "pf":
					temp3+="00";currentOffset++;
					temp1=a[++currentPtr];
					if(temp1.match(/0x/i))
					{
					  temp1=temp1.replace(/0x/gi,"");
					  while(temp1.length<4)
					  {
					    temp1="0"+temp1;
					  }
					  temp3+=temp1.charAt(2)+temp1.charAt(3)+temp1.charAt(0)+temp1.charAt(1);
					  currentOffset+=2;
					}
					else
					{
					  temp1=hexByte(parseInt(a[currentPtr]&255));
					  temp3+=temp1;
					  temp1=hexByte(parseInt(a[currentPtr]>>8));
					  temp3+=temp1;
					  currentOffset+=2;
					}
					break;
				case "playframtile":
				case "playframfile":
					temp3+="01";currentOffset++;
					temp1=a[++currentPtr].replace(/0x/gi,"");
					while(temp1.length<4)
					{
						temp1="0"+temp1;
					}
					temp3+=temp1.charAt(2)+temp1.charAt(3)+temp1.charAt(0)+temp1.charAt(1);
					currentOffset+=2;
					break;
				case "sethorpos":
					temp3+="02";currentOffset++;
					temp1=parseInt(a[++currentPtr]);
					if(temp1<0){temp1=temp1+256;}
					temp1=hexByte(temp1);
					temp3+=temp1;
					currentOffset++;
					break;
				case "setvertpos":
					temp3+="03";currentOffset++;
					temp1=parseInt(a[++currentPtr]);
					if(temp1<0){temp1=temp1+256;}
					temp1=hexByte(temp1);
					temp3+=temp1;
					currentOffset++;
					break;
				case "setpos":
				case "__04":
					temp3+="04";currentOffset++;
					temp1=parseInt(a[++currentPtr]);
					if(temp1<0){temp1=temp1+256;}
					temp1=hexByte(temp1);
					temp3+=temp1;
					currentOffset++;
					temp1=parseInt(a[++currentPtr]);
					if(temp1<0){temp1=temp1+256;}
					temp1=hexByte(temp1);
					temp3+=temp1;
					currentOffset++;
					break;
				case "wait":
				case "w":
					temp3+="05";currentOffset++;
					temp1=hexByte(parseInt(a[++currentPtr]));
					temp3+=temp1;
					currentOffset++;
					break;
				case "waitrand":
					temp3+="06";currentOffset++;
					temp1=hexByte(parseInt(a[++currentPtr]));
					temp3+=temp1;
					currentOffset+=1;
					temp1=hexByte(parseInt(a[++currentPtr]));
					temp3+=temp1;
					currentOffset+=1;
					break;
				case "goto":
				case "gt":
					temp3+="07";currentOffset++;
					temp1=a[++currentPtr]+":";
					temp3+="Label["+temp1+"]";
					currentOffset+=2;
					break;
				case "imgol":
				case "imgol08":
					temp3+="08";currentOffset++;
					currentPtr++;
					temp1=hexByte(parseInt(a[currentPtr]&255));
					temp3+=temp1;
					temp1=hexByte(parseInt(a[currentPtr]>>8));
					temp3+=temp1;
					currentOffset+=2;
					temp1=parseInt(a[++currentPtr]);
					if(temp1<0){temp1=temp1+256;}
					temp1=hexByte(temp1);
					temp3+=temp1;
					currentOffset+=1;
					temp1=parseInt(a[++currentPtr]);
					if(temp1<0){temp1=temp1+256;}
					temp1=hexByte(temp1);
					temp3+=temp1;
					currentOffset+=1;
					break;
				case "imgul":
				case "imgul09":
					temp3+="09";currentOffset++;
					currentPtr++;
					temp1=hexByte(parseInt(a[currentPtr]&255));
					temp3+=temp1;
					temp1=hexByte(parseInt(a[currentPtr]>>8));
					temp3+=temp1;
					currentOffset+=2;
					temp1=parseInt(a[++currentPtr]);
					if(temp1<0){temp1=temp1+256;}
					temp1=hexByte(temp1);
					temp3+=temp1;
					currentOffset+=1;
					temp1=parseInt(a[++currentPtr]);
					if(temp1<0){temp1=temp1+256;}
					temp1=hexByte(temp1);
					temp3+=temp1;
					currentOffset+=1;
					break;
				case "imgolorig":
				case "imgol0a":
					temp3+="0A";currentOffset++;
					currentPtr++;
					temp1=hexByte(parseInt(a[currentPtr]&255));
					temp3+=temp1;
					temp1=hexByte(parseInt(a[currentPtr]>>8));
					temp3+=temp1;
					currentOffset+=2;
					break;
				case "switchul":
					temp3+="0B";currentOffset++;
					currentPtr++;
					temp1=hexByte(parseInt(a[currentPtr]&255));
					temp3+=temp1;
					temp1=hexByte(parseInt(a[currentPtr]>>8));
					temp3+=temp1;
					currentOffset+=2;
					break;
				case "__0c":
					temp3+="0C";currentOffset++;
					break;
				case "imgoluselo":
				case "imgol0d":
					temp3+="0D";currentOffset++;
					currentPtr++;
					temp1=hexByte(parseInt(a[currentPtr]&255));
					temp3+=temp1;
					temp1=hexByte(parseInt(a[currentPtr]>>8));
					temp3+=temp1;
					currentOffset+=2;
					temp1=parseInt(a[++currentPtr]);
					if(temp1<0){temp1=temp1+256;}
					temp1=hexByte(temp1);
					temp3+=temp1;
					currentOffset+=1;
					temp1=parseInt(a[++currentPtr]);
					if(temp1<0){temp1=temp1+256;}
					temp1=hexByte(temp1);
					temp3+=temp1;
					currentOffset+=1;
					break;
				case "imguluselo":
				case "imgul0e":
					temp3+="0E";currentOffset++;
					currentPtr++;
					temp1=hexByte(parseInt(a[currentPtr]&255));
					temp3+=temp1;
					temp1=hexByte(parseInt(a[currentPtr]>>8));
					temp3+=temp1;
					currentOffset+=2;
					temp1=parseInt(a[++currentPtr]);
					if(temp1<0){temp1=temp1+256;}
					temp1=hexByte(temp1);
					temp3+=temp1;
					currentOffset+=1;
					temp1=parseInt(a[++currentPtr]);
					if(temp1<0){temp1=temp1+256;}
					temp1=hexByte(temp1);
					temp3+=temp1;
					currentOffset+=1;
					break;
				case "sprol":
				case "sprol0f":
					temp3+="0F";currentOffset++;
					currentPtr++;
					temp1=hexByte(parseInt(a[currentPtr]&255));
					temp3+=temp1;
					temp1=hexByte(parseInt(a[currentPtr]>>8));
					temp3+=temp1;
					currentOffset+=2;
					temp1=parseInt(a[++currentPtr]);
					if(temp1<0){temp1=temp1+256;}
					temp1=hexByte(temp1);
					temp3+=temp1;
					currentOffset+=1;
					temp1=parseInt(a[++currentPtr]);
					if(temp1<0){temp1=temp1+256;}
					temp1=hexByte(temp1);
					temp3+=temp1;
					currentOffset+=1;
					break;
				case "highsprol":
				case "sprol10":
					temp3+="10";currentOffset++;
					currentPtr++;
					temp1=hexByte(parseInt(a[currentPtr]&255));
					temp3+=temp1;
					temp1=hexByte(parseInt(a[currentPtr]>>8));
					temp3+=temp1;
					currentOffset+=2;
					temp1=parseInt(a[++currentPtr]);
					if(temp1<0){temp1=temp1+256;}
					temp1=hexByte(temp1);
					temp3+=temp1;
					currentOffset+=1;
					temp1=parseInt(a[++currentPtr]);
					if(temp1<0){temp1=temp1+256;}
					temp1=hexByte(temp1);
					temp3+=temp1;
					currentOffset+=1;
					break;
				case "lowsprul":
				case "sprul11":
					temp3+="11";currentOffset++;
					currentPtr++;
					temp1=hexByte(parseInt(a[currentPtr]&255));
					temp3+=temp1;
					temp1=hexByte(parseInt(a[currentPtr]>>8));
					temp3+=temp1;
					currentOffset+=2;
					temp1=parseInt(a[++currentPtr]);
					if(temp1<0){temp1=temp1+256;}
					temp1=hexByte(temp1);
					temp3+=temp1;
					currentOffset+=1;
					temp1=parseInt(a[++currentPtr]);
					if(temp1<0){temp1=temp1+256;}
					temp1=hexByte(temp1);
					temp3+=temp1;
					currentOffset+=1;
					break;
				case "uflunstable":
					temp3+="12";currentOffset++;
					currentPtr++;
					temp1=hexByte(parseInt(a[currentPtr]&255));
					temp3+=temp1;
					temp1=hexByte(parseInt(a[currentPtr]>>8));
					temp3+=temp1;
					break;
				case "spruluselo":
				case "sprul13":
					temp3+="13";currentOffset++;
					currentPtr++;
					temp1=hexByte(parseInt(a[currentPtr]&255));
					temp3+=temp1;
					temp1=hexByte(parseInt(a[currentPtr]>>8));
					temp3+=temp1;
					currentOffset+=2;
					temp1=parseInt(a[++currentPtr]);
					if(temp1<0){temp1=temp1+256;}
					temp1=hexByte(temp1);
					temp3+=temp1;
					currentOffset+=1;
					temp1=parseInt(a[++currentPtr]);
					if(temp1<0){temp1=temp1+256;}
					temp1=hexByte(temp1);
					temp3+=temp1;
					currentOffset+=1;
					break;
				case "sprul":
				case "sprul14":
					temp3+="14";currentOffset++;
					currentPtr++;
					temp1=hexByte(parseInt(a[currentPtr]&255));
					temp3+=temp1;
					temp1=hexByte(parseInt(a[currentPtr]>>8));
					temp3+=temp1;
					currentOffset+=2;
					temp1=parseInt(a[++currentPtr]);
					if(temp1<0){temp1=temp1+256;}
					temp1=hexByte(temp1);
					temp3+=temp1;
					currentOffset+=1;
					temp1=parseInt(a[++currentPtr]);
					if(temp1<0){temp1=temp1+256;}
					temp1=hexByte(temp1);
					temp3+=temp1;
					currentOffset+=1;
					break;
				case "sproluselo":
				case "sprol15":
					temp3+="15";currentOffset++;
					currentPtr++;
					temp1=hexByte(parseInt(a[currentPtr]&255));
					temp3+=temp1;
					temp1=hexByte(parseInt(a[currentPtr]>>8));
					temp3+=temp1;
					currentOffset+=2;
					currentPtr++;
					temp1=hexByte(parseInt(a[currentPtr]&255));
					temp3+=temp1;
					temp1=hexByte(parseInt(a[currentPtr]>>8));
					temp3+=temp1;
					currentOffset+=2;
					break;
				case "end":
					temp3+="16";currentOffset++;
					break;
				case "setflipstate":
					temp3+="17";currentOffset++;
					temp1=hexByte(parseInt(a[++currentPtr]));
					temp3+=temp1;
					currentOffset++;
					break;
				case "playsnd":
					temp3+="18";currentOffset++;
					currentPtr++;
					temp1=hexByte(parseInt(a[currentPtr]&255));
					temp3+=temp1;
					temp1=hexByte(parseInt(a[currentPtr]>>8));
					temp3+=temp1;
					currentOffset+=2;
					break;
				case "playsndrand":
					temp3+="19";currentOffset++;
					temp1=parseInt(a[++currentPtr]);
					temp3+=hexByte(temp1);
					currentOffset+=1;
					temp4=temp1;
					for(i=0;i<temp4;i++)
					{
						currentPtr++;
						temp1=hexByte(parseInt(a[currentPtr]&255));
						temp3+=temp1;
						temp1=hexByte(parseInt(a[currentPtr]>>8));
						temp3+=temp1;
						currentOffset+=2;
					}
					break;
				case "playsndbtwn":
					temp3+="1A";currentOffset++;
					currentPtr++;
					temp1=hexByte(parseInt(a[currentPtr]&255));
					temp3+=temp1;
					temp1=hexByte(parseInt(a[currentPtr]>>8));
					temp3+=temp1;
					currentOffset+=2;
					currentPtr++;
					temp1=hexByte(parseInt(a[currentPtr]&255));
					temp3+=temp1;
					temp1=hexByte(parseInt(a[currentPtr]>>8));
					temp3+=temp1;
					currentOffset+=2;
					break;
				case "domissiledmg":
					temp3+="1B";currentOffset++;
					break;
				case "attackmelee":
				case "attack1c":
					temp3+="1C";currentOffset++;
					temp1=parseInt(a[++currentPtr]);
					temp3+=hexByte(temp1);
					currentOffset+=1;
					temp4=temp1;
					for(i=0;i<temp4;i++)
					{
					currentPtr++;
					temp1=hexByte(parseInt(a[currentPtr]&255));
					temp3+=temp1;
					temp1=hexByte(parseInt(a[currentPtr]>>8));
					temp3+=temp1;
					currentOffset+=2;
					}
					break;
				case "followmaingraphic":
					temp3+="1D";currentOffset++;
					break;
				case "randcondjmp":
				case "__1e_condjmp":
				case "__1e":
					temp3+="1E";currentOffset++;
					temp1=hexByte(parseInt(a[++currentPtr]));
					temp3+=temp1;
					currentOffset+=1;
					temp1=a[++currentPtr]+":";
					temp3+="Label["+temp1+"]";
					currentOffset+=2;
					break;
				case "turnccwise":
					temp3+="1F";currentOffset++;
					temp1=hexByte(parseInt(a[++currentPtr]));
					temp3+=temp1;
					currentOffset++;
					break;
				case "turncwise":
					temp3+="20";currentOffset++;
					temp1=hexByte(parseInt(a[++currentPtr]));
					temp3+=temp1;
					currentOffset++;
					break;
				case "turn1cwise":
					temp3+="21";currentOffset++;
					break;
				case "turnrand":
					temp3+="22";currentOffset++;
					temp1=hexByte(parseInt(a[++currentPtr]));
					temp3+=temp1;
					currentOffset++;
					break;
				case "setspawnframe":
					temp3+="23";currentOffset++;
					temp1=hexByte(parseInt(a[++currentPtr]));
					temp3+=temp1;
					currentOffset++;
					break;
				case "sigorder":
					temp3+="24";currentOffset++;
					temp1=hexByte(parseInt(a[++currentPtr]));
					temp3+=temp1;
					currentOffset++;
					break;
				case "attackwith":
				case "attack25":
					temp3+="25";currentOffset++;
					temp1=hexByte(parseInt(a[++currentPtr]));
					temp3+=temp1;
					currentOffset++;
					break;
				case "attack":
				case "attack26":
					temp3+="26";currentOffset++;
					break;
				case "castspell":
					temp3+="27";currentOffset++;
					break;
				case "useweapon":
					temp3+="28";currentOffset++;
					temp1=hexByte(parseInt(a[++currentPtr]));
					temp3+=temp1;
					currentOffset++;
					break;
				case "move":
					temp3+="29";currentOffset++;
					temp1=hexByte(parseInt(a[++currentPtr]));
					temp3+=temp1;
					currentOffset++;
					break;
				case "gotorepeatattk":
					temp3+="2A";currentOffset++;
					break;
				case "engframe":
				case "__2b":
					temp3+="2B";currentOffset++;
					currentPtr++;
					temp1=hexByte(parseInt(a[currentPtr]&255));
					temp3+=temp1;
					temp1=hexByte(parseInt(a[currentPtr]>>8));
					temp3+=temp1;
					currentOffset+=2;
					break;
				case "engset":
				case "__2c":
					temp3+="2C";currentOffset++;
					temp1=hexByte(parseInt(a[++currentPtr]));
					temp3+=temp1;
					currentOffset++;
					break;
				case "__2d":
					temp3+="2D";currentOffset++;
					break;
				case "nobrkcodestart":
					temp3+="2E";currentOffset++;
					break;
				case "nobrkcodeend":
					temp3+="2F";currentOffset++;
					break;
				case "ignorerest":
					temp3+="30";currentOffset++;
					break;
				case "attkshiftproj":
				case "attackshiftproj":
				case "attack31":
					temp3+="31";currentOffset++;
					temp1=hexByte(parseInt(a[++currentPtr]));
					temp3+=temp1;
					currentOffset++;
					break;
				case "tmprmgraphicstart":
					temp3+="32";currentOffset++;
					break;
				case "tmprmgraphicend":
					temp3+="33";currentOffset++;
					break;
				case "setfldirect":
				case "playframno":
					temp3+="34";currentOffset++;
					temp1=hexByte(parseInt(a[++currentPtr]));
					temp3+=temp1;
					currentOffset++;
					break;
				case "call":
				case "__35_condjmp":
					temp3+="35";currentOffset++;
					temp1=a[++currentPtr]+":";
					temp3+="Label["+temp1+"]";
					currentOffset+=2;
					break;
				case "return":
				case "__36":
					temp3+="36";currentOffset++;
					break;
				case "setflspeed":
				case "__37":
					temp3+="37";currentOffset++;
					currentPtr++;
					temp1=hexByte(parseInt(a[currentPtr]&255));
					temp3+=temp1;
					temp1=hexByte(parseInt(a[currentPtr]>>8));
					temp3+=temp1;
					currentOffset+=2;
					break;
				case "creategasoverlays":
				case "__38":
					temp3+="38";currentOffset++;
					temp1=hexByte(parseInt(a[++currentPtr]));
					temp3+=temp1;
					currentOffset++;
					break;
				case "pwrupcondjmp":
				case "__39":
					temp3+="39";currentOffset++;
					temp1=a[++currentPtr]+":";
					temp3+="Label["+temp1+"]";
					currentOffset+=2;
					break;
				case "trgtrangecondjmp":
				case "__3a":
					temp3+="3A";currentOffset++;
					currentPtr++;
					temp1=hexByte(parseInt(a[currentPtr]&255));
					temp3+=temp1;
					temp1=hexByte(parseInt(a[currentPtr]>>8));
					temp3+=temp1;
					currentOffset+=2;
					temp1=a[++currentPtr]+":";
					temp3+="Label["+temp1+"]";
					currentOffset+=2;
					break;
				case "trgtarccondjmp":
				case "__3b":
					temp3+="3B";currentOffset++;
					currentPtr++;
					temp1=hexByte(parseInt(a[currentPtr]&255));
					temp3+=temp1;
					temp1=hexByte(parseInt(a[currentPtr]>>8));
					temp3+=temp1;
					currentOffset+=2;
					currentPtr++;
					temp1=hexByte(parseInt(a[currentPtr]&255));
					temp3+=temp1;
					temp1=hexByte(parseInt(a[currentPtr]>>8));
					temp3+=temp1;
					currentOffset+=2;
					temp1=a[++currentPtr]+":";
					temp3+="Label["+temp1+"]";
					currentOffset+=2;
					break;
				case "curdirectcondjmp":
				case "__3c":
					temp3+="3C";currentOffset++;
					currentPtr++;
					temp1=hexByte(parseInt(a[currentPtr]&255));
					temp3+=temp1;
					temp1=hexByte(parseInt(a[currentPtr]>>8));
					temp3+=temp1;
					currentOffset+=2;
					currentPtr++;
					temp1=hexByte(parseInt(a[currentPtr]&255));
					temp3+=temp1;
					temp1=hexByte(parseInt(a[currentPtr]>>8));
					temp3+=temp1;
					currentOffset+=2;
					temp1=a[++currentPtr]+":";
					temp3+="Label["+temp1+"]";
					currentOffset+=2;
					break;
				case "imgulnextid":
				case "__3d":
					temp3+="3D";currentOffset++;
					temp1=hexByte(parseInt(a[++currentPtr]));
					temp3+=temp1;
					currentOffset++;
					temp1=hexByte(parseInt(a[++currentPtr]));
					temp3+=temp1;
					currentOffset++;
					break;
				case "__3e":
					temp3+="3E";currentOffset++;
					break;
				case "liftoffcondjmp":
					temp3+="3F";currentOffset++;
					temp1=a[++currentPtr]+":";
					temp3+="Label["+temp1+"]";
					break;
				case "warpoverlay":
				case "__40":
					temp3+="40";currentOffset++;
					currentPtr++;
					temp1=hexByte(parseInt(a[currentPtr]&255));
					temp3+=temp1;
					temp1=hexByte(parseInt(a[currentPtr]>>8));
					temp3+=temp1;
					currentOffset+=2;
					break;
				case "orderdone":
				case "__41":
					temp3+="41";currentOffset++;
					temp1=hexByte(parseInt(a[++currentPtr]));
					temp3+=temp1;
					currentOffset++;
					break;
				case "grdsprol":
				case "__42":
					temp3+="42";currentOffset++;
					currentPtr++;
					temp1=hexByte(parseInt(a[currentPtr]&255));
					temp3+=temp1;
					temp1=hexByte(parseInt(a[currentPtr]>>8));
					temp3+=temp1;
					currentOffset+=2;
					temp1=hexByte(parseInt(a[++currentPtr]));
					temp3+=temp1;
					currentOffset+=1;
					temp1=hexByte(parseInt(a[++currentPtr]));
					temp3+=temp1;
					currentOffset+=1;
					break;
				case "__43":
					temp3+="43";currentOffset++;
					break;
				case "dogrddamage":
				case "__44":
					temp3+="44";currentOffset++;
					break;
				case "__45":
					temp3+="45";currentOffset++;
					break;
				case "__46":
					temp3+="46";currentOffset++;
					break;
				case "__d3":
					temp3+="D3";currentOffset++;
					break;
				default:
					labelssw=1;
			}
			if(labelssw)
			{
				for(i=0;i<labels.length;i++)
				{
					if(currentText==labels[i])
					{
						labelROffsets[i]=currentOffset;
						labelssw=0;
					}
				}
				if(labelssw)
				{
					labelOffsets[labelPtr]=0;
					labelROffsets[labelPtr]=currentOffset;
					labels[labelPtr++]=currentText;
				}
				labelssw=0;
			}
		}
	}

	/* replace the label[]'s */
	for(i=0;i<labels.length;i++)
	{
		temp1=labelROffsets[i];
		temp1=hexByte(parseInt(labelROffsets[i])&255)+"";
		temp1+=hexByte(parseInt(labelROffsets[i])>>8)+"";
	  temp3=temp3.replace(new RegExp("Label\\["+labels[i]+"\\]","ig"),temp1);
	}

	/* alert(temp3); test data here */
	var debugData = ("Array labels: \r\n\r\n"+labels+"     "
	+"\r\n\r\nArray labelOffsets: \r\n\r\n"+labelOffsets+"     "
	+"\r\n\r\nArray labelROffsets: \r\n\r\n"+labelROffsets+"     "
	+"\r\n\r\nHex Result: \r\n\r\n"+temp3+"     ");

	/* give offset mod here */
	for(i=0;i<labels.length;i++)
	{
		if(labels[i]&&labelOffsets[i]&&labelROffsets[i])
		{
			out+=dca.replace(/\"\"/g,"\""+labels[i].substr(0,labels[i].length-1)+"\"").replace(/\^1/g,labelOffsets[i]).replace(/\^2/g,labelROffsets[i]);
		}
	}

	/* final */
	out+=hexstrToTrig(temp3,20,dca);
	return out;
}