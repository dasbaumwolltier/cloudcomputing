import React, { Fragment } from "react"
import { Transition } from "@headlessui/react"
import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/outline"
import { XIcon } from "@heroicons/react/solid"
import { StatusNotification } from "../../types/common"

const NotificationElement: React.FC<StatusNotification & { hide: () => void }> = ({ type, message, hide }) => {
  const getNotificationIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" />
      case "error":
        return <ExclamationCircleIcon className="h-6 w-6 text-red-400" aria-hidden="true" />
      default:
        return null
    }
  }

  const getNotificationTitle = () => {
    switch (type) {
      case "success":
        return "Erfolgreich"
      case "error":
        return "Fehler"
      default:
        return null
    }
  }

  return (
    <Transition
      show={true}
      as={Fragment}
      enter="ease-out duration-300 transition"
      enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enterTo="translate-y-0 opacity-100 sm:translate-x-0"
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
        <div className="p-4">
          <div className="flex items-start">
            <div className="shrink-0">{getNotificationIcon()}</div>
            <div className="ml-3 w-0 flex-1 pt-0.5">
              <p className="text-sm font-medium text-gray-900">{getNotificationTitle()}</p>
              <p className="mt-1 text-sm text-gray-500">{message}</p>
            </div>
            <div className="ml-4 shrink-0 flex">
              <button
                className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => hide()}
              >
                <span className="sr-only">Close</span>
                <XIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  )
}

export default NotificationElement
