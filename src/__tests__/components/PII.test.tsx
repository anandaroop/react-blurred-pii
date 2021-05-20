import React from "react"
import { render, unmountComponentAtNode } from "react-dom"
import { act } from "react-dom/test-utils"

import { BlurredPIIProvider, PII } from "../.."

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
  it("renders plain markup", () => {
    const TestApp = () => {
      return (
        <BlurredPIIProvider shouldBlur={false}>
          <PII>Secret</PII>
        </BlurredPIIProvider>
      )
    }

    act(() => {
      render(<TestApp />, container)
    })

    expect(container).toMatchInlineSnapshot(`
              <main>
                <span>
                  Secret
                </span>
              </main>
          `)
  })
})

describe("when BlurredPIIProvider shouldBlur=true", () => {
  it("renders blurred markup", () => {
    const TestApp = () => {
      return (
        <BlurredPIIProvider shouldBlur={true}>
          <PII>Secret</PII>
        </BlurredPIIProvider>
      )
    }

    act(() => {
      render(<TestApp />, container)
    })

    expect(container).toMatchInlineSnapshot(`
        <main>
          <span
            style="color: transparent; text-shadow: 0 0 8px black;"
          >
            Secret
          </span>
        </main>
      `)
  })
})
