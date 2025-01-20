import React from "react"

const Input = (props) =>
{
  const { name, type, label, placeholder } = props
  return (
    <fieldset className="mt-5 mb-5 w-full">
      <label 
        htmlFor={name} 
        className="capitalize">
          {label}
      </label>
      <input 
        id={name} 
        name={name}
        type={type} 
        placeholder={placeholder}className="border-solid border-2 border-teal-950 outline-none p-1 block w-full"/>
    </fieldset>
  )
}

export default Input