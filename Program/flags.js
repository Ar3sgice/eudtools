const flagsMaxRow = 12;

const flagNames = {
    "UnitsAdvancedFlags": ["Building", "Addon", "Flyer", "Worker", "Subunit", "Flying Building", "Hero", "Regenerates HP", "Animated Idle", "Cloakable", "Two Units in 1 Egg", "Single Entity", "Resource Depot", "Resource Container", "Robotic Unit", "Detector", "Organic Unit", "Requires Creep", "Unused 0x40000", "Requires Psi", "Burrowable", "Spellcaster", "Permanent Cloak", "Pickup Item", "Ignore Supply Check", "Use Medium Overlays", "Use Large Overlays", "Battle Reactions", "Full Auto-Attack", "Invincible", "Mechanical Unit", "Produces Units"],
    "UnitsMovementFlags": ["0x01", "0x02", "0x04", "0x08", "0x10", "0x20", "0x40", "Mine-safe"],
    "UnitsGroupFlags": ["Zerg", "Terran", "Protoss", "Men", "Building", "Factory", "Independant", "Neutral"],
    "WeaponsTargetFlags" : ["Air", "Ground", "Mechanical", "Organic", "non-Building", "non-Robotic", "Terrain", "Org or Mech", "Own"],
    "UnitsStareditAvailabilityFlags": ["Non-Neutral", "Unit Listing & Palette", "Mission Briefing", "Player Settings", "All Races", "Set Doodad State", "Non-Location Triggers", "Unit&&Hero Settings", "Location Triggers", "BroodWar Only"],
    "UnitNodeMovementFlags": ["Ordered at least once", "Accelerating", "Breaking", "Starting attack", "Moving", "Lifted", "Unknown", "Always zero"],
    "UnitNodeStatusFlags": ["Completed", "GroundedBuilding", "In Air", "Disabled", "Burrowed", "In Building", "In Transport", "Unknown", "Requires detection", "Cloaked", "Doodad State thing", "Cloaking for free", "Cannot receive orders", "NoBrkCodeStart", "Unknown", "Cannot Attack", "Is A Unit", "Is A Building", "Ignore Tile Collision", "Unknown", "Is Normal", "No Collide", "unknown", "Is Gathering", "unknown", "unknown", "Invincible", "Holding Position", "Speed Upgrade", "Cooldown Upgrade", "Is Hallucination", "Is Self Destructing"],
    "UnitNodePathingFlags": ["Uses Pathing", "0x02", "0x04", "0x08", "0x10", "0x20", "0x40", "0x80"],
    "UnitNodeParasiteFlags": ["Player 1", "Player 2", "Player 3", "Player 4", "Player 5", "Player 6", "Player 7", "Player 8"],
    "VisionFlags": ["Player 1", "Player 2", "Player 3", "Player 4", "Player 5", "Player 6", "Player 7", "Player 8", "Player 9 (unused)", "Player 10 (unused)", "Player 11 (unused)", "Player 12 (unused)"],
    "LocationFlags": ["Low Ground", "Med Ground", "High Ground", "Low Air", "Med Air", "High Air"],
    "TileFlags": ["Visible P1", "Visible P2", "Visible P3", "Visible P4", "Visible P5", "Visible P6", "Visible P7", "Visible P8", "Explored P1", "Explored P2", "Explored P3", "Explored P4", "Explored P5", "Explored P6", "Explored P7", "Explored P8", "0x00010000", "0x00020000", "Unwalkable", "0x00080000", "0x00100000", "0x00200000", "Has Creep", "Unbuildable (i.e., water tiles)", "Low Ground", "Med Ground", "High Ground", "Occupied (i.e. contains a building)", "Creep Receeding", "Cliff Edge", "Temporary Creep", "0x80000000"],
    "CheatFlags": ["Black Sheep Wall", "Operation Cwal", "Power Overwhelming", "Something For Nothing", "Show Me The Money", "Unused 0x0020", "Game Over Man", "There Is No Cow Level", "Staying Alive", "Ophelia", "Unused 0x0400", "The Gathering", "Medieval Man", "Modify The Phase Variance", "War Aint What It Used To Be", "Unused 0x8000", "0x00010000", "Food For Thought", "Whats Mine Is Mine", "Breathe Deep", "0x00100000", "0x00200000", "0x00400000", "0x00800000", "0x01000000", "0x02000000", "0x04000000", "0x08000000", "0x10000000", "noglues", "0x40000000", "0x80000000"],
    "hex8Flags": ["0x01", "0x02", "0x04", "0x08", "0x10", "0x20", "0x40", "0x80"],
    "hex16Flags": ["0x0001", "0x0002", "0x0004", "0x0008", "0x0010", "0x0020", "0x0040", "0x0080", "0x0100", "0x0200", "0x0400", "0x0800", "0x1000", "0x2000", "0x4000", "0x8000"],
    "hex32Flags": ["0x00000001", "0x00000002", "0x00000004", "0x00000008", "0x00000010", "0x00000020", "0x00000040", "0x00000080", "0x00000100", "0x00000200", "0x00000400", "0x00000800", "0x00001000", "0x00002000", "0x00004000", "0x00008000", "0x00010000", "0x00020000", "0x00040000", "0x00080000", "0x00100000", "0x00200000", "0x00400000", "0x00800000", "0x01000000", "0x02000000", "0x04000000", "0x08000000", "0x10000000", "0x20000000", "0x40000000", "0x80000000"]
};

