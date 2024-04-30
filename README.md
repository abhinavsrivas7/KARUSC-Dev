## KARUSC

### Branch Naming Convention
- Start with issue type, e.g. `enhancement` | `bug`.
- Second part contains `dev12` where 12 is theticket number.
- Last part will be short description of the ticket with all word separated by hyphens.
- E.g. branch name: `enhancement/dev8-setup-cicd-pipeline`

### Local Setup
#### Requirements
- .Net 8
- Node.js  `>= 18.16.0`
- npm  `>= 9.5.1`
- MySQL server `8.0.35`
- az cli

#### Setup
- Change the value `ASPNETCORE_ENVIRONMENT` from `Production` to `Local` in `launchSettings.json`.
- Update the connection string to your local MySQL in `appSettings.json`.
- Update the value in `LocalFileStorage` to your directory path.
- Update the API base URL in the `.env` file of `Karusc.Client` project based on local API URL.
- Update the API base URL - `CLIENT-CORS-ORIGIN` - in the `appSettings.json` file of `Karusc.Server` project based on local API URL.
- To apply latest migrations, run `Update-Database` command with `Karusc.Server.Infrastructure` as the default project and `Karusc.Server` as the startup project.
  
### Sample `appSettings.Local.Json` after changes:
```  {
  "CLIENT-CORS-ORIGIN": "https://localhost:5173",
  "ConnectionStrings": {
    "KaruscDB": "Server=localhost;User=your_username;Password=your_password;Database=KaruscDB"
  },
  "LocalFileStorage": {
    "DirectoryPath": "D:\\LocalBlobStorage",
    "RequestPath": "/localBlobStorage",
    "Host": "https://localhost:7068"
  }
}
```  

### For Initial Deployment on a new Azure Account
 - Create a new account and create a resource group named `KaruscRG`.
 - Create the AppService and Azure MySQL server with access to all resources from Azure.
   (Not a safe practice but will try to improve using either managed keys or VPC)
 - Update these variables in `cd.yaml` - `AZURE_WEBAPP_NAME`, `AZURE_MYSQL_SERVER_NAME`.
 - Run the following command to create a new service principal in the azure account
 ```
 az login
 az ad sp create-for-rbac --name "GitHubActionsSP" --role contributor --scopes /subscriptions/{subscription-id}
 az account set --subscription {subscription-id}
 ```
 - Allow access to the create SP in the Access Control (IAM) blade on the app service.
 - Download the publish profile. If you face an error saying basic auth is not enabled:
    - Go to configuration blade - general settings and allow both types of basic auth
 - Update the following Github secrets 
    - `AZURE_SP_APP_ID`
    - `AZURE_SP_PASSWORD`
    - `AZURE_SP_TENANT_ID`
    - `AZURE_WEBAPP_PUBLISH_PROFILE`
    - `DATABASE_CONNECTION_STRING`
 ```
 Server={server};UserID={user};Password={pass};Database=KaruscDB;SslMode=Required;SslCa="./DigiCertGlobalRootCA.crt.pem";
 ```
 - Create a new storage zone and link it with a new pull zone in bunny.net
 - Update the following keys in `appSettings.Production.json`
    - `StorageZone`
    - `Region`
    - `CDN_URL`
    - `CLIENT-CORS-ORIGIN`
 - Add the following in the Configuration blade of the app service
    - `BunnyFileStorage__AccessKey`
    - `JwtConfiguration__SecretKey`
    - `KaruscDB` (Connection String)
 - Update the .env file in client project with the api URL

### External Links
#### ERD
https://lucid.app/lucidchart/d7f44206-21f4-423d-8dcd-211706e37fa7/edit?viewport_loc=-1722%2C-1126%2C1988%2C1159%2C0_0&invitationId=inv_c4836b35-21bd-4be0-b208-24ab1395ecc3

#### Figma
https://www.figma.com/files/project/179380305/Karusc

#### Prod URL
https://karuscwebappdev.azurewebsites.net/
