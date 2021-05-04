// This is the result variable that will be displayed
let runningTotal = 0;

// This is the variable you'll see anytime you try to make mathematics calculations
let buffer = "0";

// This is the variable you'll use to set an operator
let previousOperator = null;

// This is where the variable will show the runningTotal result
const screen = document.querySelector( ".screen" );

const error = "Math Error";

// Here we have where all the buttons will have their functionality
document
    .querySelector( ".calc-buttons" )
    .addEventListener(
        "click",
        function( event ) {
            buttonClick( event.target.innerText );
        }
    );

// Here we'll see if we are looking for a math symbol or a number
function buttonClick ( value ) {
    if ( isNaN( parseInt( value ) ) ) {
        handleSymbol ( value );
    } else {
        handleNumber ( value );
    }
    reRender();
}

// This function will set the math symbol we want to use
function handleSymbol ( value ) {
    switch ( value ) {
        // This will reset all the values to the ones we had at the beginning
        case "C":
            buffer = "0";
            runningTotal = 0;
            previousOperator = null;
            break;
        // This will show the calculation we have done
        case "=":
            if ( previousOperator === null ) {
                return;
            }

            flushOperation( parseInt( buffer ) );
            previousOperator = null;
            buffer = "" + runningTotal;
            runningTotal = 0;
            break;
        // This will delete the very last digit we have entered before, one by one.
        case "←":
            if ( buffer.length === 1 ) {
                buffer = "0";
            } else {
                buffer = buffer.substring( 0, buffer.length - 1 );
            }
            break;
        // If not, there is not going to be any result, just the same value we have entered
        default:
            handleMath( value );
            break;
    }
}

// This function will set the numbers we'll be clicking
// If we click more than once, they will add the number next to the previous one, and on.
function handleNumber ( value ) {
    if ( buffer === "0" ) {
        buffer = value;
    } else {
        buffer += value;
    }
}

// This will set the screen to 0, if we want to make the calculation and then
// we click another number
function handleMath ( value ) {
    const intBuffer = parseInt( buffer );
    if ( runningTotal === 0 ) {
        runningTotal = intBuffer;
    } else {
        flushOperation( intBuffer );
    }

    previousOperator = value;

    buffer = "0";
}

// Here we have the magic of the calculator
// This is how the calculator will have the 4
// basic arithmetic operations
function flushOperation ( intBuffer ) {
    if ( previousOperator === "+" ) {
        runningTotal += intBuffer;
    } else if ( previousOperator === "-" ) {
        runningTotal -= intBuffer;
    } else if ( previousOperator === "×" ) {
        runningTotal *= intBuffer;
    } else {
        if ( intBuffer === 0 ) {
            runningTotal = "Math ERROR";
        } else {
            runningTotal /= intBuffer;
        }
    }
}

// This function will render the values we click since the buttonClick function
function reRender () {
    screen.innerText = buffer;
}