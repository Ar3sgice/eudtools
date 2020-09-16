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
	[6608848, 6609847, 0x669A40, "I Palette Special", 1],
	[6609848, 6613844, 0x66C538, "I Shield GFX", 4],
	[6613848, 6617844, 0x66EC48, "I Iscript ID", 4],
	[6629848, 6630847, 0x66C150, "I Clickable", 1],
	[6638848, 6639847, 0x669E28, "I Palette Type", 1],
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
	[5247432, 5250432, 0x5193A0, "B Status Function", 12],
	[5244456, 5247264, 0x5187E8, "B Button Table", 12],
	[5247264, 5247456, 0x5192F8, "B Button Table (Offset)", 12],
	[5431380, 5457780, 0x590000, "B Empty Area", 4],
	[6847104, 6857104, 0x590000, "B Empty Area 2", 4],
	[5251768, 5252860, 0x514178, "R Units Requirements", 2],
	[5187008, 5187846, 0x5145C0, "R Upgrades Requirements", 2],
	[5187848, 5188166, 0x514908, "R Researches Requirements", 2],
	[5188168, 5188856, 0x514A48, "R Use Technology Requirements", 2],
	[5188856, 5190172, 0x514CF8, "R Orders Requirements", 2],
	[6014944, 6569344, 0x59CCA8, "UN UnitNode", 336],
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

