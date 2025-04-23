export function getMediaQuerySupport(): {
  matchMedia: boolean;
  mediaQueries: {
    [key: string]: boolean;
  };
} {
  const support = {
    matchMedia: typeof window.matchMedia === 'function',
    mediaQueries: {
      // Common media queries
      'prefers-color-scheme': window.matchMedia('(prefers-color-scheme: dark)')
        .matches,
      'prefers-reduced-motion': window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches,
      'prefers-reduced-transparency': window.matchMedia(
        '(prefers-reduced-transparency: reduce)'
      ).matches,
      'prefers-contrast': window.matchMedia('(prefers-contrast: more)').matches,
      hover: window.matchMedia('(hover: hover)').matches,
      pointer: window.matchMedia('(pointer: fine)').matches,
      'any-hover': window.matchMedia('(any-hover: hover)').matches,
      'any-pointer': window.matchMedia('(any-pointer: fine)').matches,
      // Device capabilities
      touch: window.matchMedia('(hover: none) and (pointer: coarse)').matches,
      retina: window.matchMedia(
        '(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)'
      ).matches,
      // Screen size
      mobile: window.matchMedia('(max-width: 767px)').matches,
      tablet: window.matchMedia('(min-width: 768px) and (max-width: 1023px)')
        .matches,
      desktop: window.matchMedia('(min-width: 1024px)').matches,
      // Orientation
      portrait: window.matchMedia('(orientation: portrait)').matches,
      landscape: window.matchMedia('(orientation: landscape)').matches,
      // Print
      print: window.matchMedia('print').matches,
      // Color
      color: window.matchMedia('(color)').matches,
      'color-gamut': window.matchMedia('(color-gamut: srgb)').matches,
      // Display
      'display-mode': window.matchMedia('(display-mode: standalone)').matches,
      'inverted-colors': window.matchMedia('(inverted-colors: inverted)')
        .matches,
      // Scripting
      scripting: window.matchMedia('(scripting: enabled)').matches,
      // Update
      update: window.matchMedia('(update: fast)').matches,
      // Overflow
      'overflow-block': window.matchMedia('(overflow-block: scroll)').matches,
      'overflow-inline': window.matchMedia('(overflow-inline: scroll)').matches,
      // Grid
      grid: window.matchMedia('(display: grid)').matches,
      // 3D
      'transform-3d': window.matchMedia('(transform: translate3d(0,0,0))')
        .matches,
      // Video
      'video-autoplay': window.matchMedia('(video-autoplay: auto)').matches,
      // Audio
      audio: window.matchMedia('(audio: auto)').matches,
      // Forced colors
      'forced-colors': window.matchMedia('(forced-colors: active)').matches,
      // Dynamic range
      'dynamic-range': window.matchMedia('(dynamic-range: high)').matches,
      // Video color
      'video-color-gamut': window.matchMedia('(video-color-gamut: bt2020)')
        .matches,
      // Video dynamic range
      'video-dynamic-range': window.matchMedia('(video-dynamic-range: high)')
        .matches,
      // Video format
      'video-format': window.matchMedia('(video-format: hdr)').matches,
      // Video resolution
      'video-resolution': window.matchMedia('(video-resolution: 4k)').matches,
      // Video scan
      'video-scan': window.matchMedia('(video-scan: interlace)').matches,
      // Video color space
      'video-color-space': window.matchMedia('(video-color-space: bt2020)')
        .matches,
      // Video color depth
      'video-color-depth': window.matchMedia('(video-color-depth: 10)').matches,
      // Video color range
      'video-color-range': window.matchMedia('(video-color-range: full)')
        .matches,
      // Video color primaries
      'video-color-primaries': window.matchMedia(
        '(video-color-primaries: bt2020)'
      ).matches,
      // Video transfer function
      'video-transfer-function': window.matchMedia(
        '(video-transfer-function: pq)'
      ).matches,
      // Video matrix coefficients
      'video-matrix-coefficients': window.matchMedia(
        '(video-matrix-coefficients: bt2020)'
      ).matches,
      // Video chroma subsampling
      'video-chroma-subsampling': window.matchMedia(
        '(video-chroma-subsampling: 4:2:0)'
      ).matches,
      // Video bit depth
      'video-bit-depth': window.matchMedia('(video-bit-depth: 10)').matches,
      // Video frame rate
      'video-frame-rate': window.matchMedia('(video-frame-rate: 60)').matches,
      // Video aspect ratio
      'video-aspect-ratio': window.matchMedia('(video-aspect-ratio: 16/9)')
        .matches,
      // Video width
      'video-width': window.matchMedia('(video-width: 1920)').matches,
      // Video height
      'video-height': window.matchMedia('(video-height: 1080)').matches,
      // Video pixel aspect ratio
      'video-pixel-aspect-ratio': window.matchMedia(
        '(video-pixel-aspect-ratio: 1)'
      ).matches,
      // Video scan type
      'video-scan-type': window.matchMedia('(video-scan-type: progressive)')
        .matches,
      // Video color format
      'video-color-format': window.matchMedia('(video-color-format: yuv420)')
        .matches,
      // Video color space name
      'video-color-space-name': window.matchMedia(
        '(video-color-space-name: bt2020)'
      ).matches,
      // Video color range name
      'video-color-range-name': window.matchMedia(
        '(video-color-range-name: full)'
      ).matches,
      // Video color primaries name
      'video-color-primaries-name': window.matchMedia(
        '(video-color-primaries-name: bt2020)'
      ).matches,
      // Video transfer function name
      'video-transfer-function-name': window.matchMedia(
        '(video-transfer-function-name: pq)'
      ).matches,
      // Video matrix coefficients name
      'video-matrix-coefficients-name': window.matchMedia(
        '(video-matrix-coefficients-name: bt2020)'
      ).matches,
      // Video chroma subsampling name
      'video-chroma-subsampling-name': window.matchMedia(
        '(video-chroma-subsampling-name: 4:2:0)'
      ).matches,
      // Video bit depth name
      'video-bit-depth-name': window.matchMedia('(video-bit-depth-name: 10)')
        .matches,
      // Video frame rate name
      'video-frame-rate-name': window.matchMedia('(video-frame-rate-name: 60)')
        .matches,
      // Video aspect ratio name
      'video-aspect-ratio-name': window.matchMedia(
        '(video-aspect-ratio-name: 16/9)'
      ).matches,
      // Video width name
      'video-width-name': window.matchMedia('(video-width-name: 1920)').matches,
      // Video height name
      'video-height-name': window.matchMedia('(video-height-name: 1080)')
        .matches,
      // Video pixel aspect ratio name
      'video-pixel-aspect-ratio-name': window.matchMedia(
        '(video-pixel-aspect-ratio-name: 1)'
      ).matches,
      // Video scan type name
      'video-scan-type-name': window.matchMedia(
        '(video-scan-type-name: progressive)'
      ).matches,
      // Video color format name
      'video-color-format-name': window.matchMedia(
        '(video-color-format-name: yuv420)'
      ).matches,
    },
  };

  return support;
}
