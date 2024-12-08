
# Cahier des charges - API Métadonnées de Fichiers GitHub

## Objectif
Développer une API pour récupérer les métadonnées d'un fichier présent sur un dépôt GitHub. L'API prendra en entrée le nom du dépôt, le chemin du fichier et retournera les informations relatives au fichier et aux fonctions qu'il contient.

## Spécifications des Classes


### Classe `CodeFile`
Représente un fichier de code source dans un dépôt.

```ts

class CodeFile {
   id: UUID ;
   name: string//: Nom du fichier.
   functions: CodeFunction[] //Ensemble des fonctions internes et externes au fichier.
  path: string //Chemin du fichier sans le nom du fichier.
  extension: string // l'extension du fichier
}

```

### Classe `CodeFunction`
Représente une fonction définie dans un fichier de code source.

```ts

class CodeFunction {
   id: UUID // Identifiant unique de la fonction.
   name: string // nom de la fonction.
   fileId?: UUID //Identifiant du fichier dans lequel la fonction est déclarée. Ce champ est optionnel.
}

```


## Fonctionnalités OpenAPI à Développer

### 1. Endpoint : Récupérer les métadonnées d'un fichier à partir du nom

- **Méthode :** `Get`
- **URL :** `/files/<name>`
- **Description :** Cet endpoint permet de récupérer les métadonnées d'un fichier présent dans un dépôt GitHub en passant le nom du repository et le chemin du fichier.
- **QueryParam :**
  ```json
  {
    "repositoryName": "username/repository",
    "filePath": "src/exemple/etc"
  }
  ```
- **Réponse :**
  - `200 OK`
  - **Body :**
    ```json
    {
      "id": "string",
      "fileName": "string",
      "functions": [
        {
          "id": "string",
          "name": "string",
          "fileID": "string"
        }
      ],
      "repositoryName": "string",
      "path": "string"
    }
    ```
  - **Erreur :**
    - `404 Not Found` : Fichier ou dépôt introuvable.
    - `400 Bad Request` : Paramètres manquants ou incorrects.


### 2. Endpoint : Récupérer les métadonnées d'un fichier

- **Méthode :** `Get`
- **URL :** `/files/<id>`
- **Description :** Cet endpoint permet de récupérer les métadonnées d'un fichier présent dans un dépôt GitHub en passant le nom du repository et le chemin du fichier.
- **QueryParam :**
  ```json
  {
    "repositoryName": "username/repository",
    "filePath": "src/exemple/etc"
  }
  ```
- **Réponse :**
  - `200 OK`
  - **Body :**
    ```json
    {
      "id": "string",
      "fileName": "string",
      "functions": [
        {
          "id": "string",
          "name": "string",
          "fileID": "string"
        }
      ],
      "path": "string"
    }
    ```
  - **Erreur :**
    - `404 Not Found` : Fichier ou dépôt introuvable.
    - `400 Bad Request` : Paramètres manquants ou incorrects.


### 3. Endpoint : Lister les fichiers

- **Méthode :** `Get`
- **URL :** `/files`
- **Description :** Cet endpoint permet de lister tous les fichiers utiles du projet. Privilégiés le code .ts, .go, .jave. On définira plus tard s’il sera nécessaire de récupérer les autres types de fichiers 
- **QueryParam :**
  ```json
  {
    "repositoryName": "username/repository",
    "searchPattern": ["src/**/*.java", "ui/**/*.ts"]
  }
  ```
- **Réponse :**
  - `200 OK`
  - **Body :**
    ```json
    {
    
      "files": [
        {
          "id": "string",
          "name": "string",
          "path": "string",
          "extension": "string"
        }
      ]
     
    }
    ```
  - **Erreur :**
    - `404 Not Found` : Fichier ou dépôt introuvable.
    - `400 Bad Request` : Paramètres manquants ou incorrects.