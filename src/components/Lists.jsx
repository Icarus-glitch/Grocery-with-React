import React from 'react'
import { FaAlgolia, FaEdit, FaTablet, FaTractor, FaTrash } from 'react-icons/fa'

const Lists = ({items, removeItem, editItem }) => {
  return (
    <>
      {items.map((item) => {
        const {id, title} = item;
        return (
          <article key={id} className="grocery-item mt-3">
            <div className=''>
              <p className='mine'>{title}</p>
            </div>
            <div className='btn btn-container'>
              <button type='button'>
                <FaEdit className='text-success' 
                onClick={() => editItem(id)} />
              </button>
              <button 
              type='button'>
                <FaTrash 
                className='text-danger' 
                onClick={() =>removeItem(id)}/>
              </button>
            </div>
          </article>
        )
      })}
    </>  
  )
}

export default Lists