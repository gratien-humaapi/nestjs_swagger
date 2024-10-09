import { registerAs } from "@nestjs/config";

/* eslint-disable @typescript-eslint/no-non-null-assertion */
export interface IGithubConfig {
  token: string;
}

const { env } = process;

export default registerAs("githubConfig", () => ({
  token: env.GITHUB_TOKEN!,
}));