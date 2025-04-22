/// <reference types="vite/client" />

export {};

declare global {
    interface Window {
        fingerhash: typeof import('./fingerhash').default;
    }
}