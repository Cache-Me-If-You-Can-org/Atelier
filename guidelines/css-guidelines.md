# CSS Guidelines

Our structured CSS approach to keep styles consistent and maintainable:

1. **`styles.css`**
   - Holds **theme variables** which can be referenced using the `var(--variable-name)` method native to css
   - CSS reset sets **default styles** for base HTML tags (`body`, `h1`, `p`, etc.).

2. **`global.module.css`**
   - Contains **utility classes** (`.center`, `.stack`, `.fullWidth`) that are used across the application.

3. **Component-Specific `.module.css` Files**
   - Each component can have its own **local module** file.

## Importing Styles
So that we are not typing 6 letters 'styles' and 'global' each time we want to use our css classes, I recommend:

**Global module** is imported using the alias `g`:
  ```jsx
  import * as g from '../path/to/global.module.css';
  ```

**Component module** is imported using the alias `css`:
  ```jsx
  import * as css from './MyComponent.module.css';
  ```

## Applying a Single Style
```jsx
(<h1 className={ css.title }>Hello World</h1>)
```

## Applying Multiple Styles
Back tick way
```jsx
(<div className={ `${g.stack} ${g.fullWidth}` }/>)
```
Array join way
```jsx
(<div className={ [g.stack, g.fullWidth].join(' ') }/>)
```