import Vue from 'vue/dist/vue.js';
import VueMoment from 'vue-moment';
// import Vue2Touch from 'vue2-touch';
import paper from 'paper';
import Race from './race';

// Vue.use(Vue2Touch);
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
          console.log('start')
          this.state = 'racing';
          this.race.start();
        },
        stopGame: function () {
          this.state = 'ready';
          this.race.stop();
        },
        endGame: function () {
          this.state = 'end';
          this.race.stop();
        },
        left: function () {
          if (this.state === 'racing')
            this.race.switchLane(-1);
        },
        right: function () {
          console.log('right')
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

        // Bind keys:
        window.addEventListener('keydown', game.onKeyDown.bind(game));
      }
    };
    super(properties);
  }

  ready() {
    this.state = 'ready';
    this.race = new Race(this.endGame);
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