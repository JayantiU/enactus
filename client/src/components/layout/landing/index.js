import React, { useEffect } from 'react'
import './index.css'
import truck from '../../../img/truck.png'
import alanBtn from '@alan-ai/alan-sdk-web';
import { Redirect, withRouter } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import tree from '../../../img/tree.png'
import Fade from 'react-reveal/Fade';

const alanKey = 'a36736f23b21bfd709dcc410696ad0a52e956eca572e1d8b807a3e2338fdd0dc/stage';

const Landing = () => {
  let history = useHistory();

    return (
        <div class="landing-container">
        <div class="landing-grid">
        <Fade left>
          <div class="landing-info">
          <h1>ecoPrint</h1>
            <p>{'How did you impact the environment today?\nThere are so many things we do in one day \nyet we do not know the exact impact we had\nCarbonPrint will tell you exactly that!\n'}</p>
          </div>
          </Fade>
          <Fade right>
          <div class="landing-graphic">
            <img src={tree} id="banner-style-1" />
          </div>
          </Fade>
        </div>
      </div>
    )
}

export default withRouter(Landing);
