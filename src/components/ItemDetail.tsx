import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type ItemDetailpropsType = {
  name: string;
  value: string;
};

function ItemDetail({ name, value }: ItemDetailpropsType) {
  return (
    <Stack direction="row" spacing={2}>
      <Typography variant="subtitle2" gutterBottom>
        {name} :
      </Typography>
      <Typography variant="body1" gutterBottom>
        {value}
      </Typography>
    </Stack>
  );
}

export default ItemDetail;
