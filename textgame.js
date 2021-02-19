
class TextGame {
    
    createUI() {
        var  textLogArea = document.createElement("OL");
        textLogArea.className += "text-display";

        this.textLogArea = textLogArea;
        this.containerElement.appendChild(textLogArea);
        
        var inputForm = document.createElement("form")
        inputForm.parentTextGame = this;
        inputForm.className += "game-repl-form";

        var promptElement = document.createElement("textarea");
        promptElement.spellcheck = false;

        inputForm.appendChild(promptElement);
        this.promptElement = promptElement;
        
        this.inputForm = inputForm;
        this.inputForm.promptElement = promptElement;

        this.containerElement.appendChild(inputForm);
    }

    constructor(containerElement) {

        this.containerElement = containerElement;
        containerElement.className += "game-container";
        
        //bind this object to the game so we can access it later.
        containerElement.controllingGame = this;

        this.createUI();
        
        // bind all pressing of the enter key to "submit" the text.
        this.inputForm.addEventListener("keypress",
            /* "this" keyword refers to the form in the context of the bound
             * function rather than the this in the local context as expected
             * in python lambdas. */ 

            function(event) {
                if (event.key == "Enter") {

                    event.preventDefault();
                    this.parentTextGame.addLine(
                        this.promptElement.value
                    );
                    this.promptElement.value = "";
                }
            }
        );

        /* make all click events within the parent element focus the textbox
        so it behaves like a terminal window without cursor support enabled. */

        containerElement.addEventListener("click",
            function(e) {
                containerElement.controllingGame.promptElement.focus();
            }

        );
        this.promptElement.focus();
    };

    
    addLine(message) {
        var newMessage = document.createElement("LI");
        newMessage.className = "text-message";
        newMessage.innerText = message;
        this.textLogArea.appendChild(newMessage);

    }

}

