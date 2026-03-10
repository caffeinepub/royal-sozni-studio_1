// Auto-generated stub backend for frontend-only app

export interface backendInterface {
  _initializeAccessControlWithSecret(adminToken: string): Promise<void>;
}

export interface CreateActorOptions {
  agentOptions?: Record<string, unknown>;
  [key: string]: unknown;
}

export class ExternalBlob {
  private bytes: Uint8Array;
  onProgress?: (progress: number) => void;

  constructor(bytes: Uint8Array) {
    this.bytes = bytes;
  }

  async getBytes(): Promise<Uint8Array> {
    return this.bytes;
  }

  static fromURL(_url: string): ExternalBlob {
    return new ExternalBlob(new Uint8Array());
  }
}

export function createActor(
  _canisterId: string,
  _uploadFile: (file: ExternalBlob) => Promise<Uint8Array>,
  _downloadFile: (bytes: Uint8Array) => Promise<ExternalBlob>,
  _options?: CreateActorOptions,
): backendInterface {
  return {
    _initializeAccessControlWithSecret: async (_token: string) => {},
  };
}
