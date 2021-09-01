import logo from './logo.svg';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';


let editNoteIndex

function App() {

  const [value, setValue] = useState('Пусто')
  const [edit, setEdit] = useState(false)
  const [found, setFound] = useState('')

  const handleChange = event => {
    setValue(event.target.value)
  }

  const dispatch = useDispatch()
  const note = useSelector(state => state.notes)
  console.log(note)
  const addNote = (value, index) => {
    dispatch({ type: "ADD_NOTE", payload: value })
    setValue('')
  }

  const startEditNote = (index) => {
    setValue(note[index])
    setEdit(true)
    editNoteIndex = index
  }

  const editNote = (value, editNoteIndex) => {
    dispatch({ type: "EDIT_NOTE", payload: value, editNoteIndex })
    setEdit(false)
  }

  const removeNote = elem => {
    dispatch({ type: "REMOVE_NOTE", payload: elem })
  }

  const searchNote = elem => {
    setFound('')

    let found = note.map((item, index) => {

      if (item.search(elem) !== -1) {
        return <li key={index}>Запись {index + 1}<br />{item}</li>
      }
    })

    setFound(found)
  }



  const notesMenu = note.map((elem, index) => {
    return <li key={index} onClick={() => startEditNote(index)} >Запись {index + 1} <a href="#" onClick={() => removeNote(elem)}>delNote</a></li>
  })


  return (
    <div>
      <div className="content">
        <ul>
          {notesMenu}
        </ul>
        <textarea value={value} onChange={handleChange} />
      </div>
      <button className="button" onClick={() => addNote(value)}>Save</button>
      {edit && <button className="button" onClick={() => editNote(value, editNoteIndex)}>SaveEdit</button>}
      <button className="button" onClick={() => searchNote(prompt())}>search</button>
      <ul>
        Поиск:
        {found}
      </ul>
    </div>
  )
}

export default App;
