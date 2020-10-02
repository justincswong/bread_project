import Head from 'next/head';
import {
  AppBar,
  Button,
  Collapse,
  Divider,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Step,
  Stepper,
  StepLabel,
  Toolbar,
  Typography,
} from '@material-ui/core';
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
    // hired: true,
    materials: 0,
    // materials: 1,
    methods: methods,
    methodsFlag: false,
    // methodsFlag: true,
    modelY: 0,
    breadSetup: 0,
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

        <StyledDiv>
          <AppBar>
            <Toolbar>
              <Typography variant='h5'>The Bread Project</Typography>
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
                    <StepLabel StepIconComponent={QontoStepIcon}>
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
              <Button
                color='inherit'
                style={{ padding: '2vh', margin: '0', position: 'absolute', right: '0' }}
              >
                About Me
              </Button>
            </Toolbar>
          </AppBar>

          <Grid container alignItems='left' direction='column'>
            <Grid container alignItems='center' direction='column'>
              <Typography variant='h3' style={{ marginBottom: '20px' }}>
                Congratulations!
              </Typography>
            </Grid>
            <Typography style={{ marginBottom: '10px' }}>
              You've been shortlisted as Professor X's 342nd intern. This is a once in a
              lifetime opportunity, so be sure to cherish it! Professor X has been working
              on some groundbreaking stuff, answering questions like:
            </Typography>
            <Grid container alignItems='center' direction='column'>
              <Typography style={{ marginBottom: '10px' }}>
                <b>
                  Which household cleaner (water, vinegar, and ethanol) is the most
                  effective at inhibiting microbial growth on bread?
                </b>
              </Typography>
            </Grid>
            <Typography>
              Before we decide to formally hire you, we must make sure you're fit for the
              task. What would be an appropriate hypothesis for Professor X's experiment?
            </Typography>
            <StyledCard>
              <QuestionDiv>
                <Typography>
                  <b>
                    If stronger cleaners kill more bacteria on a surface, then we will
                    expect to see less microbial growth on bread rubbed on a surface
                    cleaned with _______ when compared to the others?
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
                  researcher<s>s</s>. However, his organizational skills are not the best.
                </Typography>
                <Typography>
                  Not a problem though, that's why we hired you! Your job is to help
                  Professor X organize his work so he can hand it in on time to a
                  well-known scientific journal; you've probably heard of it - The
                  Integrative Biology Journal.
                </Typography>
                <Typography>Let's get to it!</Typography>
                <StyledCard>
                  <QuestionDiv>
                    <Typography>
                      <b>
                        Professor X was working on multiple experiments at the same time
                        and got a few of his pages mixed up... Which is the most correct
                        set of materials for this experiment?
                      </b>
                    </Typography>{' '}
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
                      <b>Now, help him order the methods.</b>
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
                        Multiple slices of bread were used for each treatment so we can be
                        more confident in our answers.
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
                        printer was too small, so he decided to print them in multiple
                        pages. Help him piece it together.
                      </b>
                    </Typography>
                    <Divider style={{ marginTop: '1vh' }} />
                  </QuestionDiv>
                  <Grid container justify='space-evenly'>
                    <div>
                      <Puzzle
                        image='/model_y.jpg'
                        level='2'
                        onDone={() => this.setState({ modelY: 1 })}
                      ></Puzzle>
                      <Collapse in={this.state.modelY}>
                        <Typography>Model Y</Typography>
                      </Collapse>
                    </div>
                    <div>
                      <Puzzle
                        image='/bread_setup.jpg'
                        level='2'
                        onDone={() => this.setState({ breadSetup: 1 })}
                      ></Puzzle>
                      <Collapse in={this.state.breadSetup}>
                        <Typography>Bread Setup</Typography>
                      </Collapse>
                    </div>
                  </Grid>
                  {/* ANOVA, Bar Graph, Point Graph of Means, Tukey Test, Tabulated Results */}
                  {/* implement skip for class reasons */}
                </StyledCard>
              </Grid>
            </Collapse>
          </Grid>
        </StyledDiv>
      </div>
    );
  }
}
