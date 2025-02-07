import { exec } from 'child_process';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

const cwd = process.cwd();
const cliFile = path.normalize(path.join(cwd, './dist/src/cli/index.js'));

const verbose = false;
// process.argv.some(
//   (s) => s.includes('verbose') || s.includes('worker')
// );

type cliResult = {
  code: number | any;
  error: any;
  stdout: any;
  stderr: any;
};

export const makeTMPDirPath = (prefix?: string) =>
  `./.tmp/jest/${prefix ? prefix + '/' : ''}${uuidv4()}`;

export const cli = (args: Array<string>): Promise<cliResult> => {
  return new Promise((resolve) => {
    exec(
      `node ${cliFile} ${args.join(' ')}`,
      { cwd },
      (error: any, stdout: any, stderr: any) => {
        if (verbose) {
          console.debug('>>>>> stdout <<<<<');
          console.debug(stdout);
          console.debug('>>>>> error <<<<<');
          console.debug(error);
          console.debug('>>>>> stderr <<<<<');
          console.debug(stderr);
        }
        resolve({
          code: error && error.code ? error.code : 0,
          error,
          stdout,
          stderr
        });
      }
    );
  });
};
