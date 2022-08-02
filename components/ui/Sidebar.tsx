import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import MoveToInboxRoundedIcon from "@mui/icons-material/MoveToInboxRounded";
import MailRoundedIcon from "@mui/icons-material/MailRounded";
import { useContext } from "react";
import { UIContext } from "../../context/ui";

const menuItems: string[] = ["Inbox", "Starred", "Send Email", "Drafts"];

export const Sidebar = () => {
  const { sidemenuOpen, closeSideMenu } = useContext(UIContext);

  return (
    <Drawer anchor="left" open={sidemenuOpen} onClose={closeSideMenu}>
      <Box sx={{ width: 250 }}>
        <Box sx={{ padding: "5px 10px" }}>
          <Typography variant="h4">Menú</Typography>
        </Box>
        <List>
          {menuItems.map((text, i) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {i % 2 ? <MoveToInboxRoundedIcon /> : <MailRoundedIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {menuItems.map((text, i) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {i % 2 ? <MoveToInboxRoundedIcon /> : <MailRoundedIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};
