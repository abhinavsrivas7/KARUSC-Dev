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

#### Setup
- Change the value `ASPNETCORE_ENVIRONMENT` from `Production` to `Local` in `launchSettings.json`.
- Update the connection string to your local MySQL in `appSettings.json`.
- Update the API base URL in the `.env` file of `Karusc.Client` project based on local API URL.
- Update the API base URL - `CLIENT-CORS-ORIGIN` - in the `appSettings.json` file of `Karusc.Server` project based on local API URL.
- To apply latest migrations, run `Update-Database` command with `Karusc.Server.Infrastructure` as the default project and `Karusc.Server` as the startup project.

### External Links
#### ERD
https://lucid.app/lucidchart/d7f44206-21f4-423d-8dcd-211706e37fa7/edit?viewport_loc=-1722%2C-1126%2C1988%2C1159%2C0_0&invitationId=inv_c4836b35-21bd-4be0-b208-24ab1395ecc3

#### Figma
https://www.figma.com/files/project/179380305/Karusc

#### Prod URL
https://karuscwebappdev.azurewebsites.net/
