# Google IO Extended 2026 - Buzzword Bingo

This folder contains a client-side Buzzword Bingo application.

## Running Locally

Because the application fetches the list of buzzwords dynamically from the `buzzwords` text file, modern web browser security policies (CORS) will block it if you attempt to open `index.html` directly via the `file://` protocol (e.g. double-clicking the file). To run and test the application locally, you must serve it using a local web server. Run the following command from this directory (`io/2026/`). Then open: [http://localhost:8000/](http://localhost:8000/).

```bash
python3 -m http.server 8000
```
