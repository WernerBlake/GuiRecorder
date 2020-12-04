//Buttons
const videoElement = document.querySelector('video');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const sourceSelectBtn = document.getElementById('videoSelectBtn');
sourceSelectBtn.onclick = getVideoSources;


const { desktopCapturer, remote } = require('electron');
const{ Menu } = remote;



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