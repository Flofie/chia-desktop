import { CertPathRequired } from './contracts/CertPathRequired';
import { ChiaOptions, RpcClient } from './RpcClient';

const defaultProtocol = 'https';
const defaultHostname = 'localhost';
const defaultPort = 8560;

class Harvester extends RpcClient {
  public constructor(options: Partial<ChiaOptions> & CertPathRequired) {
    super({
      protocol: options?.protocol || defaultProtocol,
      hostname: options?.hostname || defaultHostname,
      port: options?.port || defaultPort,
      certPath: options.certPath,
      keyPath: options.keyPath,
    });
  }

  public async getPlots() {
    return this.request('get_plots', {});
  }

  public async refreshPlots() {
    return this.request('refresh_plots', {});
  }

  public async deletePlot(filename: string) {
    return this.request('delete_plot', { filename });
  }
  public async addPlotDirectory(dirname: string) {
    return this.request('add_plot_directory', { dirname });
  }
  public async getPlotDirectories() {
    return this.request('get_plot_directories', {});
  }
  public async removePlotDirectory(dirname: string) {
    return this.request('remove_plot_directory', { dirname });
  }
}

export { Harvester };
