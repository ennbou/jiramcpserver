import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { fetchIssueDetails, fetchProjectIssueTypes, fetchUsers, fetchIssuesUsingJQL, fetchProjectComponents, fetchProjectStatus, fetchPriorities, fetchProjects, fetchBoardSprints, fetchBoards } from "./api.js";


const server = new McpServer({
  name: "jiramcpserver",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});


server.tool("get-jira-issue-details-by-key", "fetch jira issue details by key",{issueKey: z.string()} , async ({issueKey})=>{ 
  try {
      const issue = await fetchIssueDetails(issueKey);
      return {
          content: [{
              type: "text",
              text: JSON.stringify(issue, null, 2),
          }]
      }
  } catch (error) {
      console.error(`Error fetching issue by key ${issueKey}: `, error);
      return {
          content: [{
              type: "text",
              text: "Error fetching issue",
          }]
      }
  }
}
)

server.tool("get-jira-users-in-project", "fetch jira users in project",{project: z.string()} , async ({project})=>{
  try {  
  const users = await fetchUsers(project);
    return {
        content: [{
            type: "text",
            text: JSON.stringify(users, null, 2),
        }]
    }
  } catch (error) {
    console.error(`Error fetching users in project ${project}: `, error);
    return {
        content: [{
            type: "text",
            text: "Error fetching users",
        }]
    }
  }
}
)

server.tool("get-jira-issues-by-jql", "fetch jira issues by jql",{jql: z.string(), startAt: z.number().optional(), maxResults: z.number().optional()} , async ({jql, startAt = 0, maxResults = 50})=>{
    try {
        const issues = await fetchIssuesUsingJQL(jql, undefined, undefined, startAt, maxResults);
        return {
            content: [{
                type: "text",
                text: JSON.stringify(issues, null, 2),
            }]
        };
    } catch (error) {
        console.error(`Error fetching issues by JQL ${jql}: `, error);
        return {
            content: [{
                type: "text",
                text: "Error fetching issues",
            }]
        };
    }
});

server.tool("get-jira-components-in-project", "fetch jira components in project",{projectId: z.string()} , async ({projectId})=>{
    try {
        const components = await fetchProjectComponents(projectId);
        return {
            content: [{
                type: "text",
                text: JSON.stringify(components, null, 2),
            }]
        }
    } catch (error) {
        console.error(`Error fetching components in project ${projectId}: `, error);
        return {
            content: [{
                type: "text",
                text: "Error fetching components",
            }]
        }
    }
}
)
server.tool("get-jira-status-in-project", "fetch jira status in project",{project: z.string()} , async ({project: projectId})=>{
    try {
        const status = await fetchProjectStatus(projectId);
        return {
            content: [{
                type: "text",
                text: JSON.stringify(status, null, 2),
            }]
        }
    } catch (error) {
        console.error(`Error fetching status in project ${projectId}: `, error);
        return {
            content: [{
                type: "text",
                text: "Error fetching status",
            }]
        }
    }
}
)
server.tool("get-jira-priorities", "fetch jira priorities",{} , async () => {
    try {
        const priorities = await fetchPriorities();
        return {
            content: [{
                type: "text",
                text: JSON.stringify(priorities, null, 2),
            }]
        }
    } catch (error) {
        console.error(`Error fetching priorities: `, error);
        return {
            content: [{
                type: "text",
                text: "Error fetching priorities",
            }]
        }
    }
}
)
server.tool("get-jira-projects", "fetch jira projects",{} , async () => {
    try {
        const projects = await fetchProjects();
        return {
            content: [{
                type: "text",
                text: JSON.stringify(projects, null, 2),
            }]
        }
    } catch (error) {
        console.error(`Error fetching projects: `, error);
        return {
            content: [{
                type: "text",
                text: "Error fetching projects",
            }]
        }
    }
}
)
server.tool("get-jira-boards-using-project-id-or-project-key", "fetch jira boards in project",{projectIdOrKey: z.string()} , async ({projectIdOrKey})=>{
    try {
        const boards = await fetchBoards(undefined, projectIdOrKey);
        return {
            content: [{
                type: "text",
                text: JSON.stringify(boards, null, 2),
            }]
        }
    } catch (error) {
        console.error(`Error fetching boards in project ${projectIdOrKey}: `, error);
        return {
            content: [{
                type: "text",
                text: "Error fetching boards",
            }]
        }
    }
}
)
server.tool("get-jira-boards-using-board-name", "fetch jira boards in project",{boardName: z.string()} , async ({boardName})=>{
    try {
        const boards = await fetchBoards(boardName);
        return {
            content: [{
                type: "text",
                text: JSON.stringify(boards, null, 2),
            }]
        }
    } catch (error) {
        console.error(`Error fetching boards with name ${boardName}: `, error);
        return {
            content: [{
                type: "text",
                text: "Error fetching boards",
            }]
        }
    }
}
)
server.tool("get-jira-issue-types-in-project", "fetch jira issue types in project",{project: z.string()} , async ({project: projectId})=>{ 
    try {
        const issueTypes = await fetchProjectIssueTypes(projectId);
        return {
            content: [{
                type: "text",
                text: JSON.stringify(issueTypes, null, 2),
            }]
        }
    } catch (error) {
        console.error(`Error fetching issue types in project ${projectId}: `, error);
        return {
            content: [{
                type: "text",
                text: "Error fetching issue types",
            }]
        }
    }
}
)
server.tool("get-jira-sprints-in-board", "fetch jira sprints in board",{boardId: z.string()} , async ({boardId})=>{ 
    try {
        const sprints = await fetchBoardSprints(boardId);
        return {
            content: [{
                type: "text",
                text: JSON.stringify(sprints, null, 2),
            }]
        }
    } catch (error) {
        console.error(`Error fetching sprints in board ${boardId}: `, error);
        return {
            content: [{
                type: "text",
                text: "Error fetching sprints",
            }]
        }
    }
}
)



async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Jira MCP Server running on stdio");
  }
  
  main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
  });