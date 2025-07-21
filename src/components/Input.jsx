import React from 'react'

const Input = ({
    label = '',
    placeholder = '',
    type = '',
    value = '',
    onChange = () => { },
    isRequired = true,
    className = ''
}) => {
    return (
        <div>
            <div>
                {label &&
                    <label className="block  text-[25px] mb-6  font-medium text-gray-900 dark:text-white">{label}</label>
                }
                <input type={type} className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${className}`} placeholder={placeholder} value={value} onChange={onChange} required={isRequired} />
            </div>
        </div>
    )
}

export default Input