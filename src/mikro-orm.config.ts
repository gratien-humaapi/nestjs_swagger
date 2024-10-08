import { LoadStrategy } from "@mikro-orm/core";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import { SqlHighlighter } from "@mikro-orm/sql-highlighter";
import {
  defineConfig,
  Options
} from "@mikro-orm/sqlite";
import { ConfigService } from "@nestjs/config";

const configService = new ConfigService();

const MikroOrmConfig: Options = defineConfig({
  // for simplicity, we use the SQLite database, as it's available pretty much everywhere
  dbName: "sqlite.db",
  // folder based discovery setup, using common filename suffix
  entities: ["dist/cats/entities/*.entity.js"],
  entitiesTs: ["src/cats/entities/*.entity.ts"],
  // enable debug mode to log SQL queries and discovery information
  debug: configService.get("NODE_ENV") !== "production",
  // for vitest to get around `TypeError: Unknown file extension ".ts"` (ERR_UNKNOWN_FILE_EXTENSION)
  dynamicImportProvider: (id) => import(id),
  // for highlighting the SQL queries
  highlighter: new SqlHighlighter(),
  loadStrategy: LoadStrategy.JOINED,
  metadataProvider: TsMorphMetadataProvider,
  migrations: {
    path: "dist/migrations",
    pathTs: "src/migrations",
    snapshot: false // change to "true" after dev iteration
  },
  // seeder
  // seeder: {
  //   path: "dist/seeder",
  //   pathTs: "src/seeder",
  //   // defaultSeeder: "DatabaseSeeder",
  //   glob: "*.{js,ts}",
  //   emit: "ts",
  //   fileName: (className: string) => className
  // }
});

export default MikroOrmConfig;
