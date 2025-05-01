import axios from "axios";
import dotenv from "dotenv"
dotenv.config();

const JIRA_BASE_URL = `https://${process.env.JIRA_BASE_URL}`;
const JIRA_AUTH_TOKEN = `Bearer ${process.env.JIRA_AUTH_TOKEN}`;

if (!process.env.JIRA_BASE_URL || !process.env.JIRA_AUTH_TOKEN) {
  throw new Error("JIRA_BASE_URL or JIRA_AUTH_TOKEN is not defined in the environment variables.");
}

console.log("JIRA_BASE_URL:", JIRA_BASE_URL);
console.log("JIRA_AUTH_TOKEN:", JIRA_AUTH_TOKEN);


const API_URL = `${JIRA_BASE_URL}/rest/api/2`;
const AGILE_URL = `${JIRA_BASE_URL}/rest/agile/1.0`;
const headers = {
  Authorization: JIRA_AUTH_TOKEN,
  Accept: "application/json",
};

const agileClient = axios.create({
  baseURL: AGILE_URL,
  headers,
});

const apiClient = axios.create({
  baseURL: API_URL,
  headers,
});

const fetchIssueDetails = async (issueId: string, fields?: string, expand?: string) => {
  try {
    const { data } = await apiClient.get(`/issue/${issueId}`, {
      params: {
        fields,
        expand,
      },
    });
    return data;
  } catch (error) {
    console.error("Error fetching issue's details:", error);
    throw error;
  }
};

const fetchIssuesUsingJQL = async (jql: string, fields?: string, expand?: string, startAt: number = 0, maxResults: number = 50) => {
  try {
    const { data } = await apiClient.get(`/search`, {
      params: {
        jql,
        fields,
        expand,
        startAt,
        maxResults,
      },
    });
    return data;
  } catch (error) {
    console.error("Error fetching issues using JQL:", error);
    throw error;
  }
};

const fetchUsers = async (project: string) => {
  try {
    const { data } = await apiClient.get(`/user/assignable/search`, {
      params: {
        project,
      },
    });
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

const fetchProjectComponents = async (projectId: string) => {
  try {
    const { data } = await apiClient.get(`/project/${projectId}/components`);
    return data;
  } catch (error) {
    console.error("Error fetching components:", error);
    throw error;
  }
};

const fetchProjectStatus = async (projectId: string) => {
  try {
    const { data } = await apiClient.get(`/project/${projectId}/statuses`);
    return data;
  } catch (error) {
    console.error("Error fetching status:", error);
    throw error;
  }
};

const fetchPriorities = async () => {
  try {
    const { data } = await apiClient.get(`/priority`);
    return data;
  } catch (error) {
    console.error("Error fetching priorities:", error);
    throw error;
  }
};

const fetchProjects = async () => {
  try {
    const { data } = await apiClient.get(`/project`);
    return data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

const fetchProjectIssueTypes = async (projectId: string) => {
  try {
    const { data } = await apiClient.get(`/project/${projectId}/issuetypes`);
    return data;
  } catch (error) {
    console.error("Error fetching issue types:", error);
    throw error;
  }
};

const fetchProjectVersions = async (projectId: string) => {
  try {
    const { data } = await apiClient.get(`/project/${projectId}/versions`);
    return data;
  } catch (error) {
    console.error("Error fetching versions:", error);
    throw error;
  }
};

const fetchBoards = async (boardName?: string, projectKeyOrId?: string) => {
  try {
    const { data } = await agileClient.get("/board", {
      params: {
        name: boardName,
        projectKeyOrId,
      },
    });
    return data.values;
  } catch (error) {
    console.error("Error fetching boards:", error);
    throw error;
  }
};

const fetchBoardSprints = async (
  boardId: string,
  state?: "closed" | "active" | "future",
  startDate?: string,
  endDate?: string
) => {
  try {
    const { data } = await agileClient.get(`/board/${boardId}/sprint`, {
      params: {
        state,
        startDate,
        endDate,
      },
    });
    return data;
  } catch (error) {
    console.error("Error fetching sprints:", error);
    throw error;
  }
};

const fetchIssueTransitions = async (issueId: string) => {
  try {
    const { data } = await apiClient.get(`/issue/${issueId}/transitions`);
    return data.transitions;
  } catch (error) {
    console.error("Error fetching issue transitions:", error);
    throw error;
  }
};

const fetchStatusCategory = async () => {
  try {
    const { data } = await apiClient.get("/statuscategory");
    return data;
  } catch (error) {
    console.error("Error fetching status category :", error);
    throw error;
  }
};

const fetchIssueComments = async (issueId: string, startAt: number = 0, maxResults: number = 50) => {
  try {
    const { data } = await apiClient.get(`/issue/${issueId}/comment`, {
      params: {
        startAt,
        maxResults,
      },
    });
    return data.comments;
  } catch (error) {
    console.error("Error fetching issue comments:", error);
    throw error;
  }
};

export {
  fetchIssueDetails,
  fetchIssuesUsingJQL,
  fetchUsers,
  fetchProjectComponents,
  fetchProjectStatus,
  fetchPriorities,
  fetchProjects,
  fetchProjectIssueTypes,
  fetchProjectVersions,
  fetchBoards,
  fetchBoardSprints,
  fetchIssueTransitions,
  fetchStatusCategory,
  fetchIssueComments,
};
