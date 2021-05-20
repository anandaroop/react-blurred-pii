import React from "react"
import { render, unmountComponentAtNode } from "react-dom"
import { act } from "react-dom/test-utils"

import { BlurredPIIProvider, useBlurredPII } from ".."

let container: HTMLElement

beforeEach(() => {
  container = document.createElement("main")
  document.body.appendChild(container)
})

afterEach(() => {
  unmountComponentAtNode(container)
  container.remove()
})

describe("when BlurredPIIProvider shouldBlur=false", () => {
  describe("useBlurredPII hook", () => {
    it("returns plain styles", () => {
      const TestComponent = () => {
        const { withBlurredPII } = useBlurredPII()

        return (
          <div
            style={withBlurredPII({
              additionalCSS: {
                letterSpacing: "0.1em",
              },
            })}
          >
            Secret
          </div>
        )
      }

      const TestApp = () => {
        return (
          <BlurredPIIProvider shouldBlur={false}>
            <TestComponent />
          </BlurredPIIProvider>
        )
      }

      act(() => {
        render(<TestApp />, container)
      })

      expect(container).toMatchInlineSnapshot(`
        <main>
          <div
            style="letter-spacing: 0.1em;"
          >
            Secret
          </div>
        </main>
      `)
    })
  })
})

describe("when BlurredPIIProvider shouldBlur=true", () => {
  describe("useBlurredPII hook", () => {
    it("returns blurred styles", () => {
      const TestComponent = () => {
        const { withBlurredPII } = useBlurredPII()

        return (
          <div
            style={withBlurredPII({
              additionalCSS: {
                letterSpacing: "0.1em",
              },
            })}
          >
            Secret
          </div>
        )
      }

      const TestApp = () => {
        return (
          <BlurredPIIProvider shouldBlur={true}>
            <TestComponent />
          </BlurredPIIProvider>
        )
      }

      act(() => {
        render(<TestApp />, container)
      })

      expect(container).toMatchInlineSnapshot(`
        <main>
          <div
            style="letter-spacing: 0.1em; color: transparent; text-shadow: 0 0 8px black;"
          >
            Secret
          </div>
        </main>
      `)
    })
  })
})
