import React, { forwardRef } from "react";
import { Button } from "@material-ui/core";

// class DrillDownCellRenderer extends React.Component {
//   render() {
//     return (
//       <Button color="primary" size="small" style={{ display: 'flex' }}>
//         <VisibilityIcon style={{ fontSize: 15 }} /> <span className="pl-1">View</span>
//       </Button>
//     );
//   }
// }

export default (props, ref) => {
  return (
    <Button color="primary" size="small">
      View
    </Button>
  );
};

// export default DrillDownCellRenderer;
