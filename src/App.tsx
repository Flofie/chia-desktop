import loadable from '@loadable/component';
import {
  CircularProgress,
  LinearProgress,
  Snackbar,
  ThemeProvider,
  Typography,
} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Alert } from '@material-ui/lab';
import React, { FC, Suspense } from 'react';
import useSWR from 'swr';
import './App.css';
import { AxiosContext, configureAxios } from './axios';
import { Connection } from './components/AddDialog/AddDialog';
import DashboardCard from './components/DashboardCard/DashboardCard';
import Empty from './components/Empty/Empty';
import Error from './components/Error/Error';
import FullNode from './components/FullNode/FullNode';
import Harvester from './components/Harvester/Harvester';
import Header from './components/Header/Header';
import Wallet from './components/Wallet/Wallet';
import { theme } from './theme';

const App = () => {
  const axios = configureAxios('');
  const { data, error: requestError } = useSWR(
    ['dashboard'],
    (url) => axios.get(url).then((res) => res.data),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 1000,
    }
  );
  const isLoading = !requestError && !data;

  const handleAddClick = (type: string) => {
    setShowAddDialog({ open: true, type });
  };
  const [showAddDialog, setShowAddDialog] = React.useState<null | {
    open: boolean;
    type: string | null;
  }>({ open: false, type: null });
  const [error, setError] = React.useState<null | string>(null);

  if (requestError && !data) {
    return (
      <ThemeProvider theme={theme}>
        <Header hideMenu={true} />
        <Error />
      </ThemeProvider>
    );
  }
  if (isLoading) {
    return (
      <ThemeProvider theme={theme}>
        <Header onAddClick={handleAddClick} />
        <LinearProgress />
      </ThemeProvider>
    );
  }

  const wallets = data.filter((item: any) => item.type === 'wallet');
  const fullNodes = data.filter((item: any) => item.type === 'fullNode');
  const harvesters = data.filter((item: any) => item.type === 'harvester');
  const summaries = data.filter(
    (item: any) => item.type === 'summary' || item.type === 'chiaExplorer'
  );

  const LoadableAddDialog = loadable(async () => {
    return import('./components/AddDialog/AddDialog');
  });

  const handleToggleOpenAddDialog = async (connectionToAdd?: Connection) => {
    if (connectionToAdd === undefined) {
      return setShowAddDialog({ open: false, type: null });
    }
    try {
      await axios.post(`/connection/${connectionToAdd.type}`, connectionToAdd);
      setShowAddDialog({ open: false, type: null });
    } catch (error) {
      return setError(`Couldn't add ${connectionToAdd.type}! ${error}`);
    }
  };

  const Row: FC<{ title: string; children: any[] }> = (props) => {
    if (props?.children?.length === 0) {
      return null;
    }
    return (
      <div style={{ marginBottom: 10 }}>
        <Typography variant="body1">{props.title}:</Typography>
        <div className="App-row">{props.children}</div>
      </div>
    );
  };

  return (
    <AxiosContext.Provider value={axios}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div>
          <Header onAddClick={handleAddClick} />
          <div className="App-body">
            {data.length === 0 ? (
              <Empty />
            ) : (
              <>
                <Row title="Summary">
                  {summaries.map((summary, index) => (
                    <DashboardCard
                      key={index}
                      title={summary.name}
                      body={
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <Typography variant="h5" style={{ paddingLeft: 5 }}>
                            <b>{summary.data}</b>
                          </Typography>
                        </div>
                      }
                    />
                  ))}
                </Row>
                <Row title="Wallets">
                  {wallets.map((wallet, index) => (
                    <Wallet
                      key={index}
                      name={wallet.name}
                      balance={wallet.balance}
                      height={wallet.height}
                      noData={wallet.noData}
                    />
                  ))}
                </Row>
                <Row title="FullNodes">
                  {fullNodes.map((fullNode, index) => (
                    <FullNode
                      key={index}
                      name={fullNode.name}
                      isSync={fullNode.isSync}
                      height={fullNode.height}
                      networkSpace={fullNode.networkSpace}
                      noData={fullNode.noData}
                    />
                  ))}
                </Row>
                <Row title="Harvester">
                  {harvesters.map((harvester, index) => (
                    <Harvester
                      key={index}
                      name={harvester.name}
                      plotCount={harvester.plotCount}
                      noData={harvester.noData}
                    />
                  ))}
                </Row>
              </>
            )}
          </div>
        </div>
        {showAddDialog && showAddDialog.open && (
          <Suspense fallback={<CircularProgress />}>
            <LoadableAddDialog
              open={showAddDialog.open}
              type={showAddDialog.type}
              toggleOpen={handleToggleOpenAddDialog}
            />
          </Suspense>
        )}
        <Snackbar
          open={error !== null}
          autoHideDuration={6000}
          onClose={() => setError(null)}
        >
          <Alert severity="error">{error}</Alert>
        </Snackbar>
      </ThemeProvider>
    </AxiosContext.Provider>
  );
};

export default App;
