'use client'

import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Card from '@/app/_components/Card';
import { useTranslations } from 'next-intl';

export default function SignIn(props: { disableCustomTheme?: boolean }) {
    const [errors, setErrors] = useState<{ email: boolean, password: boolean }>({ email: false, password: false });

    const t = useTranslations("auth");

    return (
        <>
            <Card variant="outlined">
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                >
                    {t("sign_in")}
                </Typography>
                <Box
                    component="form"
                    // onSubmit={handleSubmit}
                    noValidate
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        gap: 2,
                    }}
                >
                    <FormControl>
                        <FormLabel htmlFor="email">{t("email")}</FormLabel>
                        <TextField
                            error={errors.email}
                            // helperText={emailErrorMessage}
                            id="email"
                            type="email"
                            name="email"
                            size="small"
                            placeholder={t("email_placeholder")}
                            autoComplete="email"
                            autoFocus
                            required
                            fullWidth
                            variant="outlined"
                            color={errors.email ? 'error' : 'primary'}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor="password">{t("password")}</FormLabel>
                        <TextField
                            error={errors.password}
                            // helperText={passwordErrorMessage}
                            name="password"
                            size="small"
                            placeholder="••••••••••••"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            autoFocus
                            required
                            fullWidth
                            variant="outlined"
                            color={errors.password ? 'error' : 'primary'}
                        />
                    </FormControl>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                    >
                        {t("sign_in")}
                    </Button>
                </Box>
                <Divider>{t("or")}</Divider>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography sx={{ textAlign: 'center' }}>
                        {t("sign_up_hint")}{' '}
                        <Link
                            href="/material-ui/getting-started/templates/sign-in/"
                            variant="body2"
                            sx={{ alignSelf: 'center', fontSize: "1em" }}
                        >
                            {t("sign_up")}
                        </Link>
                    </Typography>
                </Box>
            </Card>
        </>
    );
}