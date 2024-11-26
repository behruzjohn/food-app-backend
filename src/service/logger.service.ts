import chalk from 'chalk';

export type LogLevel = 'SUCCESS' | 'WARNING' | 'ERROR' | 'INFO';

const LOG_LEVELS_COLORS: Record<LogLevel, string> = {
  ERROR: 'red',
  SUCCESS: 'green',
  WARNING: 'yellow',
  INFO: 'cyan',
};

const dateColumn = () => {
  const [date] = new Date().toTimeString().split(' ');

  return chalk.cyan(`[${date}]`);
};

export const log = (level: LogLevel, type: string, message: string) => {
  console.log(
    dateColumn(),
    chalk[LOG_LEVELS_COLORS[level]](`[${type}]`),
    chalk.white(message),
  );
};
