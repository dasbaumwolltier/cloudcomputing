import React, { createContext, useContext, useState } from "react"

import NotificationElement from "../components/common/notification-element"
import { StatusNotification } from "../types/common"

const useProvideNotification = () => {
  const [notifications, setNotifications] = useState<StatusNotification[]>([])

  const showNotification = (notifcation: StatusNotification) => {
    setNotifications((current) => {
      if (!notifcation.id) {
        notifcation.id = Math.floor(Math.random() * 10000 + 10)
      }

      // auto-hide after 5sec.
      window.setTimeout(() => hideNotification(notifcation.id), 5000)
      return [...current, notifcation]
    })
  }

  const hideNotification = (notificationId?: number) => {
    if (!notificationId) {
      return
    }

    setNotifications((current) => {
      const index = current.findIndex((n) => n.id === notificationId)
      if (index !== -1) {
        current.splice(index, 1)
      }
      return [...current]
    })
  }

  return { notifications, showNotification, hideNotification }
}

const NotificationContext = createContext({})

export const NotificationProvider = (props: { children: React.ReactNode }): JSX.Element => {
  const value = useProvideNotification()

  return (
    <NotificationContext.Provider value={value}>
      {props.children}

      <div
        aria-live="assertive"
        className="fixed z-20 inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
      >
        <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
          {value.notifications.map((notification, i) => (
            <NotificationElement
              key={i}
              type={notification.type}
              message={notification.message}
              hide={() => value.hideNotification(notification.id)}
            />
          ))}
        </div>
      </div>
    </NotificationContext.Provider>
  )
}

export const useNotification = (): ReturnType<typeof useProvideNotification> =>
  useContext(NotificationContext) as ReturnType<typeof useProvideNotification>
