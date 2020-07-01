const ConvData = [ // min, max, target, debug description (unused)
	// Units
	[7047408, 7047792, 0x6626E0, "U Addon Location", 4],
	[7036920, 7037148, 0x663CE8, "U Supply(1/2)", 1],
	[7037152, 7037380, 0x660178, "U Comp AI unit Type (?)", 1],
	[7037384, 7037596, 0x661FC0, "U Ready Sound", 2],
	[7037600, 7037828, 0x6647B0, "U Unit has Shield", 1],
	[7038064, 7038976, 0x662350, "U Hit Points", 4],
	[7038984, 7039196, 0x663B38, "U Pissed sound start", 2],
	[7039200, 7039428, 0x663A50, "U AI Attack Move", 1],
	[7039432, 7039660, 0x662EA0, "U AI Computer Idle", 1],
	[7039664, 7039892, 0x663DD0, "U Rank and Sublabel", 1],
	[7039896, 7040124, 0x6606D8, "U Broodwar Flag", 1],
	[7040128, 7040356, 0x664410, "U Transport Size", 1],
	[7040360, 7040816, 0x660C38, "U Subunit 2", 2],
	[7040816, 7041028, 0x662BF0, "U What sound end", 2],
	[7041272, 7041728, 0x6607C0, "U Subunit 1", 2],
	[7041728, 7041956, 0x662098, "U Right Click Action", 1],
	[7041960, 7042416, 0x663888, "U Cost - Minerals", 2],
	[7042416, 7042644, 0x660988, "U Transport Space", 1],
	[7042648, 7042876, 0x663320, "U AI Attack Unit", 1],
	[7042880, 7043792, 0x6610B0, "U Construction Animation", 4],
	[7043792, 7044020, 0x6646C8, "U Supply Produced", 1],
	[7044024, 7044236, 0x65FFB0, "U What sound start", 2],
	[7044480, 7044936, 0x662F88, "U Portrait", 2],
	[7044936, 7045128, 0x664980, "U Infestation Unit", 2],
	[7045128, 7045584, 0x660428, "U Cost - Time", 2],
	[7045584, 7045812, 0x6616E0, "U Air Weapon", 1],
	[7045816, 7046272, 0x660E00, "U Shield Points", 2],
	[7046272, 7046500, 0x662180, "U Size", 1],
	[7046960, 7047172, 0x661440, "U Yes sound end", 2],
	[7047176, 7047404, 0x6605F0, "U Starting Direction", 1],
	[7047792, 7048020, 0x6644F8, "U Unit Graphic", 1],
	[7048024, 7048252, 0x6636B8, "U Ground Weapon", 1],
	[7048256, 7048484, 0x65FEC8, "U Armor", 1],
	[7048488, 7048716, 0x662268, "U AI Human Idle", 1],
	[7048720, 7048932, 0x661EE8, "U Pissed sound end", 2],
	[7048936, 7049150, 0x663C10, "U Yes sound start", 2],
	[7049384, 7050296, 0x662860, "U Building Dimensions", 4],
	[7050296, 7050752, 0x661518, "U Staredit availability flags", 2],
	[7050752, 7050980, 0x662DB8, "U Target Acquisition Range", 1],
	[7050984, 7051440, 0x65FD00, "U Cost - Gas", 2],
	[7051440, 7051896, 0x660260, "U Custom Name", 2],
	[7051896, 7052124, 0x6637A0, "U Group Flags", 1],
	[7052128, 7052584, 0x663408, "U Build Score", 2],
	[7052584, 7053040, 0x663EB8, "U Destroy Score", 2],
	[7053040, 7053268, 0x664898, "U AI Return to Idle", 1],
	[7053272, 7055096, 0x6617C8, "U Unit Boundaries", 8],
	[7055096, 7055324, 0x660FC8, "U Movement Type", 1],
	[7055328, 7055556, 0x6635D0, "U Armor Upgrade Group", 1],
	[7055560, 7055788, 0x663238, "U Sight Range (At Most 11)", 1],
	[7055792, 7056020, 0x663150, "U Animation Level", 1],
	[7056024, 7056936, 0x664080, "U Special Ability Flags", 4],

	// Other dats
	[6574520, 6574938, 0x6C9C78, "F Acceleration", 2],
	[6574944, 6575780, 0x6C9930, "F Halt Distance", 4],
	[6575784, 6576202, 0x6CA318, "F Sprite Index", 2],
	[6576424, 6576633, 0x6C9858, "F Movement Control", 1],
	[6576640, 6577476, 0x6C9EF8, "F Top Speed", 4],
	[6577480, 6577689, 0x6C9E20, "F Turn Radius", 1],
	[6604848, 6608844, 0x668AA0, "I GRP File", 4],
	[6608848, 6609847, 0x669E28, "I Palette Special", 1],
	[6609848, 6613844, 0x66C538, "I Shield GFX", 4],
	[6613848, 6617844, 0x66EC48, "I Iscript ID", 4],
	[6629848, 6630847, 0x66C150, "I Clickable", 1],
	[6638848, 6639847, 0x669A40, "I Palette Type", 1],
	[6641848, 6642847, 0x66E860, "I Graphic Turns", 1],
	[6906464, 6906851, 0x665AC0, "S Selection Circle", 1],
	[6906856, 6907890, 0x666160, "S Image Index", 2],
	[6907896, 6908413, 0x665C48, "S Visible", 1],
	[6908416, 6908803, 0x665FD8, "S Selection Circle Offset", 1],
	[6909328, 6909715, 0x665E50, "S HP Bar Length", 1],
	[6986720, 6986808, 0x656248, "T Mineral CostTS", 2],
	[6986816, 6986904, 0x656380, "T Energy ConsumptionTS", 2],
	[6986904, 6986992, 0x6561F0, "T Gas Cost (Tech)", 2],
	[6987176, 6987264, 0x6563D8, "T Time CostTS", 2],
	[7057072, 7057133, 0x655700, "UP Upgrade Max", 1],
	[7057144, 7057266, 0x655AC0, "UP IconU", 2],
	[7057272, 7057394, 0x6557C0, "UP Gas Cost factor", 2],
	[7057400, 7057522, 0x6559C0, "UP Mineral Cost factor", 2],
	[7057592, 7057714, 0x655840, "UP Gas Cost base", 2],
	[7057720, 7057842, 0x655740, "UP Mineral Cost base", 2],
	[7057848, 7057970, 0x655940, "UP Time Cost factor", 2],
	[7058168, 7058290, 0x655B80, "UP Time Cost base", 2],
	[7058560, 7058820, 0x6570C8, "W Splash Medium", 2],
	[7058824, 7058954, 0x6564E0, "W Damage Factor", 1],
	[7058960, 7059220, 0x656888, "W Splash Inner", 2],
	[7059224, 7059354, 0x6573E8, "W Special Attack", 1],
	[7059360, 7059880, 0x656A18, "W Minimum Range", 4],
	[7059880, 7060010, 0x656FB8, "W Cooldown", 1],
	[7060016, 7060536, 0x656CA8, "W Missile Sprite", 4],
	[7060536, 7060796, 0x657780, "W Splash Outer", 2],
	[7060800, 7061060, 0x656568, "W Target Error Message", 2],
	[7061064, 7061324, 0x657678, "W Damage Bonus", 2],
	[7061208, 7061338, 0x657910, "W Offset X", 1],
	[7061328, 7061458, 0x656C20, "W Offset Y", 1],
	[7061600, 7061730, 0x657888, "W Launch Spin", 1],
	[7061736, 7061866, 0x6571D0, "W Upgrade Group", 1],
	[7061872, 7062002, 0x657040, "W Missile Type(Follow?)", 1],
	[7062008, 7062528, 0x657470, "W Maximum Range", 4],
	[7062528, 7062788, 0x6572E0, "W Label", 2],
	[7062792, 7062922, 0x657258, "W Type(explo, conc, norm..)", 1],
	[7062928, 7063188, 0x656EB0, "W Damage", 2],
	[7063192, 7063322, 0x656670, "W Behaviour", 1],
	[7063328, 7063588, 0x657998, "W Attack Type(flags)", 2],
	[7063592, 7063852, 0x656780, "W Icon", 2],
	[7063856, 7063986, 0x6566F8, "W Explosion Type(normal, splash..)", 1],
	[7063992, 7064122, 0x656990, "W Attack Angle", 1],

	// Misc
	[5247432, 5250432, 0x5193A0, "MI Status Function", 12],
	[5289836, 5289884, 0x582144, "MI Zerg Supply", 4],
	[5289884, 5289932, 0x582174, "MI Zerg Supply Used", 4],
	[5289932, 5289980, 0x5821A4, "MI Zerg Supply Max", 4],
	[5289980, 5290028, 0x5821D4, "MI Terran Supply", 4],
	[5290028, 5290076, 0x582204, "MI Terran Supply Used", 4],
	[5290076, 5290124, 0x582234, "MI Terran Supply Max", 4],
	[5290124, 5290172, 0x582264, "MI Protoss Supply", 4],
	[5290172, 5290220, 0x582294, "MI Protoss Supply Used", 4],
	[5290220, 5290268, 0x5822C4, "MI Protoss Supply Max", 4],
	[5290268, 5290316, 0x5822F4, "MI Custom Score", 4],
	[5334092, 5334380, 0x58CE24, "MI SC Techs Available", 1],
	[5334380, 5334668, 0x58CF44, "MI SC Techs Researched", 1],
	[5334704, 5335256, 0x58D088, "MI SC Upgrades Available", 1],
	[5335256, 5335808, 0x58D2B0, "MI SC Upgrades Researched", 1],
	[5336352, 5336356, 0x58D6F8, "MI Elapsed Time", 4],
	[5336384, 5336392, 0x58D718, "MI Pauses left", 1],
	[5337736, 5342836, 0x58DC60, "MI Location", 20],
	[5342840, 5343080, 0x58F050, "MI BW Techs Available", 1],
	[5343080, 5343320, 0x58F140, "MI BW Techs Researched", 1],
	[5343392, 5343572, 0x58F278, "MI BW Upgrades Available", 1],
	[5343572, 5343752, 0x58F32C, "MI BW Upgrades Researched", 1],

];

