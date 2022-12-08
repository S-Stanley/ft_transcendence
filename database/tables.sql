CREATE TABLE IF NOT EXISTS public.users(
    id                  SERIAL PRIMARY KEY NOT NULL,
    id_42               INT DEFAULT NULL,
    email               VARCHAR(255) NOT NULL,
    nickname            VARCHAR(255) NOT NULL UNIQUE,
    access_token        VARCHAR(255) DEFAULT NULL,
    refresh_token       VARCHAR(255) DEFAULT NULL,
    token_expires_at    DATE DEFAULT NULL,
    pass                VARCHAR(255) NOT NULL,
    token               UUID DEFAULT uuid_generate_v4() NOT NULL,
    created_at          DATE DEFAULT NULL,
    avatar              VARCHAR(255) NOT NULL,
    current_status      VARCHAR(255) DEFAULT 'offline',
    friends             TEXT[] DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS public.history(
    id                  SERIAL PRIMARY KEY NOT NULL,
    player_id           INT NOT NULL,
    player_score        INT DEFAULT NULL,
    player_pongs        INT DEFAULT NULL,
    opp_score           INT DEFAULT NULL,
    opp_name            VARCHAR(255) DEFAULT NULL,
    created_at          DATE DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.chat(
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.chat_member(
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
    chat_id     UUID NOT NULL,
    user_id     INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS public.chat_message(
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
    chat_id     UUID NOT NULL,
    sent_by     INTEGER NOT NULL,
    content     TEXT NOT NULL,
    created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);