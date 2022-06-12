const display = document.querySelector('.display-text')
const previousDisplay = document.querySelector('.prev-display')
const previousOperator = document.querySelector('.operator-display')
const history = document.querySelector('.history-content ul')

let operator = ''
let prevOperand = ''
let currOperand = ''
display.textContent = '0'

buttonPresses()

//Ordered from top to bottom
function buttonPresses() {
    //calcOperation()
    calcSpecial()
    //round()
    //messages() x3
    getOperator()
    equals()
    positiveNegative()
    allClear()
    backSpaceNum()
    getNumberPress()
}


function calcOperation() {
    currOperand = display.textContent
    currNum = parseFloat(currOperand)
    prevNum = parseFloat(prevOperand)
    
    switch (operator) {
        case '+': 
            display.textContent = prevNum + currNum
            roundOutput()
            break;
        case '-':
            display.textContent = prevNum - currNum
            roundOutput()
            break;
        case '*': 
            display.textContent = prevNum * currNum
            roundOutput()
            break;
        case '/':
            display.textContent = prevNum / currNum
            roundOutput()
            break;
        default:
            display.textContent = '0'
            const goneWrong = 'Something went wrong. Try refreshing'
            errorMsg(goneWrong)
    }
    showHistory()
    currOperand = display.textContent
    prevOperand = ''
}

function calcSpecial() {
    const specialButtons = document.querySelectorAll('.special')

    specialButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (!(prevOperand == '')) {
                const singleNum = 'You are currently operating on another number'
                return errorMsg(singleNum)
            }
            currOperand = display.textContent
            currNum = parseFloat(currOperand)

            switch (e.target.textContent) {
                case 'x2':
                    display.textContent = currNum ** 2
                    roundOutput()
                    break;
                case 'x3':
                    display.textContent = currNum ** 3
                    roundOutput()
                    break;
                case '√x':
                    display.textContent = Math.sqrt(currNum)
                    roundOutput()
                    break;
                case 'x!':
                    if ( !(Number.isInteger(currNum) && currNum >= 0) ) {
                        const noFactorial = 'Factorial can only be calculated on positive integers'
                        return errorMsg(noFactorial)
                    }
                    display.textContent = factorial(currNum)
                    roundOutput()
                    break;
                default:
                    display.textContent = '0'
                    const goneWrong = 'Something went wrong. Try refreshing'
                    errorMsg(goneWrong)
            }
            showHistory(e.target.textContent)
            currOperand = display.textContent

            function factorial(num) {
                if (num === 0) return 1;
                let product = 1;
                for (let i = num; i > 0; i--) {
                    product *= i;
                }
              return product;
            }
        })
    })
}



//Rounds decimal place if it exists
function roundOutput() {
    if (display.textContent.includes('.')){
        display.textContent = parseFloat(display.textContent).toFixed(3)

        while ( display.textContent[display.textContent.length - 1] == '0' || display.textContent[display.textContent.length - 1] == '.') {
            display.textContent = display.textContent.slice(0, -1)
        }
    } 
}

//Error message in the history log if something goes wrong
function errorMsg(msg) {
    const error = document.createElement('li')

    error.classList.add('error-msg')
    error.textContent = `${msg}`

    history.insertBefore(error, history.firstChild)

    removeLastMessage()
}

function showHistory(special = '') {
    const historyMsg = document.createElement('li')

    //Add history msg
    historyMsg.classList.add('history-msg')
    historyMsg.textContent = `${prevOperand} ${operator} ${currOperand} ${special} = ${display.textContent}`

    history.insertBefore(historyMsg, history.firstChild)
    removeLastMessage()
}

//Removes last message if gt 5
function removeLastMessage() {
    if ( history.children.length > 4 ) history.removeChild(history.lastChild)
}


//Change operator value to the last clicked operator
function getOperator() {
    const operatorButtons = document.querySelectorAll('.operator')

    operatorButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if(!(prevOperand == '')) calcOperation()

            changeOperator(e)
            previousDisplay.textContent = display.textContent
            previousOperator.textContent = operator
            newOperand()
        })
    })

    function changeOperator(e) {
        operator = ''
        operator = e.target.textContent
    }
    function newOperand() {
        prevOperand = display.textContent
        display.textContent = '0'
    }
}

function equals() {
    const equalsBtn = document.querySelector('.equals')

    equalsBtn.addEventListener('click', () => {
        if(!(prevOperand == '')) calcOperation()

        display.textContent = currOperand
        operator = ''
        previousDisplay.textContent = '0'
        previousOperator.textContent = ''
    })
}

//Allows for pos/neg change in current value
function positiveNegative() {
    const posNeg = document.querySelector('.pos-neg')

    posNeg.addEventListener('click', () => {
        if (display.textContent.includes('-')) return display.textContent = display.textContent.slice(1)

        if(display.textContent == '0') return

        display.textContent = '-' + display.textContent
    })
}

//Clears currentOp, prevOp, and operand. Displays 0
function allClear() {
    const acBtn = document.querySelector('.ac')

    acBtn.addEventListener('click', () => {
        display.textContent = '0'
        previousDisplay.textContent = '0'
        previousOperator.textContent = ''
        prevOperand = ''
        currOperand = display.textContent
    })
}

//Deletes last integer in the number, leaves 0 as place holder if empty
function backSpaceNum() {
    const deleteBtn = document.querySelector('.del')
    
    deleteBtn.addEventListener('click', () => {
        display.textContent = display.textContent.slice(0, -1)
        if (display.textContent == '') display.textContent = '0'
    }) 
    
}

//Number buttons go to the display on click
function getNumberPress() {
    const numButtons = document.querySelectorAll('.num')

    numButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (display.textContent.length > 12) {
                const tooMany = 'Maximum length reached'
                return errorMsg(tooMany)
            }

            if (display.textContent.includes('.') && e.target.textContent.includes('.')) return

            //Replaces the placeholder value
            if (display.textContent == '0') return display.textContent = e.target.textContent

            display.textContent += e.target.textContent
        })
    })
}