import { Outlet } from "react-router-dom"

function App() {

  return (
    <div className=" m-auto">
        <h1 className='text-center text-4xl mt-8'>Github Users</h1>
      <Outlet/>
    </div>
  )
}

export default App
