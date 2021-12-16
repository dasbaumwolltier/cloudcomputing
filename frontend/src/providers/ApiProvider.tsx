import React, { createContext, useContext, useState } from "react"

import { CoronaParams, CoronaResponse } from "../types/corona-backend"
import { useNotification } from "./NotificationProvider"

const CORONA_API_URL = "/corona/api"
const COUNTRY_API_URL = "/country/api"

const useApiProvider = () => {
  const { showNotification } = useNotification()

  const [isLoadingCountries, setLoadingCountries] = useState<boolean>(false)
  const [isLoadingCorona, setLoadingCorona] = useState<boolean>(false)
  const [countries, setCountries] = useState<string[] | undefined>()

  const fetchCorona = async (country: string, params?: CoronaParams) => {
    setLoadingCorona(true)

    try {
      const queryParams = new URLSearchParams(params)
      const response = await fetch(`${CORONA_API_URL}/${country}?${queryParams.toString()}`)

      if (!response.ok) {
        throw new Error(response.statusText)
      }

      const coronaData = (await response.json()) as CoronaResponse[]
      return coronaData
    } catch (err) {
      showNotification({ type: "error", message: `Error fetching corona data from API. ${err}` })
    } finally {
      setLoadingCorona(false)
    }
  }

  const fetchCountries = async () => {
    setLoadingCountries(true)

    try {
      const response = await fetch(COUNTRY_API_URL)

      if (!response.ok) {
        throw new Error(response.statusText)
      }

      const countries = (await response.json()) as string[]
      setCountries(countries)
      return countries
    } catch (err) {
      showNotification({ type: "error", message: `Error fetching countries from API. ${err}` })
    } finally {
      setLoadingCountries(false)
    }
  }

  return { isLoadingCountries, isLoadingCorona, countries, fetchCountries, fetchCorona }
}

export const ApiContext = createContext({})

export const ApiProvider = (props: { children: React.ReactNode }): JSX.Element => {
  const value = useApiProvider()

  return <ApiContext.Provider value={value}>{props.children}</ApiContext.Provider>
}

export const useApi = (): ReturnType<typeof useApiProvider> =>
  useContext(ApiContext) as ReturnType<typeof useApiProvider>
