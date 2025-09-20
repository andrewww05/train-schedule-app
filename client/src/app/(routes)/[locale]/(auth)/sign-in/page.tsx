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
import Api from '@/common/http/api';
import { RequestErrorDialog } from '@/app/_components';
import { HTTPError } from 'ky';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/app/_providers';

interface IFormInput {
    email: string
    password: string
}

export default function SignIn(props: { disableCustomTheme?: boolean }) {
    const [errModalOpened, setErrModalOpened] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    const { setAccessToken } = useAuthStore((state) => state);

    const router = useRouter();

    const { control, handleSubmit, formState: { errors }, setError } = useForm({
        defaultValues: {
            email: "",
            password: ""
        },
    })

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        try {
            setIsLoading(true);
            const res  = await Api.raw.post('auth/login', { 
                json: data
            });

            if (res.status < 200 || res.status > 299) throw Error(res.statusText);

            const json = await res.json();
            const accessToken = (json as any).accessToken;

            setAccessToken(accessToken);

            router.push('/');
        } catch (error) {
            if (error instanceof HTTPError && error.response.status == 400) {
                const json = await error.response.json();
                
                const messages = Array.isArray(json.message) ? json.message : [json.message];
                
                messages.forEach((errorText: string) => {
                    const field: string = errorText.split('_')[0];
                    
                    // @ts-ignore
                    setError(field, {
                        type: "required",
                        message: t(errorText)
                    });
                });
                
            } else if (error instanceof HTTPError && error.response.status == 404) {
                setError("email", {
                        type: "required",
                        message: t("email_err_not_exists")
                    });
            }
            else {
                setErrModalOpened(true);
            }
        } finally {
            setIsLoading(false);
        }
    }

    const t = useTranslations("auth");

    return (
        <>
            <RequestErrorDialog open={errModalOpened} setOpen={setErrModalOpened} />
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
                        loading={isLoading}
                    >
                        {t("sign_in")}
                    </Button>
                </Box>
                <Divider>{t("or")}</Divider>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography sx={{ textAlign: 'center' }}>
                        {t("sign_up_hint")}{' '}
                        <Link
                            href="sign-up"
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