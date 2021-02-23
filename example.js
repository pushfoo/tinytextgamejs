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
    
    playerWinsWhen(winCondition) {
        if(winCondition) {
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
                switch(this.computerChoice) {
                    
                    case ROCK: 
                        this.playerWinsWhen(playerChoice === PAPER);
                        break;
                        
                    case PAPER:
                        this.playerWinsWhen(playerChoice === SCISSORS);
                        break;
                    
                    case SCISSORS:
                        this.playerWinsWhen(playerChoice === ROCK);
                        break;

                    default:
                        this.addLine("Something impossible happened.");

                }

            }
            this.chooseNextPlay();
            this.showPrompt();
 
        }
   }
}
const game = new RockPaperScissors(document.body);
