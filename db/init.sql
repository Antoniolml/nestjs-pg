SELECT 'CREATE DATABASE my_db'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'my_db')\gexec