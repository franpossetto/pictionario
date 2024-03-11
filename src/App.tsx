import './App.css'
import firebase from './Config/firebase';
import Login from './Pages/Login.tsx';


function App() {
  console.log(firebase);

  return (
    <>
      <Login />
    </>
  )
}

export default App
