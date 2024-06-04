import { Card, CardContent, Typography } from "@mui/material";
import { StoryType } from "../../types/storiesTypes";

interface OneNewFormProps {
  story: StoryType;
}

export default function OneNewForm({ story }: OneNewFormProps): JSX.Element {
  return (
    <Card sx={{ minWidth: 275, minHeight: '220px' }} >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          by {story.by}
        </Typography>
        <Typography variant="h5" component="div">
          {story.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          rating {story.score}
        </Typography>
        <Typography variant="body2">
          {new Date(story.time * 1000).toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  );
}
