import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

function ErrorBoundary() {
  return (
    <Grid container justifyContent="center" className="mt-4">
      <Grid item md={6} sm={8} xs={12}>
        <Alert variant="filled" severity="error">
          Something went wrong
        </Alert>
        <Grid container justifyContent="center" className="mt-2">
          <Button variant="contained" onClick={() => window.location.reload()}>
            Refresh page
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ErrorBoundary;
