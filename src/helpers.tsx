import * as React from "react"
import { BlurredPIIContext } from "./context/BlurredPIIContext"

export interface BlurredPIIOptions {
  /** Color of the text being blurred. Defaults to `black`. */
  color?: string

  /** Amount of blur to apply. Defaults to 8 (pixels). */
  blurAmount?: number

  /** Any other CSS declarations to mix in with the blurred text styles. */
  additionalCSS?: React.CSSProperties
}

export const withBlurredPII = (
  options?: BlurredPIIOptions
): React.CSSProperties => {
  const { color, blurAmount, additionalCSS } = options ?? {}
  const shouldBlurPII = React.useContext(BlurredPIIContext)

  if (!shouldBlurPII) {
    return additionalCSS ?? {}
  } else {
    return {
      ...(additionalCSS ?? {}),
      color: "transparent",
      textShadow: `0 0 ${blurAmount ?? 8}px ${color ?? "black"}`,
    }
  }
}
