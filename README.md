### How to use raw Redux core

```javascript
import { useSelector, useDispatch } from "react"
import { createStore } from "redux"

// @create initialize state
const INITIAL_STATE = { count : 0 }

// @create reducer
function Reducer (state = INITIAL_STATE, action) {
    switch(action.type) {
        case "INCREMENT" :
            return { count : state.count + action.payload }
        case "DECREMENT" :
            return { count : state.count - action.payload }
        default :
            return state
    }
}


// @create store
const store = createStore(reducer)

// @how to use inside the component
function App () {
    // @accses the redux state
    const countRedux = useSelector(state => state.count)

    // @initialize dispatcher
    const dispatch = useDispatch()

    // @event handler
    const increment = () => dispatch({ type : "INCREMENT", payload : 2 })
    const decrement = () => dispatch({ type : "DECREMENT", payload : 2 })
    return (
        <div>
            <button onClick={increment}/>
            <h1>{countRedux}</h1>
            <button onClick={decrement}/>
        </div>
    )
}

````