function extractMemoryAndValue(lineInput) {
	let line = lineInput.toLowerCase();
	let args, type, unused1, unused2, val, mem, comment;
	if(/comment *\(\".*\" *, *[0-9\-x]+ *, *[0-9\-x]+ *, *[0-9\-x]+ *, *[0-9\-x]+ *, *[0-9\-x]+\)/.test(line)) { // Comment trigger
		args = line.match(/\(\"(.*)\" *, *([0-9\-x]+) *, *([0-9\-x]+) *, *([0-9\-x]+) *, *([0-9\-x]+) *, *([0-9\-x]+)\)/);
		type = parseInt(args[6]);
		switch(type) {
			case 1:
			case 2:
			return null;
			case 3:
			case 4:
			case 5:
			unused2 = parseInt(args[5]);
			val = parseInt(args[4]);
			mem = parseInt(args[3]);
			unused1 = parseInt(args[2]);
			comment = args[1];
			return [mem, val, type, 0];
			case 25:
			dir = parseInt(args[5]);
			val = parseInt(args[4]);
			mem = parseInt(args[3]);
			unused1 = parseInt(args[2]);
			comment = args[1];
			return [mem, val, type, dir];
			default:
			return null;
		}
	}
	else if(/comment *\(\".*\" *, *[0-9\-x]+ *, *[0-9\-x]+ *, *[0-9\-x]+ *, *[0-9\-x]+\)/.test(line)) { // Old Comment trigger
		args = line.match(/\(\"(.*)\" *, *([0-9\-x]+) *, *([0-9\-x]+) *, *([0-9\-x]+) *, *([0-9\-x]+)\)/);
		type = parseInt(args[5]);
		val = parseInt(args[4]);
		mem = parseInt(args[3]);
		unused1 = parseInt(args[2]);
		comment = args[1];
		return [mem, val, type, 0];
	}
	else if(/pause ?game/.test(line)) { // PauseGame trigger
		let args = line.match(/\(([0-9\-x]+) *, *([0-9\-x]+) *, *([0-9\-x]+) *, *([0-9\-x]+) *, *([0-9\-x]+) *, *([0-9\-x]+)\)/);
		val = parseInt(args[3]);
		mem = parseInt(args[2]);
		type = 3;
		return [mem, val, type, 0];
	}
	else if(/set ?deaths *\( *player [0-9]+ *, *(set to|add|subtract) *, *[0-9\-x]+ *, *[0-9\-x]+\)/.test(line)) { // EUD
		let args = line.match(/\( *player ([0-9]+) *, *(set to|add|subtract) *, *([0-9\-x]+) *, *([0-9\-x]+)\)/);
		let player = parseInt(args[1]) - 1;
		let unit = parseInt(args[4]);
		console.log(line, args);
		if(unit < 0) {
			unit += 65536;
		}
		let effPlayer = 12 * unit + player;
		if(effPlayer < 2800) { // not EUD
			return null;
		}
		mem = 0x51398C + 4 * effPlayer;
		val = parseInt(args[3]);
		dir = (args[2] == "add") ? 1 : ((args[2] == "subtract") ? 2 : 0);
		type = 3;
		return [mem, val, type, dir];
	}
	else if(/set ?deaths *\( *[0-9]+ *, *(set to|add|subtract) *, *[0-9\-x]+ *, *[0-9\-x]+\)/.test(line)) { // EPD
		let args = line.match(/\( *([0-9]+) *, *(set to|add|subtract) *, *([0-9\-x]+) *, *([0-9\-x]+)\)/);
		let player = parseInt(args[1]);
		let unit = parseInt(args[4]);
		if(unit < 0) {
			unit += 65536;
		}
		let effPlayer = 12 * unit + player;
		if(effPlayer < 2736) { // not EUD
			return null;
		}
		mem = 0x51398C + 4 * effPlayer;
		val = parseInt(args[3]);
		dir = (args[2] == "add") ? 1 : ((args[2] == "subtract") ? 2 : 0);
		type = 3;
		return [mem, val, type, dir];
	}
	else if(/deaths *\( *player [0-9]+ *, *(exactly|at least|at most) *, *[0-9\-x]+ *,[unit ]*[0-9\-x]+\)/.test(line)) { // EUD Cond
		let args = line.match(/\( *player ([0-9]+) *, *(exactly|at least|at most) *, *([0-9\-x]+) *,[unit ]*([0-9\-x]+)\)/);
		let player = parseInt(args[1]) - 1;
		let unit = parseInt(args[4]);
		if(unit < 0) {
			unit += 65536;
		}
		let effPlayer = 12 * unit + player;
		if(effPlayer < 2800) { // not EUD
			return null;
		}
		mem = 0x51398C + 4 * effPlayer;
		val = parseInt(args[3]);
		dir = (args[2] == "at least") ? 5 : ((args[2] == "at most") ? 6 : 4);
		type = 3;
		return [mem, val, type, dir];
	}
	else if(/deaths *\( *[0-9]+ *, *(exactly|at least|at most) *, *[0-9\-x]+ *,[unit ]*[0-9\-x]+\)/.test(line)) { // EPD Cond
		let args = line.match(/\( *([0-9]+) *, *(set to|add|subtract) *, *([0-9\-x]+) *,[unit ]*([0-9\-x]+)\)/);
		let player = parseInt(args[1]);
		let unit = parseInt(args[4]);
		if(unit < 0) {
			unit += 65536;
		}
		let effPlayer = 12 * unit + player;
		if(effPlayer < 2736) { // not EUD
			return null;
		}
		mem = 0x51398C + 4 * effPlayer;
		val = parseInt(args[3]);
		dir = (args[2] == "at least") ? 5 : ((args[2] == "at most") ? 6 : 4);
		type = 3;
		return [mem, val, type, dir];
	}
	else {
		return null;
	}
}

function convertMemory(mem) {
	for(let i=0; i<ConvData.length; i++) {
		if(ConvData[i][0] <= mem && mem < ConvData[i][1]) {
			console.log(`Converted: ${mem} ${ConvData[i][3]} + ${(mem - ConvData[i][0]) / ConvData[i][4]}`);
			return ConvData[i][2] + (mem - ConvData[i][0]);
		}
	}
	return null;
}

function convertToTrigger(memory, value, type, direction) { // will always use Masked regardless of settings
	var triggerPattern = "MemoryAddr(^1, Set To, ^2);";
	var triggerPattern_masked = "Masked MemoryAddr(^1, Set To, ^2, ^3);";
	var dirValues = ["Set To", "Add", "Subtract", "Unknown", "Exactly", "At least", "At most"];

	let byteOrder = 0;
	let mask = 0xFFFFFFFF;
	let nextMemory = 0;
	let nextValue = 0;
	let nextByteCount = 0;
	let nextMask = 0;
	let dir = dirValues[direction] || "Set To";
	if(memory % 4 != 0 && type == 3) {
		byteOrder = memory % 4;
		memory -= byteOrder;
		nextMemory = memory + 4;
		nextValue = value >>> ((4-byteOrder) * 8);
		value = (value & (0xFFFFFFFF >>> (byteOrder * 8))) << (byteOrder * 8);
		nextMask = mask >>> ((4-byteOrder) * 8);
		mask = (mask >>> (byteOrder * 8)) << (byteOrder * 8);
		if(mask < 0) {
			mask += 0x100000000;
		}
		if(nextMask < 0) {
			nextMask += 0x100000000;
		}
		let trigger1 = triggerPattern_masked.replace(/\^1/g, memory).replace(/\^2/g, value).replace(/\^3/g, mask).replace(/Set To/g, dir);
		let trigger2 = triggerPattern_masked.replace(/\^1/g, nextMemory).replace(/\^2/g, nextValue).replace(/\^3/g, nextMask).replace(/Set To/g, dir);
		return [trigger1, trigger2].join("\n");
	}
	else if(type == 4) {
		byteOrder = memory % 4;
		memory -= byteOrder;
		value <<= byteOrder * 8;
		mask = 0xFF << byteOrder * 8;
		if(mask < 0) {
			mask += 0x100000000;
		}
		let trigger = triggerPattern_masked.replace(/\^1/g, memory).replace(/\^2/g, value).replace(/\^3/g, mask).replace(/Set To/g, dir);
		return trigger + "\n";
	}
	else if(type == 25) {
		byteOrder = memory % 4;
		memory -= byteOrder;
		value <<= byteOrder * 8;
		mask = 0xFF << byteOrder * 8;
		if(mask < 0) {
			mask += 0x100000000;
		}
		let trigger = triggerPattern_masked.replace(/\^1/g, memory).replace(/\^2/g, value).replace(/\^3/g, mask).replace(/Set To/g, dir);
		return trigger + "\n";
	}
	else if(type == 5) {
		byteOrder = memory % 4;
		memory -= byteOrder;
		value <<= byteOrder * 8;
		mask = 0xFFFF << byteOrder * 8;
		if(mask < 0) {
			mask += 0x100000000;
		}
		let trigger = triggerPattern_masked.replace(/\^1/g, memory).replace(/\^2/g, value).replace(/\^3/g, mask).replace(/Set To/g, dir);
		return trigger + "\n";
	}
	else if(memory % 4 == 0 && type == 3) {
		let trigger = triggerPattern.replace(/\^1/g, memory).replace(/\^2/g, value).replace(/Set To/g, dir);
		return trigger;
	}
	else {
		return "";
	}
}

function convert108Triggers() {
	let all108Triggers = $("inputarea_trigconv").value.split(/\r?\n/);
	let out = all108Triggers.map(line => {
		let extr = extractMemoryAndValue(line);
		if(extr) {
			let [mem, val, type, dir] = extr;
			let newMem = convertMemory(mem);
			if(newMem) {
				return convertToTrigger(newMem, val, type, dir);
			}
			else {
				return line + " // UNSUPPORTED EUD";
			}
		}
		else {
			return line;
		}
	}).join("\n");

	$("trigger_output").value += (out + "\n").replace(/\n+/g, "\n");
}

function converterInit()
{
	if($("inputarea_trigconv").value == "")
	{
		$("inputarea_trigconv").value = "Parse 1.08 EUD to SC:R EUD.\n\nCurrently supports most of Dat edits & upgrades.\n\n";
	}
	$("parse_trigconv").onclick = convert108Triggers;
}