# OctoFit Frontend

This React 19 app uses `react-router-dom` and loads API data from the backend.

## Environment setup

`VITE_CODESPACE_NAME` must be defined when using a GitHub Codespace backend URL.

Example `.env.local`:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

The app will call:

- `https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/` when `VITE_CODESPACE_NAME` is set.
- `http://localhost:8000/api/[component]/` as a safe fallback when `VITE_CODESPACE_NAME` is unset.
