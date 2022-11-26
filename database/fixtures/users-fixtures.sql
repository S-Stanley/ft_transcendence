INSERT INTO
    public.users (
        email,
        pass,
        nickname,
        access_token,
        refresh_token,
        token_expires_at
    )
VALUES (
    'demo@42.fr',
    crypt('password', gen_salt('bf',11)),
    'demo',
    '',
    '',
    '2022-11-24 22:06:26'
), (
    'staff@transcendence.fr',
    crypt('password', gen_salt('bf',11)),
    'staff',
    '',
    '',
    '2022-11-24 22:06:26'
);