import React, { Fragment, useState } from "react"
import { Listbox, Transition } from "@headlessui/react"
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid"
import { classNames } from "../utils/common.util"
import { CountryData } from "../types/country-backend"

interface ICountrySelector {
  countries: CountryData[]
  onSelection: (country: string) => void
}

const CountrySelector: React.FC<ICountrySelector> = ({ countries, onSelection }): JSX.Element => {
  const [selected, setSelected] = useState<CountryData | undefined>()

  return (
    <Listbox
      value={selected}
      onChange={(selection) => {
        setSelected(selection)
        onSelection(selection!.name.common)
      }}
    >
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium text-gray-700 sr-only">Select country ...</Listbox.Label>
          <div className="relative">
            <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-3 text-left cursor-default focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 sm:text-sm">
              {selected ? (
                <span className="flex items-center">
                  <img src={selected.flags.png} alt="Flag Icon" className="flex-shrink-0 h-6 w-8 rounded-sm" />
                  <span className="ml-3 block truncate">{selected.name.common}</span>
                </span>
              ) : (
                <span className="flex items-center">
                  <div className="flex-shrink-0 h-6" />
                  <span className="ml-3 block truncate">Please select a country ...</span>
                </span>
              )}

              <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-40 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {countries.map((country) => (
                  <Listbox.Option
                    key={country.name.common}
                    value={country}
                    className={({ active }) =>
                      classNames(
                        active ? "text-white bg-blue-600" : "text-gray-900",
                        "cursor-default select-none relative py-2 pl-3 pr-9"
                      )
                    }
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <img src={country.flags.png} alt="Flag Icon" className="flex-shrink-0 h-6 w-8 rounded-sm" />
                          <span
                            className={classNames(selected ? "font-semibold" : "font-normal", "ml-3 block truncate")}
                          >
                            {country.name.common}
                          </span>
                        </div>

                        {selected && (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-blue-600",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        )}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}

export default CountrySelector
