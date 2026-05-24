import { Divider, CardContent, Typography, Chip } from "@mui/joy";

const CardOverflowContentComponent = ({ label, options = [] }) => {
  return (
    <>
      <Divider inset="context" />

      <CardContent orientation="horizontal">
        <Typography level="body-xs" sx={{ alignSelf: "center" }}>
          {label}
        </Typography>

        <Divider orientation="vertical" />

        <span>
          {options.map((type) => (
            <Chip
              key={type}
              variant="neutral"
              color="primary"
              sx={{
                ml: 1,
                fontWeight: "bold",
                borderRadius: "999px",
              }}
            >
              {type}
            </Chip>
          ))}
        </span>
      </CardContent>
    </>
  );
};

export default CardOverflowContentComponent;
