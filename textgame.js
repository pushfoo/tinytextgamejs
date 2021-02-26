/*
A tiny library to help i plement text games.

Subclass TextGame to use it. The baseclass only echoes what it recieves.

Additional classes and functions are also included to
speed up development of games.

*/
class TextGame {
    
    createUI() {
        var  textLogArea = document.createElement("OL");
        textLogArea.classList.add("text-display");

        this.textLogArea = textLogArea;
        this.containerElement.appendChild(textLogArea);
        
        var inputForm = document.createElement("form")
        inputForm.parentTextGame = this;
        inputForm.classList.add("game-repl-form");

        var promptElement = document.createElement("textarea");
        promptElement.spellcheck = false;

        inputForm.appendChild(promptElement);
        this.promptElement = promptElement;
        
        this.inputForm = inputForm;
        this.inputForm.promptElement = promptElement;

        this.containerElement.appendChild(inputForm);
    }

    // smooths over locking the input element against user interference
    set inputLocked(state) {
        this.promptElement.disabled = state;
    }
    
    // smooths checking whether the input element is currently locked
    get inputLocked() {
        return this.promptElement.disabled;
    }

    handleInput(inputLine) {
        /*
            User games should override this method when they subclass.
        */

        //by default, the behavior is to just be an echo prompt
        this.addLine(inputLine);
    }

    constructor(containerElement) {

        this.containerElement = containerElement;
        containerElement.classList.add("game-container");
        
        //bind this object to the game so we can access it later.
        containerElement.controllingGame = this;

        this.createUI();
        
        // bind all pressing of the enter key to "submit" the text.
        this.inputForm.addEventListener("keypress",
            /* "this" keyword refers to the form in the context of the bound
             * function rather than the this in the local context as expected
             * in python lambdas. */ 

            function(event) {
    
                if (event.key === "Enter") {
                    event.preventDefault();

                    let input = this.promptElement.value;
                    this.promptElement.value = "";

                    let game = this.parentTextGame;

                    game.inputLocked = true;
                    game.handleInput(input);
                    game.inputLocked = false;

                    //todo: for longer-running calls, this may not be a good idea.
                    this.promptElement.focus();
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
        newMessage.classList.add("text-message");
        newMessage.innerText = message;
        this.textLogArea.appendChild(newMessage);
    }

}

var chooseIndex = (indexedArray) => {
    //Choose a random index in the passed array and return it
    return Math.floor(Math.random() * indexedArray.length);
}


class ChoicePool extends Set {
    /*
    Extends basic set with choice-related functionality.

    Currently repackages an implementation of choices that
    was a quick hack. Future implementation details may change.
    */
    constructor(iterable) {
        if(iterable) {
            super(iterable);
        }
        else {
            super();
        }
        this._rebuildArrayCache();
    }

    _rebuildArrayCache() {
        this._arrayCache = [...this];
    }

    add(elt) { 
        if(! this.has(elt)) {
            Set.prototype.add.call(this, elt);
            this._rebuildArrayCache();
        }
    }

    delete(elt) {
        if( this.has(elt) ) {
            Set.prototype.delete.call(this, elt);
            this._rebuildArrayCache();
        }
    }

    choose() {
        return this._arrayCache[chooseIndex(this._arrayCache)];
    }
}
