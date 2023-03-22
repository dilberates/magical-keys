function readAttributes(Attributes, song) {
    //print(Attributes);

    let divisions;
    let time;
    let beatNumber;
    let beatType;

    try {
        //xml'den bu alanları okuyup
        //içindeki notalardan bir liste oluşturuyor
        divisions = Attributes.getChildren("divisions")[0].getContent();
        debugger;
        divisions = Number(divisions);
        time = Attributes.getChildren("time")[0];
        beatNumber = time.getChildren("beats")[0].getContent();
        beatNumber = Number(beatNumber);
        beatType = time.getChildren("beat-type")[0].getContent();
        beatType = Number(beatType);

        song.changeAttributes(divisions, beatNumber, beatType);

        print("           attributes " + divisions + " " + beatNumber + " " + beatType);
    }
    catch (err) {
        print("           attributes is not important");
    }
}

function readBackup(Backup) {
    let duration = Backup.getChildren("duration")[0].getContent();
    duration = Number(duration);

    division -= duration;

    print("backed up " + division);
}

function readNote(Note, song, measure) {
    let pitch = Note.getChildren("pitch")[0];

    let noteType = pitch.getChildren("step")[0].getContent();

    let octave = pitch.getChildren("octave")[0].getContent();

    let duration = Note.getChildren("duration")[0].getContent();
    duration = Number(duration);

    let typeText = Note.getChildren("type")[0].getContent();
    let type = typesToNumbers[typeText];
    //print(type);

    lastDur = duration;

    let midNote;
    let noteNum;
    let alter;

    //alter varsa midnote var demektir.
    //Bu her zaman olmaz.
    //-1 ise demol +1 ise diyez olur. 

    try {
        alter = pitch.getChildren("alter")[0].getContent();
        midNote = true;
    }
    catch (err) {
        alter = 0;
        midNote = false;
    }

    noteNum = getNoteNumber(noteType, octave);

    print("Note Name: " + noteNum);
    print("Note Type: " + type);
    for (let d = 0; d < duration; d++) {
        song.addNote(noteNum, measure, division + d, midNote, type, duration);
    }

    division += duration;

    //print("note added " + division);
}

function readEmpty(Note, song, measure) {

    let duration = Note.getChildren("duration")[0].getContent();
    duration = Number(duration);

    let typeText
    let type

    if ((typeof (Note.getChildren("type"))) == 'undefined') {
        typeText = Note.getChildren("type")[0].getContent();
        type = typesToNumbers[typeText];
    }

    for (let d = 0; d < duration; d++) {
        song.addNoteByDivisions(0, measure, division + d, false, type, duration);
    }

    division += duration;

    //print("empty added " + division);
}


function loadXmlToSong(xml, song) {
    let parts = xml.getChildren('part');

    for (let i = 0; i < parts.length; i++) {

        let id = parts[i].getString('id');
        //let name = children[i].getContent();
        //print(id + ', ');

        let measures = parts[i].getChildren("measure");

        for (let j = 0; j < measures.length; j++) {
            try {
                let attributes = measures[j].getChild("attributes");
                readAttributes(attributes, song);
            }
            catch (err) {
                void 0;
            }

            song.addMeasure();
            division = 0;

            let mId = measures[j].getString('number');
            //print("     " + mId + ", " + measures[j].getName());

            let children = measures[j].getChildren();

            for (let k = 0; k < children.length; k++) {
                let child = children[k];
                let name = child.getName();
                if (name == "note") {
                    //print(typeof child.getString("default-x"))
                    if (typeof child.getString("default-x") == "string") {
                        readNote(child, song, j);
                    }
                    else {
                        readEmpty(child, song, j);
                    }
                }
                else if (name == "backup") {
                    readBackup(child);
                }
                else {
                    //print("             " + name + " " + child.getContent());
                }
            }
        }
    }
}
