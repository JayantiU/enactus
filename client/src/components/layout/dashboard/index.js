import React, { useEffect, useState } from 'react'
import alanBtn from '@alan-ai/alan-sdk-web';

const alanKey = 'a36736f23b21bfd709dcc410696ad0a52e956eca572e1d8b807a3e2338fdd0dc/stage';

const Dashboard = () => {
      // initialize voice
  useEffect(() => {
    alanBtn({
        key: alanKey,
        onCommand: ({ command, userInput }) => {
            switch (command){
                case 'today': 
                console.log(userInput)
                case 'past': 
                console.log(userInput)
            }
        }
    })
}, []);
    return (
        <div>
            dashboard
        </div>
    )
}

export default Dashboard;
