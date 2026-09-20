"""
services/agent_tools.py

Tool definitions the agent can call. Each tool wraps an existing service
method — the agent never touches a repository or the DB directly, only
the same service layer your routes already depend on. This is what
makes the agent's answers "grounded": it's calling your real, live data,
not a copy of it baked into a prompt.

Add new tools here as you add services (e.g. a PostService for the blog).
"""

from typing import Any

from services.projects.project_service import ProjectService

# Anthropic tool-use schema: https://docs.claude.com/en/docs/tool-use
TOOL_DEFINITIONS = [
    {
        "name": "get_projects",
        "description": (
            "Get the full list of portfolio projects, including title, "
            "subtitle, description, and skills used for each. Use this "
            "when the visitor asks broadly about projects, experience, "
            "or what technologies have been used."
        ),
        "input_schema": {
            "type": "object",
            "properties": {},
        },
    },
    {
        "name": "get_project_by_id",
        "description": (
            "Get full details for a single project by its ID. Use this "
            "when the visitor asks a follow-up about a specific project "
            "you already mentioned."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "project_id": {
                    "type": "string",
                    "description": "The project's UUID, from a prior get_projects result.",
                }
            },
            "required": ["project_id"],
        },
    },
    # Add here once a PostService exists, following the same shape:
    # {
    #     "name": "search_posts",
    #     "description": "Search blog posts by topic/keyword.",
    #     "input_schema": {
    #         "type": "object",
    #         "properties": {"query": {"type": "string"}},
    #         "required": ["query"],
    #     },
    # },
]


class AgentToolExecutor:
    """Executes a tool call by name, delegating to the service layer."""

    def __init__(self, project_service: ProjectService):
        self._project_service = project_service

    async def execute(self, tool_name: str, tool_input: dict[str, Any]) -> str:
        if tool_name == "get_projects":
            projects = await self._project_service.get_project_list()
            return self._serialize_projects(projects)

        if tool_name == "get_project_by_id":
            project = await self._project_service.get_project(tool_input["project_id"])
            if project is None:
                return "No project found with that ID."
            return self._serialize_projects([project])

        return f"Unknown tool: {tool_name}"

    @staticmethod
    def _serialize_projects(projects) -> str:
        # Plain text is fine for the model to read; no need for JSON here.
        lines = []
        for p in projects:
            lines.append(
                f"- {p.title} ({p.subtitle}): {p.description} "
                f"[skills: {', '.join(p.skills)}] (id: {p.id})"
            )
        return "\n".join(lines) if lines else "No projects found."
