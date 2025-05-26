import React from 'react'

export const UserContext = React.createContext()

const userContext = ({children}) => {
  return (
    <div>
        <UserContext.Provider value={{}}>
            {children}
        </UserContext.Provider>
        
    </div>
  )
}

export default userContext