import React from "react"

const Input = (props) =>
{
  const { name, type, label, placeholder, accept, step, value } = props
  return (
    <fieldset className="mt-5 mb-5 w-full">
      <label 
        htmlFor={name} 
        className="block text-sm font-medium text-gray-700">
          {label}
      </label>
      <input 
        id={name} 
        name={name}
        type={type} 
        placeholder={placeholder}className="block w-full border border-gray-300 rounded-lg p-2 mt-1"
        accept={accept? accept : "*"}
        step={step? step : "1"}
        defaultValue={value? value : null}
        />
    </fieldset>
  )
}

export default Input