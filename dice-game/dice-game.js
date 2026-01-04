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
    gameOver: { type: Boolean },
    history: { type: Array }
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
    this.loadHistory();
  }

  loadHistory() {
    this.history = JSON.parse(localStorage.getItem('game-history') || '[]');
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
            ${this.dice.map(val => this.renderDie(val))}
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

  renderDie(value) {
    // 9-cell grid mapping (3x3). 1 = dot, 0 = empty.
    const patterns = {
      1: [0,0,0, 0,1,0, 0,0,0],
      2: [1,0,0, 0,0,0, 0,0,1],
      3: [1,0,0, 0,1,0, 0,0,1],
      4: [1,0,1, 0,0,0, 1,0,1],
      5: [1,0,1, 0,1,0, 1,0,1],
      6: [1,0,1, 1,0,1, 1,0,1]
    };

    const cells = patterns[value] || patterns[1];

    return html`
      <div class="w-16 h-16 bg-white rounded-xl shadow-lg border-2 border-slate-200 grid grid-cols-3 grid-rows-3 p-2 gap-0.5 ${this.isRolling ? 'animate-bounce' : ''}">
        ${cells.map(hasDot => html`
          <div class="w-full h-full flex items-center justify-center">
            ${hasDot ? html`<div class="w-2.5 h-2.5 bg-indigo-600 rounded-full shadow-sm"></div>` : ''}
          </div>
        `)}
      </div>
    `;
  }

  renderHistory() {
    if (!this.history || this.history.length === 0) return '';
    return html`
      <div class="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-100">
        <h3 class="text-xs font-bold text-slate-400 uppercase mb-3">Match History</h3>
        <div class="space-y-2">
          ${this.history.slice().reverse().map(game => html`
            <div class="flex justify-between items-center text-xs border-b border-slate-200 pb-2 last:border-0 last:pb-0">
              <div>
                <span class="font-bold text-slate-600">${game.winner}</span>
                <span class="text-slate-400 block text-[10px]">${game.date}</span>
              </div>
              <div class="text-right">
                ${game.scores.map(s => html`<div class="text-slate-500">${s}</div>`)}
              </div>
            </div>
          `)}
        </div>
      </div>
    `;
  }

  render() {
    return html`
      <div class="bg-white p-8 rounded-[2rem] shadow-2xl max-w-sm w-full border border-slate-100">
        ${this.view === 'menu' ? html`
          <div class="space-y-4">
            <h1 class="text-5xl font-black text-indigo-600 italic">GREED</h1>
            ${this.renderHistory()}
            <button @click="${() => this.view = 'setup'}" class="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold shadow-lg">New Match</button>
            <button @click="${() => this.view = 'rules'}" class="w-full py-3 bg-slate-100 text-slate-600 rounded-xl font-semibold">Rules</button>
          </div>
        ` : ''}
        ${this.view === 'setup' ? this.renderSetup() : ''}
        ${this.view === 'game' ? this.renderGame() : ''}
        ${this.view === 'rules' ? html`
           <div class="text-left">
             <h2 class="text-xl font-bold mb-4">Scoring Rules</h2>
             <div class="space-y-3 text-sm text-slate-600 mb-6 overflow-y-auto max-h-64 pr-2">
               <div class="p-3 bg-slate-50 rounded-lg border border-slate-100">
                 <strong class="block text-indigo-600 mb-1">Single Dice</strong>
                 <div class="flex justify-between"><span>⚀ One</span> <span class="font-bold">100 pts</span></div>
                 <div class="flex justify-between"><span>⚄ Five</span> <span class="font-bold">50 pts</span></div>
               </div>
               
               <div class="p-3 bg-indigo-50 rounded-lg border border-indigo-100">
                 <strong class="block text-indigo-600 mb-1">Three of a Kind</strong>
                 <div class="flex justify-between"><span>⚀⚀⚀ Ones</span> <span class="font-bold">1000 pts</span></div>
                 <div class="flex justify-between"><span>⚅⚅⚅ Sixes</span> <span class="font-bold">600 pts</span></div>
                 <div class="flex justify-between"><span>⚄⚄⚄ Fives</span> <span class="font-bold">500 pts</span></div>
                 <div class="flex justify-between"><span>⚃⚃⚃ Fours</span> <span class="font-bold">400 pts</span></div>
                 <div class="flex justify-between"><span>⚂⚂⚂ Threes</span> <span class="font-bold">300 pts</span></div>
                 <div class="flex justify-between"><span>⚁⚁⚁ Twos</span> <span class="font-bold">200 pts</span></div>
               </div>

               <p class="text-xs text-slate-400 italic mt-2">
                 * Points accumulate. E.g., four 1s = 1000 (trip) + 100 (single) = 1100 pts.
               </p>
             </div>
             <button @click="${() => this.view = 'menu'}" class="w-full py-3 bg-slate-800 text-white rounded-xl">Back</button>
           </div>
        ` : ''}
      </div>
    `;
  }
}

customElements.define('dice-game', DiceGame);