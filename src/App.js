

import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [notesData, setNotesData] = useState([]);
  const [updatePopper, setUpdatePopper] = useState(false);
  const [updatedData, setUpdateData] = useState({});
  const [updateCount, setUpdateCount] = useState(0);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const getData = async () => {
    try {
      const res = await fetch('https://data-backend-mamm.onrender.com/');
      const data = await res.json();
      setNotesData(data.tasks);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddData = async () => {
    if (inputValue.trim() === '') {
      alert('Please enter some text');
      return;
    }
    const data = inputValue;
    try {
      const res = await fetch('https://data-backend-mamm.onrender.com/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: data }),
      });
      if (res.status === 200) {
        getData();
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue('');
  };

  useEffect(() => {
    getData();
  }, []);

  const updateHandler = async (id) => {
    try {
      const data = updatedData.note;
      const res = await fetch(`https://data-backend-mamm.onrender.com/update/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ payload: data }),
      });
      if (res.status === 200) {
        getData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let total = 0;
    notesData.forEach((item) => {
      total = total + +item.updateCount;
    });
    setUpdateCount(total);
  }, [notesData]);

  return (
    <div className="container">
      <div className="form-section">
        <div className="input-container">
          <input type="text" onChange={handleChange} value={inputValue} />
          <button onClick={handleAddData}>Add Item</button>
        </div>
        <p>Total Item Count: {notesData.length}</p>
        <div>Total Update Item count: {updateCount}</div>
      </div>
      <div className="table-container">
        <p>Table</p>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Notes</th>
              <th>Update Count</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {notesData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.note}</td>
                <td>{item.updateCount}</td>
                <td>
                  <button
                    onClick={() => {
                      setUpdatePopper(true);
                      setUpdateData(item);
                    }}
                  >
                    EDIT
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {updatePopper && (
        <div className="update-popper">
          <input
            type="text"
            value={updatedData.note}
            onChange={(e) => setUpdateData({ ...updatedData, note: e.target.value })}
          />
          <button
            onClick={() => {
              updateHandler(updatedData._id);
              setUpdatePopper(false);
            }}
          >
            Update Item
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
