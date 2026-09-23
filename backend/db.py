import psycopg2


def get_connection():
    return psycopg2.connect(
        host="127.0.0.1",
        port=5432,
        dbname="basic_ui",
        user="postgres",
        password="root"
    )
