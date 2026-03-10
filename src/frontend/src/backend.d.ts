// Auto-generated type declarations for frontend-only app
export interface backendInterface {
  _initializeAccessControlWithSecret(adminToken: string): Promise<void>;
}

export interface CreateActorOptions {
  agentOptions?: Record<string, unknown>;
  [key: string]: unknown;
}

export declare class ExternalBlob {
  onProgress?: (progress: number) => void;
  getBytes(): Promise<Uint8Array>;
  static fromURL(url: string): ExternalBlob;
}

export declare function createActor(
  canisterId: string,
  uploadFile: (file: ExternalBlob) => Promise<Uint8Array>,
  downloadFile: (bytes: Uint8Array) => Promise<ExternalBlob>,
  options?: CreateActorOptions,
): backendInterface;
