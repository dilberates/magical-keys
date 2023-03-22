//müzik notalarının yani sembollerin çizilebilmesini bu sınıf sağlar.
class Note {
    constructor(noteNum, noteType = 1 / 4, duration = 1, midNote = false) {
        //noteNum : notaNumarası. Nota numarasına çevirme FreqToNoteNum.js
        //ile yapılıyor.
        this.noteNum = noteNum;
        this.midNote = midNote;
        this.noteType = noteType;
        this.duration = duration;
    }

    //notayı verilen konumda çizen fonksiyon
    draw(x, y) {
        let notePixDiff = sheetGap / 2;

        let pixelHeight = (this.noteNum - 1) * notePixDiff;

        // Music sheet base to lowest point difference
        let lowestDiff = 140;

        if (this.noteType == 1) { drawFullNote(x, lowestDiff - pixelHeight + y); }
        else if (this.noteType == 1 / 2) { drawHalfNote(x, lowestDiff - pixelHeight + y); }
        else if (this.noteType == 1 / 4) { drawQuarterNote(x, lowestDiff - pixelHeight + y); }
        else if (this.noteType == 1 / 8) { draw8thNote(x, lowestDiff - pixelHeight + y); }
        else if (this.noteType == 1 / 16) { draw16thNote(x, lowestDiff - pixelHeight + y); }
        else if (this.noteType == 1 / 32) { draw32ndNote(x, lowestDiff - pixelHeight + y); }
        else { circle(x, lowestDiff - pixelHeight + y, 10); }
    }
}



class Music {
    constructor(name, x, y, notesInBar, typesOfNotes, measures, divisions = 4) {
        //Sket.js içinde bu çağırılıyor.
        //measures içinde liste var.
        //Ve bu listelerin içinde notalar var.
        //Xml dosyaları notalarımidileri division olarak kaydeder.
        //Bu diivisionlarda measures içinde farklı bölütler. Ve bu bölütler içinde de
        //notalar var
        //ÖNEMLİ : Measures bir liste, bunun içinde divisions listesi var.
        //Divisions içinde de notalar var
        this.name = name;//şarkı adı
        this.x = x;//sayfada o notanın nerede olmasını istiyoruz.
        this.y = y;
        this.measures = measures;
        this.step = 0;

        // How many parts a quarter note can be divided into in this song
        this.divisions = divisions;//bir measure'ın sahip olduğu division sayısı
        //1 çeyrek nota 4 ile başladı için yukarıda 4 atanmış

        // Length of the song in pixels
        this.length = 0;

        // The amount of notes in each bar of the music sheet
        // Number
        this.notesInBar = notesInBar;//measure'lar. Bir measure içinde
        //kaç nota olabilir. 

        // Types of notes to count the bars length in time
        // Numbers such as 1, 2, 4, 8, 16, ...
        // The time the note takes up is calculated with 1/typesOfNotes
        //notesInBar'daki notanın tipi ne
        this.typesOfNotes = typesOfNotes;

        // The amount of time each gap takes
        // A gap is the gap between gap lines
        this.gapLengthInTime = (1 / typesOfNotes) * notesInBar;

        this.gapLengthInPixels = perdeGap;

        // scrollSpeed = pixels / time (milliseconds)
        this.scrollSpeed = this.gapLengthInPixels / (this.gapLengthInTime * 1000);

        // The amount of divisions in a measure
        this.completeDivNum = 4 * divisions;

        // The pixel length of a division (the amount of pixels the scroller passes in a divisions time)
        this.divisionInPixels = this.gapLengthInPixels / this.completeDivNum;

        // the time that a division represents
        this.divisionInSeconds = 1 / this.completeDivNum;

        this.startTime = millis()
    }

    changeAttributes(newDivision, newNotesInBar, newTypesOfNotes) {
        this.notesInBar = newNotesInBar;

        // Types of notes to count the bars length in time
        // Numbers such as 1, 2, 4, 8, 16, ...
        // The time the note takes up is calculated with 1/typesOfNotes
        this.typesOfNotes = newTypesOfNotes;

        // The amount of time each gap takes
        // A gap is the gap between gap lines
        this.gapLengthInTime = (1 / newTypesOfNotes) * newNotesInBar;

        this.gapLengthInPixels = perdeGap;

        // scrollSpeed = pixels / time (milliseconds)
        this.scrollSpeed = this.gapLengthInPixels / (this.gapLengthInTime * 1000);

        this.divisions = newDivision;

        // The amount of divisions in a measure
        this.completeDivNum = (this.gapLengthInTime / 0.25) * newDivision;

        // The pixel length of a division (the amount of pixels the scroller passes in a divisions time)
        this.divisionInPixels = this.gapLengthInPixels / this.completeDivNum;

        // the time that a division represents
        this.divisionInSeconds = 1 / this.completeDivNum;
    }

    addMeasure() {
        let measure = [];

        let divsInMeasure = this.completeDivNum;

        for (let i = 0; i < divsInMeasure; i++) {
            let div = [];
            measure.push(div);
        }

        this.measures.push(measure);
    }

    addNote(noteNum, measure, division, midNote = false, type = 1 / 4, duration = 1) {
        //print(measure + " " + division + " " + typeof division);
        this.measures[measure][division].push(new Note(noteNum, type, duration, midNote));
        //print(typeof noteNum);
        //print("Added notes num was " + noteNum + " in measure " + measure + " and division " + division + " and its mid note was = " + midNote);
    }

    addEmpty(noteType) {
        // noteType: (number) the length of the silence in note type (such as : 1 -> whole, 2 -> half, 4 -> quarter, 8 -> 1/8th of a second, etc.)

        let spaceOfSilenceInGap = (1 / noteType) / this.gapLengthInTime
        let silenceNumberToBeAdded = spaceOfSilenceInGap * this.gapLengthInPixels

        this.length += silenceNumberToBeAdded
    }

    clearSong() {
        this.measures = [];
        this.length = 0;
    }

    draw() {
        drawMusicSheet(this.x - 70, this.y - 18);
        circle(this.x, this.y, 5);
        circle(this.x, this.y + 140, 5);
        this.drawHighlighter();

        for (let mid = 0; mid < this.measures.length; mid++) {
            let measure = this.measures[mid];

            let dToSkip = 0;

            for (let did = 0; did < measure.length; did++) {

                let div = measure[did];
                for (let nid = 0; nid < div.length; nid++) {
                    let note = div[nid];

                    dToSkip = note.duration;
                    //print("D To Skip Is: " + dToSkip);

                    let xOffset = this.gapLengthInPixels * mid + this.divisionInPixels * (did + 1 / 2);// - ((playedTime/(1000 * this.gapLengthInTime)) * this.gapLengthInPixels);
                    //print(playedTime/1000);
                    note.draw(this.x + xOffset - this.step, this.y);
                }

                //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////DÜZELT!!!!!
                did = did + (dToSkip - 1);
                dToSkip = 0;//DÜZELT!!!!!
                //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////DÜZELT!!!!!

            }
        }
    }

    drawHighlighter() {
        push();
        let highlighterColor = color("red");
        highlighterColor.setAlpha(40);
        fill(highlighterColor);
        let center = this.divisionInPixels / 2;
        translate(this.x, this.y);
        rect(center, -gap, (center * 2) - 2, 18 * gap)
        pop();
    }

    takeStep(stepNum) {
        for(let i = 0; i < stepNum; i++) {
            this.step += this.divisionInPixels;
        }
        print("took needed steps");
    }
}