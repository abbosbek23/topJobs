import  { useState } from 'react'
import { createContext } from 'react'


export const MainContext = createContext(null);

export const Context = ({children}) => {
    const [user,setUser] = useState(null)
    
   function users(data){
   setUser(data)
   }
  return (
    <MainContext.Provider value={{user,users,}}>
    {children}
    </MainContext.Provider>
  )
}

