import React, { useState } from 'react'

export const UserContext = React.createContext()

const userContext = ({children}) => {

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
  })

  return (
    <div>
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
        
    </div>
  )
}

export default userContext