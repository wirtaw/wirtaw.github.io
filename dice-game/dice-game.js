import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

class DiceGame extends LitElement {
  static properties = {
    dice: { type: Array },
    currentScore: { type: Number },
    totalScore: { type: Number },
    isRolling: { type: Boolean },
    view: { type: String } // 'menu', 'game', 'rules'
  };

  constructor() {
    super();
    this.view = 'menu';
    this.dice = [1, 1, 1, 1, 1];
    this.currentScore = 0;
    this.isRolling = false;
    
    // Load score from storage or default to 0
    const savedScore = localStorage.getItem('dice-game-total');
    this.totalScore = savedScore ? parseInt(savedScore) : 0;
  }

  createRenderRoot() {
    return this;
  }

  calculateScore(dice) {
    let points = 0;
    const count = (val) => dice.filter(item => item === val).length;

    // Logic for 1s
    const ones = count(1);
    if (ones === 3) points += 1000;
    else if (ones === 1) points += 100;
    else if (ones === 2) points += 200;
    else if (ones === 4) points += 1100;
    else if (ones === 5) points += 1200;

    // Logic for others
    if (count(6) === 3) points += 600;
    if (count(4) === 3) points += 400;
    if (count(3) === 3) points += 300;
    if (count(2) === 3) points += 200;

    // Logic for 5s
    const fives = count(5);
    if (fives === 3) points += 500;
    else if (fives === 1) points += 50;
    else if (fives === 2) points += 100;

    return points;
  }

  rollDice() {
    this.isRolling = true;
    setTimeout(() => {
      this.dice = this.dice.map(() => Math.floor(Math.random() * 6) + 1);
      this.currentScore = this.calculateScore(this.dice);
      this.totalScore += this.currentScore;
      
      // Persist score
      localStorage.setItem('dice-game-total', this.totalScore);
      this.isRolling = false;
    }, 300);
  }

  resetGame() {
    if(confirm("Are you sure you want to reset your total score to zero?")) {
        this.totalScore = 0;
        this.currentScore = 0;
        localStorage.removeItem('dice-game-total');
        this.view = 'menu';
    }
  }

  renderMenu() {
    return html`
      <div class="flex flex-col gap-4">
        <h1 class="text-4xl font-black text-indigo-600 mb-2">GREED DICE</h1>
        <p class="text-slate-500 mb-6">Current Total: <span class="font-bold text-slate-800">${this.totalScore}</span></p>
        <button @click="${() => this.view = 'game'}" class="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold shadow-lg hover:bg-indigo-700 transition">Play Game</button>
        <button @click="${() => this.view = 'rules'}" class="w-full py-4 bg-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-300 transition">How to Play</button>
        ${this.totalScore > 0 ? html`
            <button @click="${this.resetGame}" class="text-red-400 text-sm mt-4 hover:text-red-600">Reset All Progress</button>
        ` : ''}
      </div>
    `;
  }

  renderRules() {
    return html`
      <div>
        <h2 class="text-2xl font-bold mb-4 text-slate-800">Scoring Rules</h2>
        <div class="text-left text-sm text-slate-600 space-y-2 mb-6">
          <p>• <strong>Three 1s</strong> = 1000 pts</p>
          <p>• <strong>Single 1</strong> = 100 pts</p>
          <p>• <strong>Three 6s/4s/3s/2s</strong> = Face Value x 100</p>
          <p>• <strong>Three 5s</strong> = 500 pts</p>
          <p>• <strong>Single 5</strong> = 50 pts</p>
          <p class="italic pt-2">Accumulate points by rolling 5 dice at once!</p>
        </div>
        <button @click="${() => this.view = 'menu'}" class="w-full py-3 bg-slate-800 text-white rounded-lg font-bold">Back to Menu</button>
      </div>
    `;
  }

  renderGame() {
    return html`
      <div>
        <div class="flex justify-between items-center mb-6">
            <button @click="${() => this.view = 'menu'}" class="text-indigo-600 font-bold">← Menu</button>
            <span class="text-slate-400 text-xs font-mono">Total: ${this.totalScore}</span>
        </div>
        
        <div class="flex justify-center gap-2 mb-8">
          ${this.dice.map(val => html`
            <div class="w-12 h-12 flex items-center justify-center bg-indigo-600 text-white text-xl font-bold rounded-lg shadow-md ${this.isRolling ? 'animate-bounce' : ''}">
              ${val}
            </div>
          `)}
        </div>

        <div class="bg-indigo-50 p-4 rounded-xl mb-6">
          <p class="text-indigo-400 text-xs uppercase font-bold tracking-widest">Points Gained</p>
          <p class="text-4xl font-black text-indigo-700">+${this.currentScore}</p>
        </div>

        <button 
          @click="${this.rollDice}"
          ?disabled="${this.isRolling}"
          class="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-indigo-200 shadow-xl transition-all active:scale-95 disabled:opacity-50"
        >
          ${this.isRolling ? 'Rolling...' : 'ROLL DICE'}
        </button>
      </div>
    `;
  }

  render() {
    return html`
      <div class="bg-white p-8 rounded-3xl shadow-2xl max-w-sm w-full text-center border border-slate-100">
        ${this.view === 'menu' ? this.renderMenu() : ''}
        ${this.view === 'game' ? this.renderGame() : ''}
        ${this.view === 'rules' ? this.renderRules() : ''}
      </div>
    `;
  }
}

customElements.define('dice-game', DiceGame);