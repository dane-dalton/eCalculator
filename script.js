const display = document.querySelector('.display-text')

let operand = ''
let prevOperand = ''
let currOperand = display

buttonPresses()


function buttonPresses() {
    getNumberPress()
    backSpaceNum()
    allClear()
    positiveNegative()
    getOperand()
}

function getOperand() {
    const operandButtons = document.querySelectorAll('.operand')

    operandButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            operand = ''
            operand = e.target.textContent
            console.log(operand)
        })
    })
}

//Allows for pos/neg change in current value
function positiveNegative() {
    const posNeg = document.querySelector('.pos-neg')

    posNeg.addEventListener('click', () => {
        if (display.textContent.includes('-')) return display.textContent = display.textContent.slice(1)

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