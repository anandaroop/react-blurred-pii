import React from "react"
import { render, unmountComponentAtNode } from "react-dom"
import { act } from "react-dom/test-utils"

import { Hello } from "../Hello"

let container: HTMLElement

beforeEach(() => {
  container = document.createElement("main")
  document.body.appendChild(container)
})

afterEach(() => {
  unmountComponentAtNode(container)
  container.remove()
})

it("renders", () => {
  const TestApp = () => {
    return <Hello />
  }

  act(() => {
    render(<TestApp />, container)
  })

  expect(container).toMatchInlineSnapshot(`
    <main>
      <div>
        Hello!
      </div>
    </main>
  `)
})
