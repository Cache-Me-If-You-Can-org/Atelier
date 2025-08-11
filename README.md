# Atelier Project

## Setup

Follow these steps to get the project running locally:

1. **Install Dependencies**
   Inside the root directory of the app (`path/to/Atelier`), open your terminal and run:
   ```bash
   npm install
   ```

2. **Start the Development Server**
   After installing dependencies, run:
   ```bash
   npm run server-dev
   ```
   This will start the server.
   then run:
   ```bash
   npm run client-dev
   ```

3. **Open in Browser**
   By default, the app will be available at:
   ```
   http://localhost:3000/
   ```

---

## CSS Guidelines

Our structured CSS approach to keep styles consistent and maintainable:

1. **`styles.css`**
   - Holds **theme variables** (`:root`) such as colors, spacing, typography.
   - Sets **default styles** for base HTML tags (`body`, `h1`, `p`, etc.).

2. **`global.module.css`**
   - Contains **utility classes** (e.g., `.flex`, `.stack`, `.fullWidth`) used across the application.

3. **Component-Specific `.module.css` Files**
   - Each component can have its own **local module** file.
   - Keeps component styles scoped and avoids conflicts.

### Importing Styles
So that we are not typing 6 letters 'styles' and 'global' each time we want to use our classes,
I recommend:

- **Global module** is imported using the alias `g`:
  ```jsx
  import * as g from '../path/to/global.module.css';
  ```

- **Component module** is imported using the alias `css`:
  ```jsx
  import * as css from './MyComponent.module.css';
  ```

### Example Usage
```jsx
import React from 'react';
import * as g from './styles/global.module.css';
import * as css from './component.module.css';

function MyComponent() {
  return (
   // multiple classes use case
    <div className={`${g.stack} ${g.fullWidth}`}>
      {/* single class use case */}
      <h1 className={css.title}>Hello World</h1>
      <p className={css.description}>This is my component.</p>
    </div>
  );
}

export default MyComponent;
```
---