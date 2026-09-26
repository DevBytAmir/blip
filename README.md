<div align="center">

# Blip

Generate a minimal profile picture from any word using Morse code. Dots and dashes get arranged into a pattern, and that's the whole picture, no extra decoration.

[![CI](https://github.com/DevBytAmir/blip/actions/workflows/ci.yml/badge.svg)](https://github.com/DevBytAmir/blip/actions/workflows/ci.yml)
[![Deploy](https://github.com/DevBytAmir/blip/actions/workflows/deploy.yml/badge.svg)](https://github.com/DevBytAmir/blip/actions/workflows/deploy.yml)
[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE)

**[Try it](https://devbytamir.github.io/blip/)**

</div>

## Features

- Type any word, watch it turn into Morse code live, dot/dash sequence shown right below the input
- 9 layouts: grid rows, concentric circles, radial spokes, single spiral, honeycomb capsules, barcode bars, wave line, orbiting ellipses, pixel matrix
- Style presets and manual stroke width / spacing / rotation / frame shape controls (controls that don't apply to the current layout gray themselves out)
- 7 color themes, or set fully custom solid/gradient colors for the background and mark
- Randomize with one-step undo
- Export to PNG (pick a resolution) or SVG
- Share a design via URL, or save it locally to a "Stash"
- Light and dark mode, follows your system by default

## Development

```bash
npm install
npm run dev
```

Run the tests:

```bash
npm test
```

## Stack

React, Vite, TypeScript. Static site, no backend, deployed to GitHub Pages.

## License

Apache 2.0, see [LICENSE](LICENSE).
