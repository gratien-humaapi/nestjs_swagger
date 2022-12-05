import { LoadStrategy, Options } from "@mikro-orm/core";
import { ConfigService } from "@nestjs/config";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import { SqlHighlighter } from "@mikro-orm/sql-highlighter";

const configService = new ConfigService();

const MikroOrmConfig: Options = {
  entities: ["dist/**/*.entity.js"],
  entitiesTs: ["src/**/*.entity.ts"],
  // db config
  type: "postgresql",
  dbName: configService.get("POSTGRES_DB"),
  user: configService.get("POSTGRES_USER"),
  password: configService.get("POSTGRES_PASSWORD"),
  host: configService.get("POSTGRES_HOST"),
  port: configService.get("POSTGRES_PORT"),
  // db config
  metadataProvider: TsMorphMetadataProvider,
  debug: configService.get("NODE_ENV") !== "production",
  loadStrategy: LoadStrategy.JOINED,
  highlighter: new SqlHighlighter(),
  migrations: {
    path: "dist/migrations",
    pathTs: "src/migrations",
    snapshot: false // change to "true" after dev iteration
  },
  // seeder
  seeder: {
    path: "dist/seeder",
    pathTs: "src/seeder",
    // defaultSeeder: "DatabaseSeeder",
    glob: "*.{js,ts}",
    emit: "ts",
    fileName: (className: string) => className
  }
};

export default MikroOrmConfig;
