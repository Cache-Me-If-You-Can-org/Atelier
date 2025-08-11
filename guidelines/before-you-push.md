# Before You Push

## 1. Make Sure Your Branch is Up to Date with Main

Commit all your local changes to your branch.

Pull the latest changes from `main` into your branch:
  ```bash
  git pull origin main
  ```
Resolve any merge conflicts that appear.

## 2. Run the Linter

This will report any linting errors or warnings.

```bash
npm run lint
```

Auto fix by running

```bash
npm run lint:fix
```

> Note: Not all issues can be auto-fixed — you may still need to resolve some manually.

## 3. Final Touchups

Remove any debugging logs (`console.log`)

---

