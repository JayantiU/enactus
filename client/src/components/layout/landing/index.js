import React from 'react'
import './index.css'
import background from '../../../img/background.png'
import {Button} from  'react-bootstrap'
import { brown } from '@material-ui/core/colors'

const Landing = () => {
    function NewlineText(props) {
        const text = props.text;
        const newText = text.split('\n').map(str => <p>{str}</p>);
        
        return newText;
      }
    return (
        <div class="landing-container">
            <span class="Title">What is Your Carbon Footprint? </span>
            <p class='Body'>
                <span>
                <NewlineText text={'How did you impact the environment today?\nThere are so many things we do in one day \nyet we do not know the exact impact we had\nCarbonPrint will tell you exactly that!\n'} /> 
                </span>
            </p>
        <div class="landing-grid">
          <div class="landing-graphic">
          </div>
          <div class="landing-info">
            <Button variant="outline-success" href="#">Try Now!</Button> 
            <div class="buttons">
            </div>
          </div>
        </div>
      </div>
    )
}

export default Landing;
