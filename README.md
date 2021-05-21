# react-blurred-pii

This libary provides React components that can be used for protecting personally identifying information (PII) in screenshots and screencaps. It does so by blurring them with pure CSS techniques.

<img src="https://user-images.githubusercontent.com/140521/119067134-629ffe80-b9af-11eb-84dd-da16ae54a7f1.gif" />

Note that the resulting UI is is thus safe to document visually, but _**not**_ safe to share with untrusted users, since all PII remains in the markup itself.

If that meets your needs, using it is simple.

## Installation

Install, e.g. with Yarn:

```
yarn add @anandaroop/react-blurred-pii
```

## Basic usage

Consider this simple app:

```jsx
const Demo = () => {
  return (
    <MyApp>
      <MyComponent>Name: {fullName}</MyComponent>
    </MyApp>
  )
}
```

The first step is to wrap your app (or some component tree) in a `BlurredPIIProvider` and toggle the `shouldBlur` flag to `true` or `false`, as needed.

```diff
+import { BlurredPIIProvider } from "@anandaroop/react-blurred-pii"

 export const Demo = () => {
   return (
+    <BlurredPIIProvider shouldBlur={true}>
       <MyApp>
         <MyComponent>Name: {fullName}</MyComponent>
       </MyApp>
+    </BlurredPIIProvider>
   )
 }
```

Once wrapped, any descendant `PII` component will follow suit by blurring or un-blurring accordingly.

```diff
-import { BlurredPIIProvider } from "@anandaroop/react-blurred-pii"
+import { BlurredPIIProvider, PII } from "@anandaroop/react-blurred-pii"

 export const Demo = () => {
   return (
     <BlurredPIIProvider shouldBlur={true}>
       <MyApp>
-        <MyComponent>Name: {fullName}</MyComponent>
+        <MyComponent>Name: <PII>{fullName}</PII></MyComponent>
       </MyApp>
     </BlurredPIIProvider>
   )
```

The final result:

```jsx
import { BlurredPIIProvider, PII } from "@anandaroop/react-blurred-pii"

export const Demo = () => {
  return (
    <BlurredPIIProvider shouldBlur={true}>
      <MyApp>
        <MyComponent>Name: <PII>{fullName}</PII></MyComponent>
      </MyApp>
    </BlurredPIIProvider>
  )
}
```

---

## `PII` Options

`PII` has sensible defaults for blurring short snippets of typical body text, but is customizable as well.

#### `as: string`

`PII` will render a `span` by default, but you can choose any other HTML element:

```js
<MyComponent>
  Name: <PII as="pre">{fullName}</PII>
</MyComponent>
```

#### `color: string`

`PII` assumes black text, but can generate a blur in any other color as well.

```js
<MyComponent>
  Name: <PII color="red">{fullName}</PII>
</MyComponent>
```

#### `blurAmount: number`

`PII` generates an 8px blur by default, adequate for typical body text. But it can be customized for larger text sizes.

```js
<MyComponent>
  Name: <PII blurAmount={20}>{fullName}</PII>
</MyComponent>
```

#### `additionalCSS: object`

If you need additional inline styles other than what `PII` generates, you can provide those as well.

```js
<MyComponent>
  Name: <PII additionalCSS={{
    lineHeight: "2em",
    letterSpacing: "0.5em",
  }}>{fullName}</PII>
</MyComponent>
```


