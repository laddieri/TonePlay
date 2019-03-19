document.documentElement.addEventListener(
  "mousedown", function(){
    mouse_IsDown = true;
    if (Tone.context.state !== 'running') {
    Tone.context.resume();
    Tone.Transport.bpm.value =145;

}});

var box = document.querySelector(".flashbox");

var beatcount =1;
var barcount=1;
var player = new Tone.Player("./sounds/clap.wav").toMaster();
var ritardandoTrue=true;
var barsbefore=2;

function triggerSound(time){
	player.start()

}

function ritardando(x){
  y=-11*x + 145;
  return y;
}

Tone.Transport.schedule(function(time){
  triggerSound(time)
  console.log(Tone.Transport.bpm.value)
  console.log(ritardandoTrue);

  if (ritardandoTrue){
    if (barcount==barsbefore+1 ){
      Tone.Transport.bpm.value = ritardando(beatcount);
    }
    if(barcount==4 && beatcount==1){
      Tone.Transport.bpm.value = ritardando(5);
    }
    if (beatcount==4){
      barcount+=1;
      beatcount=0;
    }
    beatcount+=1;
  }
  Tone.Draw.schedule(function(){
      document.querySelector('tone-slider').value=Tone.Transport.bpm.value;
      // document.querySelector('span').textContent = beatcount;
  })
}, 0)
Tone.Transport.loop = true;
Tone.Transport.loopEnd = '4n';


//start/stop the transport
document.querySelector('tone-play-toggle').addEventListener('change', e => Tone.Transport.toggle())

//start/stop the transport
document.querySelector('tone-slider').addEventListener('change', e => Tone.Transport.bpm.value = e.detail)

document.querySelector('tone-toggle').addEventListener('change', e=>ritardandoTrue=!ritardandoTrue)

function updateTime() {
requestAnimationFrame(updateTime)
  // document.querySelector('span').textContent = Tone.context.currentTime.toFixed(3)
}

updateTime()
