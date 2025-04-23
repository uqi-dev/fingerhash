import md5 from 'blueimp-md5';

declare global {
  interface Navigator {
    deviceMemory?: number;
    msDoNotTrack?: string | boolean;
  }
  interface Window {
    webkitAudioContext: typeof AudioContext;
    webkitOfflineAudioContext: typeof OfflineAudioContext;
    doNotTrack?: string | boolean;
    InstallTrigger?: any;
  }
  interface Intl {
    v8BreakIterator?: any;
  }
}

type FingerprintComponent = {
  userAgent: string;
  userAgentVersion: string;
  screenResolution: number[];
  screenOrientation: string | undefined;
  timezone: string;
  colorDepth: number;
  deviceMemory: number | 'unknown';
  hardwareConcurrency: number;
  language: string;
  canvasFingerprint: string;
  webglFingerprint: string | null;
  webglExtensions: string[];
  audioFingerprint: number | null;
  installedFonts: string[];
  touchSupport: TouchSupport;
  platform: string;
  cookiesEnabled: boolean;
  localStorage: boolean;
  sessionStorage: boolean;
  navigatorLanguages: string[];
  doNotTrack: string | boolean;
  plugins: string[];
  mimeTypes: string[];
  adBlockDetected: boolean;
  performanceTiming: number;
  jsEngine: string;
  mathPrecision: {
    tan: number;
    sin: number;
    cos: number;
  };
  gpuRenderer: string;
};

type TouchSupport = {
  maxTouchPoints: number;
  touchEvent: boolean;
  pointerEvent: boolean;
};

type FingerprintResult = {
  visitorId: string;
  components: FingerprintComponent;
  confidence: number;
};

export class FingerHash {
  private components: Partial<FingerprintComponent> = {};
  private hashingAlgorithm: (str: string) => string;

  constructor() {
    this.hashingAlgorithm = md5;
  }

  public async getFingerprint(): Promise<FingerprintResult> {
    await this.collectData();
    const fingerprint = this.generateHash();
    return {
      visitorId: fingerprint,
      components: this.components as FingerprintComponent,
      confidence: this.calculateConfidence(),
    };
  }

  private async collectData(): Promise<void> {
    this.components = {
      userAgent: navigator.userAgent,
      userAgentVersion: this.parseUserAgentVersion(navigator.userAgent),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: navigator.language,
      deviceMemory: navigator.deviceMemory || 'unknown',
      hardwareConcurrency: Math.max(navigator.hardwareConcurrency || 1, 1),
      canvasFingerprint: this.getCanvasFingerprint(),
      webglFingerprint: this.getWebGLFingerprint(),
      webglExtensions: this.getWebGLExtensions().sort(),
      audioFingerprint: this.getAudioFingerprint(),
      installedFonts: (await this.getFontList()).sort(),
      plugins: this.getPlugins().sort(),
      colorDepth: this.getColorDepth(),
      touchSupport: this.getTouchSupport(),
      platform: navigator.platform,
      cookiesEnabled: navigator.cookieEnabled,
      localStorage: this.testLocalStorage(),
      sessionStorage: this.testSessionStorage(),
      navigatorLanguages: [...(navigator.languages || [])].sort(),
      jsEngine: this.detectJsEngine(),
      doNotTrack:
        navigator.doNotTrack ||
        window.doNotTrack ||
        navigator.msDoNotTrack ||
        'unknown',
      mimeTypes: this.getMimeTypes().sort(),
      adBlockDetected: await this.detectAdBlock(),
      mathPrecision: {
        tan: Math.tan(1),
        sin: Math.sin(1),
        cos: Math.cos(1),
      },
      gpuRenderer: this.getGPURenderer(),
    };
  }

  private parseUserAgentVersion(ua: string): string {
    const match = ua.match(/(Chrome|Firefox|Safari|Edg|OPR|Edge)\/(\d+)/);
    return match ? `${match[1]}-${match[2]}` : 'unknown';
  }

  private getCanvasFingerprint(): string {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';

    canvas.width = 240;
    canvas.height = 60;

    ctx.fillStyle = 'rgb(255, 102, 0)';
    ctx.fillRect(0, 0, 30, 30);

    const gradient = ctx.createLinearGradient(30, 0, 70, 0);
    gradient.addColorStop(0, '#ff0000');
    gradient.addColorStop(1, '#0000ff');
    ctx.fillStyle = gradient;
    ctx.fillRect(30, 0, 40, 30);

    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 4;
    ctx.font = 'italic 14px "Arial"';
    ctx.fillStyle = '#069';
    ctx.fillText('Advanced Fingerprint Test', 10, 40);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    return this.hashingAlgorithm(Array.from(imageData).join(','));
  }

