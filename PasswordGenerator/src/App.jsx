import {useState,useCallback ,useEffect ,useRef} from 'react';
function App() {
  const [password,setPassword] = useState("");
  const [length, setLength] = useState(12);
  const [charAllowed, setCharAllowed] = useState(false);
  const [numbersAllowed , setNumbersAllowed] = useState(false);
  //useRef : it store the values that persist across render (value sambhal ke rakhta he change nahi karta state or render hone par )
  const passwordRef = useRef(null); 
  const passwordGenerator = useCallback(()=>{  // useCallback : used to memoize the function so it doesnot call recurrsively across re-renders
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSUVWXYZabcdefghijklmnopqrstuvwxyz";
    let nums = "0123456789";
    let chars = "@#$%^&*(_+{)}!~`";

    for(let i = 0;i<length;i++){
      if(charAllowed) str += chars;
      if(numbersAllowed) str += nums;
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length , charAllowed, numbersAllowed , setPassword]);

  useEffect(()=>{
    passwordGenerator();
  },[length, charAllowed , numbersAllowed , passwordGenerator]);
  const handleCopyPassword = useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);
  return (
    <>
      
      <div className="max-w-md mx-auto my-4 px-5 py-3 bg-gray-800 rounded-lg text-amber-600 font-bold">
        <h1 className="text-3xl font-bold text-center text-white py-5 ">Password Generator</h1>
        <div className="w-full flex overflow-hidden">
          <input
           className= "px-3 py-2 outline-none w-full bg-white rounded-l-lg "
           type="text"
           ref={passwordRef}
           value={password}
           placeholder="password"
           readOnly
          />
          <button className="px-1 py-2 outline-none w-full bg-green-700 text-white hover:text-shadow-mauve-400 max-w-16 text-xl  rounded-r-lg cursor-pointer hover:bg-green-500"
            onClick ={handleCopyPassword}
          >
            copy
          </button>
        </div>
        <div className=" flex text-sm gap-x-2 py-2">
          <div className ="flex items-center gap-x-1">
            <input
             type="range"
             value={length}
             min={8}
             max={20}
             className="cursor-pointer"
             onChange={(e)=> setLength(e.target.value)}
            />
            <label>length : {length}</label>
            
          </div>
            <div className ="flex items-center gap-x-2">
            <input
             type="checkbox"
             defaultChecked = {numbersAllowed}
             className="cursor-pointer"
             id="numInput"
             onChange = {()=> setNumbersAllowed((prev)=> !prev )}
            />
            <label>numbers</label>
            
          </div>
            <div className ="flex items-center gap-x-1">
           <input
             type="checkbox"
             defaultChecked = {charAllowed}
             className="cursor-pointer "
             id="charInput"
             onChange = {()=> setCharAllowed((prev)=> !prev )}
            />
            <label>characters</label>
            
          </div>
        </div>
      </div>
    </>
  )
}

export default App
