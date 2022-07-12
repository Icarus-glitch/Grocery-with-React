import React from 'react'
import { useEffect } from 'react'

const Alert = ({type, mssg, removeAlert, list}) => {
  //useEfffect for showing the alerts and [list] is for new secs to start for new alert
  useEffect (() => {
    const timeout = setTimeout(()=>{
      removeAlert()
    }, 3000)
    return () =>  clearTimeout(timeout)
    
  }, [list])
  
  return (
    <>
      <div className='p-5'>
        <p className={`alert  alert-${type}`}>{mssg}</p>
      </div>
    </>  
  )
}

export default Alert