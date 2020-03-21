import {Socket} from 'net';

export type ResponseObject = {
    code: number;
    data: Buffer;
}

export class PermissionError extends Error {
  constructor() {
    super();
    this.message = 'Ошибка доуступа';
  }
}

export type DirectoryItem = {
  type: string;
  perms: string;
  items: number;
  owner: string;
  group: string;
  size: number;
  date: string;
  name: string;
  data?: DirectoryItem[];
}

export default class FtpClient {
    protected client: Socket;
    protected ip: string;
    protected port: number;
    protected user: string;
    protected password: string;

    constructor(ip:string, port:number) {
      this.client = new Socket();
      this.ip = ip;
      this.port = port;

      this.user = '';
      this.password = '';
    }

    connect = () => {
      this.client.connect(this.port, this.ip, function() {
        console.log('Connected');
      });
      this.client.on('end', () => {
        console.log('Diconnected');
      });

      // this.client.on('data', (data) => {
      //   console.log(data.toString());
      // });

      return new Promise((res, rej) => {
        this.client.once('data', (data) => {
          res(data);
        });
      });
    }

    protected getResponseObject = (data:Buffer) => {
      const responseCode = this.getResponseCode(data);
      return {
        code: responseCode,
        data: data,
      };
    }

    protected getResponseCode = (data: Buffer) => Number(data.toString().split(' ')[0]);

    login = async (user: string, password: string) => {
      this.user = user;
      this.password = password;

      await this.sendCommand(`USER ${user}`);
      const response = await this.sendCommand(`PASS ${password}`);
      if (response.code !== 230) {
        throw new Error('Неверный пароль или логин');
      }
      return response;
    }

    sendCommand = (command: string) : Promise<ResponseObject> => new Promise(
        (success, reject) => {
          if (command === 'LIST') this.readDirectory();

          this.client.write(`${command}\r\n`);
          this.client.once('data', (data: Buffer) => {
            success(this.getResponseObject(data));
          });

          this.client.once('error', reject);
        },
    );

    protected getPortFromIpReponse = (response: ResponseObject) => {
      const [fPort, sPort] = response.data.toString().split(',').slice(-2);
      return parseInt(fPort) * 256 + parseInt(sPort);
    }

    protected getStatusCodeListener = (responseCode: number) => (success: any, reject:any) => {
      this.client.prependListener('data', (data: Buffer) => {
        const responseObject = this.getResponseObject(data);
        if (responseObject.code === responseCode) {
          this.client.removeListener('data', this.client.listeners('data')[0] as any);
          success(responseObject);
        } else if (responseObject.code >= 400) reject(new Error('Ошибка при листинге'));
      });

      this.client.once('error', reject);
    };

    protected formatResponse = (response: string) => {
      const lines = response.trim().split('\r\n');
      const regexp = new RegExp(
          '^([\\-dbclps])' + // Directory flag [1]
      '([\\-rwxs]{9})\\s+' + // Permissions [2]
      '(\\d+)\\s+' + // Number of items [3]
      '(\\w+)\\s+' + // File owner [4]
      '(\\w+)\\s+' + // File group [5]
      '(\\d+)\\s+' + // File size in bytes [6]
      '(\\w{3}\\s+\\d{1,2}\\s+' + // 3-char month and 1/2-char day of the month [7]
      '(?:\\d{1,2}:\\d{1,2}|\\d{4}))' + // Time or year (need to check conditions) [+= 7]
      '\\s+(.+)$', // File/directory name [8]
      );

      // Add each parsed line to the parsed array
      return lines.reduce((acc: any, fileLine) => {
        const parsedLine = regexp.exec(fileLine);
        if (parsedLine !== null) {
          acc.push({
            type: parsedLine[1],
            perms: parsedLine[2],
            items: +parsedLine[3],
            owner: parsedLine[4],
            group: parsedLine[5],
            size: +parsedLine[6],
            date: parsedLine[7],
            name: parsedLine[8],
          });
        }
        return acc;
      }, [] as DirectoryItem[]);
    }

    protected responseStatusCodeAwaiter = async (statusCode: number) => {
      return new Promise(this.getStatusCodeListener(statusCode));
    }

    readDirectory = async (): Promise<DirectoryItem[]> => {
      const readDirectorySocket = new Socket();

      const ipData = await this.sendCommand('PASV');
      const remotePort = this.getPortFromIpReponse(ipData);
      const response: Buffer = await new Promise((success, reject) => {
        readDirectorySocket.connect(remotePort, this.ip, () => this.client.write(`LIST\r\n`));
        readDirectorySocket.once('data', (data: Buffer) => {
          if (data.length > 10) success(data);
        });
        readDirectorySocket.once('error', reject);
        readDirectorySocket.once('close', () => reject(new PermissionError()));
      });
      await this.responseStatusCodeAwaiter(226);
      readDirectorySocket.destroy();
      return this.formatResponse(response.toString());
    }

    close = () => {
      this.client.destroy();
    }

  // client.on('data', function(data) {
  //     console.log(data.toString());

  //     switch(getResponseCode(data)) {
  //         case 331: sendCommand("PASS 12345\r\n"); break;
  //         case 220: sendCommand("USER testftp_guest\r\n"); break;
  //         case 530: throw new Error('Ошибка подключения, неверный пароль или логин');
  //     }
  // });
}
