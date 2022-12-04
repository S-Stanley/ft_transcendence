INSERT INTO
    public.users (
        email,
        pass,
        nickname,
        access_token,
        refresh_token,
        token_expires_at,
        avatar
    )
VALUES (
    'demo@42.fr',
    crypt('password', gen_salt('bf',11)),
    'demo',
    'e1042321-38d2-4f87-ba7c-5f3c8d53c71d',
    '',
    '2022-11-24 22:06:26',
    'https://cdn.intra.42.fr/users/a899eb9e2861522b8beead0baf1a38db/sserbin.jpg'
), (
    'staff@transcendence.fr',
    crypt('password', gen_salt('bf',11)),
    'staff',
    '5c0eb6e8-962f-4bac-95b8-7dc330fe4d21',
    '',
    '2022-11-24 22:06:26',
    'https://cdn.intra.42.fr/users/a899eb9e2861522b8beead0baf1a38db/sserbin.jpg'
);