// HOF (High Odrer Function)
function originalFunction() {
  console.log('originalFunction');
}

function wrapFunction(func) {
  console.log('wrapFunction');
  func();
}

wrapFunction(originalFunction);

function wrapFunction2(func) {
    return () => {
        console.log('wrapFunction');
        func();
    }
}

const wrappedFunction = wrapFunction2(originalFunction);
wrappedFunction();


// high order component
function WithCounter (OriginalComponent) {
	const NewComponent = (props) => {
		const [count, setCount] = useState(0)

		const increment = () => setCount(prev => prev + 1)

		return <OriginalComponent number={count} increment={increment} {...props}/>
	}

	return NewComponent
}

function IncrementOnClick(props) {
	const { number, increment, text } = props
	console.log(text)
	return (
		<div>
			<h1>{number}</h1>
			<button className="btn btn-secondary" 
				onClick={increment}
			>
				Click Me
			</button>
		</div>
	)
}

const IncrementOnClickWithCounter = WithCounter(IncrementOnClick)

function IncrementOnHover(props) {
	const { number, increment } = props
	return (
		<div>
			<h1>{number}</h1>
			<button className="btn btn-secondary" 
				onMouseOver={increment}
			>
				Hover
			</button>
		</div>
	)
}

const IncrementOnHoverWithCounter = WithCounter(IncrementOnHover)