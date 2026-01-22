# Wind-hoes Browser Extension

A mocking browser extension that replaces every instance of the word "windows" with "wind-hoes" on any web page you visit. (inspired by microslop), Personally, I don't hate Microsoft, but I hate Windows mostly because it gave me a hard time when I tried to use it on my old laptop.

## Features
- **Case-Sensitive Replacement**: Preserves the original case ("Windows" -> "Wind-hoes", "WINDOWS" -> "WIND-HOES").
- **Dynamic Content**: Uses `MutationObserver` to catch "windows" even in content loaded after the page starts.
- **Cross-Browser**: Built with Manifest V3, compatible with Chrome, Firefox, and Edge.

## Installation

### For Chrome / Edge / Brave
1. Clone this repository or download the files.
2. Run `pnpm install` and `pnpm run build`.
3. Open Chrome and navigate to `chrome://extensions/`.
4. Enable **Developer mode** (toggle in the top right).
5. Click **Load unpacked** and select the `dist` folder in this project directory.

### For Firefox
1. Clone this repository or download the files.
2. Run `pnpm install` and `pnpm run build`.
3. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`.
4. Click **Load Temporary Add-on...**.
5. Select the `manifest.json` file inside the `dist` folder.

## Development
To run in development mode with automatic rebuilding:
```bash
pnpm run dev
```

## Structure
- `src/content.ts`: The main logic for finding and replacing text.
- `manifest.json`: Extension configuration.
- `webpack.config.js`: Bundling configuration.
