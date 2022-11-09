DROP DATABASE IF EXISTS dev;
CREATE DATABASE dev;

\c dev

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pgcrypto;

\i tables.sql;

\i fixtures/users-fixtures.sql

\i functions/login.sql