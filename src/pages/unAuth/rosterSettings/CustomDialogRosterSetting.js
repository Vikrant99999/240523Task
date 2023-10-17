import { Box, Dialog, IconButton, Typography } from '@mui/material'
import React from 'react'
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { CustomButton } from '../../../components/Button';

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
        textAlign: 'right',
        background: '#124590',
        color: 'white',
        // minHeight: "45px",
        position: "relative",
        height: "45px",
        alignItems: "center",
        borderRadius: "0px !important"
    },
    closeButton: {
        position: 'absolute !important',
        right: theme.spacing(1),
        top: 0,
        color: 'white !important',
        bottom: 0
    },
    withoutHeading: {
        margin: 0,
        padding: theme.spacing(1),
        textAlign: 'right',
        color: 'white',
        minHeight: "44px"
    },
    closeButtonWithoutHeading: {
        position: 'absolute !important',
        right: theme.spacing(1),
        top: "2px",
        color: '#000 !important'
    },

});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        children ?
            <MuiDialogTitle disableTypography className={classes.root} {...other}>
                <Typography variant="h6" textAlign="center">{children}</Typography>
                {onClose ? (
                    <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                ) : null}
            </MuiDialogTitle>
            : <MuiDialogTitle disableTypography className={classes.withoutHeading} {...other}>
                {onClose ? (
                    <IconButton aria-label="close" className={classes.closeButtonWithoutHeading} onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                ) : null}
            </MuiDialogTitle>

    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);


const useStyles = makeStyles(theme => ({
    root: {

        '& .MuiPaper-root': {
            width: "100%",
            borderRadius: 0,
            boxShadow: "none"
        },
    },
}));

export const CustomDialogRosterSetting = (props) => {
    const classes = useStyles();

    const { maxWidth, dialogTitle, handleClose, open,  } = props;
    return <Dialog
        {...props}
        maxWidth={maxWidth} scroll="paper"
        className={classes.root}
        // onClose={handleClose} 
        aria-labelledby="customized-dialog-title"
        open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            <Box style={{ textAlign: "left", fontSize: 16, lineHeight: "20px", }}>
                {dialogTitle}
            </Box>
        </DialogTitle>
        <DialogContent dividers={true} style={{minHeight:"30vh"}}>
            {props.children}
        </DialogContent>
      
    </Dialog>
}
