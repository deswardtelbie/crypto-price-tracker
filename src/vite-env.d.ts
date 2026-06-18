/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CG_DEMO_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
