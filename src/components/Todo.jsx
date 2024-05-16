
import React, { useState } from 'react';
import "./todo.css";

const Todo = () => {
    const [data, setData] = useState("");
    const [editData, setEditData] = useState(""); // State for handling editing data
    const [addData, setAddData] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState(null);

    const handleChange = (e) => {
        setData(e.target.value);
    };

    const handleEditChange = (e) => {
        setEditData(e.target.value); // Update editData state for editing input
    };

    const handleClick = () => {
        if (data.trim() !== "") { 
            setAddData([...addData, data]);
            setData(""); 
        }
    };

    const handleEdit = (index) => {
        setIsEditing(true);
        setEditIndex(index);
        setEditData(addData[index]); // Set editData with the data to be edited
    };

    const handleUpdate = () => {
        const newData = [...addData];
        newData[editIndex] = editData; // Update with editData instead of data
        setAddData(newData);
        setIsEditing(false);
        setEditIndex(null);
        setEditData(""); // Reset editData after update
    };

    return (
        <div className='main-container'>
            <div className='outer-container'>
                <div className='inner-container'>
                    <input type="text" value={data} onChange={handleChange} className='add-input' />
                    <button onClick={handleClick} className='add-buuton'>ADD-DATA</button>
                </div>
                <table className='table-container'>
                    <tbody>
                        {addData.map((item, index) => (
                            <tr key={index}>
                                <td className='td-text'>{item}</td>
                                <button onClick={() => handleEdit(index)} className='edit-button'>EDIT</button>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {isEditing && (
                    <div className="popup">
                        <input type="text" value={editData} onChange={handleEditChange} className='input-update' />
                        <button onClick={handleUpdate} className='update-button'>Update</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Todo;
