import { Outlet } from "react-router-dom"

function App() {

  return (
    <div className=" m-auto">
        <h1 className='text-center text-white text-3xl pt-8 sm:text-4xl'>Github Users</h1>
        <Outlet/>
    </div>
  )
}

export default App
