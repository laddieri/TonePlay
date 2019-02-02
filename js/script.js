document.documentElement.addEventListener(
  "mousedown", function(){
    mouse_IsDown = true;
    if (Tone.context.state !== 'running') {
    Tone.context.resume();

}});

var box = document.querySelector(".flashbox");


var player = new Tone.Player("./sounds/clap.wav").toMaster();

function triggerSound(time){
	player.start()
}

Tone.Transport.schedule(function(time){
  triggerSound(time)
  Tone.Draw.schedule(function(){
    //the callback synced to the animation frame at the given time
    box.classList.add("active");
    setTimeout(() => {
      box.classList.remove("active");
    }, 100);
  })
}, 0)
Tone.Transport.loop = true;
Tone.Transport.loopEnd = '4n';


//start/stop the transport
document.querySelector('tone-play-toggle').addEventListener('change', e => Tone.Transport.toggle())

//start/stop the transport
document.querySelector('tone-slider').addEventListener('change', e => Tone.Transport.bpm.value = e.detail)

function updateTime() {
requestAnimationFrame(updateTime)
  document.querySelector('span').textContent = Tone.context.currentTime.toFixed(3)
}

updateTime()
