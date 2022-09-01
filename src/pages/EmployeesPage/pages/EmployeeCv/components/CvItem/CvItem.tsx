import { StyledDiv, StyledLink } from "./CvItem.styles";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Typography } from "@mui/material";
import { CvItemProps } from "./CvItem.types";

export const CvItem = ({ id, name, onDelete }: CvItemProps) => {
  // move outside

  const handleDelete: React.MouseEventHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete(id);
  };

  return (
    <StyledDiv>
      <StyledLink to={id}>
        <Typography>{name}</Typography>
        <DeleteOutlineIcon onClick={handleDelete} />
      </StyledLink>
    </StyledDiv>
  );
};
