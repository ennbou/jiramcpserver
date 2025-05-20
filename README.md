# JIRA MCP Server

This repository contains a MCP (Model Context Protocol) server for JIRA integration.

## Overview

The JIRA MCP Server is a utility that bridges JIRA project management tools with Model Context Protocol capabilities, allowing for enhanced context awareness in development workflows.

Since it's under testing, it's read-only and doesn't support other HTTP actions (like: PUT, POST, DELETE).

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) (v8 or higher)
- [brew](https://brew.sh/) (to install gitleaks, only for macOS)

## Installation

1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd jriamcpserver
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Build the project:
    ```bash
    npm run build
    ```

## Configuration

Create a `.env` file in the root directory with the following environment variables:

```bash
JIRA_HOSTNAME="jira.xxxx.com"
JIRA_AUTH_TOKEN="XXXXXXX+token+EYVzV"
```

## Build the server

```bash
npm run build
```

## Running the Server

There are two ways to run the server:

```bash
npm start
```

### Inspector Mode

To run with the MCP inspector for debugging:
```bash
npm run inspector
```

For more details ([read](https://modelcontextprotocol.io/docs/tools/inspector))

## VS Code Integration

To add this MCP server to Visual Studio Code, the first way is recommended.

### To add this MCP server to Visual Studio Code, run the following command:

```bash
code --add-mcp '{"name":"jiramcpserver", "envFile": "{$JIRA_MCP_SERVER_PATH/.env","type": "stdio","command": "node","args": ["$JIRA_MCP_SERVER_PATH/build/"]}'
```

> Don't forget to change `$JIRA_MCP_SERVER_PATH`

### Alternatively, you can add it through the VS Code interface:

1. Press Cmd+Shift+P

2. Type `MCP: List servers`, click `Enter`

3. Click on `+ add server`

4. Select `Command (stdio)`

5. Enter `node "$JIRA_MCP_SERVER_PATH/build/index.js"`

You still need the JIRA server credentials. Try to add them to your environment,
or try to open VS Code settings JSON and add `envFile` to the `mcp.servers.jiramcpserver`:
```json
  "mcp": {
    "servers": {
        "my-jira-mcp-server": {
            "envFile": "PATH_OF_.env",
            "type": "stdio",
            "command": "node",
            "args": [
                "...../build/"
            ]
        }
    }
  }
```

## Author

ennbou
