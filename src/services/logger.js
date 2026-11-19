function getTimestamp() {
  return new Date().toISOString();
}

export const logger = {
  info(message) {
    console.info(`[INFO] ${getTimestamp()} - ${message}`);
  },

  error(message) {
    console.error(`[ERROR] ${getTimestamp()} - ${message}`);
  },
};
