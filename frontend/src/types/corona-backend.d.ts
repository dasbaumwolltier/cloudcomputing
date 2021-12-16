export type CoronaParams = {
  propery: CoronaProperty
  from: string
  to: string
}

export type CoronaProperty = "Confirmed" | "Deaths" | "Recovered" | "Active"

export type CoronaData = {
  country: string
  date: string
  confirmed?: number
  deaths?: number
  recovered?: number
  active?: number
}
