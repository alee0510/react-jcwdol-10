// import React from "react"
import  "./style.css"

// // create component using class contructor
// export class PrimaryButton extends React.Component {
//     render () {
//         return (
//             <button className="btn btn-primary">
//                 Primary Button
//             </button>
//         )
//     }
// }

// // create component using function
// export function SecondaryButton ({
//     title,
//     color,
//     fontSize = "12pt" // default value
// }) {
//     // console.log(props)
//     return (
//         <button 
//             style={{ 
//                 fontSize : fontSize, 
//                 color : color
//             }} 
//             className="btn btn-secondary"
//         >
//             { title }
//         </button>
//     )
// }


export default function Button ({
    title,
    variant = "primary", // primary, secondary, success, and danger.
    onButtonClick
}) {
    return (
        <button className={`btn btn-${variant}`} onClick={onButtonClick}>
            { title }
        </button>
    )
}