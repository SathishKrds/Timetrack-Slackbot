# Setting Up BotApp for Node.js Project

## Steps

1. Go to [api.slack.com/apps](https://api.slack.com/apps) and create a new app.
   
### Basic Information Section

1. Fill in the display information details and save changes.
2. Generate App-Level Tokens and enable the following scopes:
   - `connection:write`
   - `authorization:read`

### Install App Section

1. Click on permission scope, which will redirect you to the "Features - OAuth & Permissions" section.
2. Add an OAuth Scope under Bot Token Scopes and enable the following scopes:
   - `chat:write`
   - `im:read`
   - `commands`

Now, install the app.

### Socket Mode Section

Enable Socket Mode.

### Slash Commands Section

To create commands, navigate to "Features - Slash Commands" and create new commands.

## Token Usage

For token usage, make sure to set the following environment variables:
- `SLACK_BOT_TOKEN`: Use Bot User OAuth Token from the "OAuth & Permissions" section.
- `SLACK_SIGNING_SECRET`: Use Signing Secret from the "Basic Information" section.
- `SLACK_APP_TOKEN`: Use App Level Tokens from the "Basic Information" section.

## Video Reference
https://www.youtube.com/watch?v=7Ys-6MkekBw&t=880s

## Our Project's Slash Commands
/time_in [date] [time]
Example: /time_in 01/01/1990 9:00AM

/time_out [date] [time]
Example: /time_out 01/01/1990 5:00PM

/time_track [projectname] [hours] [timespent] [date]
Example: /time_track abc 9:00AM-10:00AM 1hour 01/01/1990

/project [projectname]
Example: /project abc

## Node Version

Ensure you are using Node.js version 12 or above.

## Running the App

To run the app, use the following command:
```bash
npm run dev
```
## Running Migrations

To run migrations, use the following command:
```bash
npx sequelize-cli db:migrate
```

## Undoing Migrations

To undo migrations, use the following command:
```bash
npx sequelize-cli db:migrate:undo
```