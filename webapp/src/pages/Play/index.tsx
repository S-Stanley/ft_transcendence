import {
    Button,
    FormControlLabel,
    Paper,
    Switch,
    Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { v4 } from "uuid";

export const Play = () => {
    const [checked, setChecked] = useState(true);
    const [invit, setInvit] = useState(true);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    const handleInvit = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInvit(event.target.checked);
    };

    const navigate = useNavigate();

    const handleMatchType = () => {
        if (checked) navigate("/play/matchmaking");
        else navigate("/play/classic_search");
    };

    return (
        <>
            <Paper
                sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    height: 220,
                    mt: "100px",
                }}
            >
                <Typography sx={{ mb: "100px", mt: "50px" }} variant="h4">
                    Choose mode
                </Typography>
                <Button
                    color="secondary"
                    variant="contained"
                    size="large"
                    onClick={handleMatchType}
                >
                    Quick Game
                </Button>
                <FormControlLabel
                    sx={{ ml: "15px" }}
                    control={
                        <Switch
                            checked={checked}
                            onChange={handleChange}
                            inputProps={{
                                "aria-label": "controlled",
                            }}
                        />
                    }
                    label="With Bonus"
                />
                <Button
                    sx={{ mt: "30px" }}
                    color="secondary"
                    variant="contained"
                    size="large"
                    onClick={() => {
                        navigator.clipboard.writeText(
                            `http://localhost:3000/play/matchmaking/${v4()}-${invit}`
                        );
                        toast.success(
                            "Private link has been copied into your clipboard"
                        );
                    }}
                >
                    Create Game
                </Button>
                <FormControlLabel
                    sx={{ ml: "15px" }}
                    control={
                        <Switch
                            checked={invit}
                            onChange={handleInvit}
                            inputProps={{
                                "aria-label": "controlled",
                            }}
                        />
                    }
                    label="With Bonus"
                />
                <Button
                    sx={{ mt: "30px" }}
                    color="secondary"
                    variant="contained"
                    size="large"
                    href="/play/live"
                >
                    Watch Live
                </Button>
            </Paper>
        </>
    );
};
