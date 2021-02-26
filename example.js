/*
A simple example implementation of Rock, Paper, Scissors.

It subclasses TextGame and implements a new handleInput method. Users should 
do the same for their own games.

*/

const ROCK = "rock";
const PAPER = "paper";
const SCISSORS = "scissors";

const options = new ChoicePool([ ROCK, PAPER, SCISSORS ]);

var buildShorthandTable = (iterable) => { 
    /*
    Build table mapping short form -> full command.

    currently only uses the first character.
    */
    let table = {};

    iterable.forEach(command => { 
        table[command[0]] = command;
    });
    return table;
};

const shorthandTable = buildShorthandTable(options);


class RockPaperScissors extends TextGame {

    chooseNextPlay() {
        this.computerChoice = options.choose();
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

        //expand shorthand to full form
        if ( playerChoice in shorthandTable) {
            playerChoice = shorthandTable[playerChoice];
        }

        if ( ! options.has(playerChoice) ) {

            if (playerChoice === "clear") {
                this.clearLines();
            } else {
                this.addLine("'" + playerChoice + "' is not a valid move.");
            }

        } else {

            this.chooseNextPlay();
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
 
        }
        this.showPrompt();
   }
}
const game = new RockPaperScissors(document.body);
