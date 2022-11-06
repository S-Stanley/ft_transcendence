INSERT INTO
    public.users (email, pass)
VALUES (
    'demo@42.fr',
    crypt('password', gen_salt('bf',11))
);