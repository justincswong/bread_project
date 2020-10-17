import Head from 'next/head';
import Link from 'next/link';
import {
  AppBar,
  Button,
  createMuiTheme,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ThemeProvider,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { StyledDiv } from '../src/styles/Div.js';
import { data } from '../src/data/bread_data.js';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2f5d7c',
    },
  },
});

export default class Home extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <div
          style={{
            marginTop: '8vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Head>
            <title>Help a Breader Out</title>
            <link rel='icon' href='/favicon.ico' />
          </Head>

          <footer
            style={{
              backgroundColor: '#F8F8F8',
              borderTop: '1px solid #E7E7E7',
              textAlign: 'center',
              padding: '1vh',
              position: 'fixed',
              left: '0',
              bottom: '-1vh',
              height: '5vh',
              width: '100%',
              zIndex: 2,
            }}
          >
            <Typography>Created for BIOL 342 by Ellen Lee and Justin Wong</Typography>
          </footer>

          <StyledDiv>
            <AppBar>
              <Toolbar>
                <Link href='/'>
                  <Button
                    color='inherit'
                    style={{
                      padding: '2vh',
                      margin: '0',
                      position: 'absolute',
                      left: '0',
                      textTransform: 'none',
                    }}
                  >
                    <Typography variant='h5'>The Bread Project</Typography>
                  </Button>
                </Link>
              </Toolbar>
            </AppBar>

            <Grid container alignItems='left' direction='column'>
              <Grid container alignItems='center' direction='column'>
                <Grid container justify='space-evenly'>
                  <TableContainer component={Paper} style={{ width: '20vw' }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell align='right'>Sample</TableCell>
                          <TableCell align='right'>Treatment</TableCell>
                          <TableCell align='right'>Percent Cover</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data.map((row) => (
                          <TableRow key={data.index}>
                            <TableCell align='right'>{row.index}</TableCell>
                            <TableCell align='right'>{row.treatment}</TableCell>
                            <TableCell align='right'>{row.pct_cover}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TableContainer
                    component={Paper}
                    style={{ width: '25vw', maxHeight: '12vh' }}
                  >
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell align='left'>ANOVA Results</TableCell>
                          <TableCell align='right'>F-Value</TableCell>
                          <TableCell align='right'>P-Value</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow key='stats_values'>
                          <TableCell align='left'>F-statistic 4.07 (α = 0.05)</TableCell>
                          <TableCell align='right'>2.57368</TableCell>
                          <TableCell align='right'>0.12677</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </Grid>
          </StyledDiv>
        </div>{' '}
      </ThemeProvider>
    );
  }
}
