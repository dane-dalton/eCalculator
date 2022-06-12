const display = document.querySelector('.display-text')
const previousDisplay = document.querySelector('.prev-display')
const previousOperator = document.querySelector('.operator-display')
const history = document.querySelector('.history-content ul')

display.textContent = '0'

let operator
let prevOperand = ''
let currOperand = ''

buttonPresses()

function calcOperation() {

    currOperand = display.textContent

    currNum = parseFloat(currOperand)
    prevNum = parseFloat(prevOperand)

    console.log(currNum, prevNum)
    
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
            removeLastMessage()
    }
    
    showHistory()
    currOperand = display.textContent
    prevOperand = ''

    //Rounds decimal place if it exists
    function roundOutput() {
        if (display.textContent.includes('.')){
            display.textContent = parseFloat(display.textContent).toFixed(3)

            while ( display.textContent[display.textContent.length - 1] == '0' || display.textContent[display.textContent.length - 1] == '.') {
                display.textContent = display.textContent.slice(0, -1)
            }
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

function buttonPresses() {
    getNumberPress()
    backSpaceNum()
    allClear()
    positiveNegative()
    getOperator()
    equals()
}

function showHistory() {
    const historyMsg = document.createElement('li')

    //Add history msg
    historyMsg.classList.add('history-msg')
    historyMsg.textContent = `${prevOperand} ${operator} ${currOperand} = ${display.textContent}`

    history.insertBefore(historyMsg, history.firstChild)

    removeLastMessage()
}

//Removes last message if gt 5
function removeLastMessage() {
    if ( history.children.length > 4 ) {
        history.removeChild(history.lastChild)
    }
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
            console.log(prevOperand)
        })
    })

    function changeOperator(e) {
        operator = ''
        operator = e.target.textContent
        console.log(operator)
    }
    function newOperand() {
        prevOperand = display.textContent
        display.textContent = '0'
    }
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
                errorMsg(tooMany)
                return
            }

            if (display.textContent.includes('.') && e.target.textContent.includes('.')) return

            //Replaces the placeholder value
            if (display.textContent == '0') return display.textContent = e.target.textContent

            display.textContent += e.target.textContent
        })
    })
}


// function operation(prevOperand, currOperand, operator) {
//     const output = prevOperand operator currOperand

//     currOperand = output


// }