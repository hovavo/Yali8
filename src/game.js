import Vue from 'vue/dist/vue.js';
import VueMoment from 'vue-moment';
import Race from './race';

Vue.use(VueMoment);

export default class Game extends Vue{
  constructor() {
    let properties = {
      el: '#game',
      data: {
        state: 'init',
        race: new Race()
      },
      methods: {
        startGame: function () {
          this.state = 'racing';
          this.race.start();
        },
        stopGame: function () {
          this.state = 'init';
          this.race.stop();
        }
      }
    }
    super(properties);
  }
}