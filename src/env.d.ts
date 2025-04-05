export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      VITE_API_BASE_URL: string;
    }
  }

  namespace NodeJS {
    interface Process {
      env: ProcessEnv;
    }
  }

  var process: NodeJS.Process;
}