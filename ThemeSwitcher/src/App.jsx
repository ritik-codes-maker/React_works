import UserContextProvider from './context/UserContextProvider';
import { Login } from './pages';

function App() {


  return (
    <UserContextProvider>
       <Login/>
    </UserContextProvider>
  )
}

export default App
