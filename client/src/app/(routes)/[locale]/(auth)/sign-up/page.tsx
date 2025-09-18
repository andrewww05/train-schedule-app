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
    name: string
    email: string
    password: string
}


export default function SignIn(props: { disableCustomTheme?: boolean }) {
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: "",
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
                    {t("sign_up")}
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
                        <FormLabel htmlFor="name">{t("name")}</FormLabel>
                        <Controller
                            name="name"
                            control={control}
                            rules={{
                                required: t("name_required"),
                                minLength: {
                                    value: 3,
                                    message: t("name_err_length_min")
                                },
                                maxLength: {
                                    value: 50,
                                    message: t("name_err_length_max")
                                },
                                pattern: {
                                    value: /^[A-Za-zА-Яа-яЁёІіЇїЄє\s]+$/,
                                    message: t("name_err_pattern")
                                }
                            }}
                            render={({ field }) => (
                                <TextField
                                    id="name"
                                    type="name"
                                    size="small"
                                    placeholder={t("name_placeholder")}
                                    autoComplete="name"
                                    autoFocus
                                    required
                                    fullWidth
                                    variant="outlined"
                                    error={Boolean(errors.name)}
                                    helperText={errors.name?.message}
                                    {...field}
                                />
                            )}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor="email">{t("email")}</FormLabel>
                        <Controller
                            name="email"
                            rules={{
                                required: t("email_required"),
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: t("email_invalid")
                                }
                            }}
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
                                    error={Boolean(errors.email)}
                                    helperText={errors.email?.message}
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
                            rules={{
                                required: t("password_required"),
                                minLength: {
                                    value: 8,
                                    message: t("password_err_length")
                                },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                    message: t("password_err_regex")
                                }
                            }}
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
                                    error={Boolean(errors.password)}
                                    helperText={errors.password?.message}
                                />
                            )}
                        />
                    </FormControl>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                    >
                        {t("sign_up")}
                    </Button>
                </Box>
                <Divider>{t("or")}</Divider>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography sx={{ textAlign: 'center' }}>
                        {t("sign_in_hint")}{' '}
                        <Link
                            href="sign-in"
                            variant="body2"
                            sx={{ alignSelf: 'center', fontSize: "1em" }}
                        >
                            {t("sign_in")}
                        </Link>
                    </Typography>
                </Box>
            </Card>
        </>
    );
}