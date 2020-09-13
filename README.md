# eudtools
EUD tools for SC remastered

Link: [https://ar3sgice.github.io/eudtools/](https://ar3sgice.github.io/eudtools/)

## Usage

0. Tick "use MaskedMemory" in Settings (very recommended)
1. Choose category and traits you want to change. it will update Offset and Length
2. Fill in Object with object ID you need to change. it will update Memory and Hex
   e.g. unitID for units.dat items (refer to Datedit or the unit list in the right side)
3. Fill in Value with the target value.
4. Press the arrow next to Value to generate text trigger.
5. Paste text trigger in Scmdraft to make it work.

### Setting data types other than numbers

- hex string: put '0b114514' in Value input (including ')
- text: put "text" in Value input (including ")
- array of values: put numbers with commas seperated like 10,15,20,25 (mostly useful for things like Unit Size)

### Modifying buttons

- Of course this is not how it's *really* done. I didn't make a proper firegraft UI since no one except me uses this tool anyways.

### Important notes

- Don't use TrigEdit++ with this. it doesn't support masked memory and will break everything (or if there is a newer version that fixes that)
- It can be used together with EUD editor 3, except button requirements I think will cause conflicts
- For EUD editor 2 I don't know since it doesn't work on my laptop
- For some reason upgrades and techs (upgraded, disabled, enabled etc) are under the supply tab

## Useful utilities

### Trigger Duplicator

You can find it under General tab. It duplicates triggers for a number of times, with the ability to change some variables each time.

Variables support linear series, binary countoff (powers of 2), arrays, switch binaries and custom code.

Secret function: \[=EUD(memory, length, object, value)\] outputs EUD trigger.

### Trigger Slicer

You can find it under General tab as well. It cuts triggers with more than 64 actions into slices with at most 64 actions, keeping comment and Preserve Trigger.

## Other links

### EUD Database

[http://farty1billion.dyndns.org/EUDDB/](http://farty1billion.dyndns.org/EUDDB/) & [Backup page](https://ar3sgice.github.io/eudtools/Include/EUDDB.html)

### Stat_txt.tbl reference

[https://ar3sgice.github.io/eudtools/Include/StatStrings.html](https://ar3sgice.github.io/eudtools/Include/StatStrings.html)
