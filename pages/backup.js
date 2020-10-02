import Head from 'next/head';
import {
  Button,
  Card,
  CardContent,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import Puzzle from 'react-image-puzzle';
import Reorder, { reorder } from 'react-reorder';

const methods = [
  <li key='3' style={{ listStyle: 'none' }}>
    3. Use a paper towel to thoroughly clean the first plot with water, the second plot
    with vinegar, and the third plot with isopropyl alcohol. These are your test plots.
    Let them dry before moving on to the next step.
  </li>,
  <li key='2' style={{ listStyle: 'none' }}>
    2. Use masking tape to divide your space into 3 equal sized areas/plots.
  </li>,
  <li key='5' style={{ listStyle: 'none' }}>
    5. Take one square and thoroughly wipe it over a section of one of your cleaned plots
    (water, vinegar, or isopropyl alcohol). Place it in a Ziploc bag, squeeze most of the
    air out, and seal the bag. Label with a Sharpie, noting the date, the cleaner used on
    that plot, your initials, and the number "1" (first square). Repeat three times for
    each plot, labeling subsequent baggies "2" and "3". Proceed to the next plot. At the
    end, there should be 9 Ziploc bags. Take the remaining 3 squares of bread and seal it
    into three separate Ziploc bags without touching the counter. Label these as controls.
  </li>,
  <li key='4' style={{ listStyle: 'none' }}>
    4. Using clean hands, a clean knife, and a clean cutting surface, take 3 slices of
    bread and cut each slice into 4 squares. There should be roughly 12 equal size slices.
  </li>,
  <li key='6' style={{ listStyle: 'none' }}>
    6. Over the course of 4 weeks, percent cover will be measured.
  </li>,
  <li key='1' style={{ listStyle: 'none' }}>
    1. Clear off a space on your counter top, approximately a 30 cm square.
  </li>,
];
export default class Home extends React.Component {
  state = {
    page: 0,
    radio: null,
    hired: false,
    // hired: true,
    materials: false,
    // materials: true,
    methods: methods,
    methodsFlag: false,
    // methodsFlag: true,
  };

  componentDidUpdate() {
    if (!this.state.methodsFlag) {
      this.handleCheckMethods();
    }
  }

  handleRadioChange(value) {
    this.setState({ radio: value });
  }

  handleCheckAnswer() {
    this.state.radio === 'alcohol' ? this.setState({ hired: true }) : null;
  }

  handleCheckMaterials(target) {
    if (this.state.materials === 1) {
      return;
    }
    this.setState({ materials: parseInt(target.id) });
  }

  handleUpdateMethods(event, previousIndex, nextIndex, fromId, toId) {
    this.setState({ methods: reorder(this.state.methods, previousIndex, nextIndex) });
  }

  handleCheckMethods() {
    let curr = 1;
    for (const step of this.state.methods) {
      if (parseInt(step.key) != curr) {
        return;
      }
      curr++;
    }
    this.setState({ methodsFlag: true });
  }

  handleUpdateBorder(value) {
    const color = value === 1 ? 'green' : 'black';
    return this.state.materials === value ? { border: `5px solid ${color}` } : {};
  }

  render() {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Head>
          <title>Help a Breader Out</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>

        <div>
          <Grid container alignItems='center' justify='center' direction='column'>
            <Typography variant='h3'>Congratulations!</Typography>
            <Typography>
              You've been shortlisted as Professor X's 342nd intern. This is a once in a
              lifetime opportunity, so be sure to cherish it! Professor X has been working
              on some groundbreaking stuff, answering questions like:
            </Typography>
            <Typography>
              <b>
                Which household cleaner (water, vinegar, and ethanol) is the most
                effective at prohibiting microbial growth on bread?
              </b>
            </Typography>
            <Typography>
              Before we decide to formally hire you, we must make sure you're fit for the
              task. Choose the best answer to fill out the blank for Professor X's
              hypothesis.
            </Typography>
            <Card>
              <Typography>
                If stronger cleaners kill more bacteria on a surface, then we will expect
                to see less microbrial growth on bread rubbed on a surface cleaned with
                _______ when compared to the others?
              </Typography>
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
                onClick={() => this.handleCheckAnswer()}
                disabled={this.state.hired}
              >
                Check Answer
              </Button>
            </Card>
            {this.state.hired && (
              <Grid container alignItems='center' justify='center' direction='column'>
                <Typography variant='h5'>Great, you're hired!</Typography>
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
                <Typography>
                  Professor X was working on multiple experiments at the same time and got
                  a few of his pages mixed up... Which is the most correct set of
                  materials for this experiment?
                </Typography>
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
                {this.state.materials === 1 && (
                  <Grid container alignItems='center' justify='center' direction='column'>
                    <Typography>Now, help him order the methods.</Typography>
                    <Typography>
                      <Reorder
                        reorderId='methods'
                        onReorder={this.handleUpdateMethods.bind(this)}
                        disabled={this.state.methodsFlag}
                      >
                        {this.state.methods}
                      </Reorder>
                    </Typography>
                    {this.state.methodsFlag && (
                      <Grid
                        container
                        alignItems='center'
                        justify='center'
                        direction='column'
                      >
                        <Typography>
                          Multiple slices of bread were used for each treatment so we can
                          be more confident in our answers.
                        </Typography>
                        <Typography>
                          Professor X wanted some large print outs of his results but his
                          printer was too small, so he decided to print them in multiple
                          pages. Help him piece it together.
                        </Typography>
                        <Puzzle
                          image='/model_y.jpg'
                          onDone={() => console.log('done!')}
                        ></Puzzle>
                        //{' '}
                        {/* ANOVA, Bar Graph, Point Graph of Means, Tukey Test, Tabulated Results */}
                        // {/* implement skip for class reasons */}
                      </Grid>
                    )}
                  </Grid>
                )}
              </Grid>
            )}
          </Grid>
        </div>
      </div>
    );
  }
}
