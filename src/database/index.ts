import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (host = "db_odontocli"): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      host: host,
      database:
        process.env.NODE_ENV === "test"
          ? "odontocli_test"
          : defaultOptions.database,
    })
  );
};

