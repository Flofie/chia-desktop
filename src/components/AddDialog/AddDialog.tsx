import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  TextField,
  Typography
} from '@material-ui/core';
import React, { FC, useState } from 'react';

export interface AddDialogProps {
  open: boolean;
  toggleOpen: (connection?: Connection) => void;
  type: ConnectionType;
}

const useStyle = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
});

const config: Record<
  string,
  { port?: number; crtName: string; keyName: string }
> = {
  fullNode: {
    port: 8555,
    crtName: 'private_full_node.crt',
    keyName: 'private_full_node.key',
  },
  wallet: {
    port: 9256,
    crtName: 'private_wallet.crt',
    keyName: 'private_wallet.key',
  },
  harvester: {
    port: 8560,
    crtName: 'private_harvester.crt',
    keyName: 'private_harvester.key',
  },
  chiaExplorer: {
    crtName: 'First wallet address',
    keyName: 'Pool public key',
  },
};

export type ConnectionType =
  | 'fullNode'
  | 'wallet'
  | 'harvester'
  | 'chiaExplorer';

export interface Connection {
  name: string;
  host: string;
  port: number | undefined;
  crt: string;
  key: string;
  type: ConnectionType;
}

const AddDialog: FC<AddDialogProps> = (props) => {
  const { open, toggleOpen, type } = props;
  const classes = useStyle();
  const [state, setState] = useState<Connection>({
    name: '',
    host: '',
    port: config[type]?.port,
    crt: '',
    key: '',
    type,
  });
  const handleInputChange = (event) => {
    setState((localState) => ({
      ...localState,
      [event.target.name]: event.target.value,
    }));
  };
  const handleOnClose = () => {
    toggleOpen();
  };
  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const renderHeaderText = () => {
    if (props.type === 'chiaExplorer') {
      return (
        <>
          Since there is now way right now to get the farmer/pool public key via
          the RPC API, we need to add the connection manually. If its possible
          to get these information from the RPC API we can use the information
          directly.
        </>
      );
    } else {
      return (
        <>
          If your {capitalize(type)} is not running on the same machine as{' '}
          <i>chia-desktop</i> then change the configuration in config.yaml{' '}
          <b>self_hostname</b> to the <b>internal</b> IP-Address (e.g.
          192.168.2.100) of your {capitalize(type)}.
        </>
      );
    }
  };
  return (
    <Dialog open={open} onClose={handleOnClose} aria-labelledby="dialog-title">
      <DialogTitle id="dialog-title">Add {capitalize(type)}</DialogTitle>
      <DialogContent>
        <Typography variant="subtitle2">{renderHeaderText()}</Typography>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            required
            margin="dense"
            name="name"
            value={state.name}
            onChange={handleInputChange}
          />
          {props.type !== 'chiaExplorer' && (
            <div style={{ display: 'flex' }}>
              <TextField
                id="outlined-basic"
                label="Hostname/IP-Address"
                placeholder="localhost"
                variant="outlined"
                margin="dense"
                style={{ flex: 1, marginRight: 10 }}
                required
                name="host"
                value={state.host}
                onChange={handleInputChange}
              />
              <TextField
                id="outlined-basic"
                label="Port"
                variant="outlined"
                defaultValue="8855"
                margin="dense"
                required
                name="port"
                value={state.port}
                onChange={handleInputChange}
              />
            </div>
          )}

          <TextField
            id="outlined-basic"
            label={config[type].crtName}
            variant="outlined"
            margin="dense"
            multiline={props.type === 'chiaExplorer' ? false : true}
            rows={props.type === 'chiaExplorer' ? 1 : 4}
            required
            name="crt"
            value={state.crt}
            onChange={handleInputChange}
          />
          <TextField
            id="outlined-basic"
            label={config[type].keyName}
            variant="outlined"
            margin="dense"
            multiline={props.type === 'chiaExplorer' ? false : true}
            rows={props.type === 'chiaExplorer' ? 1 : 4}
            required
            name="key"
            value={state.key}
            onChange={handleInputChange}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleOnClose} color="primary">
          Abbrechen
        </Button>
        <Button onClick={() => toggleOpen(state)} color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddDialog;
