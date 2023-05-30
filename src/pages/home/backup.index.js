import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import Button from "../../components/button"
import "./style.css"

const toDo = ["code", "test", "build"] // data

function useInput (initialState) {
    const [input, setInput] = useState(initialState)

    const handleOnChange = useCallback((event) => {
        setInput(event.target.value)
    }, [])

    return [input, handleOnChange]
}

function HomePage () {
    const navigate = useNavigate()
    const [data, setData] = useState(toDo)
    // const [input, setInput] = useState("")
    const [input, handleOnChange] = useInput("") // ["", function(){}
    const refs = useRef(null) // { current : null}

    const RenderToDo = useCallback(() => { 
        // const todos = []
        // for (let i = 0; i < toDo.length; i++) {
        //     todos.push(<li>{toDo[i]}</li>)
        // }

        return data.map((item, index) => {
            return <li key={index}>{item}</li>
        })
    }, [])

    const style = useMemo(() =>{
        return {
            color : "red",
        }
    }, [])

    //@side-effect
    useEffect(() => {
        console.log("side-effect")
        console.log("refs", refs.current)

        return () => console.log("clean-up")
    }, [data])

    console.log("data", data)
    console.log("input", input)
    return (
        <div className="container-home">
            <h1>Home</h1>
            <ul>
               <RenderToDo/>
            </ul>
            <input ref={refs} 
                type="text" 
                placeholder="todo" 
                onChange={handleOnChange}
            />
            <Button 
                title="Go To About" 
                variant="secondary"
                onButtonClick={() => navigate("/about", { state : "data from home." })} 
            />
            <Button
                title="Add To Do"
                variant="primary"
                onButtonClick={() => {
                    let newTodo = [...data]
                    newTodo.push(input)
                    setData(newTodo)
                    // refs.current?.focus()
                    // console.log(refs.current?.value)
                }}
            />
        </div>
    )
}

export default HomePage