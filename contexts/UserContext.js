import  React, { createContext, useState } from 'react';

export const UserContext = createContext({});

/*
    Em telas que precisam apenas USAR o contexto, importar UserContext e usar useContext(UserContext)
        import { UserContext } from './UserContext';
    Em telas que precisam USAR e ATUALIZAR o contexto, importar UserProvider e usar updateUserEmail(email)
        import { UserProvider } from './UserContext';
*/

function UserProvider({children}) {
    const [email, setEmail] = useState({});

    function updateEmail(email) {
        setEmail(email);
    }

    return(
        <UserContext.Provider value={{ email, updateEmail }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;

// export const UserProvider = ({ children }) => {
//     const [userEmail, setUserEmail] = useState('');
//
//     const updateUserEmail = (email) => {
//         setUserEmail(email);
//     };
//
//     return (
//         <UserContext.Provider value={{ email: userEmail, updateEmail: updateUserEmail}}>
//             {children}
//         </UserContext.Provider>
//     );
// };