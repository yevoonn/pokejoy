import { Typography } from "@mui/joy";

const CardTitleComponent = ({ name }) => {
  return (
    <Typography
      level="h2"
      sx={{
        textTransform: "capitalize",
        fontWeight: "700",
        letterSpacing: "-0.5px",
      }}
    >
      {name}
    </Typography>
  );
};

export default CardTitleComponent;
