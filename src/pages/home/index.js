import { useState, useRef } from "react"
// import User from "./user.model"
const USERS = [
    {
        id: 1,
        name: "Alice Johnson",
        birthdate: "1995-08-10",
        address: "456 Elm Street, City, State, Country",
        skills: ["Java", "Python", "SQL"],
        gender: "Female"
    },
    {
        id: 2,
        name: "Bob Smith",
        birthdate: "1988-03-25",
        address: "789 Oak Avenue, City, State, Country",
        skills: ["C++", "JavaScript", "HTML"],
        gender: "Male"
    },
    {
        id: 3,
        name: "Emily Davis",
        birthdate: "1992-11-05",
        address: "321 Pine Street, City, State, Country",
        skills: ["Python", "HTML", "CSS"],
        gender: "Female"
    },
    {
        id: 4,
        name: "David Wilson",
        birthdate: "1985-09-18",
        address: "987 Maple Road, City, State, Country",
        skills: ["JavaScript", "React", "Node.js"],
        gender: "Male"
    },
    {
        id: 5,
        name: "Sarah Thompson",
        birthdate: "1997-06-30",
        address: "654 Birch Lane, City, State, Country",
        skills: ["Java", "SQL", "CSS"],
        gender: "Female"
    },
    {
        id: 6,
        name: "Michael Miller",
        birthdate: "1991-02-14",
        address: "789 Walnut Street, City, State, Country",
        skills: ["Python", "JavaScript", "HTML"],
        gender: "Male"
    },
    {
        id: 7,
        name: "Olivia Brown",
        birthdate: "1994-12-01",
        address: "123 Cedar Avenue, City, State, Country",
        skills: ["C++", "Python", "React"],
        gender: "Female"
    },
    {
        id: 8,
        name: "Daniel Anderson",
        birthdate: "1989-07-22",
        address: "456 Oak Street, City, State, Country",
        skills: ["Java", "HTML", "CSS"],
        gender: "Male"
    },
    {
        id: 9,
        name: "Emma Wilson",
        birthdate: "1993-04-12",
        address: "789 Elm Avenue, City, State, Country",
        skills: ["JavaScript", "React", "Node.js"],
        gender: "Female"
    },
    {
        id: 10,
        name: "Christopher Davis",
        birthdate: "1987-10-03",
        address: "321 Pine Street, City, State, Country",
        skills: ["Python", "SQL", "HTML"],
        gender: "Male"
    }
]

function HomePage () {
    const [users, setUsers] = useState(USERS)
    const name = useRef("")
    const address = useRef("")
    const birthdate = useRef("")
    const gender = useRef("")
    const skills = useRef("")


    // @convert user's data into table component
    const RenderTableRows = () => users.map((user, index) => {
        return (
            <tr className="hover:bg-slate-100 hover:shadow capitalize" key={user.id}>
                <td className="border border-slate-300 text-center py-2 ">{user.id}</td>
                <td className="border border-slate-300 px-2 py-2">{user.name}</td>
                <td className="border border-slate-300 px-2 py-2">{user.gender}</td>
                <td className="border border-slate-300 text-center py-2">{user.birthdate}</td>
                <td className="border border-slate-300 px-2 py-2">{user.address}</td>
                <td className="border border-slate-300 px-2 py-2">{user.skills.join(", ")}</td>
            </tr>
        )
    })

    const onButtonAdd = () => {
        const newUser = {
            id : users.length + 1,
            name : name.current?.value,
            address : address.current?.value,
            birthdate : birthdate.current?.value,
            gender : gender.current?.value,
            skills : skills.current?.value?.split(",")
        }
        // setUsers([...users, newUser])
        // setUsers(users.concat(newUser))
        // const NewUser = new  User(
        //     users.length + 1,
        //     name.current.value,
        //     address.current.value,
        //     birthdate.current.value,
        //     gender.current.value,
        //     skills.current.value.split(",")
        // )
        setUsers(prevState => [...prevState, newUser])
    }

    return (
        <div className="h-full w-full px-40 py-10">
            <h1 className="mb-4 text-cyan-950 font-bold">User's Table</h1>
            <table className="border-collapse border rounded border-slate-400 w-full h-auto overflow-hidden shadow-sm">
                <thead className="bg-slate-200 shadow-sm">
                    <tr>
                        <th className="border border-slate-300 px-4 py-2">ID</th>
                        <th className="border border-slate-300 px-4 py-2">Name</th>
                        <th className="border border-slate-300 px-4 py-2">Gender</th>
                        <th className="border border-slate-300 px-4 py-2">Birthdate</th>
                        <th className="border border-slate-300 px-4 py-2">Address</th>
                        <th className="border border-slate-300 px-4 py-2">Skils</th>
                    </tr>
                </thead>
                <tbody className="w-full overflow-scroll">
                    <RenderTableRows/>
                </tbody>
            </table>
            <div className="w-full my-3 flex flex-row flex-wrap item-center justify-between gap-2">
                <input type="text" ref={name}
                    className="border border-slate-300 px-4 py-2 rounded-md grow" 
                    placeholder="user's name"
                />
                <select ref={gender}
                    className="border border-slate-300 px-2 py-2 rounded-md grow"
                >
                    <option>male</option>
                    <option>female</option>
                </select>
                <input type="date" ref={birthdate}
                    className="border border-slate-300 px-4 py-2 rounded-md grow"
                    placeholder="birthdate"
                />
                <input type="text" ref={address}
                    className="border border-slate-300 px-4 py-2 rounded-md grow"
                    placeholder="address"
                />
                <input type="text" ref={skills}
                    className="border border-slate-300 px-4 py-2 rounded-md grow"
                    placeholder="skills"
                />
                <button onClick={onButtonAdd}
                    className="grow bg-sky-500 px-10 py-2 rounded text-white"
                >
                    Add
                </button>
            </div>
        </div>
    )
}

export default HomePage