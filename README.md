### How to use raw Redux core

```javascript
import { useSelector, useDispatch } from "react-redux"
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

```
        // @define query search
        // const query = "?username=" + username + "&password=" + password

        // @do api call
        // fetch("http://localhost:2000/users" + query, { method : "GET" })
        // .then(response => {
        //     console.log(response.json())
        // })
        // .catch(error => {
        //     console.log(error)
        // })

        // Axios.get("http://localhost:2000/users" + query)
        // .then(response => {
        //     console.log(response.data)
        //     dispatch(saveUser(response?.data[0]))

        //     // @redirect
        //     navigation("/home")
        // })
        // .catch(error => console.log(error))
```