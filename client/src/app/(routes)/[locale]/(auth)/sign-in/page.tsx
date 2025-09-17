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
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

interface IFormInput {
  email: string
  password: string
}


export default function SignIn(props: { disableCustomTheme?: boolean }) {
    const [errors, setErrors] = useState<{ email: boolean, password: boolean }>({ email: false, password: false });

    const { control, handleSubmit } = useForm({
        defaultValues: {
            email: "",
            password: ""
        },
    })

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        console.log(data)
    }

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
                    onSubmit={handleSubmit(onSubmit)}
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
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    id="email"
                                    type="email"
                                    size="small"
                                    placeholder={t("email_placeholder")}
                                    autoComplete="email"
                                    autoFocus
                                    required
                                    fullWidth
                                    variant="outlined"
                                    {...field}
                                />
                            )} 
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor="password">{t("password")}</FormLabel>
                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
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
                            )} 
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