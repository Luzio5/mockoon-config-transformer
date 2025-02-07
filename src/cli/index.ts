import { Command } from 'commander';

import { name, SUPPORTED_COMMANDS, version } from '../config.js';

import { default as bundle } from '../commands/bundle.js';
import { default as extract } from '../commands/extract.js';

const program = new Command();
async function init() {
  program
    .storeOptionsAsProperties(false)
    .name(name)
    // .description(description)
    .version(version, '-v, --version', 'Output the current version')
    .option('-f, --force', 'Force override directories and files if exists')
    // .option('--verbose', 'Enable debugger logs')
    .requiredOption('-i, --input  <relative-path or url>', 'Input path or URL')
    .requiredOption('-o, --output  <relative-path>', 'Output file or dir path');

  return Promise.resolve();
}

const commandBundle = new Command(SUPPORTED_COMMANDS.bundle)
  .storeOptionsAsProperties(false)
  .description(`Bundle extracted files into Mockoon environment file`)
  .action(async (commandOptions) => {
    const baseOptions = program.opts();
    const mergedOptions = {
      ...baseOptions,
      ...commandOptions
    };
    await bundle(mergedOptions);
  });

const commandExtract = new Command(SUPPORTED_COMMANDS.extract)
  .storeOptionsAsProperties(false)
  .description(`Extract Mockoon json environment file into json files tree`)
  .action(async (commandOptions) => {
    const baseOptions = program.opts();
    const mergedOptions = {
      ...baseOptions,
      ...commandOptions
    };
    await extract(mergedOptions);
  });

program.addCommand(commandBundle);
program.addCommand(commandExtract);

init().then(() => {
  program.parse(process.argv);
});
