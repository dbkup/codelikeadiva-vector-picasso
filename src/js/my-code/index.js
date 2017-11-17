import P5 from 'p5';
import 'p5/lib/addons/p5.sound';
import 'p5/lib/addons/p5.dom';

class Artwork {
  constructor() {
  }

  init() {
    const paper = document.getElementById('artwork-wrapper');
    const controls = Artwork.setupControls(paper);
    const sizes = paper.getBoundingClientRect();
    paper.firstElementChild.remove();

    let mic;

    controls.play.addEventListener('click', () => {
      if (mic) {
        mic.start();
      }
    });

    controls.stop.addEventListener('click', () => {
      if (mic) {
        mic.stop();
      }
    });

    const pVar = new P5((p) => {
      let maxLevel = 0;
      p.setup = () => {
        const canvas = p.createCanvas(sizes.width, sizes.height);
        canvas.parent('artwork-wrapper');
        mic = new P5.AudioIn();
        // mic.start();
        p.textSize(22);
      };

      p.draw = () => {
        p.background(0);
        const micLevel = mic.getLevel();
        const normalizedMicLevel = p.constrain(p.height - micLevel * p.height * 5, 0, p.height);
        p.fill(0, 102, 153);
        p.text(micLevel, 10, 35);
        if (maxLevel < micLevel) {
          maxLevel = micLevel;
        }
        p.text(maxLevel, p.width - 200, 35);
        p.ellipse(p.width / 2, normalizedMicLevel, 10, 10);
        // p.noLoop();
      };
    });
  }

  static setupControls(paper) {
    const parent = document.body;
    const wrap = document.createElement('div');
    wrap.classList.add('controls');

    const play = document.createElement('button');
    play.classList.add('play-button');
    play.appendChild(document.createTextNode('play'));
    wrap.appendChild(play);


    const stop = document.createElement('button');
    stop.classList.add('stop-button');
    stop.appendChild(document.createTextNode('stop'));
    wrap.appendChild(stop);

    parent.insertBefore(wrap, paper.parentElement);

    return {
      play,
      stop
    };
  }
}

export default Artwork;
