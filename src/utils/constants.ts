export const constants = {
  IS_DEVELOPMENT: process.env.NODE_ENV === "development",
  SYNC_DB: !!!process.argv[2],
};
