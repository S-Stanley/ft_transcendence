CREATE TABLE IF NOT EXISTS public.users(
    id                  SERIAL PRIMARY KEY NOT NULL,
    email               VARCHAR(255) NOT NULL,
    nickname            VARCHAR(255) NOT NULL,
    access_token        VARCHAR(255) DEFAULT NULL,
    refresh_token       VARCHAR(255) DEFAULT NULL,
    token_expires_at    DATE DEFAULT NULL,
    pass                VARCHAR(255) NOT NULL,
    token               UUID DEFAULT uuid_generate_v4() NOT NULL,
    created_at          DATE DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS public.chat(
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.chat_member(
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
    chat_id     UUID NOT NULL,
    user_id     UUID NOT NULL
);

CREATE TABLE IF NOT EXISTS public.chat_message(
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
    chat_id     UUID NOT NULL,
    sent_by     UUID NOT NULL,
    content     TEXT NOT NULL,
    created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);