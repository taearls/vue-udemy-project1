new Vue({
  el: '#app',
  data: {
    gameStarted: false,
    playerHealth: 100,
    monsterHealth: 100,
    playerTurnLogs: [],
    monsterTurnLogs: [],
    currentTurn: 1,
  },
  methods: {
    startGame: function() {
      this.gameStarted = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.playerTurnLogs = [];
      this.monsterTurnLogs = [];
    },
    checkTurn: function(playerChoice) {
      let playerTurn;
      if (playerChoice === 'attack') {
        playerTurn = this.attack;
      } else if (playerChoice === 'specialAttack') {
        playerTurn = this.specialAttack;
      } else if (playerChoice === 'heal') {
        playerTurn = this.heal;
      }
      const whoseTurn = Math.ceil(Math.random() * 2);
      if (whoseTurn === 1) {
        this.monsterAttack();
        if (!this.checkGameOver()) {
          playerTurn();
        } else {
          return;
        }
      } else {
        playerTurn();
        if (!this.checkGameOver()){
          this.monsterAttack();
        } else {
          return;
        }
      }
      this.checkGameOver();
      this.currentTurn++;
    },
    attack: function() {
      const attack = this.calculateDamage(3, 10);
      if (this.monsterHealth - attack < 0) {
        this.monsterHealth = 0;
      } else {
        this.monsterHealth -= attack;
      }
      this.playerTurnLogs.push(`Player hits Monster for ${attack}!`);
    },
    specialAttack: function() {
      const specialAttackHit = Math.ceil(Math.random() * 5);
      if (specialAttackHit <= 3) {
        const specialAttack = this.calculateDamage(8, 15);
        if (this.monsterHealth - specialAttack < 0) {
          this.monsterHealth = 0;
        } else {
          this.monsterHealth -= specialAttack;
        }
        this.playerTurnLogs.push(`Player hits Monster for ${specialAttack}!`);
      } else {
        this.playerTurnLogs.push(`Player's special attack missed!`);
      }
    },
    monsterAttack: function() {
      const monsterAttack = this.calculateDamage(6, 13);
      if (this.playerHealth - monsterAttack < 0) {
        this.playerHealth = 0;
      } else {
        this.playerHealth -= monsterAttack;        
      }
      this.monsterTurnLogs.push(`Monster hits Player for ${monsterAttack}!`);
    },
    heal: function() {
      const healAmount = this.calculateDamage(3, 10);
      if (this.playerHealth + healAmount > 100) {
        this.playerHealth = 100;
        this.playerTurnLogs.push(`Player returns to full heatlh.`);
      } else {
        this.playerHealth += healAmount;
        this.playerTurnLogs.push(`Player recovers ${healAmount} health.`);
      }
    },
    checkGameOver: function() {
      if (this.monsterHealth <= 0) {
        alert('Player wins!');
        this.resetGame();
        return true;
      } else if (this.playerHealth <= 0) {
        alert('Player loses.');
        this.resetGame();
        return true;
      }
      return false;
    },
    giveUp: function() {
      alert('Player gave up.');
      this.resetGame();
    },
    resetGame: function() {
      this.gameStarted = false;
    },
    calculateDamage: function(min, max) {
      return Math.max(Math.ceil(Math.random() * max, min));
    },
  },
});