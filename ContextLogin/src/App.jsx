import UserContextProvider from './context/UserContextProvider';
import { Login, Profile } from './pages';

function App() {


  return (
    <UserContextProvider>
       <Login/>
       <Profile/>
    </UserContextProvider>
  )
}

export default App
