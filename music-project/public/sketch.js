const model_url = './model/';
let pitch;
let audioContext;
let mic;

let xml;
var path = "xml/ZÃ¼leyha uncomp muse.xml";

let comparing = false;


function modelLoaded() {
    select('#status').html('Model Loaded');
    getPitch();
}

function listening() {
    console.log('listening');
    pitch = ml5.pitchDetection(
        model_url,
        audioContext,
        mic.stream,
        modelLoaded);
}
//bu fonksiyon sesi dinleyip frekansı alır.
function getPitch() {
    //mikrofondan duyduğu sesi frekansa çevirir.
    pitch.getPitch(function (err, frequency) {
        if (frequency) {
            let noteNum = freqToNoteNum(frequency);
            //freqToNoteNum frekansı alıyor. Ve
            //nota numarasına çeviriyor
            
            if(comparing) {
                //karşılaştırmasını istiyorsam
                //yukarıda comparing'i true yaparım
                compare(noteNum);
                //elimizdeki nota numarası ile
                //xml'i bu compare karşılaştırır.
            }

            select('#result').html(noteNum);
        } else {
            select('#result').html('No pitch detected');
        }
        getPitch();
    })
}

function mousePressed() {
    userStartAudio();
}


document.body.append(document.createTextNode(ml5.version));

//sayfa yüklendiğinde gelecek olan şeyler burada yazılır.
function preload() {
    //Loads the image of the clef
    clef = loadImage('libraries/Drawings/pictures/clef.png');//nota resmini getiriyor

    //Loads the xml given by the path variable to then load it as a song class
    xml = loadXML(path); //şarkının xml dosyasının path'ini veriyor

    //Loads the tick sound used for the metronom
    tick = loadSound("libraries/sound/tick.mp3");//şarkı çalana kadar gelecek olan tick sesi
}


function setup() {
    createCanvas(1200, 800);//müzik notalarının geldiği çerçeve uzunluğu
    ellipseMode(CENTER);
    rectMode(CENTER);

    //ses içeriğini mikrofony açıp dinlemeye başlıyor.
    audioContext = getAudioContext();
    mic = new p5.AudioIn();
    mic.start(listening);

    //müzik gönderimi için Music sınıfını çağırır. Parametrelerini gönderir.
    Song = new Music("Music that is being played",
        100,
        200,
        4,
        4,
        []);

    //loadXmlToSong(xml, setSong)
    loadXmlToSong(xml, Song);//müziğin xml'ini ve song'unu yani müziği burada gönderiyor

    comparingStepByStep(Song);//adım adım karşılaştırma yapacak
}
//nota üzerinde çizim yapacak
function draw() {
    background(1000);

    if (drawingCheckMark) {//doğru çalarsa yeşil tik gelir.
        drawCheckMark(125, 50);
    }

    if (drawingCross) {//yanlış çalarsa çarpı işareti gelir.
        drawRedCross(125, 50);
    }

    Song.draw();
}
