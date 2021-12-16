export type CoronaParams = {
  propery: CoronaProperty
  from: string
  to: string
}

export type CoronaProperty = "confirmed" | "deaths" | "recovered" | "active"

export type CoronaData = {
  country: string
  date: string
  confirmed?: number
  deaths?: number
  recovered?: number
  active?: number
}
