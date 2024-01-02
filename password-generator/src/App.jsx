import { useState, useCallback, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import { dividerClasses } from '@mui/material'

function App() {
const [length, setLength] = useState(8)
const [numberAllowed, setNumberAllowed] = useState(false)
const [charAllowed, setCharAllowed] = useState(false)
const [password, setPassword] = useState("")
const passwordRef = useRef(null)
const copyTextToClip = useCallback(() => {
  passwordRef.current?.select()
  passwordRef.current?.setSelectionRange(0, 10)
  window.navigator.clipboard.writeText(password)
}, [password])

const passwordGenerator = useCallback( () => {
let pass = ""
let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
if(numberAllowed) str += "0123456789"
if(charAllowed) str += "!@#$%^&*()"

for ( let i = 1; i<= length; i++){
let char = Math.floor(Math.random() * str.length + 1)
pass += str.charAt(char)
}
setPassword(pass)
},
[length, numberAllowed, charAllowed, setPassword])

useEffect(() => {passwordGenerator()}, [length, numberAllowed, charAllowed, passwordGenerator])


  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-700 bg-black'>
      <h1 className='text-center text-white'>Generate Password</h1>
      <div className=' flex shadow rounded-lg overflow-hidden mb-4'>

       <input type="text"
       value={password}
       placeholder='password'
       className='outline-none w-full py-1 px-3'
       readOnly 
       ref={passwordRef}/> 
       <button
       onClick={copyTextToClip}
       className='px-3 py-1 text-white bg-blue-400'>Copy</button>
      
     
      </div>
      <div>
      <input 
      type="range"
      min={6}
      max={50}
      value={length}
  className='text-white cursor-pointer'
  onChange={(e) => {setLength(e.target.value)}}
       />
       <label className='text-white bg-blue-300'>length : {length}</label>
      </div>
      <div>
        <input 
        className='flex items-center gap-x-1'
        type="checkbox"
        defaultChecked = {numberAllowed}
        id='numberInput'
        onChange={() => {setNumberAllowed((prev) =>!prev )}} 
         />
         <label>Numbers</label>
      </div>
      <div>
        <input
        className='flex items-center gap-x-1'
        type="checkbox"
        defaultChecked = {charAllowed}
        id='charInput'
        onChange={() => {setCharAllowed((prev) =>!prev )}} 
         />
         <label>Charactors</label>
      </div>
      </div>
      
  )
}

export default App
