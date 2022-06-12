const display = document.querySelector('.display-text')
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
            errorMsg()
    }
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

    //Error message in the history log if something goes wrong
    function errorMsg() {
        const error = document.createElement('li')

        error.classList.add('error-msg')
        error.textContent = 'Error during operation'

        history.appendChild(error)
    }
}

function buttonPresses() {
    getNumberPress()
    backSpaceNum()
    allClear()
    positiveNegative()
    getOperator()
}

//Change operator value to the last clicked operator
function getOperator() {
    const operatorButtons = document.querySelectorAll('.operator')

    operatorButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if(!(prevOperand == '')) calcOperation()
            changeOperator(e)
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

//Clears currentOp, prevOp, and operand. Displays 0
function allClear() {
    const acBtn = document.querySelector('.ac')

    acBtn.addEventListener('click', () => {
        display.textContent = '0'
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