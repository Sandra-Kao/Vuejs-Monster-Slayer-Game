function randomValue(max, min) {
  const attackValue = Math.random() * (max - min) + min;
  return Math.floor(attackValue);
}
Vue.createApp({
  data() {
    return {
      monsterHealthy: 100,
      playerHealthy: 100,
      countRound: 0,
      isDraw: false,
      isGameOver: false,
      isPlayerWin: false,
      battleLogs: []
    };
  },
  watch: {
    monsterHealthy(value) {
      if (value < 0 && this.playerHealthy < 0) {
        this.isDraw = true;
        this.monsterHealthy = 0;
        this.playerHealthy = 0;
        this.isGameOver = true;
      } else if (value <= 0) {
        this.monsterHealthy = 0;
        this.isPlayerWin = true;
        this.isGameOver = true;
      }
    },
    playerHealthy(value) {
      if (value < 0 && this.monsterHealthy < 0) {
        this.isDraw = true;
        this.monsterHealthy = 0;
        this.playerHealthy = 0;
        this.isGameOver = true;
      } else if (value <= 0) {
        this.playerHealthy = 0;
        this.isPlayerWin = false;
        this.isGameOver = true;
      }
    }
  },
  computed: {
    monsterHealthyStyle() {
      return { width: this.monsterHealthy + "%" };
    },
    playerHealthyStyle() {
      return { width: this.playerHealthy + "%" };
    }
  },
  methods: {
    restart() {
      this.monsterHealthy = 100;
      this.playerHealthy = 100;
      this.countRound = 0;
      this.isDraw = false;
      this.isGameOver = false;
      this.isPlayerWin = false;
      this.battleLogs = [];
    },
    composeBattleLogText(who, action, value) {
      this.battleLogs.unshift({
        attactBy: who,
        attactAction: action,
        value: value
      });
    },
    attackPlayer() {
      const attackValue = randomValue(20, 10);
      this.playerHealthy -= attackValue;
      const log = this.composeBattleLogText("Monster", "attack", attackValue);
    },
    attackMonster() {
      this.countRound++;
      const attackValue = randomValue(10, 5);
      this.monsterHealthy -= attackValue;
      const log = this.composeBattleLogText("You", "attack", attackValue);
      this.attackPlayer();
    },
    specialAttackMonster() {
      this.countRound++;
      const attackValue = randomValue(30, 5);
      this.monsterHealthy -= attackValue;
      const log = this.composeBattleLogText("You", "attack", attackValue);
      this.attackPlayer();
    },
    healPlayer() {
      this.countRound++;
      const healValue = randomValue(20, 10);
      if (this.playerHealthy + healValue >= 100) {
        this.playerHealthy = 100;
      } else {
        this.playerHealthy += healValue;
      }
      const log = this.composeBattleLogText("You", "heal", healValue);
      this.attackPlayer();
    },
    surrender() {
      this.playerHealthy = 0;

      const log = this.composeBattleLogText("You", "attack", "100%");
    }
  }
}).mount("#game");
