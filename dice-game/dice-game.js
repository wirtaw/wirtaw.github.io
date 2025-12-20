import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

class DiceGame extends LitElement {
  static properties = {
    dice: { type: Array },
    currentScore: { type: Number },
    view: { type: String },
    players: { type: Array },
    currentPlayerIndex: { type: Number },
    currentRound: { type: Number },
    maxRounds: { type: Number },
    isRolling: { type: Boolean },
    gameOver: { type: Boolean }
  };

  constructor() {
    super();
    this.resetToDefaults();
  }

  resetToDefaults() {
    this.view = 'menu';
    this.dice = [1, 1, 1, 1, 1];
    this.currentScore = 0;
    this.players = [];
    this.currentPlayerIndex = 0;
    this.currentRound = 1;
    this.maxRounds = 5;
    this.isRolling = false;
    this.gameOver = false;
  }

  createRenderRoot() { return this; }

  // Logic to calculate points (Your original rules)
  calculateScore(dice) {
    let points = 0;
    const count = (val) => dice.filter(item => item === val).length;
    const ones = count(1);
    if (ones === 3) points += 1000;
    else if (ones === 1) points += 100;
    else if (ones === 2) points += 200;
    else if (ones === 4) points += 1100;
    else if (ones === 5) points += 1200;
    if (count(6) === 3) points += 600;
    if (count(4) === 3) points += 400;
    if (count(3) === 3) points += 300;
    if (count(2) === 3) points += 200;
    const fives = count(5);
    if (fives === 3) points += 500;
    else if (fives === 1) points += 50;
    else if (fives === 2) points += 100;
    return points;
  }

  setupGame(playerCount, isVsComputer, rounds) {
    this.maxRounds = rounds;
    this.players = [];
    
    // Add Human Player
    this.players.push({ id: 0, name: 'Player 1', score: 0, type: 'human' });
    
    // Add second player (Human or Computer)
    this.players.push({ 
      id: 1, 
      name: isVsComputer ? 'Computer' : 'Player 2', 
      score: 0, 
      type: isVsComputer ? 'computer' : 'human' 
    });

    this.view = 'game';
    this.checkComputerTurn();
  }

  rollDice() {
    if (this.isRolling || this.gameOver) return;
    
    this.isRolling = true;
    setTimeout(() => {
      this.dice = this.dice.map(() => Math.floor(Math.random() * 6) + 1);
      this.currentScore = this.calculateScore(this.dice);
      
      // Update Player Score
      const updatedPlayers = [...this.players];
      updatedPlayers[this.currentPlayerIndex].score += this.currentScore;
      this.players = updatedPlayers;

      this.isRolling = false;
      this.nextTurn();
    }, 800);
  }

  nextTurn() {
    if (this.currentPlayerIndex === this.players.length - 1) {
      if (this.currentRound >= this.maxRounds) {
        this.gameOver = true;
        this.saveToHistory();
        return;
      }
      this.currentRound++;
      this.currentPlayerIndex = 0;
    } else {
      this.currentPlayerIndex++;
    }
    this.checkComputerTurn();
  }

  checkComputerTurn() {
    const activePlayer = this.players[this.currentPlayerIndex];
    if (activePlayer && activePlayer.type === 'computer' && !this.gameOver) {
      setTimeout(() => this.rollDice(), 1500);
    }
  }

  saveToHistory() {
    const history = JSON.parse(localStorage.getItem('game-history') || '[]');
    history.push({
      date: new Date().toLocaleDateString(),
      winner: this.players[0].score > this.players[1].score ? this.players[0].name : this.players[1].name,
      scores: this.players.map(p => `${p.name}: ${p.score}`)
    });
    localStorage.setItem('game-history', JSON.stringify(history.slice(-5)));
  }

