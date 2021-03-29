import { Button, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import React from 'react';
import { ReactComponent as Logo } from './logo.svg';

export interface HeaderProps {
  onAddClick: (type: string) => void;
}
const Header = (props: HeaderProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleAddClick = (type: string) => {
    props.onAddClick(type);
    handleMenuClose();
  };
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  return (
    <header className="App-header">
      <Toolbar>
        <Logo className="App-logo" />
        <Typography variant="h5">Desktop</Typography>
        <div style={{ flex: 1 }}></div>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleMenuClick}
          startIcon={<Add />}
          variant="contained"
          color="primary"
        >
          Add
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => handleAddClick('fullNode')}>
            FullNode
          </MenuItem>
          <MenuItem onClick={() => handleAddClick('wallet')}>Wallet</MenuItem>
          <MenuItem onClick={() => handleAddClick('harvester')}>
            Harvester
          </MenuItem>
          <MenuItem onClick={() => handleAddClick('chiaExplorer')}>
            ChiaExplorer
          </MenuItem>
        </Menu>
      </Toolbar>
    </header>
  );
};

export default Header;
