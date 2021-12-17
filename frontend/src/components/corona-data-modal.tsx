import React, { Fragment, memo, useCallback } from "react"
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from "chart.js"
import { Line } from "react-chartjs-2"
import { Dialog, Transition } from "@headlessui/react"
import { XIcon } from "@heroicons/react/outline"
import memoize from "memoize-one"
import { FixedSizeList as List, areEqual } from "react-window"

import Spinner from "./common/spinner"
import { useApi } from "../providers/ApiProvider"
import { classNames } from "../utils/common.util"
import { CoronaData, CoronaProperty } from "../types/corona-backend"

interface ICoronaDataModal {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const
    }
  }
}

const createItemData = memoize((coronaData: CoronaData[]) => ({
  coronaData
}))

const CoronaDataModal: React.FC<ICoronaDataModal> = ({ open, setOpen }) => {
  const { isLoadingCorona, coronaData } = useApi()
  const itemData = createItemData(coronaData)

  const formatDate = useCallback((date: Date | string) => {
    date = new Date(date)
    return `${date.getMonth() + 1}/${date.getFullYear()}`
  }, [])

  const labels = useCallback(() => {
    return [...new Set(coronaData.map((c) => formatDate(c.date)))]
  }, [coronaData])

  const calculateDateForProp = useCallback(
    (property: CoronaProperty) => {
      const data = []
      let index = 0
      let count = 0
      let startDate = formatDate(coronaData[0].date)

      for (const point of coronaData) {
        const pointDate = formatDate(point.date)

        if (pointDate === startDate) {
          index++
          count += point[property]!
          continue
        }

        // caluclate average of month
        data.push(count / index)

        // save first point of new date
        index = 1
        count = point[property]!
        startDate = pointDate
      }

      data.push(count / index)

      return data
    },
    [coronaData]
  )

  const deathsDataset = useCallback(() => {
    return {
      label: "Deaths",
      data: calculateDateForProp("deaths"),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)"
    }
  }, [labels])

  const activeDataset = useCallback(() => {
    return {
      label: "Active",
      data: calculateDateForProp("active"),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)"
    }
  }, [labels])

  const confirmedDataset = useCallback(() => {
    return {
      label: "Confirmed",
      data: calculateDateForProp("confirmed"),
      borderColor: "rgb(0, 205, 101)",
      backgroundColor: "rgba(0, 205, 101, 0.5)"
    }
  }, [labels])

  const chartData = useCallback(() => {
    return {
      labels: labels(),
      datasets: [activeDataset(), deathsDataset(), confirmedDataset()]
    }
  }, [activeDataset, deathsDataset, confirmedDataset])

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={setOpen}>
        <div className="flex min-h-screen text-center md:block md:px-2 lg:px-4" style={{ fontSize: 0 }}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="hidden fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity md:block" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden md:inline-block md:align-middle md:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            enterTo="opacity-100 translate-y-0 md:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 md:scale-100"
            leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
          >
            <div className="flex text-base text-left  transition w-full md:inline-block md:max-w-2xl md:px-4 md:my-8 md:align-middle lg:max-w-4xl">
              <div className="w-full relative flex items-center bg-white px-4 pt-14 pb-8 overflow-hidden shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                <button
                  type="button"
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Close</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                <div className="w-full sm:px-6">
                  <h2 className="text-xl font-medium text-gray-900 sm:pr-12">Corona Data</h2>

                  <section aria-labelledby="information-heading" className="mt-4">
                    <h3 id="information-heading" className="sr-only">
                      Corona Data
                    </h3>

                    <div className="border-t border-gray-200 pt-5">
                      {isLoadingCorona && <Spinner />}
                      {!isLoadingCorona && coronaData.length && (
                        <>
                          <Line options={options} data={chartData()} />
                          <div className="flex flex-col mt-4">
                            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                  <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50 table table-fixed w-full">
                                      <tr>
                                        <th
                                          scope="col"
                                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                          Date
                                        </th>
                                        <th
                                          scope="col"
                                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                          Active
                                        </th>
                                        <th
                                          scope="col"
                                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                          Deaths
                                        </th>
                                        <th
                                          scope="col"
                                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                          Confirmed
                                        </th>
                                        <th
                                          scope="col"
                                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                          Recovered
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody className="overflow-hidden block">
                                      <List
                                        height={260}
                                        itemCount={coronaData.length}
                                        itemData={itemData.coronaData}
                                        itemSize={52}
                                        width="100%"
                                      >
                                        {TableEntry}
                                      </List>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

const TableEntry = memo(({ data, index, style }: { data: CoronaData[]; index: number; style: React.CSSProperties }) => {
  const d = data[index]
  return (
    <tr
      style={style}
      key={index}
      className={classNames("table table-fixed w-full", index % 2 === 0 ? "bg-white" : "bg-gray-50")}
    >
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {new Date(d.date).toLocaleDateString("de-DE")}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{d.active}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{d.deaths}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{d.confirmed}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{d.recovered}</td>
    </tr>
  )
}, areEqual)

TableEntry.displayName = "TableEntry"

export default CoronaDataModal