const ValueConverts = {
	"reqfun" : [
		[0x004A8690, 0x4296F0, "2 Units Selected & Not Researched(Archon Merge)"],
		[0x004A8690, 0x429680, "2 Units Selected & Not Researched(Dark Archon Meld)"],
		[0x004A8660, 0x4296B0, "2 Units Selected (Archon Warp)"],
		[0x004A86B0, 0x429640, "2 Units Selected (Dark Archon Meld)"],
		[0x004A81F0, 0x4290F0, "Ability Is Researched"],
		[0x004A7860, 0x4282D0, "Always"],
		[0x004A8870, 0x428610, "Attack (SCV)"],
		[0x004A79C0, 0x428ED0, "Attacking Building"],
		[0x004A8140, 0x428420, "Building Can Move And Has Lifted Off"],
		[0x004A8190, 0x4287D0, "Building Has Landed"],
		[0x004A8160, 0x4283F0, "Building Has Lifted Off"],
		[0x004A8440, 0x428360, "Burrowed (Stop - Lurker)"],
		[0x004A78B0, 0x428E00, "Can Build Subunit"],
		[0x004A7E40, 0x4293E0, "Can Cloak"],
		[0x004A7F20, 0x4292C0, "Can Cloak - Mixed"],
		[0x004A7870, 0x428E60, "Can Create Unit/Building"],
		[0x004A7EB0, 0x429370, "Can Decloak"],
		[0x004A7F90, 0x429210, "Can Decloak - Mixed"],
		[0x004A7A40, 0x428920, "Cancel AddOn"],
		[0x004A7A20, 0x428530, "Cancel Last"],
		[0x004A7BE0, 0x428EA0, "Carrying Some Units"],
		[0x004A7AE0, 0x4284E0, "Construction/Mutation Underway"],
		[0x004A88A0, 0x4285A0, "Gather (SCV)"],
		[0x004A83F0, 0x428730, "Has Cargo (Return Cargo - Drone)"],
		[0x004A85D0, 0x4286E0, "Has interceptors"],
		[0x004A83A0, 0x428780, "Has No Cargo (Gather - Drone)"],
		[0x004A84A0, 0x428340, "Has No Exit"],
		[0x004A8620, 0x4286A0, "Has Scarabs"],
		[0x004A7D10, 0x429470, "Has Spidermine and Is Researched"],
		[0x004A8840, 0x428310, "In Constructing (Half - SCV)"],
		[0x004A8270, 0x429070, "Is Using Ability"],
		[0x004A7A50, 0x428500, "Larva Exist(Upgrading Only)"],
		[0x004A7910, 0x428DA0, "Mixed Group - Move/Patrol/Hold Position"],
		[0x004A7950, 0x428D40, "Mixed Group - Stop"],
		[0x004A82E0, 0x429720, "Morph To Lurker"],
		[0x004A8870, 0x428670, "Move (SCV)"],
		[0x004A8330, 0x428FA0, "Not Burrowed (Attack)"],
		[0x004A8300, 0x4283C0, "Not Burrowed(Move/Stop/Patrol/Hold Position)"],
		[0x004A80E0, 0x428810, "Nuke Available"],
		[0x004A8AB0, 0x428960, "Nuke Train"],
		[0x00485CE0, 0x4DEAC0, "Play/Pause Replay"],
		[0x004A8790, 0x428AD0, "Protoss Advanced Buildings"],
		[0x004A86E0, 0x428B80, "Protoss Basic Buildings"],
		[0x004A7A80, 0x429520, "Rally Point"],
		[0x004A7AA0, 0x429740, "Rally Point - While Upgrading Only"],
		[0x004A8100, 0x428440, "Recharge Shields"],
		[0x004A8870, 0x4285E0, "Repair (SCV)"],
		[0x004A7B20, 0x4288E0, "Research Underway"],
		[0x004A88F0, 0x428560, "Return Cargo (SCV)"],
		[0x00485C60, 0x4DEB40, "Slow Down Replay]"],
		[0x00485CA0, 0x4DEAF0, "Speed Up Replay"],
		[0x004A7CF0, 0x4294E0, "Spell Researched"],
		[0x004A8870, 0x428640, "Stop (SCV)"],
		[0x004A8050, 0x429170, "Tank Is in Siege Mode"],
		[0x004A8000, 0x4291C0, "Tank Is in Tank Mode"],
		[0x004A80A0, 0x428860, "Tank Is in Tank Mode(Move)"],
		[0x004A7CD0, 0x429500, "Tech Spell Not Researched"],
		[0x004A8A20, 0x428990, "Terran Advanced Buildings"],
		[0x004A8940, 0x428A10, "Terran Basic Buildings"],
		[0x004A7980, 0x428F30, "Unit Has A Weapon"],
		[0x004A7B40, 0x4284B0, "Unit Is Carrying Nothing (Gather - Probe)"],
		[0x004A7B70, 0x428480, "Unit Is Carrying Something (Return Cargo - Probe)"],
		[0x004A7BA0, 0x428FF0, "Unit's Capacity Has Been Met"],
		[0x004A7E20, 0x429450, "Upgrade Not At Max Level"],
		[0x004A7B00, 0x428900, "Upgrade Underway"],
		[0x004A8550, 0x428C30, "Zerg Advanced Buildings"],
		[0x004A84C0, 0x428CB0, "Zerg Basic Buildings"]
	],
	"actfun" : [
		[0x00480D80, 0x423210, "Archon Warp"],
		[0x004805E0, 0x424380, "Attack"],
		[0x00480680, 0x424200, "Attack Carrier"],
		[0x00480690, 0x4241A0, "Attack Reaver"],
		[0x00480640, 0x4242C0, "Attack(building)"],
		[0x00480630, 0x424320, "Attack(Suicide)"],
		[0x004806A0, 0x423390, "Build Subunit"],
		[0x00480B70, 0x423860, "Building Morph"],
		[0x00480C30, 0x4232B0, "Burrow"],
		[0x00446FD0, 0x429770, "Cancel"],
		[0x00480A70, 0x4232D0, "Cancel AddOn"],
		[0x004805A0, 0x423430, "Cancel Construction"],
		[0x00409520, 0x423180, "Cancel Infestation"],
		[0x00480560, 0x423490, "Cancel Last"],
		[0x004805B0, 0x423410, "Cancel Moprh"],
		[0x00480DC0, 0x4231D0, "Cancel Nuclear Strike"],
		[0x004A8AE0, 0x429780, "Cancel Place Buildings"],
		[0x004806E0, 0x423330, "Cancel Technology Research"],
		[0x00480A60, 0x4232F0, "Cancel Upgrade Research"],
		[0x004A8B00, 0x459AF0, "Change Displayed Buttons"],
		[0x00480C50, 0x423730, "Cloak"],
		[0x00480AF0, 0x423D10, "Create AddOn"],
		[0x00480AC0, 0x423DD0, "Create Building - Protoss"],
		[0x00480A80, 0x423EB0, "Create Building - Terran"],
		[0x00480B20, 0x423C50, "Create Building - Zerg"],
		[0x00480540, 0x4234B0, "Create Unit"],
		[0x00480D90, 0x4231F0, "Dark Archon Warp"],
		[0x00480D00, 0x423270, "Decloak"],
		[0x00480C00, 0x423B70, "Gather"],
		[0x00480DD0, 0x4239E0, "Heal"],
		[0x004806C0, 0x423370, "Hold Position"],
		[0x00480BA0, 0x423C30, "Land"],
		[0x00480D10, 0x423230, "Lift Off"],
		[0x00480D20, 0x423B40, "Load"],
		[0x004805C0, 0x424440, "Move"],
		[0x00480650, 0x424260, "Move(Carrier/Reaver)"],
		[0x00480DB0, 0x423A40, "Nulear Strike"],
		[0x004806B0, 0x424140, "Patrol"],
		[0x00480AB0, 0x423E90, "Place COP"],
		[0x00480B50, 0x423C40, "Place Nydus Canal Exit"],
		[0x00485BF0, 0x4DF2C0, "Play/Pause Replay"],
		[0x00480450, 0x4244A0, "Rally Point"],
		[0x00480DA0, 0x423AA0, "Recharge Shiedls"],
		[0x00480BC0, 0x423BD0, "Repair"],
		[0x004806D0, 0x423350, "Research Technology"],
		[0x00480A50, 0x423310, "Research Upgrade"],
		[0x00480C10, 0x423760, "Return Cargo"],
		[0x00480460, 0x423930, "Select Larva"],
		[0x00480590, 0x423450, "Siege Mode"],
		[0x00485BA0, 0x4DF300, "Slow Down Replay]"],
		[0x00485C10, 0x4DF260, "Spedd Up RePlay"],
		[0x004809F0, 0x4234D0, "StimPack"],
		[0x004805D0, 0x4233F0, "Stop"],
		[0x00480660, 0x4233D0, "Stop Carrier"],
		[0x00480670, 0x4233B0, "Stop Reaver"],
		[0x00480580, 0x423470, "Tank Mode"],
		[0x00480C40, 0x423290, "Unburrow"],
		[0x00480BD0, 0x423790, "Unit Morph"],
		[0x00480D50, 0x423B00, "Unload"],
		[0x004806F0, 0x423F70, "Use Thchnology"]
	],
	"status": [
		[5164144, 0x424500, "Function 1"],
		[4898128, 0x424980, "Function 2"],
		[4902096, 0x425180, "Function 3"],
		[4906848, 0x424F10, "Function 4"],
		[4908320, 0x424B50, "Function 5"],
		[4909440, 0x424AF0, "Function 6"],
		[4910048, 0x424AC0, "Function 7"],
		[4910896, 0x425900, "Function 8"],
		[4912560, 0x424520, "Function 9"]
	],
	"display": [
		[4898544, 0x426F50, "Function 1"],
		[4902432, 0x427890, "Function 2"],
		[4907200, 0x427C90, "Function 3"],
		[4908592, 0x4274A0, "Function 4"],
		[4909568, 0x4273E0, "Function 5"],
		[4910176, 0x427260, "Function 6"],
		[4911552, 0x427D30, "Function 7"],
		[4912592, 0x426EE0, "Function 8"],
		[4912704, 0x425EE0, "Function 9"]
	]
}

