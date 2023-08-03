import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = () => (
  <ContentLoader 
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="122" cy="126" r="102" /> 
    <rect x="35" y="250" rx="0" ry="0" width="187" height="23" /> 
    <rect x="103" y="296" rx="0" ry="0" width="8" height="3" /> 
    <rect x="35" y="288" rx="0" ry="0" width="187" height="55" /> 
    <rect x="34" y="363" rx="0" ry="0" width="60" height="22" />
  </ContentLoader>
)

export default MyLoader