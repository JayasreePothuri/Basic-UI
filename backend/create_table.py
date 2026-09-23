from db import get_connection

conn = get_connection()
cur = conn.cursor()

cur.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL
    )
""")

cur.execute("""
    INSERT INTO users (email, password, role)
    VALUES
        ('jaya@gmail.com', 'jaya1234', 'developer'),
        ('admin@gmail.com', 'admin@145', 'admin')
    ON CONFLICT (email) DO NOTHING
""")

conn.commit()
cur.close()
conn.close()

print("users table is ready with demo accounts")
