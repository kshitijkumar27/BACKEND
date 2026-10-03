from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse

app = FastAPI()

templates = Jinja2Templates(directory="templates")


@app.get("/", response_class=HTMLResponse)
def home(request: Request):
    user = {
        "name": "Kshitij Kumar",
        "sap_id": "590011593",
        "batch": "B.Tech CSE",
        "semester": "5"
    }

    return templates.TemplateResponse(
        request=request,
        name="user.html",
        context={"user": user}
    )