import React from "react"
import { classNames } from "../../utils/common.util"

interface ISpinner {
  size?: "sm" | "md"
}

const Spinner: React.FC<ISpinner> = ({ size = "md" }): JSX.Element => (
  <div className="z-50 h-full md:h-3/4 flex justify-center items-center">
    <div
      className={classNames(
        "animate-spin rounded-full border-4 border-blue-200",
        size === "sm" ? "h-12 w-12" : "w-24 h-24"
      )}
      style={{
        borderTopColor: "#3069de",
        borderRightColor: "#bfdbfe",
        borderBottomColor: "#bfdbfe",
        borderLeftColor: "#bfdbfe"
      }}
    />
  </div>
)

export default Spinner
