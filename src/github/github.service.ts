import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { dynamicImport } from "tsimportlib";
import { IGithubConfig } from "./github.config";

export type OctokitModule = typeof import("@octokit/rest");
export type Octokit = InstanceType<OctokitModule["Octokit"]>;

@Injectable()
export class GithubService {
  // private _githubClient: ;
  private octokitModule: OctokitModule;
  public _githubClient: Octokit;

  constructor(private configService: ConfigService) {
    const githubConfig = this.configService.get<IGithubConfig>("githubConfig");
    if (!githubConfig) {
      throw new Error("auth config not initialized");
    }
    this.loadOctokit(githubConfig.token)
      .then(() => {})
      .catch((err) => {
        // Gestion appropriée des erreurs
        console.error("Erreur lors du chargement de Octokit:", err);
      });
  }

  async loadOctokit(token: string) {
    this.octokitModule = (await dynamicImport(
      "@octokit/rest",
      module
    )) as OctokitModule;
    this._githubClient = new this.octokitModule.Octokit({
      auth: token
    });
  }

  getFileGithub = async (
    user: string,
    repo: string,
    filePath: string,
    branch: string = "master"
  ): Promise<void> => {
    try {
      // Récupérer le contenu du fichier avec l'API de GitHub
      const { data } = await this._githubClient.repos.getContent({
        owner: user,
        repo: repo,
        path: filePath
        // ref: branch,  // spécifie la branche si nécessaire (par défaut "main")
      });

      console.log(data);

      // Le contenu du fichier est encodé en base64
      if (data && "content" in data) {
        const contenuBase64 = data.content;
        const contenuFichier = Buffer.from(contenuBase64, "base64").toString(
          "utf-8"
        );
        console.log("Contenu du fichier :", contenuFichier);
      } else {
        throw new Error("Impossible de récupérer le contenu du fichier.");
      }
    } catch (error) {
      console.error("Erreur :", error);
    }
  };
}
