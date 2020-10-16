import Head from 'next/head';
import Link from 'next/link';
import {
  AppBar,
  Button,
  Collapse,
  Divider,
  FormControlLabel,
  Grid,
  Modal,
  Radio,
  RadioGroup,
  Step,
  Stepper,
  StepLabel,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { Replay } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import Puzzle from 'react-image-puzzle';
import Reorder, { reorder } from 'react-reorder';
import { animateScroll as scroll } from 'react-scroll';
import { StyledCard } from '../src/styles/Card.js';
import { StyledDiv, QuestionDiv } from '../src/styles/Div.js';
import { methods, methodsComplete } from '../src/data/methods.js';
import { steps } from '../src/data/steps.js';
import { QontoConnector, QontoStepIcon } from '../src/styles/Stepper.js';

export default class Home extends React.Component {
  state = {
    activeStep: 0,
    error: null,
    radio: null,
    hired: false,
    materials: 0,
    methods: methods,
    methodsFlag: false,
    boxplot: 0,
    barplot: 0,
    open: false,
    easterEgg: 342,
  };

  componentDidUpdate() {
    if (!this.state.methodsFlag) {
      this.handleCheckMethods();
    }
    scroll.scrollToBottom({ smooth: true, duration: '1000' });
  }

  handleRadioChange(value) {
    this.setState({ radio: value });
  }

  handleCheckAnswer() {
    this.state.radio === 'alcohol'
      ? this.setState({ hired: true, error: null, activeStep: 1 })
      : this.setState({ error: 1 });
  }

  handleCheckMaterials(target) {
    if (this.state.materials === 1) {
      return;
    }
    if (parseInt(target.id) === 1) {
      this.setState({ materials: 1, activeStep: 2 });
    } else {
      this.setState({ materials: parseInt(target.id) });
    }
  }

  handleCheckMethods() {
    let curr = 1;
    for (const step of this.state.methods) {
      if (parseInt(step.key) != curr) {
        return;
      }
      curr++;
    }
    this.setState({ methods: methodsComplete, methodsFlag: true, activeStep: 3 });
  }

  handleUpdateMethods(event, previousIndex, nextIndex, fromId, toId) {
    this.setState({ methods: reorder(this.state.methods, previousIndex, nextIndex) });
  }

  handleUpdateBorder(value) {
    const color = value === 1 ? '#60b565' : 'red';
    return this.state.materials === value
      ? { border: `5px solid ${color}` }
      : { border: `5px solid black` };
  }

  handleStepperClick(i) {
    switch (i) {
      case 1:
        this.setState({
          activeStep: i,
          radio: 'alcohol',
          hired: true,
          materials: 0,
          methods: methods,
          methodsFlag: false,
          boxplot: 0,
          barplot: 0,
        });
        break;
      case 2:
        this.setState({
          activeStep: i,
          radio: 'alcohol',
          hired: true,
          materials: 1,
          methods: methods,
          methodsFlag: false,
          boxplot: 0,
          barplot: 0,
        });
        break;
      case 3:
        this.setState({
          activeStep: i,
          radio: 'alcohol',
          hired: true,
          materials: 1,
          methods: methodsComplete,
          methodsFlag: true,
          boxplot: 0,
          barplot: 0,
        });
        break;
      case 4:
        this.setState({
          activeStep: i,
          radio: 'alcohol',
          hired: true,
          materials: 1,
          methods: methodsComplete,
          methodsFlag: true,
          boxplot: 1,
          barplot: 1,
        });
        break;
      default:
        this.setState({
          activeStep: 0,
          error: null,
          radio: null,
          hired: false,
          materials: 0,
          methods: methods,
          methodsFlag: false,
          boxplot: 0,
          barplot: 0,
        });
    }
  }

  displayEasterEgg() {
    const num = this.state.easterEgg.toString();
    const last = this.state.easterEgg.toString().substr(-1);
    if (last === '1') {
      return num + 'st';
    } else if (last === '2') {
      return num + 'nd';
    } else if (last === '3') {
      return num + 'rd';
    } else {
      return num + 'th';
    }
  }

  render() {
    return (
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
                <Typography
                  variant='h5'
                  onClick={() => {
                    this.handleStepperClick(0);
                    this.setState({
                      open: false,
                    });
                  }}
                >
                  The Bread Project
                </Typography>
              </Button>
              <Stepper
                activeStep={this.state.activeStep}
                connector={<QontoConnector />}
                style={{
                  width: '40%',
                  height: '1vh',
                  backgroundColor: 'inherit',
                  position: 'absolute',
                  left: '30%',
                }}
              >
                {steps.map((label, i) => (
                  <Step key={label}>
                    <StepLabel
                      StepIconComponent={QontoStepIcon}
                      style={{ cursor: 'pointer' }}
                      onClick={() => this.handleStepperClick(i)}
                    >
                      <Typography
                        variant='body2'
                        style={
                          this.state.activeStep > i
                            ? { color: 'black' }
                            : { color: '#eaeaf0' }
                        }
                      >
                        {label}
                      </Typography>
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
              <Link href='/advanced'>
                <Button
                  color='inherit'
                  style={{
                    padding: '2vh',
                    margin: '0',
                    position: 'absolute',
                    right: '0',
                  }}
                >
                  <Typography variant='body2'>ADVANCED</Typography>
                </Button>
              </Link>
            </Toolbar>
          </AppBar>

          <Grid container alignItems='left' direction='column'>
            <Grid container alignItems='center' direction='column'>
              <Typography variant='h3' style={{ marginBottom: '20px' }}>
                Congratulations!
              </Typography>
            </Grid>
            <Typography style={{ marginBottom: '10px' }}>
              Professor X wants to make you his {this.displayEasterEgg()} helper! This is
              a once in a lifetime opportunity, so you're really lucky! Professor X has
              worked on some important stuff, answering questions like:
            </Typography>
            <Grid container alignItems='center' direction='column'>
              <Typography style={{ marginBottom: '10px' }}>
                <b>
                  Which household cleaner (water, vinegar, and ethanol) is the best at
                  stopping mould grow on bread?
                </b>
              </Typography>
            </Grid>
            <Typography>
              Before we can officially make you our helper, we have to make sure you're
              fit for the job. What would be an appropriate hypothesis for Professor X's
              experiment?
            </Typography>
            <StyledCard>
              <QuestionDiv>
                <Typography>
                  <b>
                    If stronger cleaners kill more bacteria on a surface, then we will
                    expect to see less mould grow on bread rubbed on a surface cleaned
                    with _______ when compared to the others.
                  </b>
                </Typography>
                <Divider style={{ marginTop: '1vh' }} />
              </QuestionDiv>
              <Grid container alignItems='center' direction='column'>
                <RadioGroup
                  name='hypothesisChoices'
                  value={this.state.radio}
                  onChange={(e) => this.handleRadioChange(e.target.value)}
                  row
                >
                  <FormControlLabel
                    value='water'
                    control={<Radio />}
                    label='Water'
                    disabled={this.state.hired}
                  />
                  <FormControlLabel
                    value='vinegar'
                    control={<Radio />}
                    label='Vinegar'
                    disabled={this.state.hired}
                  />
                  <FormControlLabel
                    value='alcohol'
                    control={<Radio />}
                    label='Alcohol'
                    disabled={this.state.hired}
                  />
                </RadioGroup>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={() => (this.state.radio ? this.handleCheckAnswer() : null)}
                  disabled={this.state.hired}
                >
                  Check Answer
                </Button>
                <Collapse in={this.state.error === 1 || this.state.hired}>
                  <Alert
                    severity={this.state.hired ? 'success' : 'error'}
                    style={{ marginTop: '10px' }}
                  >
                    {this.state.hired ? "Great, You're Hired!" : 'Try Again'}
                  </Alert>
                </Collapse>
              </Grid>
            </StyledCard>
            <Collapse in={this.state.hired}>
              <Grid container alignItems='left' direction='column'>
                <Typography>
                  As you already know, Professor X is <s>one of</s> the world's greatest
                  researcher<s>s</s>. However, he is a little messy.
                </Typography>
                <Typography>
                  No problem though, that's why we picked you! You can help Professor X
                  sort his work so he can hand it in to a well-known scientific journal;
                  you've probably heard of it - The Integrative Biology Journal.
                </Typography>
                <Typography>Let's get to it!</Typography>
                <StyledCard>
                  <QuestionDiv>
                    <Typography>
                      <b>
                        Professor X was working on multiple experiments at the same time
                        and got a few of his notes mixed up... Which is the most correct
                        set of materials for this experiment?
                      </b>
                    </Typography>
                    <Divider style={{ marginTop: '1vh' }} />
                  </QuestionDiv>
                  <Grid container justify='space-evenly'>
                    <img
                      src='/materials_bread.jpg'
                      alt='bread materials'
                      id='1'
                      onClick={(e) => this.handleCheckMaterials(e.target)}
                      width='300'
                      height='300'
                      style={this.handleUpdateBorder(1)}
                    ></img>
                    <img
                      src='/materials_calibration.jpg'
                      alt='calibration materials'
                      id='2'
                      onClick={(e) => this.handleCheckMaterials(e.target)}
                      width='300'
                      height='300'
                      style={this.handleUpdateBorder(2)}
                    ></img>
                    <img
                      src='/materials_cake.jpg'
                      alt='cake materials'
                      id='3'
                      onClick={(e) => this.handleCheckMaterials(e.target)}
                      width='300'
                      height='300'
                      style={this.handleUpdateBorder(3)}
                    ></img>
                  </Grid>
                  <Collapse in={this.state.materials === 1}>
                    <Alert severity='success' style={{ marginTop: '10px' }}>
                      In addition to water, vinegar, and alcohol, you'll also need 3
                      slices of bread, 12 Ziploc bags, a sharpie, masking tape, paper
                      towels, and a knife. Don't forget your apron!
                    </Alert>
                  </Collapse>
                </StyledCard>
              </Grid>
            </Collapse>
            <Collapse in={this.state.materials === 1}>
              <Grid container alignItems='left' direction='column'>
                <StyledCard>
                  <QuestionDiv>
                    <Typography>
                      <b>
                        I guess his methods section is out of order too. Help him sort it
                        out.
                      </b>
                    </Typography>
                    <Divider style={{ marginTop: '1vh' }} />
                  </QuestionDiv>
                  <div>
                    <Typography>
                      <Reorder
                        reorderId='methods'
                        onReorder={this.handleUpdateMethods.bind(this)}
                        disabled={this.state.methodsFlag}
                      >
                        {this.state.methods}
                      </Reorder>
                    </Typography>
                  </div>
                  <div>
                    <Collapse in={this.state.methodsFlag}>
                      <Alert severity='success' style={{ marginTop: '10px' }}>
                        There are 4 treatment groups: control, water, vinegar, and
                        alcohol. The control group lets us see how the bread would
                        normally mould if we didn't rub it on any surfaces. Multiple
                        slices of bread were used for each treatment to minimize error and
                        help us build trust that our results are not due to chance.
                        Percent cover was chosen because it would be the most accurate
                        measure based on the limitations of equipment in a non-lab
                        setting.
                      </Alert>
                    </Collapse>
                  </div>
                </StyledCard>
              </Grid>
            </Collapse>
            <Collapse in={this.state.methodsFlag}>
              <Grid container alignItems='center' justify='center' direction='column'>
                <StyledCard>
                  <QuestionDiv>
                    <Typography>
                      <b>
                        Professor X wanted some large print outs of his work but his
                        printer was too small, so he decided to print them on multiple
                        pages. Help him piece it together.
                      </b>
                    </Typography>
                    <Divider style={{ marginTop: '1vh' }} />
                  </QuestionDiv>
                  <Grid container alignItems='center' direction='column'>
                    <Grid container alignItems='center' direction='column'>
                      <Puzzle
                        image='/bread_boxplot.png'
                        level='2'
                        size={500}
                        onDone={() => this.setState({ boxplot: 1 })}
                      ></Puzzle>
                      <Collapse in={this.state.boxplot} style={{ marginBottom: '20px' }}>
                        <Typography>
                          Figure 1. This is a boxplot that gives us an idea what our data
                          looks like. The average percent cover of mould for each
                          treatment is shown by the red diamond. (n=3 for each treatment
                          group)
                        </Typography>
                      </Collapse>
                    </Grid>
                    <Collapse in={this.state.boxplot}>
                      <Grid container alignItems='center' direction='column'>
                        <Puzzle
                          image='/bread_barplot.png'
                          level='2'
                          size={500}
                          onDone={() => this.setState({ barplot: 1, activeStep: 4 })}
                        ></Puzzle>
                        <Collapse in={this.state.barplot}>
                          <Typography>
                            Figure 2. The average amount of mould of each treatment group
                            is shown. Smaller black lines means the data was closer
                            together in value, which is a good thing. There is overlap
                            between each treatment group.
                          </Typography>
                        </Collapse>
                      </Grid>
                    </Collapse>
                  </Grid>
                  <div>
                    <Collapse in={this.state.barplot}>
                      <Alert severity='success' style={{ marginTop: '10px' }}>
                        The overall average of percent cover was 29.2% and the group
                        averages were 55% for the control, 50.8% for the water, 4.2% for
                        the vinegar, and 6.7% for the alcohol. We did some math and found
                        there was no difference between the treatments and their effects
                        on mould growth.
                      </Alert>
                    </Collapse>
                  </div>
                </StyledCard>
              </Grid>
            </Collapse>
            <Collapse in={this.state.barplot}>
              <Grid container alignItems='center' justify='center' direction='column'>
                <StyledCard>
                  <QuestionDiv>
                    <Typography>
                      <b>
                        The experiment was performed to find which household cleaner is
                        the best at stopping mould growth on bread that has been wiped on
                        a surface cleaned with water, alcohol, or vinegar. However, the
                        experiment found there was no difference between the cleaners and
                        their effects on mould growth. Therefore, any one of the household
                        cleaners is not any more effective than others. Further research
                        should be done with this experiment where temperature and humidity
                        are controlled and with a larger sample size to increase the trust
                        in the results.
                      </b>
                    </Typography>
                    <Divider style={{ marginTop: '1vh' }} />
                  </QuestionDiv>
                  <Alert
                    severity='success'
                    style={{ marginTop: '10px', marginBottom: '10px' }}
                  >
                    Great! You've sorted everything, I called Professor X over for you
                    already. You just need to hand it over to him.
                  </Alert>
                  <Grid container alignItems='center' justify='center' direction='column'>
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={() => this.setState({ open: true })}
                    >
                      Hand Over to Professor X
                    </Button>
                  </Grid>
                </StyledCard>
              </Grid>
            </Collapse>
            <Modal
              open={this.state.open}
              onClose={() => this.setState({ open: false })}
              aria-labelledby='simple-modal-title'
              aria-describedby='simple-modal-description'
            >
              <StyledCard
                style={{
                  width: '100%',
                  maxWidth: '50vw',
                  maxHeight: '100%',
                  position: 'fixed',
                  top: '50%',
                  left: '25%',
                  transform: 'translate(0, -50%)',
                  overflowY: 'auto',
                }}
              >
                <Grid container alignItems='center' direction='column'>
                  <Grid item>
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                  </Grid>
                  <Grid item>
                    <Button
                      onClick={() => {
                        this.handleStepperClick(0);
                        this.setState({
                          open: false,
                          easterEgg: this.state.easterEgg + 1,
                        });
                      }}
                    >
                      <Replay />
                    </Button>
                  </Grid>
                </Grid>
              </StyledCard>
            </Modal>
          </Grid>
        </StyledDiv>
      </div>
    );
  }
}
