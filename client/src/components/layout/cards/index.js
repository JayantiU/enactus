import React, { useEffect, useState } from 'react';
import { Grid, Grow, Typography } from '@material-ui/core';
import Item from './card'
import alanBtn from '@alan-ai/alan-sdk-web';
import Card from './card';
import useStyles from './styles.js';

const infoCards = [
  { color: '#00838f', title: 'Latest News', text: 'Give me the latest news' },
  { color: '#1565c0', title: 'News by Categories', info: 'Business, Entertainment, General, Health, Science, Sports, Technology', text: 'Give me the latest Technology news' },
  { color: '#4527a0', title: 'News by Terms', info: 'Bitcoin, PlayStation 5, Smartphones, Donald Trump...', text: 'What\'s up with PlayStation 5' },
  { color: '#283593', title: 'News by Sources', info: 'CNN, Wired, BBC News, Time, IGN, Buzzfeed, ABC News...', text: 'Give me the news from CNN' },
];

const alanKey = 'a36736f23b21bfd709dcc410696ad0a52e956eca572e1d8b807a3e2338fdd0dc/stage';

const Cards = ({ articles }) => {
const classes = useStyles();
const [activeArticle, setActiveArticle] = useState(0);

useEffect(() => {
  alanBtn({
      key: alanKey,
      onCommand: ({ command, articles, number }) => {
          if (command === 'read'){
              for (var i = 0; i < articles.length; i++){
                alanBtn().playText(articles[i].query);
                setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
              }
              setActiveArticle(0)
          }
      }
  })
      }, [])

if (!articles.length) {
    return (
      <Grow in>
        <Grid className={classes.container} container alignItems="stretch" spacing={3}>
          {infoCards.map((infoCard) => (
            <Grid item xs={12} sm={6} md={4} lg={3} className={classes.infoCard}>
              <div className={classes.card} style={{ backgroundColor: infoCard.color }}>
                <Typography variant="h5" component="h5">{infoCard.title}</Typography>
                {infoCard.info ? <Typography variant="h6" component="h6"><strong>{infoCard.title.split(' ')[2]}</strong>: <br />{infoCard.info}</Typography> : null}
                <Typography variant="h6" component="h6">Try saying: <br /> <i>{infoCard.text}</i></Typography>
              </div>
            </Grid>
          ))}
        </Grid>
      </Grow>
    );
  }

  return (
    <Grow in>
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {articles.map((article, i) => (
          <Grid item xs={12} sm={6} md={4} lg={3} style={{ display: 'flex' }}>
            <Item i={i} article={article} activeArticle={0}/>
          </Grid>
        ))}
      </Grid>
    </Grow>
  );
};


  export default Cards;