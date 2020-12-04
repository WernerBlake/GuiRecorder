//Buttons
const { desktopCapturer, remote } = require('electron');
const { Menu } = remote;

const videoElement = document.querySelector('video');

const startBtn = document.getElementById('startBtn');

const stopBtn = document.getElementById('stopBtn');

const sourceSelectBtn = document.getElementById('sourceSelectBtn');
sourceSelectBtn.onclick = getVideoSources;





// Get the available video sources
async function getVideoSources(){
    const inputSources = await desktopCapturer.getSources({
        types: ['window', 'screen']
    });

    const sourceOptionsMenu = Menu.buildFromTemplate(
        inputSources.map(source => {
            return{
                label: source.name,
                click: () => selectSource(source)
            };
        })
    );
    sourceOptionsMenu.popup();
}

async function selectSource(source){
    sourceSelectBtn.innerText = source.name;

    const constraints = {
        audio: false,
        video: {
            mandatory: {
                chromeMediaSource: 'desktop',
                chromeMediaSourceId: source.id
            }
        }
    };

    // create a stream
    const stream = await navigator.mediaDevices.getUserMedia(constraints);

    // preview the source in a video element
    videoElement.srcObject = stream;
    videoElement.play();
}