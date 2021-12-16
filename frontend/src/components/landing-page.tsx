import React, { useEffect, useState } from "react"
import { useApi } from "../providers/ApiProvider"
import { useNotification } from "../providers/NotificationProvider"
import Spinner from "./common/spinner"
import CoronaDataModal from "./corona-data-modal"
import CountrySelector from "./country-selector"

const LandingPage = (): JSX.Element => {
  const { isLoadingCountries, countries, fetchCountries, fetchCorona } = useApi()
  const { showNotification } = useNotification()
  const [open, setOpen] = useState<boolean>(false)
  const [selectedCountry, setSelectedCountry] = useState<string | undefined>()

  useEffect(() => {
    fetchCountries()
  }, [])

  const fetchAndShowCoronaData = () => {
    if (!selectedCountry) {
      showNotification({ type: "error", message: "You need to select a country first" })
      return
    }

    fetchCorona(selectedCountry)
    setOpen(true)
  }

  return (
    <>
      <CoronaDataModal open={open} setOpen={setOpen} />
      <div className="bg-gray-50 h-screen flex flex-col">
        <div className="my-auto">
          <img src="/medical-icon.svg" className="mx-auto my-4 sm:my-0" width={375} />
          <div className="relative sm:py-12">
            <div aria-hidden="true" className="hidden sm:block">
              <div className="absolute inset-y-0 left-0 w-1/2 bg-gray-50 rounded-r-3xl" />
              <svg className="absolute top-4 left-1/2 -ml-3" width={404} height={392} fill="none" viewBox="0 0 404 392">
                <defs>
                  <pattern
                    id="8228f071-bcee-4ec8-905a-2a059a2cc4fb"
                    x={0}
                    y={0}
                    width={20}
                    height={20}
                    patternUnits="userSpaceOnUse"
                  >
                    <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                  </pattern>
                </defs>
                <rect width={404} height={392} fill="url(#8228f071-bcee-4ec8-905a-2a059a2cc4fb)" />
              </svg>
            </div>

            <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-6xl lg:px-8">
              <div className="relative rounded-2xl px-6 py-6 bg-blue-600  shadow-xl sm:px-12 sm:py-10">
                <div aria-hidden="true" className="absolute inset-0 -mt-72 sm:-mt-32 md:mt-0">
                  <svg
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="xMidYMid slice"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 1463 360"
                  >
                    <path
                      className="text-blue-500 text-opacity-40"
                      fill="currentColor"
                      d="M-82.673 72l1761.849 472.086-134.327 501.315-1761.85-472.086z"
                    />
                    <path
                      className="text-blue-700 text-opacity-40"
                      fill="currentColor"
                      d="M-217.088 544.086L1544.761 72l134.327 501.316-1761.849 472.086z"
                    />
                  </svg>
                </div>
                <div className="relative">
                  <div className="sm:text-center">
                    <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
                      Corona Data Fetcher
                    </h2>
                    <p className="mt-6 mx-auto max-w-2xl text-lg text-blue-200">
                      Select any country from the list below, optionally add additional filters to view the current
                      statistics of COVID-19 for the selected country
                    </p>
                  </div>
                  {isLoadingCountries ? (
                    <div className="mt-8 mb-1">
                      <Spinner size="sm" />
                    </div>
                  ) : (
                    <div className="mt-8 sm:mx-auto sm:max-w-lg sm:flex">
                      <div className="min-w-0 flex-1">
                        <CountrySelector countries={countries} onSelection={(country) => setSelectedCountry(country)} />
                      </div>
                      <div className="mt-4 sm:mt-0 sm:ml-3">
                        <button
                          type="button"
                          className="block w-full rounded-md border border-transparent px-5 py-3 bg-blue-500 text-base font-medium text-white shadow hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 sm:px-10"
                          onClick={() => fetchAndShowCoronaData()}
                          disabled={!selectedCountry}
                        >
                          Fetch Data
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LandingPage
