class Calculator {
    constructor () {
        this.screen = document.getElementById('screen-content');
        this.btnContainer = document.getElementById('main-btns');
        this.currentExpression = '';
        this.history = [];
        this.events();
    }

    events () {
        this.btnContainer.addEventListener('click', (event) => {
            this.handleInput(event.target.value);
        });
    }

    handleInput (value) {
        switch (value) {
            case 'c':
                this.clear();
                break;
            case 'ce':
                this.clearEntry();
                break;
            case '=':
                this.evaluateExpression();
                break;
            default:
                this.buildExpression(value);
                break;
        }
    }

    buildExpression (value) {
        // the value being stored in the expression string is a symbol add spaces on either side
        //  formatting for readability and maintaining the ability to eval the string
        if (!/\d|[.]/.test(value)) {
            this.currentExpression += ` ${value} `;
        } else {
            this.currentExpression += value;
        }
        // call the update screen function as we build the expression to give user feedback
        this.updateScreen(this.currentExpression);
    }

    evaluateExpression () {
        // evalute the string to find the answer to the equation
        const answer = eval(this.currentExpression);
        // pass the value to show answer so we can display the final equation on the front-end
        this.showAnser(answer);
        // set the current expression to the answer to allow for further mathematical manipulation of the resulting value
        this.setExpression(answer);
    }

    setExpression (answer = '') {
        this.currentExpression = answer;
    }

    updateScreen(input = this.currentExpression) {
        // set the text content of the calculator's screen
        this.screen.textContent = input;
    }

    showAnser (value) {
        // create a formatted version of the answer, if the there are more than 6 decimal places round down
        const formatted = value.toString().length > 7 ? value.toFixed(6) : value;
        // display answer with equals sign on front-end
        this.screen.textContent += ` = ${formatted}`;
        // set history to store the final value and expression to allow for hisotry log
        this.setHistory(formatted);
    }

    setHistory (value = '') {
        const history = {
            expression: this.currentExpression += ` = ${value}`,
            value: value
        };
        // store the current value and expression in case we want to go back to it via clear entry
        this.history.push(history);
        console.log(this.history);
    }

    clear () {
        // clear the text content of teh screen and the values stored int eh current expression
        this.screen.textContent = '';
        this.setExpression();
    }

    clearEntry () {
        // if we have more than 1 number 
        if (this.currentExpression.length > 1) {
            let expression = this.currentExpression;
            // find the last number or symbol surrounded by spaces
            const i = expression.search(/\d{1}$| \W $/g);
            //  and cut it off our current expression
            this.currentExpression = expression.slice(0,i);
            this.updateScreen();
        // otherwise we have 1 number and can simply clear it
        } else {
            this.currentExpression = '';
            this.updateScreen();
        }
    }
}

export default Calculator;