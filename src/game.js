import Vue from 'vue/dist/vue.js';
import VueMoment from 'vue-moment';
import Race from './race';
import paper from 'paper';

Vue.use(VueMoment);

export default class Game extends Vue {
  constructor() {
    let properties = {
      el: '#game',
      data: {
        state: 'init',
        race: null
      },
      methods: {
        startGame: function () {
          this.state = 'racing';
          this.race.start();
        },
        stopGame: function () {
          this.state = 'ready';
          this.race.stop();
        },
        left: function () {
          if (this.state === 'racing')
            this.race.switchLane(-1);
        },
        right: function () {
          if (this.state === 'racing')
            this.race.switchLane(1);
        }
      },
      mounted: function () {
        let game = this;

        // Load Art

        paper.install(window);
        paper.setup(document.getElementById('canvas'));
        paper.project.importSVG('/img/8.svg', function (svg) {
          game.ready();
        });

        // fetch('/img/8.svg')
        // .then(function (response) {
        //   game.art = SVG('canvas').size('100%', 500);
        //   response.text().then(function (text) {
        //     game.art.svg(text);
        //     game.ready();
        //   });
        // });

        // Bind keys:
        window.addEventListener('keydown', game.onKeyDown.bind(game));
      }
    };
    super(properties);
  }

  ready() {
    this.state = 'ready';
    this.race = new Race(this.art);

    // this.race.lanes.forEach(lane => {
    //   for (let i = 0; i < 8; i++) {
    //     let point = lane.getPoint((lane.length / 8) * i);
    //     let label = SVG.get('Placeholder_above').text(String(i)).x(point.x-5).y(point.y-10);
    //   }
    // });

  }

  onKeyDown(event) {
    switch (event.key) {
      case ' ':
      case 'Enter':
        if (this.state == 'ready')
          this.startGame();
        else
          this.stopGame();
        break;
      case 'ArrowRight':
        this.right();
        break;
      case 'ArrowLeft':
        this.left();
        break;

    }
  }

}