  renderSetup() {
    return html`
      <div class="space-y-6">
        <h2 class="text-2xl font-bold">Match Setup</h2>
        <div class="text-left space-y-4">
          <div>
            <label class="block text-xs font-bold text-slate-400 uppercase">Rounds</label>
            <select id="rounds" class="w-full p-2 border rounded">
              <option value="3">3 Rounds</option>
              <option value="5" selected>5 Rounds</option>
              <option value="10">10 Rounds</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-400 uppercase">Opponent</label>
            <select id="opponent" class="w-full p-2 border rounded">
              <option value="computer">Computer (AI)</option>
              <option value="human">Local Human</option>
            </select>
          </div>
        </div>
        <button 
          @click="${() => {
            const r = parseInt(this.querySelector('#rounds').value);
            const o = this.querySelector('#opponent').value === 'computer';
            this.setupGame(2, o, r);
          }}"
          class="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold"
        >
          Start Match
        </button>
      </div>
    `;
  }

  renderGame() {
    const activePlayer = this.players[this.currentPlayerIndex];
    return html`
      <div>
        <div class="flex justify-between text-xs font-bold text-slate-400 mb-4">
          <span>ROUND ${this.currentRound} / ${this.maxRounds}</span>
          <button @click="${() => this.resetToDefaults()}" class="text-red-400">Quit</button>
        </div>

        <div class="grid grid-cols-2 gap-2 mb-6">
          ${this.players.map((p, idx) => html`
            <div class="p-3 rounded-xl border-2 ${this.currentPlayerIndex === idx ? 'border-indigo-500 bg-indigo-50' : 'border-transparent bg-slate-50'}">
              <p class="text-[10px] uppercase">${p.name} ${p.type === 'computer' ? '🤖' : ''}</p>
              <p class="text-xl font-black">${p.score}</p>
            </div>
          `)}
        </div>

        ${this.gameOver ? html`
          <div class="py-10">
            <h2 class="text-3xl font-black text-indigo-600">Game Over!</h2>
            <p class="mb-6">Final Scores Recorded</p>
            <button @click="${() => this.resetToDefaults()}" class="w-full py-3 bg-slate-800 text-white rounded-xl">Main Menu</button>
          </div>
        ` : html`
          <div class="flex justify-center gap-2 mb-8">
            ${this.dice.map(val => html`
              <div class="w-12 h-12 flex items-center justify-center bg-indigo-600 text-white text-xl font-bold rounded-lg shadow-lg ${this.isRolling ? 'animate-bounce' : ''}">
                ${val}
              </div>
            `)}
          </div>
          
          <div class="mb-6">
            <p class="text-xs text-slate-400 font-bold uppercase">${activePlayer.name}'s Turn</p>
            <p class="text-2xl font-bold text-indigo-700">${this.isRolling ? 'Rolling...' : `Last Roll: +${this.currentScore}`}</p>
          </div>

          <button 
            @click="${this.rollDice}"
            ?disabled="${this.isRolling || activePlayer.type === 'computer'}"
            class="w-full py-4 bg-indigo-600 text-white font-black rounded-2xl disabled:opacity-50 transition-all active:scale-95 shadow-xl shadow-indigo-100"
          >
            ${activePlayer.type === 'computer' ? 'Computer is rolling...' : 'ROLL DICE'}
          </button>
        `}
      </div>
    `;
  }

  render() {
    return html`
      <div class="bg-white p-8 rounded-[2rem] shadow-2xl max-w-sm w-full border border-slate-100">
        ${this.view === 'menu' ? html`
          <div class="space-y-4">
            <h1 class="text-5xl font-black text-indigo-600 italic">GREED</h1>
            <button @click="${() => this.view = 'setup'}" class="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold shadow-lg">New Match</button>
            <button @click="${() => this.view = 'rules'}" class="w-full py-3 bg-slate-100 text-slate-600 rounded-xl font-semibold">Rules</button>
          </div>
        ` : ''}
        ${this.view === 'setup' ? this.renderSetup() : ''}
        ${this.view === 'game' ? this.renderGame() : ''}
        ${this.view === 'rules' ? html`
           <div class="text-left">
             <h2 class="text-xl font-bold mb-4">Quick Rules</h2>
             <p class="text-sm text-slate-600 mb-6">Roll 5 dice. Triples and 1s/5s give points. Highest score after all rounds wins!</p>
             <button @click="${() => this.view = 'menu'}" class="w-full py-3 bg-slate-800 text-white rounded-xl">Back</button>
           </div>
        ` : ''}
      </div>
    `;
  }
}

customElements.define('dice-game', DiceGame);