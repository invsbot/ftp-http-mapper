// eslint-disable-next-line no-unused-vars
import FtpClient, {DirectoryItem, PermissionError} from './FtpClient';
import PQueue from 'p-queue';

const queue = new PQueue({concurrency: 1});

export default class FtpTreeCreator extends FtpClient {
  static getDirectories = async (ftpClient: FtpClient) => {
    const response = await queue.add(() => ftpClient.readDirectory());
    return response.filter((val) => val.type === 'd');
  }

    createFtpTree = async () => {
      const directories = await FtpTreeCreator.getDirectories(this);
      this.close();
      await this.createNextIteration(directories, []);
      return directories;
    }

    goToSelectedDirectory = async (absolutePath: string[]) => {
      for (const path of absolutePath) {
        await this.sendCommand(`CWD ${path}`);
      }
    }

    private createNextIteration = async (directories: DirectoryItem[], absolutePath: string[]) => {
      for (let i = 0; i < directories.length; i++) {
        try {
          directories[i].data = await this.createNextTreeNode([...absolutePath, directories[i].name]);
        } catch (err) {
          if (err instanceof PermissionError) {
            continue;
          } else throw err;
        }
      }
    }

    private createNextTreeNode = async (absolutePath: string[]): Promise<DirectoryItem[] | undefined> => {
      const ftpClient = new FtpTreeCreator(this.ip, this.port);
      await ftpClient.connect();
      await ftpClient.login(this.user, this.password);
      await ftpClient.goToSelectedDirectory(absolutePath);
      const directories = await FtpTreeCreator.getDirectories(ftpClient);
      ftpClient.close();
      await ftpClient.createNextIteration(directories, absolutePath);
      return directories?.length > 0 ? directories : undefined;
    }
}

