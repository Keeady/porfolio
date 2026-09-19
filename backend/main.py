from fastapi import FastAPI
from api.projects import get_projects

app = FastAPI()

@app.get("/projects")
async def project_list():
    results = await get_projects()
    return results
