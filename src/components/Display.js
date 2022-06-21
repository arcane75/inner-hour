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

  const handleCompute = () => {
    let presentInBoth = listA.arrayA.filter((x) => listB.arrayB.includes(x));
    setPresentBoth(presentInBoth);
    let uniqueInAB = listA.arrayA
      .filter((x) => !listB.arrayB.includes(x))
      .concat(listB.arrayB.filter((x) => !listA.arrayA.includes(x)));
    setUnique(uniqueInAB);
  };

  return (
    <div>
      <input type="text" onChange={saveInputA} />
      <button onClick={addAItem}>Add Item</button>
      <input type="text" onChange={saveInputB} />
      <button onClick={addBItem}>Add B Item</button>

      <div>
      <div>
      <button onClick={handleCompute}>Compute</button>
      </div>

        Items present only in A:
        {listA.arrayA.map((subItems) => (
          <> {subItems}, </>
        ))}
      </div>
      <div>
        Items present only in A:
        {listB.arrayB.map((bItem) => (
          <> {bItem}, </>
        ))}
      </div>

      <div>
        Items present in both A and B:
        {presentBoth.map((bothPresent) => (
          <> {bothPresent}, </>
        ))}
      </div>

      <div>
        Items combining both A and B (unique):
        {unique.map((uniqueAB) => (
          <> {uniqueAB}, </>
        ))}
      </div>
    </div>
  );
};

export default Display;
