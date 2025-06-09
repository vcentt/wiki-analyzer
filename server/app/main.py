from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db.database import init_db
from app.api.routes import router

app = FastAPI(title="Wikipedia Analyzer API")

# 1. Define los orígenes permitidos (tu front en dev)
origins = [
    "http://localhost:5173",
    # si necesitas producción, agrega tu dominio ahí
    # "https://tu-dominio.com"
]

# 2. Añade el middleware antes de incluir routers
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,       # o ["*"] para permitir todos (solo en dev)
    allow_credentials=True,
    allow_methods=["*"],         # GET, POST, PUT, DELETE…
    allow_headers=["*"],         # Content-Type, Authorization…
)

@app.on_event("startup")
def on_startup():
    init_db()

app.include_router(router)