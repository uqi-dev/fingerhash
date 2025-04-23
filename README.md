# FingerHash

A powerful browser fingerprinting library that generates unique visitor identifiers by collecting various browser and device characteristics.

## Features

- 🎯 Accurate browser fingerprinting
- 🔒 Privacy-focused
- 🚀 Lightweight and fast
- 📦 Zero dependencies
- 🛠 TypeScript support
- 🌐 Cross-browser compatibility

## Installation

### Using npm

```bash
npm install fingerhash
```

### Using pnpm

```bash
pnpm add fingerhash
```

### Using yarn

```bash
yarn add fingerhash
```

### Using bun

```bash
bun add fingerhash
```

## Usage

### Basic Usage

```javascript
import FingerHash from 'fingerhash';

const fingerhash = new FingerHash();

// Get fingerprint
fingerhash.getFingerprint().then((result) => {
  console.log(result);
  // {
  //   visitorId: "unique-hash",
  //   components: {
  //     userAgent: "...",
  //     canvasFingerprint: "...",
  //     webglFingerprint: "...",
  //     // ... more components
  //   },
  //   confidence: 0.95
  // }
});
```

### Available Components

The fingerprint includes the following components:

- `userAgent`: Browser user agent string
- `userAgentVersion`: Browser version
- `timezone`: User's timezone
- `language`: Browser language
- `deviceMemory`: Device memory (if available)
- `hardwareConcurrency`: Number of CPU cores
- `canvasFingerprint`: Canvas rendering fingerprint
- `webglFingerprint`: WebGL rendering fingerprint
- `webglExtensions`: Available WebGL extensions
- `audioFingerprint`: Audio context fingerprint
- `installedFonts`: List of installed fonts
- `touchSupport`: Touch capabilities
- `platform`: Operating system platform
- `cookiesEnabled`: Cookie support
- `localStorage`: Local storage availability
- `sessionStorage`: Session storage availability
- `navigatorLanguages`: Browser languages
- `doNotTrack`: Do Not Track setting
- `plugins`: Browser plugins
- `mimeTypes`: Supported MIME types
- `adBlockDetected`: Ad blocker detection
- `mathPrecision`: Math precision values
- `gpuRenderer`: GPU renderer information

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## License

MIT © [uqi-dev](https://github.com/uqi-dev)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Security

This library is designed with privacy in mind. It only collects non-personally identifiable information that is commonly available to websites. The fingerprinting process is done entirely on the client side, and no data is sent to external servers.

## Support

If you encounter any issues or have questions, please [open an issue](https://github.com/uqi-dev/fingerhash/issues) on GitHub.
