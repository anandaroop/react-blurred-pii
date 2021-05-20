import * as React from "react"
import { withBlurredPII, BlurredPIIOptions } from "../helpers"

type Props = BlurredPIIOptions & {
  /** Element with which to wrap the PII. Defaults to `span`. */
  as?: React.ElementType
}

/**
 * Will use the `shouldBlur` value from its ancestor `<BlurredPIIProvider>`
 * component to decide whether or not to blur.
 */
export const PII: React.FC<Props> = (props) => {
  const { color, blurAmount, additionalCSS, children } = props
  const htmlElement = props.as ?? "span"

  return React.createElement(
    htmlElement,
    {
      style: withBlurredPII({ color, blurAmount, additionalCSS }),
    },
    children
  )
}
