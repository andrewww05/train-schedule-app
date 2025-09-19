import { FC, useState, forwardRef, Fragment, ReactNode } from 'react';
import Button from '@mui/material/Button';
import { default as _Dialog } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { useTranslations } from 'next-intl';

type PropsType = {
    title: string;
    content: string;
    actions?: ReactNode;
    open: boolean;
    setOpen: (v: boolean) => void;
}

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Dialog: FC<PropsType> = ({ title, content, open, setOpen, actions }) => {
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Fragment>
            <_Dialog
                open={open}
                slots={{
                    transition: Transition,
                }}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {content}
                    </DialogContentText>
                </DialogContent>
                {actions && (
                    <DialogActions>
                        {actions}
                    </DialogActions>
                )}
            </_Dialog>
        </Fragment>
    );
}

export default Dialog;

export const RequestErrorDialog: FC<Omit<PropsType, "actions"|"title"|"content">> = ({ open, setOpen, ...props }) => {
    const t = useTranslations("components");

    return (
        <Dialog
            title={t("error_request_title")}
            content={t("error_request_text")}
            open={open}
            setOpen={setOpen}
            actions={<>
                <Button onClick={() => setOpen(false)}>{t("error_request_button")}</Button>
            </>}
            {...props}
        />);
}