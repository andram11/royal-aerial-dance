import { useState } from "react";
import Button from "./button"

interface CreateCourseProps {

}

const CreateCourse: React.FC = () => {
         // Manage input state for each course field
        const [title, setTitle] = useState("");
        const [category, setCategory] = useState("");
        const [level, setLevel] = useState("");
        const [location, setLocation] = useState("");
        const [dayOfWeek, setDayOfWeek] = useState("");
        const [startDate, setStartDate] = useState<string|Date>("");
        const [endDate, setEndDate] = useState<string|Date>("");
        const [recurrent, setRecurrent] = useState("");
        const [recurrenceType, setRecurrenceType] = useState("");
        const [timeslot, setTimeslot] = useState("");
        const [price, setPrice] = useState("");
        const [stock, setStock] = useState("");
        const [teacher, setTeacher] = useState("");
        const [status, setStatus] = useState("");
        const [updateStatus, setUpdateStatus]= useState<string|null>(null)


    return(
       <>
         <div>
                <label  htmlFor="dropdownInput" >Category </label>
                <select required onChange={(e) => setCategory(e.target.value)} className="w-full mb-2 border-2 p-3 rounded-lg shadow-lg" id="dropdownInput">
                    <option defaultValue="">Select a category</option>
                    <option value="pole dance">pole dance</option>
                    <option value="aerial hoop">aerial hoop</option>
                    <option value="yoga">yoga</option>
                    <option value="contemporary dance">contemporary dance</option>
                    <option value="heels dance">heels dance</option>
                </select>
            </div>
            <div>
                <label >Title </label>
                <input required onChange={(e) => setTitle(e.target.value)} type="text"className="w-full mb-2 border-2 p-2 rounded-lg shadow-lg"></input>
            </div>
            <div>
                <label htmlFor="dropdownInput">Level </label>
                <select required onChange={(e) => setLevel(e.target.value)} className="mb-2 w-full border-2 p-3 rounded-lg shadow-lg" id="dropdownInput">
                    <option defaultValue="">Select a level</option>
                    <option value="beginner">beginner</option>
                    <option value="intermediate">intermediate</option>
                    <option value="advanced">advanced</option>
                    <option value="all levels">all levels</option>
                    <option value="elite">elite</option>
                </select>
            </div>
            <div >
                <label >Location</label>
                <input required  onChange={(e) => setLocation(e.target.value)} className="mb-2 w-full border-2 p-2 rounded-lg shadow-lg" type="text" ></input>
            </div>
            <div>
                <label >Day of the week</label>
                <select required onChange={(e) => setDayOfWeek(e.target.value)} className="mb-2 w-full border-2 p-3 rounded-lg shadow-lg" id="dropdownInput">
                <option defaultValue="" >Select day of the week</option>
                    <option value="monday">monday</option>
                    <option value="tuesday">tuesday</option>
                    <option value="wednesday">wednesday</option>
                    <option value="thursday">thursday</option>
                    <option value="friday">friday</option>
                    <option value="saturday">saturday</option>
                    <option value="sunday">sunday</option>
                </select>
            </div>
            <div>
                <label >Start date</label>
                <input required onChange={(e) => setStartDate(convertToUTC(e.target.value))}  className="w-full mb-2 border-2 p-2 rounded-lg shadow-lg" defaultValue="dd/mm/yyyy" ></input>
            </div>
            <div>
                <label >End date</label>
                <input required onChange={(e) => setEndDate(convertToUTC(e.target.value))} className="w-full mb-2 border-2 p-2 rounded-lg shadow-lg" defaultValue="dd/mm/yyyy" ></input>
            </div>
            <div >
                <label >Recurrent</label>
                <select required onChange={(e) => setRecurrent(e.target.value.toString())} className="w-full mb-2 border-2 p-3 rounded-lg shadow-lg" id="dropdownInput">
                <option defaultValue="">Select recurrence</option>
                    <option value="true">true</option>
                    <option value="false">false</option>
                  
                </select>
            </div>
            <div >
                <label >Recurrence type</label>
                <select required onChange={(e) => setRecurrenceType(e.target.value)} className="w-full mb-2 border-2 p-3 rounded-lg shadow-lg" id="dropdownInput">
                 <option defaultValue="">Select a recurrence type</option>
                    <option value="weekly">weekly</option>
                    <option value="biMonthly">biMonthly</option>
                    <option value="monthly">monthly</option>
                    <option value="oneTime">oneTime</option>
                </select>
            </div>
            <div >
                <label >Timeslot</label>
                <input defaultValue="HH:MM-HH:MM" required onChange={(e) => setTimeslot(e.target.value)} className="w-full mb-2 border-2 p-2 rounded-lg shadow-lg" type="text"></input>
            </div>
            <div >
                <label >Price</label>
                <input required onChange={(e) => setPrice(e.target.value)} className="w-full mb-2 border-2 p-2 rounded-lg shadow-lg" type="text" ></input>
            </div>
            <div >
                <label >Stock</label>
                <input required onChange={(e) => setStock(e.target.value)} className="w-full mb-2 border-2 p-2 rounded-lg shadow-lg" type="text" ></input>
            </div>
            <div >
                <label >Teacher</label>
                <input required onChange={(e) => setTeacher(e.target.value)} className="w-full mb-2 border-2 p-2 rounded-lg shadow-lg" type="text" ></input>
            </div>
            <div >
                <label >Status: </label>
                <select required onChange={(e) => setStatus(e.target.value)} id="dropdownInput" className="w-full mb-2 border-2 p-3 rounded-lg shadow-lg">
                <option defaultValue="">Select a status</option>
                    <option value="active">active</option>
                    <option value="cancelled">cancelled</option>
                    <option value="inactive">inactive</option>
                </select>
            </div>
       </>
    )
}

export default CreateCourse