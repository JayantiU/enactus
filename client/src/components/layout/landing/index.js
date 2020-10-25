import React, { useEffect } from 'react'
import './index.css'
import truck from '../../../img/truck.png'
import alanBtn from '@alan-ai/alan-sdk-web';

const alanKey = 'a36736f23b21bfd709dcc410696ad0a52e956eca572e1d8b807a3e2338fdd0dc/stage';

const Landing = () => {
  useEffect(() => {
    alanBtn({
        key: alanKey,
        onCommand: ({ command }) => {
            switch (command){
                case 'today': 

            }
        }
    })
}, []);
    return (
        <div class="landing-container">
        <div class="landing-grid">
          <div class="landing-graphic">
            <p>skdjksdjksdjkdsj</p>
          </div>
          <div class="landing-info">
            <img src={truck} id="banner-style-1" />
            {/* <img src="/mobileBanner.png" id="banner-style-2" /> */}
            <div class="buttons">
              <a href="/create" id="start-lecture-button">
                <span>ldsklsdkl</span>
              </a>
              <a id="join-lecture-button">
                <span>dsjksdj</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Landing;
