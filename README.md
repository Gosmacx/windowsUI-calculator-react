# How does the windowsUI-calculator  work


## State
```js
  const [firstNumber, setFirst] = useState(null)
  const [secondNumber, setSecond] = useState(null)
  const [currentNumber, setNumber] = useState(0)
  const [result, setResult] = useState(null)
  const [currentOp, setOp] = useState(null)
```

<br>
<br>

## currentNumber 
Yazdıklarımızı anlık olarak takip eden bir state'imiz var
ve bu state eğer result yoksa ekranda gösterilmektedir:

```jsx
	<span className='currentNumber' > { result ? result : currentNumber } </span>
```

<br>
<br>

## operatorChanger 
Herhangi bir işleme bastığımızda anlık olarak yazdığımız
sayımız `firstNumber` state'ine işleniyor ve anlık rakam
0'a çekiliyor.

```jsx

  const operatorChanger = (op) => {
    if (!currentNumber) return;
    setOp(op) // Change the operator

    if (!firstNumber) setFirst(currentNumber)

    setNumber(0)
  }

```

Dom'da bir işleme basıldığı için firstNumber'ımız artık
ekranda gözüküyor. Program artık yazacağımız ikinci sayı
için beklemekte.

![ss](https://gcdnb.pbrd.co/images/M13ZQEmBPEpR.png?o=1)

```jsx
  <span className='operators' >
    {result ? firstNumber + ` ${currentOp} ` + secondNumber + ' =' : currentOp ? firstNumber + ` ${currentOp}` : ''  }
                 we dont have a result                             :     we have a operator '16 +'
  </span>
```
<br>
<br>

## getResult
Eğer ikinci bir sayı tuşlayıp sonuç butonuna basarsak firstNumber ile currentNumber hesaplanıp sonuç elde edilir. İşlem sonlandığı için artık secondNumber'a currentNumber set edilir. Elimizde bir sonlanmış işlem olduğu için Dom'da currentNumber yerine sonuç gösterilir.
```jsx
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

```

![ss](https://gcdnb.pbrd.co/images/5IaD645bCwOG.png?o=1)


Tam Bu Sırada:
 - eğer bir sayı tuşlanırsa useEffect devreye girer ve her şeyi sıfırlayıp en son yazdığımız rakamı set eder:
  ```jsx
    useEffect(() => {
    if (result && currentNumber) {
      setFirst(null)
      setSecond(null)
      setResult(null)
      setOp(null)
    } 
  }, [currentNumber])
  ```
  - eğer tekrar sonuç(=) butonuna basılırsa firstNumber'a result set edilir. İşlem tekrar hesaplanıp tekrar sonuç gösterilir. Bu sonsuza kadar devam edebilir:
  
![ss](https://gcdnb.pbrd.co/images/Cxntx3vVzj5l.png?o=1) ![ss](https://gcdnb.pbrd.co/images/29NaCHa9Lr33.png?o=1)

  - eğer tekrar bir işlem(+) tuşuna basılrısa firstNumber'a result set edilir hemen ardından secondNumber ve result sıfırlanır artık yeni işleme devam edilebilr.

![ss](https://gcdnb.pbrd.co/images/IyWAONgYkcAH.png?o=1) ![ss](https://gcdnb.pbrd.co/images/2u22NE6iG7m3.png?o=1)

<br>
<br>

## AutoCalculate

Eğer elimizde bir firstNumber, işlem ve currentNumber varsa bu durumda tekrar herhangi bir işlem tuşuna basılırsa firstNumber ile currentNumber hesaplanır elde edilen sonuç firstNumber'a set edilir son olarak currentNumber sıfırlanır

![ss](https://gcdnb.pbrd.co/images/3zgyYzxCi68l.png?o=1) ![ss](https://gcdnb.pbrd.co/images/zVq6cmW5Nip3.png?o=1)

```js
const operatorChanger = (op) => {

    // if have two number calculate the result
    if (firstNumber && currentNumber) {
      setNumber(math(firstNumber))
      setFirst(math(firstNumber))
    }

    setNumber(0) // Reset the current number for the next number
  }
```
<br>
<br>

## Math Module

```js
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
```

