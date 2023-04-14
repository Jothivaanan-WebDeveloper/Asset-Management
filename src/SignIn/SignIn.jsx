import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { styled } from '@mui/material/styles';
import GoogleIcon from '@mui/icons-material/Google';
import logo from '../../src/logo.png';
import './signIn.css';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import { useState } from "react";

export default function SignIn(props) {

    const [isLogin, setIsLogin] = useState(false);

    const handleSubmit = (event) => {

        event.preventDefault();
        localStorage.setItem('isLoggedIn', true);
        let isAuthorized = localStorage.getItem('isLoggedIn')
        if (isAuthorized) {
            setIsLogin(true);
        }
        // const data = new FormData(event.currentTarget);
        // console.log({
        //     email: data.get("email"),
        //     password: data.get("password"),
        // });
        // console.log(props);
    };

    props.onLogin(isLogin);

    const GoogleButton = styled(Button)({
        background: 'linear-gradient(45deg, #8E2DE2 30%, #4A00E0 90%)',
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
    });

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    boxShadow: 3,
                    borderRadius: 2,
                    px: 4,
                    py: 6,
                    marginTop: "5rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}
            >
                {/* <Typography component="h1" variant="h5" maxWidth=""> */}
                <img src={logo} alt="logo" height={130} width={220} style={{ marginTop: "-5% !important" }} />
                {/* </Typography> */}

                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="success"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleSubmit}
                    >
                        Sign In
                    </Button>
                    <Divider variant="middle" color="primary" >

                        <Typography sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center"
                        }}>
                            <Chip label="OR" />

                        </Typography>

                    </Divider>
                    <GoogleButton
                        startIcon={<GoogleIcon />}
                        type="submit"
                        size="small"
                        variant="outlined"
                        fullWidth
                        sx={{ mt: 2, mb: 2 }}
                    >
                        <Typography variant="subtitle1"
                            fontSize={{ xs: '12px', sm: '14px', md: '14px' }}
                        >
                            Continue with Google
                        </Typography>
                    </GoogleButton>

                    {/* <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid> */}
                </Box>
            </Box>
        </Container>
    );
}