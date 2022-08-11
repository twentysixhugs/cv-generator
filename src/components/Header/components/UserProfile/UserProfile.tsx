import { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  StyledTypography,
  StyledGrid,
  StyledBox,
  StyledTranslateIcon,
} from "./UserProfile.styles";
import { UserProfileCardWithOverlay } from "../UserProfileCard";

export function UserProfile() {
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);

  const handleProfileCardClose = () => {
    setIsProfileOpen(false);
  };

  const handleProfileCardOpen = () => {
    setIsProfileOpen(true);
  };

  return (
    <StyledGrid>
      {/* TODO: if user has icon -> display their avatar, otherwise fake icon */}
      <StyledBox onClick={handleProfileCardOpen}>
        <AccountCircleIcon />
        <StyledTypography>Murashko Ilya</StyledTypography>
      </StyledBox>
      <StyledTranslateIcon />
      {isProfileOpen && (
        <UserProfileCardWithOverlay onClose={handleProfileCardClose} />
      )}
    </StyledGrid>
  );
}
