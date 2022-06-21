import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Input,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const Display = () => {
  const [listA, setListA] = useState({ arrayA: [] });
  const [listB, setListB] = useState({ arrayB: [] });

  const saveInputA = (e) => {
    setListA({ ...listA, input: e.target.value });
  };
  const saveInputB = (e) => {
    setListB({ ...listB, input: e.target.value });
  };

  const addAItem = () => {
    const { arrayA, input } = listA;
    arrayA.push(input);
    return setListA({ arrayA: arrayA });
  };

  const addBItem = () => {
    const { arrayB, input } = listB;
    arrayB.push(input);
    return setListB({ arrayB: arrayB });
  };

  // console.log(intersection, difference);
  const [presentBoth, setPresentBoth] = useState([]);
  const [unique, setUnique] = useState([]);
  const [onlyInA, setOnlyInA] = useState([]);
  const [onlyInB, setOnlyInB] = useState([]);

  const handleCompute = () => {
    let onlyInA = listA.arrayA.filter((x) => !listB.arrayB.includes(x));
    setOnlyInA(onlyInA);

    let onlyInB = listB.arrayB.filter((x) => !listA.arrayA.includes(x));
    setOnlyInB(onlyInB);

    let presentInBoth = listA.arrayA.filter((x) => listB.arrayB.includes(x));
    setPresentBoth(presentInBoth);

    let uniqueInAB = listA.arrayA
      .filter((x) => !listB.arrayB.includes(x))
      .concat(listB.arrayB.filter((x) => !listA.arrayA.includes(x)));
    setUnique(uniqueInAB);
  };

  const style = {
    marginLeft: "10px",
  };

  return (
    <Container sx={{ mt: 5, mb: 5 }}>
      <Box sx={{ mb: 5, border: "5px solid #f2f2f2" }}>
        <Typography align="center" sx={{ fontSize: "2em", fontWeight: "bold" }}>
          Differences between two lists A & B
        </Typography>
      </Box>
      <Box sx={{ border: "5px solid #f2f2f2", pb: 5 }}>
        <Grid container spacing={3} sx={{ mt: 2 }} align="center">
          <Grid item md={6}>
            <Input onChange={saveInputA} />
            <Button sx={{ ml: 2 }} onClick={addAItem} variant="outlined">
              Add A Item
            </Button>
          </Grid>

          <Grid item md={6}>
            <Input onChange={saveInputB} />
            <Button sx={{ ml: 2 }} onClick={addBItem} variant="outlined">
              Add B Item
            </Button>
          </Grid>
        </Grid>

        <Box>
          <Button
            sx={{ mb: 1, ml: "45%" }}
            variant="outlined"
            color="success"
            onClick={handleCompute}
          >
            Compute
          </Button>
        </Box>

        <Box sx={style}>
          <Typography variant="h5" align="left">
            Items present in A:
          </Typography>
          {listA.arrayA.map((subItems) => (
            <> {subItems}, </>
          ))}
        </Box>
        <Divider />
        <Box sx={style}>
          <Typography variant="h5" align="left">
            Items present in B:
          </Typography>

          {listB.arrayB.map((bItem) => (
            <> {bItem}, </>
          ))}
        </Box>
        <Divider />

        <Box sx={style}>
          <Typography variant="h5" align="left">
            Items present Only in A:
          </Typography>
          {onlyInA.map((onlyA) => (
            <> {onlyA}, </>
          ))}
        </Box>
        <Divider />

        <Box sx={style}>
          <Typography variant="h5" align="left">
            Items present Only in B:
          </Typography>
          {onlyInB.map((onlyB) => (
            <> {onlyB}, </>
          ))}
        </Box>
        <Divider />

        <Box sx={style}>
          <Typography variant="h5" align="left">
            Items present in both A and B:
          </Typography>
          {presentBoth.map((bothPresent) => (
            <> {bothPresent}, </>
          ))}
        </Box>
        <Divider />
        <Box sx={style}>
          <Typography variant="h5" align="left">
            Items combining both A and B (unique):
          </Typography>
          {unique.map((uniqueAB) => (
            <> {uniqueAB}, </>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default Display;