var convGlobalButtonOffset = 0;

function extractMemoryAndValue(lineInput) {
	let line = lineInput.toLowerCase();
	let args, type, unused1, unused2, val, val2, mem, comment;
	if(/comment *\(\".*\" *, *[0-9\-x]+ *, *[0-9\-x]+ *, *[0-9\-x]+ *, *[0-9\-x]+ *, *[0-9\-x]+\)/.test(line)) { // Comment trigger
		args = lineInput.match(/\(\"(.*)\" *, *([0-9\-x]+) *, *([0-9\-x]+) *, *([0-9\-x]+) *, *([0-9\-x]+) *, *([0-9\-x]+)\)/);
		type = parseInt(args[6]);
		switch(type) {
			case 1:
			case 2:
			return {result: "null"};
			case 3:
			case 4:
			case 5:
			unused2 = parseInt(args[5]);
			val = parseInt(args[4]);
			mem = parseInt(args[3]);
			unused1 = parseInt(args[2]);
			comment = args[1];
			return {result: "memory", values: [mem, val, type, 0]};
			case 6:
			count = parseInt(args[5]);
			unused2 = parseInt(args[4]);
			mem = parseInt(args[3]);
			unused1 = parseInt(args[2]);
			comment = args[1];
			return {result: "button", button: comment, count: count, values: [mem, 0, type, 0]};
			break;
			case 24: // +/- old plugin
			unused2 = parseInt(args[5]);
			val = parseInt(args[4]);
			mem = parseInt(args[3]);
			unused1 = parseInt(args[2]);
			comment = args[1];
			return {result: "memory", values: [mem, Math.abs(val), 3, val>0 ? 1 : 2]};
			break;
			case 9:
			case 25:
			dir = parseInt(args[5]);
			val = parseInt(args[4]);
			mem = parseInt(args[3]);
			unused1 = parseInt(args[2]);
			comment = args[1];
			return [mem, val, type, dir];
			case 10:
			case 50:
			mem = parseInt(args[2]);
			val = parseInt(args[3]);
			val2 = parseInt(args[4]);
			count = parseInt(args[5]);
			if(count <= 4) {
				return {result: "memory", values: [mem, val, count == 1 ? 4 : (count == 2 ? 5 : 3), 0]};
			}
			else {
				return {result: "memories", valuesArray: [
					[mem, val, 3, 0],
					[mem+4, val2, count == 5 ? 4 : (count == 6 ? 5 : 3), 0]
				]};
			}
			default:
			return {result: "null"};
		}
	}
	else if(/comment *\(\".*\" *, *[0-9\-x]+ *, *[0-9\-x]+ *, *[0-9\-x]+ *, *[0-9\-x]+\)/.test(line)) { // Old Comment trigger
		args = line.match(/\(\"(.*)\" *, *([0-9\-x]+) *, *([0-9\-x]+) *, *([0-9\-x]+) *, *([0-9\-x]+)\)/);
		type = parseInt(args[5]);
		val = parseInt(args[4]);
		mem = parseInt(args[3]);
		unused1 = parseInt(args[2]);
		comment = args[1];
		return {result: "memory", values: [mem, val, type, 0]};
	}
	else if(/pause ?game/.test(line)) { // PauseGame trigger
		let args = line.match(/\(([0-9\-x]+) *, *([0-9\-x]+) *, *([0-9\-x]+) *, *([0-9\-x]+) *, *([0-9\-x]+) *, *([0-9\-x]+)\)/);
		val = parseInt(args[3]);
		mem = parseInt(args[2]);
		type = 3;
		return {result: "memory", values: [mem, val, type, 0]};
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
			return {result: "null"};
		}
		mem = 0x51398C + 4 * effPlayer;
		val = parseInt(args[3]);
		dir = (args[2] == "add") ? 1 : ((args[2] == "subtract") ? 2 : 0);
		type = 3;
		return {result: "memory", values: [mem, val, type, dir]};
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
			return {result: "null"};
		}
		mem = 0x51398C + 4 * effPlayer;
		val = parseInt(args[3]);
		dir = (args[2] == "add") ? 1 : ((args[2] == "subtract") ? 2 : 0);
		type = 3;
		return {result: "memory", values: [mem, val, type, dir]};
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
			return {result: "null"};
		}
		mem = 0x51398C + 4 * effPlayer;
		val = parseInt(args[3]);
		dir = (args[2] == "at least") ? 5 : ((args[2] == "at most") ? 6 : 4);
		type = 3;
		return {result: "condition", values: [mem, val, type, dir]};
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
			return {result: "null"};
		}
		mem = 0x51398C + 4 * effPlayer;
		val = parseInt(args[3]);
		dir = (args[2] == "at least") ? 5 : ((args[2] == "at most") ? 6 : 4);
		type = 3;
		return {result: "condition", values: [mem, val, type, dir]};
	}
	else {
		return {result: "null"};
	}
}

function convertMemory(mem, val) {
	if(mem >= 5247432 && mem < 5250432 && mem % 12 == 4) { // StatusFunction
		mem = 0x5193A0 + (mem - 5247432);
		ValueConverts.status.forEach(line => {
			if(line[0] == val) {
				val = line[1];
			}
		})
		return [mem, val];
	}
	else if(mem >= 5247432 && mem < 5250432 && mem % 12 == 8) { // DisplayFunction
		mem = 0x5193A0 + (mem - 5247432);
		ValueConverts.display.forEach(line => {
			if(line[0] == val) {
				val = line[1];
			}
		})
		return [mem, val];
	}
	for(let i=0; i<ConvData.length; i++) {
		if(ConvData[i][0] <= mem && mem < ConvData[i][1]) {
			console.log(`Converted: ${mem} ${ConvData[i][3]} + ${(mem - ConvData[i][0]) / ConvData[i][4]}`);
			return [ConvData[i][2] + (mem - ConvData[i][0]), val];
		}
	}
	return [0, val];
}

function convertValue(val, type) {
	for(let i=0; i<ValueConverts[type].length; i++) {
		if(ValueConverts[type][i][0] == val) {
			console.log(`Converted: ${val} ${ValueConverts[type][i][2]}`);
			return ValueConverts[type][i][1];
		}
	}
	return val;
}

function buttonSMCB64Decode(str1) { // unstable function! only use with correct strings
	const b1 = "0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmno";
	const b2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	let str = str1.substring(1);
	let b64 = str.split("").map(k => b2[b1.indexOf(k)]).join("");
	let bytes = atob(b64).split("").map(k => k.charCodeAt(0));
	let buttons = [];
	let b0;
	while(bytes.length >= 20) {
		b0 = bytes.splice(0, 20);
		buttons.push({
			pos: b0.shift() + b0.shift() * 256,
			icon: b0.shift() + b0.shift() * 256,
			reqfun: b0.shift() + b0.shift() * 256 + b0.shift() * 65536 + b0.shift() * 16777216,
			actfun: b0.shift() + b0.shift() * 256 + b0.shift() * 65536 + b0.shift() * 16777216,
			reqvar: b0.shift() + b0.shift() * 256,
			actvar: b0.shift() + b0.shift() * 256,
			reqstr: b0.shift() + b0.shift() * 256,
			actstr: b0.shift() + b0.shift() * 256
		});
	}
	return buttons;
	// return atob(b64).split("").map(k => k.charCodeAt(0).toString(16)).map(s => s.length==1?"0"+s:s).join("");
	//return atob(b64).split("").map(k => k.charCodeAt(0));
}

function buttonToHex(b) {
	let array = [b.pos, b.pos >>> 8,
	             b.icon, b.icon >>> 8,
	             b.reqfun, b.reqfun >>> 8, b.reqfun >>> 16, b.reqfun >>> 24,
	             b.actfun, b.actfun >>> 8, b.actfun >>> 16, b.actfun >>> 24,
	             b.reqvar, b.reqvar >>> 8,
	             b.actvar, b.actvar >>> 8,
	             b.reqstr, b.reqstr >>> 8,
	             b.actstr, b.actstr >>> 8
	             ].map(n => n & 255);
	return array.map(n => n.toString(16)).map(s => s.length == 1 ? "0"+s : s).join("");
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
	if(memory % 4 != 0 && (type == 3 || type == 24)) {
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
	else if(type == 25 || type == 9) {
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
	else if(memory % 4 == 0 && (type == 3 || type == 24)) {
		let trigger = triggerPattern.replace(/\^1/g, memory).replace(/\^2/g, value).replace(/Set To/g, dir);
		return trigger;
	}
	else {
		return "";
	}
}

function convertButton(buttonMemNew, count, button) {
	var triggerPattern = "MemoryAddr(^1, Set To, ^2);";
	var triggerPattern_masked = "Masked MemoryAddr(^1, Set To, ^2, ^3);";

	try {
		let buttons = buttonSMCB64Decode(button);
		buttons.forEach(button => {
			button.reqfun = convertValue(button.reqfun, "reqfun");
			button.actfun = convertValue(button.actfun, "actfun");
		});
		var hexString = buttons.map(button => buttonToHex(button)).join("");
		var triggers = hexstrToTrig(hexString, convGlobalButtonOffset, triggerPattern + "\n");
		triggers += triggerPattern.replace(/\^1/g, buttonMemNew).replace(/\^2/g, count) + "\n";
		triggers += triggerPattern.replace(/\^1/g, buttonMemNew + 4).replace(/\^2/g, convGlobalButtonOffset);

		convGlobalButtonOffset += buttons.length * 20;
		return triggers;
	}
	catch(e) {
		return null;
	}
}

function convert108Triggers() {

	let all108Triggers = $("inputarea_trigconv").value.split(/\r?\n/);
	convGlobalButtonOffset = parseInt($("input_trigconv_buttonoffset").value);
	let out = all108Triggers.map(line => {
		let extr = extractMemoryAndValue(line);
		switch(extr.result) {
			case "memory":
			case "condition":
			let [mem, val, type, dir] = extr.values;
			let [newMem, newVal] = convertMemory(mem, val);
			if(newMem) {
				return convertToTrigger(newMem, newVal, type, dir);
			}
			else {
				return line + " // UNSUPPORTED EUD";
			}
			break;
			case "memories":
			return extr.valuesArray.map(values => {
				let [mem, val, type, dir] = values;
				let [newMem, newVal] = convertMemory(mem, val);
				if(newMem) {
					return convertToTrigger(newMem, newVal, type, dir);
				}
				else {
					return convertToTrigger(mem, val, type, dir);
				}
			}).join("\n");
			break;
			case "button":
			let buttonMemory = extr.values[0];
			let [buttonMemNew, dummyVal] = convertMemory(buttonMemory, 0);
			let button = extr.button;
			let count = extr.count;
			let converted = convertButton(buttonMemNew, count, button);
			if(converted) {
				return converted;
			}
			return line + " // ERROR";
			case "null":
			default:
			return line;
		}
	}).join("\n");

	$("input_trigconv_buttonoffset").value = convGlobalButtonOffset;
	$("trigger_output").value += (out + "\n").replace(/\n+/g, "\n");
}

function converterInit()
{
	if($("inputarea_trigconv").value == "")
	{
		$("inputarea_trigconv").value = "Parse 1.08 EUD to SC:R EUD.\n\nCurrently supports Dat edits, buttons, requirements & upgrades.";
	}
	$("parse_trigconv").onclick = convert108Triggers;
}