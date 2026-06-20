import React from "react"
import { ColorRing } from "react-loader-spinner"

export default function Loader() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="color-ring-loading"
        wrapperClass="color-ring-wrapper"
        colors={["#1f3d34", "#2f5a4d", "#5b6460", "#b5482b", "#e4e1da"]}
      />
    </div>
  )
}