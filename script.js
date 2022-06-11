const display = document.querySelector('.display-text')
const numButtons = document.querySelectorAll('.num')

let prevOperand = ''
let currOperand = display

getNumberPress()



//Number buttons go to the display on click
function getNumberPress() {
    numButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (display.textContent.includes('.') && e.target.textContent.includes('.')) return

            display.textContent += e.target.textContent
        })
    })
}


// function operation(prevOperand, currOperand, operator) {
//     const output = prevOperand operator currOperand

//     currOperand = output


// }