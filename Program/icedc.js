(function(exports) {

function b2w(byte1, byte2) {
    return (byte2 << 8) + byte1;
}
function b2dw(byte1, byte2, byte3, byte4) {
    return (byte4 << 24) + (byte3 << 16) + (byte2 << 8) + byte1;
}
function w2dw(word1, word2) {
    return (word2 << 16) + word1;
}
function dw2b(dw) {
    return [dw & 255, (dw >>> 8) & 255, (dw >>> 16) & 255, (dw >>> 24) & 255];
}
function w2b(w) {
    return [w & 255, (w >>> 8) & 255];
}
function dw2w(dw) {
    return [dw & 65535, (w >>> 16) & 65535];
}
function leftPad(str, n, pad) {
    return pad.repeat(Math.max(0, n-str.length)) + str;
}
function hex(n) {
    return leftPad(n.toString(16), 2, "0");
}
function hex0x(n) {
    return "0x" + leftPad(n.toString(16), 2, "0");
}

function readb(a, n) {
    if(n == 1) {
        return a.splice(0, 1)[0];
    }
    else if(n == 2) {
        return b2w(...a.splice(0, 2));
    }
    else if(n == 3) {
        return b2dw(...a.splice(0, 3), 0);
    }
    else if(n == 4) {
        return b2dw(...a.splice(0, 4));
    }
    else if(n > 4){
        return readb(a, 4) + (readb(a, n-4) << 32);
    }
    else {
        return 0;
    }
}

function readg(a, h, n) {
    if(n == 1) {
        return a.slice(h, h + 1)[0];
    }
    else if(n == 2) {
        return b2w(...a.slice(h, h + 2));
    }
    else if(n == 3) {
        return b2dw(...a.slice(h, h + 3), 0);
    }
    else if(n == 4) {
        return b2dw(...a.slice(h, h + 4));
    }
    else if(n > 4){
        return readg(a, h, 4) + (readg(a, h+4, n-4) << 32);
    }
    else {
        return 0;
    }
}

function readHeader(array, header) {
    let scpe = b2dw(...array.slice(header + 0, header + 4));
    let type = b2dw(...array.slice(header + 4, header + 8));
    let typeAnims = type < 2 ? type + 1 : type + 2 - (type % 2);
    let offsets = [];
    for(let i=8; i<8 + typeAnims * 2; i+=2) {
        offsets.push(b2w(...array.slice(header + i, header + i+2)));
    }
    return offsets;
}

const animationNames = ["Init", "Death", "GndAttkInit", "AirAttkInit", "Unused1", "GndAttkRpt", "AirAttkRpt", "CastSpell", "GndAttkToIdle", "AirAttkToIdle", "Unused2", "Walking", "WalkingToIdle", "SpecialState1", "SpecialState2", "AlmostBuilt", "Built", "Landing", "LiftOff", "IsWorking", "WorkingToIdle", "WarpIn", "Unused3", "StarEditInit", "Disable", "Burrow", "UnBurrow", "Enable"]
const animationLowCase = animationNames.map(s => s.toLowerCase());
function getHeaderAnimationOffset(array, header, anim) {
    if(typeof anim == "string") {
        anim = animationLowCase.indexOf(anim.toLowerCase());
        if(anim == -1) {
            return 0;
        }
    }
    return b2w(...array.slice(header + 8 + anim * 2, header + 10 + anim * 2));
}

const opcodeNames = ["playfram", "playframtile", "sethorpos", "setvertpos", "setpos", "wait", "waitrand", "goto", "imgol", "imgul", "imgolorig", "switchul", "__0c", "imgoluselo", "imguluselo", "sprol", "highsprol", "lowsprul", "uflunstable", "spruluselo", "sprul", "sproluselo", "end", "setflipstate", "playsnd", "playsndrand", "playsndbtwn", "domissiledmg", "attackmelee", "followmaingraphic", "randcondjmp", "turnccwise", "turncwise", "turn1cwise", "turnrand", "setspawnframe", "sigorder", "attackwith", "attack", "castspell", "useweapon", "move", "gotorepeatattk", "engframe", "engset", "__2d", "nobrkcodestart", "nobrkcodeend", "ignorerest", "attkshiftproj", "tmprmgraphicstart", "tmprmgraphicend", "setfldirect", "call", "return", "setflspeed", "creategasoverlays", "pwrupcondjmp", "trgtrangecondjmp", "trgtarccondjmp", "curdirectcondjmp", "imgulnextid", "__3e", "liftoffcondjmp", "warpoverlay", "orderdone", "grdsprol", "__43", "dogrddamage"];
function readIscript(array, offset) {
    let p = offset;
    let remSteps = 800;
    let out = [];
    while(remSteps--) {
        let c = readg(array, p++, 1);
        if(p >= array.length || !isFinite(c)) {
            out.push("__outofcode");
            break;
        }
        let opcodeName = opcodeNames[c] || "__" + hex(c);
        switch(c) {
            case 0x00: // PLAYFRAM
            var frame = readg(array, p, 2);
            out.push(opcodeName + "\t" + hex0x(frame) + "\t# frame set " + (Math.floor(frame / 17)));
            p += 2;
            break;

            case 0x01: // PLAYFRAMTILE
            case 0x2B: // ENGFRAME
            out.push(opcodeName + "\t" + readg(array, p, 2));
            p += 2;
            break;
            case 0x2C: // ENGSET
            out.push(opcodeName + "\t" + readg(array, p, 1));
            p += 1;
            break;

            case 0x02: // SETPOS series
            case 0x03:
            out.push(opcodeName + "\t" + readg(array, p, 1));
            p += 1;
            break;
            case 0x04:
            out.push(opcodeName + "\t" + readg(array, p, 1) + " " + readg(array, p+1, 1));
            p += 2;
            break;

            case 0x05: // WAIT series
            out.push(opcodeName + "\t" + readg(array, p, 1));
            p += 1;
            break;
            case 0x06:
            out.push(opcodeName + "\t" + readg(array, p, 1) + " " + readg(array, p+1, 1));
            p += 2;
            break;

            case 0x07: // GOTO
            out.push(opcodeName + "\t" + "[" + readg(array, p, 2) + "]");
            p += 2;
            remSteps = 0;
            break;
            case 0x1E: // RANDCONDJMP
            out.push(opcodeName + "\t" + readg(array, p, 1) + " " + "[" + readg(array, p+1, 2) + "]");
            p += 3;
            break;
            case 0x35: // CALL
            case 0x39: // PWRUPCONDJMP
            case 0x3F: // LIFTOFFCONDJMP
            out.push(opcodeName + "\t" + "[" + readg(array, p, 2) + "]");
            p += 2;
            break;
            case 0x3A: // TRGTRANGECONDJMP
            out.push(opcodeName + "\t" + readg(array, p, 2) + " " + "[" + readg(array, p+2, 2) + "]");
            p += 4;
            break;
            case 0x3B: // TRGTARCCONDJMP
            case 0x3C: // CURDIRECTCONDJMP
            out.push(opcodeName + "\t" + readg(array, p, 2) + " " + readg(array, p+2, 2) + " " + "[" + readg(array, p+4, 2) + "]");
            p += 6;
            break;
            case 0x36: // RETURN
            out.push(opcodeName);
            break;

            case 0x08: // IMGL series
            case 0x09:
            case 0x0D:
            case 0x0E:
            out.push(opcodeName + "\t" + readg(array, p, 2) + " " + readg(array, p+2, 1) + " " + readg(array, p+3, 1));
            p += 4;
            break;
            case 0x0A:
            case 0x0B:
            out.push(opcodeName + "\t" + readg(array, p, 2));
            p += 2;
            break;
            case 0x3D: // IMGULNEXTID
            out.push(opcodeName + "\t" + readg(array, p, 1) + " " + readg(array, p+1, 1));
            p += 2;
            break;

            case 0x0F: // SPRL series
            case 0x10:
            case 0x11:
            case 0x13:
            case 0x14:
            case 0x15:
            case 0x42: // GRDSPROL
            out.push(opcodeName + "\t" + readg(array, p, 2) + " " + readg(array, p+2, 1) + " " + readg(array, p+3, 1));
            p += 4;
            break;

            case 0x12: // UFLUNSTABLE
            out.push(opcodeName + "\t" + readg(array, p, 2));
            p += 2;
            break;

            case 0x16: // END
            out.push("end");
            remSteps = 0;
            break;

            case 0x18: // PLAYSND series
            out.push(opcodeName + "\t" + readg(array, p, 2));
            p += 2;
            break;
            case 0x19: // PLAYSNDRAND
            case 0x1C: // ATTACKMELEE
            var randomCount = readg(array, p, 1);
            var randomList = "";
            p += 1;
            for(let i=0; i<randomCount; i++) {
                randomList += " " + readg(array, p, 2);
                p += 2;
            }
            out.push(opcodeName + "\t" + randomCount + randomList);
            break;
            case 0x1A:
            out.push(opcodeName + "\t" + readg(array, p, 2) + " " + readg(array, p+2, 2));
            p += 4;
            break;

            case 0x1F: // TURN series
            case 0x20:
            case 0x22:
            out.push(opcodeName + "\t" + readg(array, p, 1));
            p += 1;
            break;
            case 0x21:
            out.push(opcodeName);
            break;

            case 0x0C:
            case 0x1B: // DOMISSILEDMG
            case 0x1D: // FOLLOWMAINGRAPHIC
            case 0x26: // ATTACK
            case 0x27: // CASTSPELL
            case 0x2A: // GOTOREPEATATTK
            case 0x2D:
            case 0x2E: // NOBRKCODESTART
            case 0x2F: // NOBRKCODEEND
            case 0x30: // IGNOREREST
            case 0x32: // TMPRMGRAPHICSTART
            case 0x33: // TMPRMGRAPHICEND
            case 0x3E:
            case 0x43:
            case 0x44: // DOGRDDAMAGE
            case 0x45:
            out.push(opcodeName);
            break;

            case 0x17: // SETFLIPSTATE
            case 0x23: // SETSPAWNFRAME
            case 0x24: // SIGORDER
            case 0x25: // ATTACKWITH
            case 0x28: // USEWEAPON
            case 0x29: // MOVE
            case 0x31: // ATTKSHIFTPROJ
            case 0x38: // CREATEGASOVERLAYS
            case 0x41: // ORDERDONE
            out.push(opcodeName + "\t" + readg(array, p, 1));
            p += 1;
            break;

            case 0x34: // SETFLDIRECT
            out.push(opcodeName + "\t" + readg(array, p, 1));
            p += 1;
            break;
            case 0x37: // SETFLSPEED
            out.push(opcodeName + "\t" + readg(array, p, 2));
            p += 2;
            break;

            case 0x40: // WARPOVERLAY
            out.push(opcodeName + "\t" + readg(array, p, 2));
            p += 2;
            break;

            default:
            out.push(opcodeName);
        }
    }
    return out;
}
function readIscriptText(array, offset) {
    return readIscript(array, offset).join("\n");
}

function loadIscriptBin(ab) {
    let u8a = Array.from(new Uint8Array(ab));

    // read first part
    let codeLength = b2w(...u8a.slice(0, 2));
    let mainCode = u8a.splice(0, codeLength);
    let headerPointerCode = u8a;
    let headerOffsets = Array(500).fill(0);
    let headers = Array(500).fill([]);

    while(headerPointerCode.length > 1) {
        let iscriptID = readb(headerPointerCode, 2);
        let offset = readb(headerPointerCode, 2);
        if(iscriptID < 0xFFFF) {
            headerOffsets[iscriptID] = offset;
        }
    }

    for(let i=0; i<headerOffsets.length; i++) {
        headers[i] = readHeader(mainCode, headerOffsets[i]);
    }

    return {
        headers: headers,
        allCode: mainCode.concat(headerPointerCode),
        mainCode: mainCode,
        headerPointerCode: headerPointerCode,
        headerOffsets: headerOffsets
    };
}

async function readIscriptFile(file) {
    let ab = await fetch(file).then(w => w.arrayBuffer());
    let iscriptData = loadIscriptBin(ab);
    iscriptData.readIscript = readIscript.bind(null, iscriptData.mainCode);
    iscriptData.readIscriptText = readIscriptText.bind(null, iscriptData.mainCode);
    iscriptData.getHeaderAnimationOffset = getHeaderAnimationOffset.bind(null, iscriptData.mainCode);
    return iscriptData;
}

exports.IceDC = function() {
    this.readIscriptFile = readIscriptFile;
    this.loadIscriptBin = loadIscriptBin;
    this.readIscript = readIscript;
    this.getHeaderAnimationOffset = getHeaderAnimationOffset;
    this.animationNames = animationNames;
    this.opcodeNames = opcodeNames;
    this.readHeader = readHeader;
}

})(window);