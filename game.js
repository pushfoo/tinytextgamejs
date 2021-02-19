
class TextGame {
    
    createUI() {
        var  textLogArea = document.createElement("OL");
        textLogArea.className = "text-display";
        this.textLogArea = textLogArea;
        this.containerElement.appendChild(textLogArea);
        
        var inputForm = document.createElement("form")
        inputForm.parentTextGame = this;

        var promptElement = document.createElement("textarea");
        promptElement.className = "gameTextInput";

        inputForm.appendChild(promptElement);
        this.promptElement = promptElement;
        
        this.inputForm = inputForm;
        this.inputForm.promptElement = promptElement;

        this.containerElement.appendChild(inputForm);
    }

    constructor(containerElement) {

        this.containerElement = containerElement;
        //bind this object to the game so we can access it later.
        containerElement.controllingGame = this;

        this.createUI();

        this.inputForm.addEventListener("keypress",

            //"this" keyword refers to the form in the context of the bound
            //function rather than the this in the local context as expected
            //in python lambdas.
            function(event) {
                if (event.key == "Enter") {

                    event.preventDefault();
                    this.parentTextGame.addMessage(
                        this.promptElement.value
                    );
                    this.promptElement.value = "";
                }
            }
        );
    };

    
    addMessage(message) {
        var newMessage = document.createElement("LI");
        newMessage.className = "text-message";
        newMessage.innerText = message;
        this.textLogArea.appendChild(newMessage);

    }

}


game = new TextGame(document.getElementById('game'));
document.addEventListener("click", 
    function() {
       game.promptElement.focus();
    }
);

game.addMessage("");
