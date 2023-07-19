import React from 'react';
import { useDispatch } from 'react-redux';
import axios from '../../utils/axios';
import config from '../../config';
import { Button, Grid, Typography, makeStyles, CircularProgress,
    Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { gridSpacing } from '../../store/constant';

const useStyles = makeStyles((theme) => ({
    btnTable: {
        borderRadius: '4px',
        paddingLeft: '4px',
        paddingRight: '4px',
        width: '100%',
        minWidth: '120px',
        
        '&:hover': {
            background: theme.palette.secondary.main,
            borderColor: theme.palette.secondary.main,
            color: '#fff'
        }
    },
    ScrollHeight: {
        maxHeight: '400px',
    }
}));

const ScaleAnswerBox = ( props ) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { bet, myTips } = props;
    const [selectedIndex, setSelectedIndex] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [settlementTips, setSettlementTips] = React.useState(null);

    const handleClickOpen = async () => {
        setOpen(true);
        if (settlementTips == null) {
            setIsLoading(true);

            const response = await axios.get(config.apiHost + '/v1/bets/' + bet.id + '/settlementTips');

            setSettlementTips(response.data);
            setIsLoading(false);
        }       
    };

    const handleClose = () => {
        setOpen(false);
    };
   
    return (
    <Grid container justifyContent="center">
        <Button style={{width:'100%'}} variant="outlined" color="warning" onClick={handleClickOpen}>
            Show Settlement
        </Button>

        <Dialog fullWidth={true} open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
            <DialogTitle id="form-dialog-title">
                <Typography style={{fontSize:'1.7em', fontWeight: 'bold'}}>Settlement</Typography>
            </DialogTitle>
            <DialogContent>
                {/*}<DialogContentText>
                    <Typography variant="body2"></Typography>
                </DialogContentText>{*/}
                {isLoading ? (
                    <>
                    <br /><br /><br />
                    <Grid container justifyContent="center">
                        <CircularProgress color="secondary" size="10em"  />
                    </Grid>
                    <br />
                    </>
                ) : ''}
                
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} lg={12}>
                        <pre>{settlementTips != null ? JSON.stringify(settlementTips,null,2) : ''}</pre>
                        {/*}<TextField fullWidth id="outlined-basic-size-small" onChange={e => setAmount(e.target.value)}
                            label={'Amount'} type='number' size="small"  inputProps={{ maxLength: 10 }} />{*/}
                    </Grid>
                </Grid>
                

            </DialogContent>
            <DialogActions sx={{ pr: 2.5 }}>
                <Button onClick={handleClose} color="error">
                    Cancel
                </Button>
                {/*}<Button variant="contained" size="small" onClick={createTip} color="primary">
                    {isLoadingAddTip ? (<> <CircularProgress color="secondary"  size="1.7em" /></>) : ('Create') }  
                </Button>{*/}
            </DialogActions>
        </Dialog>
    </Grid>
    );
};

export default ScaleAnswerBox;
