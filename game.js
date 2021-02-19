
class Game {
    
    createUI() {
        var  textLogArea = document.createElement("OL");
        textLogArea.className = "text-display";
        this.textLogArea = textLogArea;
        this.containerElement.appendChild(textLogArea);
        
        var inputForm = document.createElement("form")
        inputForm.parentGame = this;

        var textInput = document.createElement("textarea");
        //todo: look into whether there's an analog of dictionary updates in JS
        textInput.id = "gameTextInput";

        inputForm.appendChild(textInput);
        this.textInput = textInput;
        
        this.inputForm = inputForm;
        this.inputForm.textInput = textInput;

        this.containerElement.appendChild(inputForm);
    }

    constructor(containerElement) {
        this.containerElement = containerElement;
        this.createUI();
        //todo: fix this?
        this.inputForm.addEventListener("keypress",

            //"this" keyword refers to the form in the context of the bound
            //function rather than the this in the local context as expected
            //in python lambdas.
            function(event) {
                if (event.key == "Enter") {

                    event.preventDefault();
                    this.parentGame.addMessage(
                        this.textInput.value
                    );
                    this.textInput.value = "";
                }
            });
    };

    
    addMessage(message) {
        var newMessage = document.createElement("LI");
        newMessage.className = "text-message";
        newMessage.innerText = message;
        this.textLogArea.appendChild(newMessage);

    }

}


game = new Game(document.getElementById('game'));
document.addEventListener("click", 
    function() {
       game.textInput.focus();
    }
);

game.addMessage("");
