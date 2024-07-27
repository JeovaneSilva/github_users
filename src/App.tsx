import { Outlet } from "react-router-dom"

function App() {

  return (
    <div className=" m-auto">
        <h1 className='text-center text-white text-2xl pt-4 sm:text-4xl sm:pt-8'>Github Users</h1>
        <Outlet/>
    </div>
  )
}

export default App
