import React from "react";

import Grid from "@material-ui/core/Grid";

import ExpandableLog from "./ExpandableLog";

function ExpandableLogs({logs, loading, selected, setSelected}) {
  if (selected.service === 'demo') {
    logs = logs.filter((log) => log.requestId.startsWith(selected.requestId));
    logs = logs.filter((log) => log.level.startsWith(
      selected.logLevel === 'all' ? '' : selected.logLevel
    ));
  }

  return (
    <div>
      {logs.map((log) => (
        <ExpandableLog
          key={JSON.stringify(log)}
          log={log}
          setSelected={setSelected}
        />
      ))}
      {!loading && logs.length === 0 && (
        <Grid container alignItems={"center"} justify={"center"}>
          No logs found.
        </Grid>
      )}
    </div>
  );
}

export default ExpandableLogs;
