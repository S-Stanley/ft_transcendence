import { Fragment, useState } from "react";
import { TextField } from "@mui/material";

const Chat = () => {
    const [messageContent, setMessageContent] = useState<string>('')

    const handleSubmit = async(e: { preventDefault: any }): Promise<void> => {
        e.preventDefault();
        setMessageContent('');
    }

    return (
        <Fragment>
            <form
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginLeft: '500px',
                    marginRight: '500px'
                }}
                onSubmit={handleSubmit}
            >
                <TextField
                    label="Standard"
                    variant="standard"
                    type='text'
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                />
            </form>
        </Fragment>
    );
};

export default Chat;