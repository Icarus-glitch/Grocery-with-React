import './App.css';
import Lists from './components/Lists';
import Alert from './components/Alert';
import { useEffect, useState } from 'react';

//to stop getting empty array when refresh
const getLocalstorage = () => {
  let list = localStorage.getItem('list')
  if(list){
    return JSON.parse(localStorage.getItem('list'))
  }
  else{
    return []
  }
}

function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalstorage);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({show:false, mssg:' ',type:''})

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name) {
      //display alert
      showAlert(true,'please enter value','danger')
    }
    else if(name && isEditing) {
      //for editing
      setList(list.map((item) =>{
          if(item.id === editId) {
            return {...item, title: name}
          }
          return item
        }) 
      )
      setName('');
      setIsEditing(false);
      setEditId(null);
      showAlert(true,'item changed','success')


    }
    else{
      //show alert
      const newItem = {id: new Date().getTime().toString(), 
        title:name};
        setList([...list, newItem]);
        setName('')  
        showAlert(true, 'item added', 'success')
      }}
    const showAlert = (show= false, mssg="", type="") => {
      setAlert({show,type,mssg})
    }

    const clearList = () => {
      showAlert(true, 'empty List','danger');
      //if you want to wipe out all the values
      setList([])
    }

    const removeItem = (id) => {
      showAlert(true, 'item removed', 'warning')
      setList(list.filter((item) => item.id !==id)
    )}

    const editItem = (id) => {
      const specificItem = list.find((item) => item.id === id);
      setIsEditing(true)
      setEditId(id)
      setName(specificItem.title)
    }

    useEffect(() => {
      localStorage.setItem('list',JSON.stringify(list))
    }, [list])

    
    
  return (
    <main className='main am-5 text-center bg-secondary'>
    <section className=''>
      <form className='form' onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={Lists}/>}
        <h3 className='mt-3'>grocery store</h3>
        <div className='form-control bg-secondary'>
          <input type='text' className='grocery' placeholder='e.g. Vegies' value={name} onChange={(e) => setName(e.target.value)}/>
          <button type='submit' className="submit-btn btn-info"> 
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>
      {list.length> 0 ? (
        <div className='container'>
        <Lists items={list} removeItem={removeItem} editItem={editItem}/>
        <button className='btn' onClick={clearList}>Clear items</button>
      </div>  
      ) : <div className="fw-bold">Nothing to clear</div>}
    </section>
    </main>     
  );
}

export default App;
