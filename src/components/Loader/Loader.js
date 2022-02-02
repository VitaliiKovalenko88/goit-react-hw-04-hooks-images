import { Grid } from "react-loader-spinner";

import { createPortal } from "react-dom";
import { Wrapper, Box } from "./Loader.styled";

const loaderRoot = document.querySelector("#loader-root");

export const Loader = () => {
  return createPortal(
    <Wrapper className="loaderWrapper">
      <Box className="loaderBox">
        <Grid color="#FF5733" height={100} width={110} />
      </Box>
    </Wrapper>,
    loaderRoot
  );
};
