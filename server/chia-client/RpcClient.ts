import axios from 'axios';
import { readFileSync } from 'fs';
import { Agent } from 'https';

type Protocol = 'https' | 'http';

export interface ChiaOptions {
  protocol: Protocol;
  hostname: string;
  port: number;
  certPath: string;
  keyPath: string;
}

class RpcClient {
  private readonly protocol: Protocol;
  private readonly hostname: string;
  private readonly port: number;
  private readonly agent: Agent;

  public constructor(options: ChiaOptions) {
    this.protocol = options.protocol;
    this.hostname = options.hostname;
    this.port = options.port;
    this.agent = new Agent({
      cert: options.certPath.startsWith('-----BEGIN CERTIFICATE-----')
        ? options.certPath
        : readFileSync(options.certPath),
      key: options.keyPath.startsWith('-----BEGIN RSA PRIVATE KEY-----')
        ? options.keyPath
        : readFileSync(options.keyPath),
    });
  }

  private baseUri(): string {
    return `${this.protocol}://${this.hostname}:${this.port}`;
  }

  protected async request<T>(
    route: string,
    body: Record<string, string | number | boolean | string[] | undefined>
  ): Promise<T> {
    // Should not be doing this: Temporary hack to get chiaexplorer up and running quickly
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    const { data } = await axios.post<T>(`${this.baseUri()}/${route}`, body, {
      httpsAgent: this.agent,
    });

    return data;
  }
}

export { RpcClient };
