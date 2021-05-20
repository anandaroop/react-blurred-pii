import * as React from "react"
import { withBlurredPII, BlurredPIIOptions } from "./helpers"

interface UseBlurredPII {
  withBlurredPII: (options?: BlurredPIIOptions) => React.CSSProperties
}

export const useBlurredPII = (): UseBlurredPII => {
  return {
    withBlurredPII,
  }
}
