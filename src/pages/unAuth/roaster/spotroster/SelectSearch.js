import { CustomDialog } from "../../../../components/CustomDialog";
import { styled } from "@mui/material/styles";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { CustomButton } from "../../../../components/Button";
import { Typography, Grid, Box } from "@mui/material";
import { CustomTextField } from "../../../../components/TextField";
import { makeStyles } from "@material-ui/styles";
import CustomCheckBox from "../../../../components/CustomCheckBox";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowRightIcon sx={{ fontSize: "2rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  // borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const SelectSearch = (props) => {
  const {
    customDialogProps,
    accordianProps,
    summaryProps,
    summaryFirstChildProps,
    summaryValue,
    customTextFieldContainer,
    customTextFieldArr,
    customButtonsArr,
    columns,
    columnProps,
    columnContainerProps,
    columnCellProps,
    rowContainerProps,
    rows,
    handleChange,
    curIndex,
    state,
    customButtonProps,
    rowCellProps,
    classes,
    checkbox,
  } = props;
  const localArr = customButtonsArr.filter((item) => item.btnText === "Search");
  var searchMethod = () => {};
  if (localArr.length > 0) {
    searchMethod = localArr[0].onClick;
  }

  const onKeyDown = (event) => {
    if (event.key === "Enter") {
      searchMethod();
    }
  };
  const changeTime = (date, key) => {
    const pp1 = new Date(date["timeStart"]);
    const tt1 = pp1.toLocaleTimeString().replace(/:\d\d( |$)/, "");

    const pp2 = new Date(date["timeEnd"]);
    const tt2 = pp2.toLocaleTimeString().replace(/:\d\d( |$)/, "");

    // console.log(tt1, "item[value.key]");
    return key == "timeStart" ? tt1 + "-" + tt2 : date[key];
  };
  return (
    <CustomDialog {...customDialogProps}>
      <Accordion {...accordianProps}>
        <AccordionSummary {...summaryProps}>
          <Typography {...summaryFirstChildProps}>{summaryValue}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container {...customTextFieldContainer}>
            {customTextFieldArr &&
              customTextFieldArr.length > 0 &&
              customTextFieldArr.map((item, index) => {
                // console.log(item.customTextFieldProps)
                return (
                  <Grid item {...item.mainContainerProps} key={index}>
                    <Box {...item.mainContentBoxProps}>
                      <Box {...item.formFieldParentProps}>
                        <Typography {...item.formFieldProps}>
                          {item.fieldName}
                        </Typography>
                      </Box>
                      <Box {...item.customTextFieldParentProps}>
                        <CustomTextField
                          {...item.customTextFieldProps}
                          onKeyDown={onKeyDown}
                        />
                      </Box>
                    </Box>
                  </Grid>
                );
              })}
          </Grid>
          <Grid container className={classes?.selectbutton}>
            {customButtonsArr &&
              customButtonsArr.length > 0 &&
              customButtonsArr.map((item, index) => {
                return (
                  <Grid item padding="2px" key={index}>
                    <CustomButton {...item} />
                  </Grid>
                );
              })}
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Grid container mt="20px" {...columnContainerProps}>
        {columns &&
          columns.length > 0 &&
          columns.map((item, index) => {
            return (
              <Grid key={index} item xs={item.xs} {...columnProps}>
                <Box fontWeight="bold">
                  <Typography {...columnCellProps}>{item.name}</Typography>
                </Box>
              </Grid>
            );
          })}
      </Grid>
      <Grid container className="data-table-small">
        {rows &&
          rows.length > 0 &&
          rows.map((item, index) => {
            return (
              <Grid
                container
                alignItems="center"
                onClick={() => handleChange(index, item, curIndex)}
                style={{
                  background: state === index ? "lightblue" : "white",
                  display: "flex",
                }}
                xs={rowContainerProps.xs ? rowContainerProps?.xs[index] : ""}
                {...rowContainerProps}
              >
                {checkbox ? (
                  <Grid item xs="0.1">
                    <CustomCheckBox />
                  </Grid>
                ) : null}
                {columns &&
                  columns.length > 0 &&
                  columns.map((value, value_index) => {
                    return (
                      <Grid
                        key={value_index}
                        item
                        xs={value.xs}
                        {...columnProps}
                      >
                        <Box>
                          <Typography {...rowCellProps}>
                            {"key" in value
                              ? changeTime(item, value.key)
                              : value.method(item)}
                            {/* {console.log(value.key, "hello")} */}
                          </Typography>
                        </Box>
                      </Grid>
                    );
                  })}
              </Grid>
            );
          })}
        {rows && rows.length === 0 && (
          <Grid container {...rowContainerProps}>
            <Grid item {...rowCellProps}>
              No rows to display.
            </Grid>
          </Grid>
        )}
      </Grid>
      <Grid container justifyContent="flex-end">
        <Box py={2}>
          <CustomButton {...customButtonProps} />
        </Box>
      </Grid>
    </CustomDialog>
  );
};
export default SelectSearch;
