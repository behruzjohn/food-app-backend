// import chalk from 'chalk';

export type LogLevel = 'SUCCESS' | 'WARNING' | 'ERROR' | 'INFO';

const LOG_LEVELS_COLORS: Record<LogLevel, string> = {
  ERROR: 'red',
  SUCCESS: 'green',
  WARNING: 'yellow',
  INFO: 'cyan',
};

const dateColumn = () => {
  const [date] = new Date().toTimeString().split(' ');

  // return `[${chalk.gray(date)}]`;
};

const logError = (type: string, message: string) => {
  console.log(
    dateColumn(),
    // chalk[LOG_LEVELS_COLORS['ERROR']](`[${type}]`),
    // chalk.white(message),
    message,
  );
};

const logSuccess = (type: string, message: string) => {
  console.log(
    dateColumn(),
    // chalk[LOG_LEVELS_COLORS['SUCCESS']](`[${type}]`),
    // chalk.white(message),
    message,
  );
};

const logWarning = (type: string, message: string) => {
  console.log(
    dateColumn(),
    //   chalk[LOG_LEVELS_COLORS['WARNING']](`[${type}]`),
    //   chalk.white(message),
    // )
    message,
  );
};

const logInfo = (type: string, message: string) => {
  console.log(
    dateColumn(),
    // chalk[LOG_LEVELS_COLORS['INFO']](`[${type}]`),
    // chalk.white(message),
    message,
  );
};

export const logger = {
  error: logError,
  success: logSuccess,
  warning: logWarning,
  info: logInfo,
};
