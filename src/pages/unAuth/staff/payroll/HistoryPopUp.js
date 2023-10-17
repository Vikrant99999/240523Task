import { CustomDialog } from "../../../../components/CustomDialog";

import History from "./History";

import React, { useEffect, useState } from "react";

const HistoryPopUp = (props) => {
  const { open, handleClose, data } = props;
  const title = "History";

  return (
    <CustomDialog
      dialogTitle={title}
      handleClose={handleClose}
      open={open}
      maxWidth="md"
    >
      <History data={data} />
    </CustomDialog>
  );
};

export default HistoryPopUp;
