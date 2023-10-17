import { Box, Container, FormControlLabel, Grid, Radio, RadioGroup, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import { CustomDialog } from '../../../../components/CustomDialog';
import SearchIcon from '@material-ui/icons/Search';
import { CustomTextField } from '../../../../components/TextField';
import { CustomButton } from '../../../../components/Button';
import { getprofileist, projectList } from '../../../../services/api';
import { useMutation } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { updateState } from '../../../../redux/commonSlice';
import { makeStyles } from '@material-ui/core';


export const ProfileModal = (props) => {
    const classes = useStyles();

    const { togglerHandler, reducerKeyFromParent, selectProfileMapKey, parent } = props;
    const commonReducer = useSelector((state) => state.commonReducer);
    const dispatch = new useDispatch();

    const [projectArr, setProjectArr] = useState([])
    const [projectDetailArr, setProjectDetailArr] = useState([])
    const [projectIdArr, setProjectIdArr] = useState([])
    const [projectNameArr, setProjectNameArr] = useState([])
    const [localCurrentProjectId, setLocalCurrentProjectId] = useState({})
    const [pagedata, setPagedata] = useState({
        projectQuery: "",
        date: ""
    })

    console.log('reducerKeyFromParent', reducerKeyFromParent)

    useEffect(() => {
        if (parent == 'team') {
            TeamListMutate({ userId: commonReducer.userId })
        }
    }, [])

    useEffect(() => {
        setProjectIdArr(projectDetailArr.map((option) => option.projectId))
        setProjectNameArr(projectDetailArr.map((option) => option[selectProfileMapKey]))
    }, [projectDetailArr])

    useEffect(() => {
        if (projectArr.length > 0) {
            var localrArr = projectArr.filter((option) => option[selectProfileMapKey]?.toLowerCase().includes(pagedata?.projectQuery?.toLowerCase()))
            setProjectDetailArr(localrArr);

        }
    }, [pagedata.projectQuery])


    // const { mutate: projectListMutate } = useMutation(getprofileist, {
    //     onSuccess: (data, context, variables) => onSuccessProjectList(data, context, variables),
    //     onError: (data, context, variables) => onErrorProjectList(data, context, variables)
    // })

    // const onSuccessProjectList = (data) => {
    //     setProjectDetailArr(data.data.data);
    //     setProjectArr(data.data.data);
    // }


    // const onErrorProjectList = (data) => {

    // }


    const { mutate: TeamListMutate } = useMutation(getprofileist, {
        onSuccess: (data, context, variables) => onSuccesTeamList(data, context, variables),
        onError: (data, context, variables) => onErroTeamList(data, context, variables)
    })

    const onSuccesTeamList = (data) => {
        setProjectDetailArr(data.data.data);
        setProjectArr(data.data.data);
    }


    const onErroTeamList = (data) => {

    }


    const handleClose = () => {
        togglerHandler(false)
    }

    return <CustomDialog maxWidth="lg" dialogTitle="Select" open="true" handleClose={handleClose}>
        <Box>
            <Grid container >
                <Grid item xs='6' sm='5' md='5' lg='5' style={{ padding: "0px 0px 5px 10px" }}>
                    <CustomTextField
                        className={classes.search}
                        fullWidth
                        type="text"
                        startIcon={<SearchIcon style={{ marginLeft: "10px" }} />}
                        placeholder='Search'
                        value={pagedata?.username}
                        onChange={(event) => setPagedata({ ...pagedata, projectQuery: event.target.value })}
                    />
                </Grid>
            </Grid>
            <Grid container item xs='12' className={classes.projectnamecontainer}>
                {/* <Grid item xs='12'>
                    <Typography style={{ fontWeight: "bold" }}>Project ID</Typography>
                </Grid> */}
                <Grid item xs='12'>
                    <Typography variant='h7' className={classes.projectnametext}>Project name</Typography>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs='12'>
                    <Grid item className={classes.radio}>
                        <Grid>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue={Object.keys(commonReducer[reducerKeyFromParent]).length > 0 ? commonReducer[reducerKeyFromParent][selectProfileMapKey] : 0}
                                name="radio-buttons-group"
                            >
                                {/* {
                                    projectIdArr.length > 0 &&
                                    projectIdArr.map((item) => <FormControlLabel value={item} control={
                                        <Radio onChange={(e) => { setLocalCurrentProjectId(projectDetailArr.filter((option) => option.projectId == e.target.value)[0]) }} />} label={item} />)
                                } */}
                                {
                                    projectNameArr.length > 0 &&
                                    projectNameArr.map((item) => <FormControlLabel value={item} control={
                                        <Radio sx={{ fontSize: "19px" }} onChange={(e) => { setLocalCurrentProjectId(projectDetailArr.filter((option) => option[selectProfileMapKey] == e.target.value)[0]) }} />} label={<Typography variant='h7'>{item}</Typography>} />)
                                }
                            </RadioGroup>
                        </Grid>
                    </Grid>
                </Grid>
                {/* <Grid item xs='9'>
                    {
                        projectNameArr.length > 0 &&
                        projectNameArr.map((item) => {
                            return <Grid item style={{ marginLeft: "10px", padding: "5px" }}>
                                <Typography style={{ padding: "7px", color: "#6C6C6C" }}>
                                    {item}
                                </Typography>
                            </Grid>
                        })
                    }
                </Grid> */}
            </Grid>
            <Grid container className={classes.selectbutton}>
                <Grid item>
                    <CustomButton
                        btnText='select profile'
                        variant='contained'
                        btnClass={{ backgroundColor: "#124590", color: "#fff" }}
                        onClick={() => {
                            dispatch(updateState({ [reducerKeyFromParent]: localCurrentProjectId }))
                            handleClose();
                        }}
                    />
                </Grid>
            </Grid>
        </Box>
    </CustomDialog>
}


const useStyles = makeStyles((theme) => ({
    search: {
        backgroundColor: "#EEEEEE"
    },
    projectnamecontainer: {
        display: "flex",
        backgroundColor: "#f1f4f9 !important",
        padding: "8px !important",
        marginTop: "10px !important"
    },
    projectnametext: {
        fontWeight: "bold !important",
        fontsize: "1px !important"
    },
    radio: {
        display: "flex !important",
        alignItems: "center !important",
        padding: "5px !important",
        fontsize: "10px !important"
    },
    selectbutton: {
        display: "flex !important",
        justifyContent: "flex-end !important",
        margin: "100px 0px 0px 0px !important"
    },
}))