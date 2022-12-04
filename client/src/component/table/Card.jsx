import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ReactHtmlParser from "react-html-parser";
import { Link } from "react-router-dom";
import { Avatar, CardHeader } from "@mui/material";

const BasicCard = (props) => {
  const details = props.details;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: "10px",
      }}
    >
      
      {details.map((details, i) => (
        <Card key={i} sx={{ maxWidth: 270 }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: "#f5425d" }} aria-label="recipe">
                {details.from.split(" ")[0].charAt(0) +
                  details.from.split(" ")[1].charAt(0)}
              </Avatar>
            }
            title={details.id.toUpperCase()}
            subheader={details.date.split("T")[0]}
          />

          <CardContent>
           
            <Typography
              sx={{ fontSize: 12, textTransform: "uppercase" }}
              component="p"
            >
              FROM: {details.from}
            </Typography>

            <Typography
              sx={{
                mb: 1.5,
                mt: 1,
                fontSize: 12,
                textTransform: "uppercase",
                textDecoration: "underline",
              }}
              color="text.primary"
              component="p"
            >
              SUBJECT : {details.subject}
            </Typography>
            <Typography variant="body2">
              {ReactHtmlParser(`<p className="cp">${details.content}</p>`)}
            </Typography>
          </CardContent>
          <CardActions>
            <Link to={"/memo/" + details.id} style={{ textDecoration: "none" }}>
              <Button size="small">VIEW</Button>
            </Link>
            <Typography
              sx={{ fontSize: 12, textTransform: "" }}
              component="p"
            >
              status: {details.status}
            </Typography>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};
export default BasicCard;
