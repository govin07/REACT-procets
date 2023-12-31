import { useState, useCallback, useEffect,useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'


function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);
  const [Password, setPassword] = useState("")
// useRef hooks
const passwordRef = useRef(null)


 const passwordGenrater = useCallback(() => {
  let pass = ""
  let str = " ABCDEFGHIJKLMNOPQRSTVWXYZabcdefghijklmnopqrstvwxyz"
  if(numberAllowed) str += "0123456789"
  if(character) str += "!@#$%^&*()_?|><{}"

  for(let i = 1; i <= length; i++) {
    let char = Math.floor(Math.random() * str.length + 1);
    pass += str.charAt(char)
  }
  setPassword(pass)



 }, [length, numberAllowed, character , setPassword])

 const copyPasswordToClipboard = useCallback(() => {
  passwordRef.current?.select()
  window.navigator.clipboard.writeText(password)
 }, [Password])

 useEffect(() => {
  passwordGenrater()
 }, [length, numberAllowed, character , passwordGenrater])

  return (
    <>
     <div className='w-full   max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-500
     '>
      <h2 className='text-white text-center my-3'>Password genrater</h2>

      <div className='flex shadow rounded-lg overflow-hidden mb-6'>
        <input type="text"
        value={Password}
        className='outline-none w-full py-1 px-3'
        placeholder='password'
        readOnly
        ref={passwordRef} />
        <button 
        onClick={copyPasswordToClipboard}
        className='ouline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input 
          type="range"
          min={6}
          max={100}
          value={length}
          className='cursor-pointerS mb-3'
          onChange={(e) => {setLength
          (e.target.value)}}/>
          <label className='text-white mb-4'>Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input className='mb-3' type="checkbox"
          defaultChecked={numberAllowed}
          id="numberInput"
          onClick={()=> {
            setNumber((prev)=> !prev);
          }} />
          <label className='text-white mb-3'> numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input className='mb-3' type="checkbox"
          defaultChecked={character}
          id="characterInput"
          onChange={() => {
            setCharacter((prev) => !prev);
          }}
          
          
          />
          <label className='text-white mb-3'>character</label>
        </div>
      </div>
     </div>
    </>
  )
}

export default App