function flagsParse() {
    $("trigger_output").value += flagsGenerateTrigger(parseInt($("input_memory").value), parseInt($("input_length").value), parseInt($("input_flags_value").value), $("select_flags_mode").selectedIndex);
}

function flagsInit() {
    $("parse_flags").onclick = flagsParse;
    $("input_flags_value").addEventListener("keydown", evt => setTimeout(flagsUpdateStates, 25));
}

function flagsGetStates() {
    let flagStates = [];
    for(let i=0; i<32; i++) {
        if($("flags_checkbox_" + i)) {
            if($("flags_checkbox_" + i).checked) {
                flagStates.push(true);
            }
            else {
                flagStates.push(false);
            }
        }
        else {
            flagStates.push(null);
        }
    }
    return flagStates;
}

function flagsCalcStates(value) {
    let out = [];
    for(let i=0; i<32; i++) {
        out.push(!!(value & 1));
        value >>>= 1;
    }
    return out;
}

function flagsUpdateStates(evt) {
    let flagValue = parseInt($("input_flags_value").value);
    let states = flagsCalcStates(flagValue);
    flagsSetStates(states);
}

function flagsUpdateValue(evt) {
    let flags = flagsGetStates();
    let value = flags.map((a, i) => a ? (1<<i) : 0).reduce((a,b) => a+b, 0);
    $("input_flags_value").value = value;
    $("input_value").value = value;
}

function flagsSetStates(states) {
    for(let i=0; i<32; i++) {
        if($("flags_checkbox_" + i)) {
            $("flags_checkbox_" + i).checked = states[i];
        }
    }
}

function flagsTransposeArray(array) {
    let out = Array(flagsMaxRow).fill(null).map(a => []);
    for(let i=0; i<array.length; i++) {
        out[i%flagsMaxRow].push(array[i]);
    }
    return out;
}

function flagsCreateElements(arrayRaw) {
    let array = flagsTransposeArray(arrayRaw);
    console.log(array);
    $("flags_tbody").innerHTML = "";
    for(let i=0; i<array.length; i++) {
        let r = document.createElement("tr");
        for(let j=0; j<4; j++) {
            let c1 = document.createElement("td");
            let c2 = document.createElement("td");
            if(typeof array[i][j] == "string") {
                let chb = document.createElement("input");
                chb.className = "flags_checkbox";
                chb.type = "checkbox";
                chb.id = "flags_checkbox_" + (j*flagsMaxRow + i);
                chb.addEventListener("change", flagsUpdateValue);
                c1.appendChild(chb);
                c2.textContent = array[i][j];
            }
            else {

            }
            r.appendChild(c1);
            r.appendChild(c2);
        }
        $("flags_tbody").appendChild(r);
    }
}

