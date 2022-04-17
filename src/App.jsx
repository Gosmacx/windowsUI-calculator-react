import { useState, useEffect } from 'react'
import './App.css'
import './buttons.css'
function App() {

  const [firstNumber, setFirst] = useState(null)
  const [secondNumber, setSecond] = useState(null)
  const [currentNumber, setNumber] = useState(0)
  const [result, setResult] = useState(null)
  const [currentOp, setOp] = useState(null)

  useEffect(() => {

    if (result && currentNumber) {
      setFirst(null)
      setSecond(null)
      setResult(null)
      setOp(null)
    } 


  }, [currentNumber])

  function math(first) {

    if (!currentOp) return null;

    let _result;

    switch (currentOp) {
      //       Add Operator //
      case '+':
        _result = parseInt(first) + parseInt(currentNumber)
        break;

      //       Subtract Operator //
      case '-':

        _result = parseInt(first) - parseInt(currentNumber)

        break;

      //       Multiply Operator //
      case '*':
        _result = parseInt(first) * parseInt(currentNumber)
        break;

      //       Divide Operator //
      case '/':
        _result = parseInt(first) / parseInt(currentNumber)

        break;
    }

    return _result

  }

  const clear = () => {
    setFirst(null)
    setSecond(null)
    setResult(null)
    setOp(null)
    setNumber(0)
  }

  const getResult = async (num) => {
    if (!currentOp || !currentNumber) return

    let _firstNumber;
    
    // İf already have a result calculate again the result with current number
    if (result) {
      setFirst(num)
      _firstNumber = num
    } else {
      _firstNumber = firstNumber
    }

    setSecond(currentNumber) // Operator finished so we can set second number to show on screen
    setResult(math(_firstNumber)) // Finally set result

  }

  const operatorChanger = (op) => {
    if (!currentNumber) return;
    setOp(op) // Change the operator

    if (!firstNumber) setFirst(currentNumber) // If there is no first number, set it to the current number

    // If there is a result, prepare for the next calculation
    if (result) {
      setFirst(result) 
      setSecond(null)
      setResult(null)
    }

    // if have two number calculate the result
    if (firstNumber && currentNumber) {
      setNumber(math(firstNumber))
      setFirst(math(firstNumber))
    }

    setNumber(0) // Reset the current number for the next number
  }
  
  const typeNumber = (num) => {

    if (!parseInt(num) && num !== 0) return;
    // if dont there is a result, type number to the current number else type number to the new number
    if (!result) setNumber(old => old ? String(old) + String(num) : num);
    else setNumber(num);
  }

  const backspace = (current) => {
    setNumber(() => {
      if (current.length == 1 || current == 0) return 0
      else return current.slice(0, -1)
    })
  }

  return (
    <div className="App">
      <div className='container' >

        <div className="topBar">
          <span>Hesap Makinesi</span>
          <div className='controls' >
            <button>-</button>
            <button>▢</button>
            <button className='close' >x</button>
          </div>
        </div>

        <div className="screen">
          <span className='operators' >
            {result ? firstNumber + ` ${currentOp} ` + secondNumber + ' =' : currentOp ? firstNumber + ` ${currentOp}` : ''  }
          </span>
          <span className='currentNumber' > { result ? result : currentNumber } </span>
        </div>

        <div className="keys">

          <div id='leftBox' >

            <div className='keyBox' >
              <button className='key thin opacity' >%</button>
              <button onClick={clear} className='key thin opacity' >CE</button>
              <button onClick={clear} className='key thin opacity' >C</button>
              <button className='key thin opacity' >.</button>
              <button className='key thin opacity' >x²</button>
              <button className='key thin opacity' >√x</button>
            </div>

            <div className="keyBox">
            {
              [7, 8, 9, 4, 5, 6, 1, 2, 3, '.', 0, ','].map((number, index) =>
                <button 
                onClick={() => typeNumber(number)}
                className='key' 
                key={index} > 
                  {number} 
                </button>
              )
            }
            </div>

          </div>

          <div id='rightBox' className='operators' >
              <button onClick={() => backspace(currentNumber)} className='key thin large opacity' >⌫</button>
              <button onClick={() => operatorChanger('/')} className='key thin large opacity size' >÷</button>
              <button onClick={() => operatorChanger('*')} className='key thin large opacity size' >X</button>
              <button onClick={() => operatorChanger('-')} className='key thin large opacity size' >-</button>
              <button onClick={() => operatorChanger('+')} className='key thin large opacity size' >+</button>
              <button onClick={() => getResult(result)} className='key thin large opacity size equal' >=</button>
          </div>

        </div>


      </div>
    </div>
  )
}

export default App
