//nota numaralaları 
//bunların karşılıklarına
//https://pages.mtu.edu/~suits/notefreqs.html buradan bakabiliriz
//Frekansları C0 16.35'den başlar ve B6 1975'e kadarki notaların hepsidir.
//Melodikada bunlar arasındadır.
var notesToNums = {
    16.5: 1,
    18.5: 2,
    20.5: 3,
    22: 4,
    24.5: 5,
    27.5: 6,
    31: 7,
    32.5: 8,
    37: 9,
    41: 10,
    44: 11,
    49: 12,
    55: 13,
    62: 14,
    65.5: 15,
    73.5: 16,
    82.5: 17,
    87.5: 18,
    98: 19,
    110: 20,
    123: 21,
    131: 22,
    147: 23,
    165: 24,
    176: 25,
    199: 26,
    224: 27,
    249: 28,
    265: 29,
    297: 30,
    334: 31,
    355: 32,
    397: 33,
    444: 34,
    499: 35,
    531: 36,
    587: 37,
    659: 38,
    698: 39,
    784: 40,
    880: 41,
    988: 42,
    1046: 43,
    1174: 44,
    1318: 45,
    1397: 46,
    1568: 47,
    1760: 48,
    1975: 49,
};

var midNotesToNums = {
    17.5: 1,
    19.5: 2,
    23: 4,
    26: 5,
    29: 6,

    34.5: 8,
    39: 9,
    46: 11,
    52: 12,
    58: 13,

    69: 15,
    78: 16,
    92: 18,
    104: 19,
    116: 20,

    138: 22,
    155: 23,
    187: 25,
    210: 26,
    236: 27,
    
    279: 29,
    314: 30,
    376: 32,
    417: 33,
    471: 34,
    
    559: 36,
    629: 37,
    746: 39,
    830: 40,
    938: 41,
    
    1109: 43,
    1244: 44,
    1480: 46,
    1661: 47,
    1864: 48,
};
//bu listeler xml dosyasını şarkıya çevirirken kullanılır
var changeToBemol = {
    'B': 'A',
    'A': 'G',
    'G': 'F',
    'E': 'D',
    'D': 'C'
}

var lettersToNumbers = {
    'C': 1,
    'D': 2,
    'E': 3,
    'F': 4,
    'G': 5,
    'A': 6,
    'B': 7
};

var typesToNumbers = {
    'whole': 1,
    'half': 1 / 2,
    'quarter': 1 / 4,
    '8th': 1 / 8,
    '16th': 1 / 16,
    '32nd': 1 / 32,
}

//Frekansı alır ve yukarıdaki midnotestonums ve notestonums
//listelerinin her birinin içine bakar. Bunlardan frekans ve
//şarkı numaralarına bakar. Ve bunlardan en çok uyanı alıyor.
//onun nota numarasını veriyor. Ve atıyor
function freqToNoteNum(frequency) {
    // Will compare the given frequency to give out a note number
    // such as 28 if a note exists near the given frequency.
    // f(frequency) -> number
    // output -> number

    let roundedFreq = Math.round(frequency);

    let errorMarginBase = 1;
    //errorMargin gittikçe artıyor. frekans arttığı için algılamak için
    //bu errorMargin 1'den başlayıp frekans/100 eklenerek sürekli arttırılıyor
    //Bu daha iyi bir ayarda olmasını sağlıyor
    let errorMargin = errorMarginBase + Math.round((roundedFreq / 100));

    let freqValToBeCheckedBase = roundedFreq - errorMargin;

    for (let i = 0; i < errorMargin * 2; i++) {
        let freqValToBeChecked = freqValToBeCheckedBase + i;

        let checkedValType = typeof notesToNums[freqValToBeChecked];
        let exists = (checkedValType == "number");

        if (exists) {
            return notesToNums[freqValToBeChecked];
        }

        checkedValType = typeof midNotesToNums[freqValToBeChecked];
        exists = (checkedValType == "number");

        if (exists) {
            return midNotesToNums[freqValToBeChecked];
        }
    }
}

