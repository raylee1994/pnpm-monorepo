import React, { useContext, useEffect, useRef, useState } from 'react'
import { useAutoControlledState } from './useAutoControlledState'

const SelectContext = React.createContext()

function Option({ value, children, ...rest }) {
  const context = useContext(SelectContext)
  if (context === undefined)
    throw new Error('Select.Option must be used within Select')

  const { state, setState, finalOptions, setFinalOptions } = context

  useEffect(() => {
    setFinalOptions((prev) =>
      prev.filter((item) => item.value !== value).concat({ value, children })
    )

    return () =>
      setFinalOptions((prev) => prev.filter((item) => item.value !== value))
  }, [value, children, setFinalOptions])

  const isActive = value === state

  return (
    <div
      className="Option"
      ref={(el) => {
        if (el) {
          if (isActive) {
            el.dataset.isActive = isActive
          } else {
            delete el.dataset.isActive
          }
        }
      }}
      onClick={() => setState(value)}
      {...rest}
    >
      {children}
    </div>
  )
}

export function Select({
  options = [],
  value,
  defaultValue,
  onChange,
  optionsMapping,
  children,
  ...rest
}) {
  const [state, setState] = useAutoControlledState({
    value,
    defaultValue,
    onChange,
  })

  const mappedOptions = optionsMapping
    ? options.map(optionsMapping)
    : options.map((item) => ({
        value: typeof item === 'object' ? item.value : item,
        children: typeof item === 'object' ? item.children : item,
      }))

  const [finalOptions, setFinalOptions] = useState(mappedOptions)

  const selected = finalOptions.find((item) => item.value === state)

  return (
    <SelectContext.Provider
      value={{
        state,
        setState,
        finalOptions,
        setFinalOptions,
      }}
    >
      <details>
        <summary className="selected">{selected?.children}</summary>
        <div className="options">
          {mappedOptions.map((item) => (
            <Option key={item.value} value={item.value}>
              {item.children}
            </Option>
          ))}
          {children}
        </div>
      </details>
    </SelectContext.Provider>
  )
}

Select.Option = Option
