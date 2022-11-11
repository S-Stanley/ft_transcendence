CREATE TABLE IF NOT EXISTS public.users(
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
    email       VARCHAR(255) NOT NULL,
    pass        VARCHAR(255) NOT NULL,
    nickname    VARCHAR(255) NOT NULL,
    token       UUID DEFAULT uuid_generate_v4() NOT NULL
);