//Bunlarda xml'in nota ve şarkıya çevrilmesini sağlıyor
var o0WholeNotes = {
    'C': 'C0',
    'D': 'D0',
    'E': 'E0',
    'F': 'F0',
    'G': 'G0',
    'A': 'A0',
    'B': 'B0',
};

var o0MidNotes = {
    'C': 'C0#/D0b',
    'D': 'D0#/E0b',
    'F': 'F0#/G0b',
    'G': 'G0#/A0b',
    'A': 'A0#/B0b',
};
var octave0 = [
    o0WholeNotes,
    o0MidNotes
];

var o1WholeNotes = {
    'C': 'C1',
    'D': 'D1',
    'E': 'E1',
    'F': 'F1',
    'G': 'G1',
    'A': 'A1',
    'B': 'B1',
};

var o1MidNotes = {
    'C': 'C1#/D1b',
    'D': 'D1#/E1b',
    'F': 'F1#/G1b',
    'G': 'G1#/A1b',
    'A': 'A1#/B1b',
};
var octave1 = [
    o1WholeNotes,
    o1MidNotes
];

var o2WholeNotes = {
    'C': 'C2',
    'D': 'D2',
    'E': 'E2',
    'F': 'F2',
    'G': 'G2',
    'A': 'A2',
    'B': 'B2',
};

var o2MidNotes = {
    'C': 'C2#/D2b',
    'D': 'D2#/E2b',
    'F': 'F2#/G2b',
    'G': 'G2#/A2b',
    'A': 'A2#/B2b',
};

var octave2 = [
    o2WholeNotes,
    o2MidNotes
];

var o3WholeNotes = {
    'C': 'C3',
    'D': 'D3',
    'E': 'E3',
    'F': 'F3',
    'G': 'G3',
    'A': 'A3',
    'B': 'B3',
};

var o3MidNotes = {
    'C': 'C3#/D3b',
    'D': 'D3#/E3b',
    'F': 'F3#/G3b',
    'G': 'G3#/A3b',
    'A': 'A3#/B3b',
};

var octave3 = [
    o3WholeNotes,
    o3MidNotes
];

var o4WholeNotes = {
    'C': 'C4',
    'D': 'D4',
    'E': 'E4',
    'F': 'F4',
    'G': 'G4',
    'A': 'A4',
    'B': 'B4',
};

var o4MidNotes = {
    'C': 'C4#/D4b',
    'D': 'D4#/E4b',
    'F': 'F4#/G4b',
    'G': 'G4#/A4b',
    'A': 'A4#/B4b',
};

var octave4 = [
    o4WholeNotes,
    o4MidNotes
];

var o5WholeNotes = {
    'C': 'C5',
    'D': 'D5',
    'E': 'E5',
    'F': 'F5',
    'G': 'G5',
    'A': 'A5',
    'B': 'B5',
};

var o5MidNotes = {
    'C': 'C5#/D5b',
    'D': 'D5#/E5b',
    'F': 'F5#/G5b',
    'G': 'G5#/A5b',
    'A': 'A5#/B5b',
};

var octave5 = [
    o5WholeNotes,
    o5MidNotes
];

var o6WholeNotes = {
    'C': 'C6',
    'D': 'D6',
    'E': 'E6',
    'F': 'F6',
    'G': 'G6',
    'A': 'A6',
    'B': 'B6',
};

var o6MidNotes = {
    'C': 'C6#/D6b',
    'D': 'D6#/E6b',
    'F': 'F6#/G6b',
    'G': 'G6#/A6b',
    'A': 'A6#/B6b',
};

var octave6 = [
    o6WholeNotes,
    o6MidNotes
];


var octaves = [
    octave0,
    octave1,
    octave2,
    octave3,
    octave4,
    octave5,
    octave6,
]



var lettersToNumbers = {
    'C': 1,
    'D': 2,
    'E': 3,
    'F': 4,
    'G': 5,
    'A': 6,
    'B': 7
};

var typesToNumbers = {
    'whole': 1,
    'half': 1 / 2,
    'quarter': 1 / 4,
    '8th': 1 / 8,
    '16th': 1 / 16,
    '32nd': 1 / 32,
}



function getNoteNumber(noteName, octave) {
    let noteNumber = lettersToNumbers[noteName] + (7 * octave);

    return noteNumber;
};
