var chooseOption = (indexedArray) => {
    let randomIndex = Math.floor(Math.random() * indexedArray.length);
    return indexedArray[randomIndex];
}

const ROCK = "rock";
const PAPER = "paper";
const SCISSORS = "scissors";

const options = new Set([ ROCK, PAPER, SCISSORS ]);

class RockPaperScissors extends TextGame {

    chooseNextPlay() {
        //inefficient at scale but it's fine for a small example like this
        this.computerChoice = chooseOption([...options]);
    }

    constructor(containerElement) {
        super(containerElement);
        this.chooseNextPlay();
        this.computerScore = 0;
        this.playerScore = 0;
        
        this.addLine("Welcome to Rock, Paper, Scissors!");
        this.showPrompt();
    }

    showPrompt() {
        if ( this.computerScore || this.playerScore ) {
            this.addLine("Player: " + this.playerScore + " Computer: " + this.computerScore);
        }
        this.addLine("Choose your move:")
    }
    
    playerWinsWhen(playerWon) {
        if(playerWon) {
            this.addLine("Player won!");
            this.playerScore += 1;
        } else {
            this.addLine("Computer won!");
            this.computerScore += 1;
        }
    }

    handleInput(input) {
        this.addLine(input);
        let playerChoice = input.toLowerCase();
        if ( ! options.has(playerChoice) ) {
            this.addLine("'" + playerChoice + "' is not a valid move.");
        } else {
            this.addLine("Player chose " + playerChoice + ", Computer chose " + this.computerChoice);

            if ( playerChoice === this.computerChoice ) {
                this.addLine("DRAW!");
            }
            
            else { // someone will win.

                if ( this.computerChoice === ROCK ) {
                    this.playerWinsWhen(playerChoice === PAPER);
                } else if ( this.computerChoice === PAPER) {
                    this.playerWinsWhen(playerChoice === SCISSORS);
                
                } else { // computer chose scissors
                    this.playerWinsWhen(playerChoice === ROCK);
                }

            }
            this.chooseNextPlay();
            this.showPrompt();
 
        }
   }
}
const game = new RockPaperScissors(document.body);
