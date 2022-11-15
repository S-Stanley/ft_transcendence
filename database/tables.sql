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
    content     TEXT NOT NULL
);