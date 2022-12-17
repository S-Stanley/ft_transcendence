-- Create public chat
INSERT INTO
    public.chat(id, name, created_by)
VALUES(
    '7e87fdf9-cfd2-4ded-b5f4-988d26daf2db',
    'test-public-chat',
    1
);
INSERT INTO
    public.chat_member(chat_id, user_id)
VALUES(
    '7e87fdf9-cfd2-4ded-b5f4-988d26daf2db',
    1
);


-- Create private chat
INSERT INTO
    public.chat(id, created_by)
VALUES(
    '7e87fdf9-cfd2-4ded-b5f4-988d26daf2dc',
    1
);
INSERT INTO
    public.chat_member(chat_id, user_id)
VALUES(
    '7e87fdf9-cfd2-4ded-b5f4-988d26daf2dc',
    1
);
INSERT INTO
    public.chat_member(chat_id, user_id)
VALUES(
    '7e87fdf9-cfd2-4ded-b5f4-988d26daf2dc',
    2
);