  private getWebGLFingerprint(): string | null {
    const gl = document.createElement('canvas').getContext('webgl');
    if (!gl) return null;

    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    const vendor = debugInfo
      ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL)
      : gl.getParameter(gl.VENDOR);
    const renderer = debugInfo
      ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
      : gl.getParameter(gl.RENDERER);

    return this.hashingAlgorithm(
      [
        gl.getParameter(gl.VERSION),
        gl.getParameter(gl.SHADING_LANGUAGE_VERSION),
        vendor,
        renderer,
      ].join('|')
    );
  }

  private getColorDepth(): number {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return 0;
    return ctx.getImageData(0, 0, 1, 1).data.length;
  }

  private getWebGLExtensions(): string[] {
    const gl = document.createElement('canvas').getContext('webgl');
    return gl ? gl.getSupportedExtensions() || [] : [];
  }

  private getGPURenderer(): string {
    const gl = document.createElement('canvas').getContext('webgl');
    if (!gl) return '';
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    return debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : '';
  }

  private async getFontList(): Promise<string[]> {
    const fontList = [
      'Arial',
      'Arial Black',
      'Courier New',
      'Georgia',
      'Impact',
      'Times New Roman',
      'Trebuchet MS',
      'Verdana',
      'Comic Sans MS',
      'Lucida Console',
      'Tahoma',
      'Palatino',
      'Garamond',
      'Bookman',
      'Ubuntu',
      'Roboto',
      'Noto Sans',
      'Open Sans',
      'Consolas',
    ];

    const availableFonts: string[] = [];
    const testString = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (ctx) {
      const baseWidths = {
        sans: ctx.measureText(testString).width,
        serif: ctx.measureText(testString).width,
        mono: ctx.measureText(testString).width,
      };

      for (const font of fontList) {
        ctx.font = `12px "${font}", sans-serif`;
        if (ctx.measureText(testString).width !== baseWidths.sans) {
          availableFonts.push(font);
          continue;
        }

        ctx.font = `12px "${font}", serif`;
        if (ctx.measureText(testString).width !== baseWidths.serif) {
          availableFonts.push(font);
          continue;
        }
      }
    }

    return availableFonts;
  }

  private getPlugins(): string[] {
    return Array.from(navigator.plugins)
      .map((p) => p.name)
      .filter(Boolean);
  }

  private getAudioFingerprint(): number | null {
    try {
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      return audioContext.sampleRate;
    } catch (e) {
      return null;
    }
  }

  private generateHash(): string {
    const sortedComponents = Object.keys(this.components)
      .sort()
      .reduce((acc, key) => {
        const value = this.components[key as keyof FingerprintComponent];
        // Ensure arrays are sorted before hashing
        if (Array.isArray(value)) {
          acc[key] = value.slice().sort();
        } else {
          acc[key] = value;
        }
        return acc;
      }, {} as Record<string, any>);

    return this.hashingAlgorithm(JSON.stringify(sortedComponents));
  }

  private calculateConfidence(): number {
    const totalKeys = Object.keys(this.components).length;
    const populatedKeys = Object.values(this.components).filter(
      (v) => v !== undefined
    ).length;
    return Math.round((populatedKeys / totalKeys) * 100) / 100;
  }

  private getTouchSupport(): TouchSupport {
    return {
      maxTouchPoints: navigator.maxTouchPoints || 0,
      touchEvent: 'ontouchstart' in window,
      pointerEvent: 'PointerEvent' in window,
    };
  }

  private getMimeTypes(): string[] {
    return Array.from(navigator.mimeTypes)
      .map((m) => m.type)
      .filter(Boolean);
  }

  private async detectAdBlock(): Promise<boolean> {
    try {
      await fetch(
        'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
        {
          method: 'HEAD',
          mode: 'no-cors',
        }
      );
      return false;
    } catch {
      return true;
    }
  }

  private testLocalStorage(): boolean {
    try {
      localStorage.setItem('test', '1');
      localStorage.removeItem('test');
      return true;
    } catch {
      return false;
    }
  }

  private testSessionStorage(): boolean {
    try {
      sessionStorage.setItem('test', '1');
      sessionStorage.removeItem('test');
      return true;
    } catch {
      return false;
    }
  }

  private detectJsEngine(): string {
    // Check for V8 (Chrome, Node.js)
    const isV8 =
      /Chrome/.test(navigator.userAgent) || /Node/.test(navigator.userAgent);

    // Check for SpiderMonkey (Firefox)
    const isSpiderMonkey = /Firefox/.test(navigator.userAgent);

    // Check for JavaScriptCore (Safari)
    const isJavaScriptCore =
      /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);

    if (isV8) return 'V8';
    if (isSpiderMonkey) return 'SpiderMonkey';
    if (isJavaScriptCore) return 'JavaScriptCore';
    return 'Unknown';
  }
}