function flagsCall() {
    let offset = parseInt($("input_offset").value);
    switch(offset) {
        case 0x59CCC8: // UnitNode Movement Flags
        flagsCreateElements(flagNames.UnitNodeMovementFlags);
        break;
        case 0x59CD84: // UnitNode Status Flags
        flagsCreateElements(flagNames.UnitNodeStatusFlags);
        break;
        case 0x59CDAD: // UnitNode Pathing Flags
        flagsCreateElements(flagNames.UnitNodePathingFlags);
        break;
        case 0x59CDC9: // UnitNode Parasite Flags
        flagsCreateElements(flagNames.UnitNodeParasiteFlags);
        break;
        case 0x664080: // Units.Dat Advanced Flags
        flagsCreateElements(flagNames.UnitsAdvancedFlags);
        break;
        case 0x660FC8: // Units.Dat Movement Flags
        flagsCreateElements(flagNames.UnitsMovementFlags);
        break;
        case 0x6637A0: // Units.Dat Group Flags
        flagsCreateElements(flagNames.UnitsGroupFlags);
        break;
        case 0x661518: // Units.Dat Staredit Availability Flags
        flagsCreateElements(flagNames.UnitsStareditAvailabilityFlags);
        break;
        case 0x657998: // Weapons.Dat Target Flags
        flagsCreateElements(flagNames.WeaponsTargetFlags);
        break;
        case 0x57F1EC: // Vision Flags
        flagsCreateElements(flagNames.VisionFlags);
        break;
        case 0x58DC72: // Location Flags
        flagsCreateElements(flagNames.LocationFlags);
        break;
        case 0x6D5A6C: // Cheat Flags
        flagsCreateElements(flagNames.CheatFlags);
        break;
        default: // General
        if(parseInt($("input_length").value) == 1) {
            flagsCreateElements(flagNames.hex8Flags);
        }
        else if(parseInt($("input_length").value) == 2) {
            flagsCreateElements(flagNames.hex16Flags);
        }
        else {
            flagsCreateElements(flagNames.hex32Flags);
        }
        break;
    }
}

function flagsGenerateTrigger(memory, length, flagValue, mode) {
    var triggerPattern_4 = "MemoryAddr(^1, Set To, ^2);";
    var triggerPattern_masked = "Masked MemoryAddr(^1, Set To, ^2, ^3);";
    let mask = (2 ** (8 * length)) - 1;
    var value;
    switch(mode) {
        case 0: // Set All
        if(length == 4) {
            value = flagValue;
            return triggerPattern_4.replace(/\^1/g, memory).replace(/\^2/g, value) + "\n";
        }
        else {
            value = flagValue << (memory % 4 * 8);
            mask = mask << (memory % 4 * 8);
            return triggerPattern_masked.replace(/\^1/g, memory).replace(/\^2/g, value).replace(/\^3/g, mask) + "\n";
        }
        break;
        case 1: // Set Checked
        value = flagValue << (memory % 4 * 8);
        mask = value;
        return triggerPattern_masked.replace(/\^1/g, memory).replace(/\^2/g, value).replace(/\^3/g, mask) + "\n";
        break;
        case 2: // Clear Checked
        mask = flagValue << (memory % 4 * 8);
        value = 0;
        return triggerPattern_masked.replace(/\^1/g, memory).replace(/\^2/g, value).replace(/\^3/g, mask) + "\n";
        break;
        case 3: // Clear Unchecked
        value = flagValue << (memory % 4 * 8);
        mask = mask << (memory % 4 * 8);
        return triggerPattern_masked.replace(/\^1/g, memory).replace(/\^2/g, 0).replace(/\^3/g, mask - value) + "\n";
        break;
    }
}