import { useState } from 'react'

function App() {
  const [bgColor , setBgColor] = useState("black");
  const colors = [
  { id: 0, colorName: "blue", styleName: "blue" },
  { id: 1, colorName: "red", styleName: "red" },
  { id: 2, colorName: "green", styleName: "green" },
  { id: 3, colorName: "yellow", styleName: "yellow" },
  { id: 4, colorName: "orange", styleName: "orange" },
  { id: 5, colorName: "purple", styleName: "purple" },
  { id: 6, colorName: "pink", styleName: "pink" },
  { id: 7, colorName: "indigo", styleName: "indigo" }
  ]
  
  return (
    <>
    <div className="w-screen h-screen" 
      style={{backgroundColor : bgColor}}>
      <h1 className="bg-transparent text-white text-center py-5 text-4xl">ColorSwitcher Project</h1>
      <div className="fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-4">
        <div className="flex flex-wrap justify-center gap-3 shadow-lg bg-white px-5 py-3 rounded-3xl" >
          {colors.map((color)=>{
              return <button 
                    className="outline-none text-black shadow-lg rounded-full px-3 py-2 cursor-pointer"
                   style={{backgroundColor : color.colorName}}
                   onClick={()=>setBgColor(color.colorName)}
              >{color.colorName}</button>
          })}
        </div>
      </div>

    </div>


    </>
  )
}

export default App
