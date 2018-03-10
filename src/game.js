import Vue from 'vue/dist/vue.js';
import VueMoment from 'vue-moment';
import SVG from 'svg.js';
import Race from './race';

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
        }
      },
      created: function () {
        let game = this;
        // Load Art
        fetch('/img/8.svg')
        .then(function (response) {
          game.art = SVG('canvas').size('100%', 500);
          response.text().then(function (text) {
            game.art.svg(text);
            game.ready();
          });
        })
      }


    };
    super(properties);
  }

  ready() {
    this.state = 'ready';
    this.race = new Race(this.art);
  }
}