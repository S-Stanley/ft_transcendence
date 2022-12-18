CREATE DATABASE dev;

\c dev

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pgcrypto;

\i tables.sql;

TRUNCATE TABLE public.users;
TRUNCATE TABLE public.chat;
TRUNCATE TABLE public.chat_message;
TRUNCATE TABLE public.chat_member;

\i fixtures/users-fixtures.sql
\i fixtures/messagerie-fixtures.sql
\i fixtures/discussion-fixtures.sql
\i fixtures/message-fixtures.sql

\i functions/login.sql