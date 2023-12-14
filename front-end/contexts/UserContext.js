import  React, { createContext, useState } from 'react';

export const UserContext = createContext({});

/*
    Em telas que precisam apenas USAR o contexto, importar UserContext e usar useContext(UserContext)
        import { UserContext } from './UserContext';
    Em telas que precisam USAR e ATUALIZAR o contexto, importar UserProvider e usar updateUserEmail(email)
        import { UserProvider } from './UserContext';
*/

function UserProvider({children}) {
    const [token, setToken] = useState({});
    const [email, setEmail] = useState({});

    function updateToken(token) {
        setToken(token);
    }
    function updateEmail(email) {
        setEmail(email);
    }

    return(
        <UserContext.Provider value={{ token, updateToken, email, updateEmail }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;