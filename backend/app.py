from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from db import get_connection

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class SigninData(BaseModel):
    email: str
    password: str
    role: str


@app.post("/api/signin")
def signin(data: SigninData):
    errors = []

    if not data.email:
        errors.append("Email is required")
    elif "@" not in data.email or "." not in data.email:
        errors.append("Email is not valid")

    if not data.password:
        errors.append("Password is required")
    elif len(data.password) < 8:
        errors.append("Password must be at least 8 characters")

    if data.role != "developer" and data.role != "admin":
        errors.append("Role must be developer or admin")

    if len(errors) > 0:
        raise HTTPException(status_code=400, detail=errors)

    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT password, role FROM users WHERE email = %s", (data.email,))
    user = cur.fetchone()
    cur.close()
    conn.close()

    if user is None or user[0] != data.password or user[1] != data.role:
        raise HTTPException(status_code=401, detail=["Invalid email, password, or role"])

    return {
        "message": "Sign in successful",
        "email": data.email,
        "role": data.role
    }
