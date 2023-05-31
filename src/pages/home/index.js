import { useState, useRef } from "react"
import Alert from "../../components/alert"
import Confirmation from "../../components/confirmation"

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
    const [alert, setAlert] = useState({ show : false, message : "" })
    const [id, setId] = useState(null)
    const [confirmation, setConfirmation] = useState({ show : false, actionType : null, message : "" })

    // @input add new user's data
    const name = useRef(null)
    const address = useRef(null)
    const birthdate = useRef(null)
    const gender = useRef(null)
    const skills = useRef(null)

    // @input edit user's data
    const editedUserName = useRef(null)
    const editedUserAddress = useRef(null)
    const editedUserBirthdate = useRef(null)
    const editedUserGender = useRef(null)
    const editedUserSkills = useRef(null)

    // @convert user's data into table component
    const RenderTableRows = () => users.map((user, index) => {
        if (user.id === id && confirmation.actionType !== "DELETE") {
            return (
                <tr className="hover:bg-slate-100 hover:shadow capitalize" key={index}>
                    <td className="border border-slate-300 text-center py-2 ">{user.id}</td>
                    <td className="border border-slate-300 px-2 py-2">
                        <input type="text" ref={editedUserName}
                            defaultValue={editedUserName.current?.value || user.name}
                            placeholder="user's name"
                            className="border border-slate-300 px-2 py-1 rounded-md w-full" 
                        />
                    </td>
                    <td className="border border-slate-300 px-2 py-2">
                        <select ref={editedUserBirthdate}
                            defaultValue={editedUserGender.current?.value || user.gender}
                            className="border border-slate-300 px-2 py-1 rounded-md w-full"
                        >
                            <option>male</option>
                            <option>female</option>
                        </select>
                    </td>
                    <td className="border border-slate-300 text-center py-2">
                        <input type="date" ref={editedUserBirthdate}
                            defaultValue={editedUserBirthdate.current?.value || user.birthdate} 
                            placeholder="birthdate"
                            className="border border-slate-300 px-2 py-1 rounded-md w-full"
                        />
                    </td>
                    <td className="border border-slate-300 px-2 py-2">
                        <input type="text" ref={editedUserAddress}
                            defaultValue={editedUserAddress.current?.value || user.address} 
                            placeholder="address"
                            className="border border-slate-300 px-2 py-1 rounded-md w-full"
                        />
                    </td>
                    <td className="border border-slate-300 px-2 py-2">
                        <input type="text" ref={editedUserSkills}
                            defaultValue={editedUserSkills.current?.value || user.skills.join(", ")} 
                            placeholder="skills"
                            className="border border-slate-300 px-2 py-1 rounded-md w-full"
                        />
                    </td>
                    <td className="border h-full border-slate-300 px-2 py-2 flex flex-row justify-between gap-2">
                        <button onClick={() => setId(null)}
                            className="py-1 rounded text-white bg-sky-500 grow shadow-sm active:scale-90 transition-all ease-in duration-200 capitalize"
                        >
                            cancel
                        </button>
                        <button onClick={() => setConfirmation({ show : true, actionType : "UPDATE", message : `Are you sure you want to save?` })}
                            className="py-1 rounded text-white bg-green-500 grow shadow-sm active:scale-90 transition-all ease-in duration-200 capitalize"
                        >
                            save
                        </button>
                    </td>
                </tr>
            )
        } else {
            return (
                <tr className="hover:bg-slate-100 hover:shadow capitalize" key={index}>
                    <td className="border border-slate-300 text-center py-2 ">{user.id}</td>
                    <td className="border border-slate-300 px-2 py-2">{user.name}</td>
                    <td className="border border-slate-300 px-2 py-2">{user.gender}</td>
                    <td className="border border-slate-300 text-center py-2">{user.birthdate}</td>
                    <td className="border border-slate-300 px-2 py-2">{user.address}</td>
                    <td className="border border-slate-300 px-2 py-2">{user.skills.join(", ")}</td>
                    <td className="border border-slate-300 px-2 py-2 flex flex-row justify-between gap-2">
                        <button className="py-1 rounded text-white bg-amber-500 grow shadow-sm active:scale-90 transition-all ease-in duration-200 capitalize"
                            onClick={() => setId(user.id)}
                        >
                            edit
                        </button>
                        <button className="py-1 rounded text-white bg-red-500 grow shadow-sm active:scale-90 transition-all ease-in duration-200 capitalize"
                            onClick={() => {
                                setId(user.id)
                                setConfirmation({ show : true, actionType : "DELETE", message : `Are you sure you want to delete ${user.name}?` })
                            }}
                        >
                            delete
                        </button>
                    </td>
                </tr>
            )
        }
    })

    const onButtonAdd = () => {
        // @validation => all fields are required
        if (!name.current.value) {
            setAlert({ show : true, message : "name is required!" })
            return
        }

        if (!address.current.value) {
            setAlert({ show : true, message : "address is required!" })
            return
        }

        if (!birthdate.current.value) {
            setAlert({ show : true, message : "birthdate is required!" })
            return
        }

        if (!skills.current.value) {
            setAlert({ show : true, message : "skills is required!" })
            return
        }

        // @validate => check if user's name already exist
        const isExist = users.some(user => user.name === name.current.value)
        if (isExist) {
            setAlert({ show : true, message : "user's name already exist!" })
            return
        }

        // @create new user
        const newUser = {
            id : users.length + 1,
            name : name.current?.value,
            address : address.current?.value,
            birthdate : birthdate.current?.value,
            gender : gender.current?.value,
            skills : skills.current?.value?.split(",")
        }

        // @set new user to users state
        setUsers(prevState => [...prevState, newUser])

        // @reset input fields
        name.current.value = ""
        address.current.value = ""
        birthdate.current.value = ""
        skills.current.value = ""
    }

    const onButtonCancel = () => {
        // @rest confirmation state and id
        setConfirmation({ show : false, actionType : null, message : "" })
        setId(null)
    }

    const onButtonConfirm = () => {
        if (confirmation.actionType === "DELETE") { 
            const filteredUsers = users.filter(user => user.id !== id)
    
            // @set new users state
            setUsers(filteredUsers)
        }

        if (confirmation.actionType === "UPDATE") {
            const updatedUsers = users.map(user => {
                if (user?.id === id) {
                    // @merge new user's data with new edited user's data
                    return Object.assign(user, { // @copy initial user's data with same id in the local state
                        name : editedUserName.current?.value,
                        address :editedUserAddress.current?.value,
                        birthdate : editedUserBirthdate.current?.valu,
                        gender : editedUserGender.current?.value,
                        skills : editedUserSkills.current?.value?.split(",")
                    })
                }
                return user
            })

            // @set new users state
            setUsers(updatedUsers)

            // @reset edit user's data
        }

        // @reset id and confirmation state
        setId(null)
        setConfirmation({ show : false, actionType : null, message : "" })
    }

    return (
        <div className="h-full w-full px-40 py-10 bg-neutral-50">
            <h1 className="mb-2 text-cyan-950 font-bold text-2xl">User's Table</h1>
            <h2 className="mb-4 text-cyan-950 font-bold">CRUD (Create, Read, Update, and Delete Operation)</h2>

            {/* @seacrbox */}
            <div className="w-full flex flex-row align-middle justify-between gap-2 my-2">
                <input className="w-full px-2 py-2 rounded border-2 border-gray-400" type="text" placeholder="search by user's name" />
                <select className="w-1/4 px-2 py-2 border-2 border-gray-400 rounded">
                    <option>Sort Name A-Z</option>
                    <option>Sort Name Z-A</option>
                </select>
            </div>

            {/* @table */}
            <table className="border-collapse border rounded border-slate-400 w-full overflow-hidden shadow-sm">
                <thead className="bg-slate-200 shadow-sm">
                    <tr>
                        <th className="border border-slate-300 text-center px-2">ID</th>
                        <th className="border border-slate-300 px-4 py-2">Name</th>
                        <th className="border border-slate-300 px-4 py-2">Gender</th>
                        <th className="border border-slate-300 px-4 py-2">Birthdate</th>
                        <th className="border border-slate-300 px-4 py-2">Address</th>
                        <th className="border border-slate-300 px-4 py-2">Skils</th>
                        <th className="border border-slate-300 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody className="h-10 overflow-hidden">
                    <RenderTableRows/>
                </tbody>
            </table>

            {/* @new input */}
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
                    className="grow bg-sky-500 px-10 py-2 rounded text-white shadow-sm active:scale-90 transition-all ease-in duration-200"
                >
                    Add
                </button>

                {/* @alert */}
                <Alert show={alert.show} 
                    title="Alert" 
                    message={alert.message}
                    onClick={() => setAlert({ show : false, message : "" })}
                />

                {/* @confirmation */}
                <Confirmation 
                    show={confirmation.show}
                    message={confirmation.message}
                    onCancel={onButtonCancel}
                    onConfirm={onButtonConfirm}
                />
            </div>
        </div>
    )
}

export default HomePage