CREATE TYPE public.current_status_enum as ENUM (
    'offline',
    'online',
    'in-game'
);

CREATE TABLE IF NOT EXISTS public.users(
    id                              SERIAL PRIMARY KEY NOT NULL UNIQUE,
    id_42                           INT DEFAULT NULL,
    email                           VARCHAR(255) NOT NULL UNIQUE,
    nickname                        VARCHAR(255) NOT NULL UNIQUE,
    two_factor_access_token         VARCHAR(255) DEFAULT NULL,
    two_factor_enabled              BOOLEAN DEFAULT NULL,
    two_factor_secret               VARCHAR(255) DEFAULT NULL,
    access_token                    VARCHAR(255) DEFAULT NULL,
    refresh_token                   VARCHAR(255) DEFAULT NULL,
    token_expires_at                DATE DEFAULT NULL,
    pass                            VARCHAR(255) NOT NULL,
    token                           UUID DEFAULT uuid_generate_v4() NOT NULL,
    created_at                      DATE DEFAULT NULL,
    avatar                          VARCHAR(255) NOT NULL,
    current_status                  public.current_status_enum DEFAULT 'offline',
    friends                         TEXT[] DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS public.history(
    id                  SERIAL PRIMARY KEY NOT NULL UNIQUE,
    player_id           INT NOT NULL,
    player_score        INT DEFAULT NULL,
    player_pongs        INT DEFAULT NULL,
    opp_score           INT DEFAULT NULL,
    opp_name            VARCHAR(255) DEFAULT NULL,
    created_at          DATE DEFAULT NOW() NOT NULL,

    CONSTRAINT          fk_player_id FOREIGN KEY (player_id) REFERENCES public.users (id)
);

CREATE TABLE IF NOT EXISTS public.matchmaking(
    id                  SERIAL PRIMARY KEY NOT NULL UNIQUE,
    id_42               INT NOT NULL,
    created_at          DATE DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.chat(
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL UNIQUE,
    name        VARCHAR(200) DEFAULT NULL,
    created_by  INTEGER DEFAULT NULL,

    CONSTRAINT  fk_created_by FOREIGN KEY (created_by) REFERENCES public.users(id)
);

CREATE TABLE IF NOT EXISTS public.chat_member(
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL UNIQUE,
    chat_id     UUID NOT NULL,
    user_id     INTEGER NOT NULL,

    CONSTRAINT  fk_chat_id FOREIGN KEY (chat_id) REFERENCES public.chat (id),
    CONSTRAINT  fk_user_id FOREIGN KEY (user_id) REFERENCES public.users (id)
);

CREATE TABLE IF NOT EXISTS public.chat_message(
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL UNIQUE,
    chat_id     UUID NOT NULL,
    sent_by     INTEGER NOT NULL,
    content     TEXT NOT NULL,
    created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    CONSTRAINT  fk_chat_id FOREIGN KEY (chat_id) REFERENCES public.chat (id),
    CONSTRAINT  fk_send_by FOREIGN KEY (sent_by) REFERENCES public.users (id)
);

CREATE TABLE IF NOT EXISTS public.conversation(
    id          SERIAL PRIMARY KEY NOT NULL UNIQUE,
    one         INT NOT NULL,
    two         INT NOT NULL,
    created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.message(
    id          SERIAL PRIMARY KEY NOT NULL UNIQUE,
    sender      INT NOT NULL,
    receiver    INT NOT NULL,
    content     TEXT NOT NULL,
    created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
