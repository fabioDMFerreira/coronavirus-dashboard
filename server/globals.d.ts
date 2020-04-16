// Required when adding declarations inside a module (.ts, not .d.ts)
// If you have documentation about why this is required I would love to know 🤓
declare global {
  // Target the module containing the `ProcessEnv` interface
  // https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation
  namespace NodeJS {
    // Merge the existing `ProcessEnv` definition with ours
    // https://www.typescriptlang.org/docs/handbook/declaration-merging.html#merging-interfaces
    export interface ProcessEnv {
      NODE_ENV: "development" | "production" | "test";
      PORT: string;
      MONGO_URI: string;
      // ...
    }
  }
}
