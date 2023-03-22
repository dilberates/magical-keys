let comparedTruth = 0;
let comparedTotal = 0;
let comparedNoteNum = 0;

print(comparedNoteNum);

function compareNoteNums(note1, note2) {
    try {
        print("Compared note numbers are: " + note1 + " and " + note2);
        return (note1 == note2);
    }
    catch {
        return false;
    }
}

//

function compare(noteNum){
    //print(comparedNoteNum);
    let correct = compareNoteNums(noteNum, comparedNoteNum);

    //comparedNoteNum : karşılaştırmak istediğimiz şarkıdaki nota no
    //noteNum'da çalınan nota numarası
    //yeterince eşitse doğru oluyor.

    if (correct) {
        comparedTruth++;//bu yüzdelik hesaplamak için
        //şarkınınn yüzde kaçı doğru çalışıyor ölçmesi için
        //gerekli
        //print("correct: " + comparedTruth);
    }
    comparedTotal++;
}

//Song içinde measure içinde hangi division içinde hangi notalar
//karşılaştırılacak hangisi deneniyor denenecek bunalrın hepsi bu 
//kısımda oluyor
async function compareBySeconds(noteToCompare, seconds) {
    //burada nota ve zaman verilir. noteToCompare : NotaNo mesela sol gibi
    //seconds : kaç sn boyunca bu nota ile karşılaştırmak istediğimiz oluyor
    //aldığı notayı o kadar sn boyunca karşılaştırıyor

    let allowedTruthPercentage = 0.25; // 0 = 0% --> 1 = 100%
    //%25 doğru ise doğru olduğunu kabul ediyoruz. 
    //bunu değiştirerek kodun notaları algılamadaki esnekliğini değiştiririz.
    comparedTruth = 0;//Her meeasure'da bir tekrar 0'laması lazım. Eğer
    //yanlış olursa geri dönüyor
    comparedTotal = 0;
    comparing = true;
    comparedNoteNum = noteToCompare.noteNum;
    //print(comparedNoteNum);
    //print("note number " + comparedNoteNum + " changed to " + noteToCompare.frequencyNumber)
    let notesWereSimilar = false;

    await sleep(seconds)
    comparing = false;
    if (comparedTruth / comparedTotal > allowedTruthPercentage) {
        //%25 doğruluk varsa notalar yeterince benzer.  O zaman doğru
        notesWereSimilar = true;
    }
    //print("reached here!");
    //print("similarity was: " + notesWereSimilar);
    return (notesWereSimilar);
    //mediainfo
}

async function compareToNote(note) {
    let time = note.noteType;
    //print(note);
    let similarity = await compareBySeconds(note, time);


    // return new Promise))
    await sleep(time);
    return similarity;
}

/*
function compareWithTrigger(note){
  let similarity = false;
  do{
    let trigger = false;

    do{
      trigger = compareBySeconds(note, 0.1);
    }
    while(! trigger)

    similarity = compareToNote(note);
  }
  while(! similarity)

  return similarity;
}
*/

//Bu çalışıyor
//kırmızı ile gösterilen sıradaki notayı çalmayı bekler.
//Ve bu nota süresince doğru notayı almaya çalışır
//her çeyrek saniyede bir notayı karşılaştırır. 
//Nota doğru olduğunda yeşil checkmark verir.
//Ve bunların hepsi sola doğru sonraki nota için kayar. 
//Eğer bir measure da hata yaparsak o measure'ın başına gönderir
async function compareToSongWaiting(song, mid = 0, did = 0, nid = 0) {
    //bu fonksiyon şarkıyı alır.
    //Hangi measureda olduğumuzu anlamak için measureid mid
    //hangi division da olduğumuzu anlamak için divisionid did 
    //ve hangi notada olduğumu anlamak için noteid nid parametrelerini alır
    //çünkü measure listesi içinde division listesi ve division içinde de notalar var.
    
    //bir notayı okuduysa mesela nid'yi +1 arttırıyor

    let measures = song.measures;
    
    let measure = measures[mid];
    let division = measure[did];
    let note = division[nid];
    
    if (nid >= division.length) {
        nid = 0;
        did++;
    }

    if (did >= measure.length) {
        did = 0;
        mid++;
    }

    if (mid >= measures.length) {
        stop;
        //measure'lar bittiğinde şarkı bitmiştir dur demek
    }

    measure = measures[mid];
    division = measure[did];
    note = division[nid];
    
    //print("mid: " + mid + " did: " + did + " nid : " + nid);

    let noteTime = note.noteType;
    //print(note);
    const similarity = await compareToNote(note);
    //karşılaştırma için nota zamanını bekliyor
    await sleep(noteTime);
    //print("similarity =====> " + similarity);

    
    comparedTruth = 0;
    comparedTotal = 0;
    stepsNeeded = findStepsNeeded(noteTime, song.typesOfNotes);
    //bir adım atlayınca bir division atlamış oluyoruz
    //kaç steps atlaması gerektiğini veriyor burada

    if (similarity == true) {
        song.takeStep(stepsNeeded);
        drawCheck();//yeşil checkmark çizer
        //doğru ise checkmark verir.
        compareToSongWaiting(song, mid, did, nid + 1);
    }
    else {
        //print("reseted CSNW");
        drawCross();//çarpı işareti çizer kırmızı
        //yanlışsa drawcross verir çarpı işareti
        compareToSongWaiting(song, mid, 0, 0);//şarkıyı yanlış
        //yapıyorsa

    }

}

//beklemesi gerektiği kadar beklemiyor. Doğru çalışmıyor
//hatalı
async function compareToSongNotWaiting(song, mid = 0, did = 0, nid = 0) {
    
    let measures = song.measures;
    
    let measure = measures[mid];
    let division = measure[did];
    let note = division[nid];
    
    if (nid >= division.length) {
        nid = 0;
        did++;
    }

    if (did >= measure.length) {
        did = 0;
        mid++;
    }

    if (mid >= measures.length) {
        stop;
    }

    measure = measures[mid];
    division = measure[did];
    note = division[nid];

    //print("mid: " + mid + " did: " + did + " nid : " + nid);

    let noteTime = note.noteType;
    //print(note);
    const similarity = await compareToNote(note);
    await sleep(noteTime);
    //print("similarity =====> " + similarity);

    if (similarity == true) {
        drawCheck();
    }
    else {
        drawCross();
    }
    
    comparedTruth = 0;
    comparedTotal = 0;
    stepsNeeded = findStepsNeeded(noteTime, song.typesOfNotes);

    song.takeStep(stepsNeeded);
    
    compareToSongNotWaiting(song, mid, did, nid + 1);
}

async function sleep(secondsDuration) {
    return new Promise((resolve) => {
        setTimeout(resolve, secondsDuration * 1000);
    })
}

function findStepsNeeded(noteType, typesOfNotes) {
    return (noteType * typesOfNotes);
}

function comparingStepByStep(song){
    noteType = 1 / song.typesOfNotes;
    compareToSongWaiting(song);
    Metronom(noteType);//kaç saniyede bir tık tık tutması gerektiğini
    //alıyor
}

function comparingRealTime(song){
    noteType = 1 / song.typesOfNotes;
    compareToSongNotWaiting(song);
    Metronom(noteType);
}