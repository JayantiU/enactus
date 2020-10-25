import React, { useEffect, useState, Fragment } from 'react'
import alanBtn from '@alan-ai/alan-sdk-web';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addEntry, getEntry } from '../../../actions/entry';
import Paper from '@material-ui/core/Paper';
import './index.css'

const alanKey = 'a36736f23b21bfd709dcc410696ad0a52e956eca572e1d8b807a3e2338fdd0dc/stage';

const Dashboard = ({
    addEntry,
    getEntry,
    auth: { user },
}) => {

    const [query, setQuery] = useState('');
    const [date, setDate] = useState('');

  useEffect(() => {
    alanBtn({
        key: alanKey,
        onCommand: ({ command, userInput }) => {
            switch (command){
                case 'today': 
                let today = new Date().toISOString().slice(0, 10)
                setQuery(userInput);
                setDate(today);
                break;
                case 'past': 
                var pastRaw = (userInput.split('I')[0]).trim();
                setQuery(userInput);
                setDate(converToDate(pastRaw));
                break;
            }
        }
    })
}, []);

const submit = () => {
    addEntry({
        user: user._id,
        date: date,
        query: query,
    })
}

const converToDate = d => {
    var splitDate = d.split(' ');
    var month = splitDate[0];
    console.log(month)
    var day = splitDate[1];
    var year = splitDate[2];

    // get month
    var months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
    for (var i = 0; i < months.length; i++) {
    if (month.toLowerCase().includes(months[i])){
        month = (i + 1).toString();
    }
}

    day = day.replace(/\D/g,'');
    return `${year}-${month}-${day}`
}

    return (
        <>
        <div className='dashboard-container'>
           <Paper elevation={3} className='dashboard-left'>
           <div>
           <h1>Instructions</h1>
<p>Talk us what you did today</p>
           </div>
<div>
    <p>Example queries</p>
    <p>Click me!</p>
</div>
           </Paper>
           <Paper elevation={3} className='dashboard-right'>
        Empty container
           </Paper>
        </div>
        {query &&
        <div>
            <button onClick={() => submit()}>submit</button>
        </div>
        }
        </>
    )
}

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
    addEntry: PropTypes.func.isRequired,
    getEntry: PropTypes.func.isRequired
  };
  
  const mapStateToProps = (state) => ({
    auth: state.auth,
  });
  
  export default connect(mapStateToProps, { addEntry, getEntry })(
    Dashboard
  );
