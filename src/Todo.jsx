import { useState } from 'react'

function formatDate (date) {
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
};

function dateToObj (date) {
    return new Date(date.split(".").reverse().join("-"))
}

function Todo() {

    const currentDate = formatDate(new Date());    

    const [tasks, setTasks] = useState([
        {taskName: 'Do dishes', dueDate: currentDate, isEditingText: false, isEditingDate: false, isCompleted: false}
    ])

    const [taskName, setTaskName] = useState('')
    const [dueDate, setDueDate] = useState('')

    const [editedTasksName, setEditedTasksName] = useState(tasks.map(task => task.taskName))
    const [editedDueDates, setEditedDueDates] = useState(tasks.map(task => task.dueDate))
    
    // save taskName
    const handleTaskName = (e) => {
        setTaskName(e.target.value)
    }

    // save dueDate
    const handleDueDate = (e) => {
        const dateObj = new Date(e.target.value);
        const formattedDate = formatDate(dateObj);

        setDueDate(formattedDate);
    }

    // user clicks add task (adds a new task to the array)
    const handleAddTask = () => {
        if (taskName.trim() === "" || dueDate === "") {
            alert("Please enter values")
            return;
        }
        const newTask = {taskName: taskName, dueDate: dueDate, isEditingText: false, isEditingDate: false, isCompleted: false} // newTask with all the data

        setTasks(prevTasks => [...prevTasks, newTask]) 
        setEditedTasksName(prevEditedTasks => [...prevEditedTasks, newTask.taskName])
        setEditedDueDates(prevEditedDates => [...prevEditedDates, newTask.dueDate])

        // clears the input values
        document.querySelector("textarea").value = ''
        document.querySelector("input[type='date']").value = ''
        setTaskName('')
        setDueDate('')
    }

    // user clicks random task
    const handleRandomTask = () => {
        const randomTasks = ["Buy groceries", "Clean the house", "Finish homework", "Attend meeting", "Call mom", "Walk the dog", "Read a book", "Write a report", "Prepare dinner", "Do laundry", "Respond to emails", "Practice coding", "Take out the trash", "Water the plants", "Pay bills", "Go to the gym", "Organize the desk", "Schedule appointment", "Plan weekend trip", "Buy gift for friend", "Review notes", "Call the doctor", "Update resume", "Clean out inbox", "Learn a new language", "Meditate for 10 minutes"];
        const randomTaskName = randomTasks[Math.floor(Math.random() * randomTasks.length)]

        const randomDates = ["01.01.2020", "15.04.2021", "19.07.2023", "22.12.2025", "09.02.2027", "30.08.2026", "04.11.2024", "12.03.2029", "27.06.2028", "07.10.2023", "14.02.2021", "17.09.2025", "05.03.2026", "22.07.2024", "08.01.2029", "10.05.2028", "30.11.2022", "03.07.2027", "11.12.2029", "18.04.2024", "21.09.2023", "03.12.2026", "14.06.2022", "17.10.2028", "25.05.2027", "02.08.2021"];
        const randomDueDate = randomDates[Math.floor(Math.random() * randomDates.length)]

        const randomTaskObj = {taskName: randomTaskName, dueDate: randomDueDate, isEditingText: false, isEditingDate: false, isCompleted: false}
        setTasks(prevTasks => [...prevTasks, randomTaskObj])
        setEditedTasksName(prevEditedTasks => [...prevEditedTasks, randomTaskObj.taskName])
        setEditedDueDates(prevEditedDates => [...prevEditedDates, randomTaskObj.dueDate])
    }

    // user clicks on task TEXT TO EDIT
    const handleShowEditText = (index) => {
        setTasks(prevTasks => 
                 prevTasks.map((task, i) => index === i ? {...task, isEditingText: true} : task))
    }

    const saveEditedTaskName = (e, index) => {
        setEditedTasksName(prevEditedTasks => 
                           prevEditedTasks.map((task, i) => index === i ? e.target.value : task));
    }

    const handleEditTask = (index) => {
        setTasks(prevTasks => 
                 prevTasks.map((task, i) => index === i ? {...task, taskName: editedTasksName[index], isEditingText: false} : task))
    }

    // user clicks on task DATE TO EDIT
    const handleShowEditDate = (index) => {
        setTasks(prevTasks => 
                 prevTasks.map((task, i) => index === i ? {...task, isEditingDate: true} : task))
    }

    const saveEditedDueDate = (e, index) => {
        if (dateToObj(e.target.value)) {
            setEditedDueDates(prevEditedDates => 
                prevEditedDates.map((date, i) => i === index ? e.target.value : date))
        } else {
            alert("Please enter date (dd.mm.yyyy)")
            return;
        }
    }

    const handleEditDate = (index) => {
        setTasks(prevTasks => 
                 prevTasks.map((task, i) => i === index ? {...task, dueDate: editedDueDates[index], isEditingDate: false} : task))
    }

    // user clicks move up / down
    const handleMoveUp = (index) => {
        setTasks(prevTasks => {
                const oldArray = [...prevTasks]

                if (index > 0) {
                    const temp = oldArray[index]
                    oldArray[index] = oldArray[index-1]
                    oldArray[index-1] = temp
                }

                return oldArray
        })
    }

    const handleMoveDown = (index) => {
        setTasks(prevTasks => {
                const oldArray = [...prevTasks]
                
                if (index < oldArray.length - 1 && oldArray.length >= 2) {
                    const temp = oldArray[index]
                    oldArray[index] = oldArray[index+1]
                    oldArray[index+1] = temp
                }
                
                return oldArray
        })
    }

    // user clicks complete button from task
    const handleCompleteTask = (index) => {
        setTasks(prevTasks => 
                 prevTasks.map((task, i) => index === i ? {...task, isCompleted: !task.isCompleted} : task))
    }

    // user clicks delete button from task
    const handleDeleteTask = (index) => {
        setTasks(prevTasks =>
                 prevTasks.filter((_, i) => index !== i))
    }

    return (
        <section className='flex flex-col items-center gap-8 m-auto'>

            <div id='enterTask' className='flex flex-col items-center gap-2 bg-white p-6 rounded-xl w-1/3 max-lg:w-1/2 max-md:w-full'>
                <h2 className='text-4xl font-bold text-center max-lg:text-2xl'>This is a Todo</h2>
                <label className='text-xl'>Enter a task</label>
                <textarea placeholder='Ex: Wash Dishes' 
                          onChange={handleTaskName} 
                          className='border border-black w-full h-20 p-2 max-sm:text-center'>
                </textarea>
                <input type="date" 
                        onChange={handleDueDate} 
                        className='border-2 rounded-md p-2 w-full text-center' />

                <div className='w-full flex gap-2 justify-between items-center'>
                    <button type="submit" 
                            onClick={handleAddTask} 
                            className='w-1/2 bg-green-600 text-white rounded-md p-2'>
                            Submit Task
                    </button>
                    <button onClick={handleRandomTask}
                            className='w-1/2 bg-gray-600 text-white rounded-md p-2'>
                            Random Task
                    </button>
                </div>
                <p className='font-extralight tracking-wide text-gray-600'>note: double click on task to edit</p>
            </div>
            
            <div id='outputTasks' className='w-3/4 flex flex-col gap-6 max-md:w-full'>
                {tasks.map((task, index) => {
                    return (
                        <div key={index} className={`w-full flex justify-between items-center gap-4 bg-white p-6 rounded-xl max-md:flex-col ${task.isCompleted === true ? 'opacity-50' : ''}`}>
                            <div className='max-md:text-center'>
                                {/* task details (text & date) */}
                                <p className={`font-bold ${task.isCompleted === true ? 'line-through' : ''} ${dateToObj(task.dueDate) < dateToObj(currentDate) ? 'text-red-600' : ''}`}
                                   onClick={() => handleShowEditDate(index)}>
                                   {task.isEditingDate ?
                                                       <>
                                                         <input type="text" 
                                                                onChange={(e) => {e.stopPropagation(); saveEditedDueDate(e, index)}}
                                                                placeholder={`Change: ${task.dueDate}`} 
                                                                className='border border-black rounded-sm outline-none font-normal'/>
                                                         <input type="submit" 
                                                                onClick={(e) => {e.stopPropagation(); handleEditDate(index)}}
                                                                className='bg-green-600 rounded-md text-white p-0.5 ml-1 px-2 cursor-pointer font-normal' />
                                                       </>
                                                       : task.dueDate}
                                </p>
                                <p className={task.isCompleted === true ? 'line-through' : ''} 
                                   onClick={() => handleShowEditText(index)}>
                                    {task.isEditingText ? 
                                                        <>
                                                            <input type='text' 
                                                                onChange={(e) => {e.stopPropagation(); saveEditedTaskName(e, index)}} 
                                                                placeholder={`Change: ${task.taskName}`} 
                                                                className='border border-black rounded-sm outline-none'/> 
                                                            <input type='submit'
                                                                onClick={(e) => {e.stopPropagation(); handleEditTask(index)}} 
                                                                className='bg-green-600 rounded-md text-white p-0.5 ml-1 px-2 cursor-pointer' />
                                                        </>             
                                                        : task.taskName}
                                </p>
                            </div>

                            <div className='flex items-center gap-2 max-sm:flex-wrap max-sm:justify-center'>
                                {/* up / down buttons */}
                                <button onClick={() => handleMoveDown(index)} 
                                        className='text-4xl transition-transform hover:scale-110'>
                                        ⬇️
                                </button>
                                <button onClick={() => handleMoveUp(index)} 
                                        className='text-4xl transition-transform hover:scale-110'>
                                        ⬆️
                                </button>
                                {/* complete / delete buttons */}
                                <button onClick={() => handleCompleteTask(index)} 
                                        className='bg-green-500 p-2 rounded-md text-white'>
                                        {task.isCompleted === true ? 'COMPLETED' : 'Complete'}
                                </button>
                                <button onClick={() => handleDeleteTask(index)} 
                                        className='bg-red-500 p-2 rounded-md text-white'>
                                        Delete
                                </button>
                            </div>
                        </div> 
                    )
                })}
            </div>

        </section>
    )
}

export {Todo}