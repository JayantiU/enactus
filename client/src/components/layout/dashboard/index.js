import React, { useEffect, useState, Fragment } from 'react'
import alanBtn from '@alan-ai/alan-sdk-web';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addEntry, getEntry } from '../../../actions/entry'
import moment from 'moment';
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
                console.log(pastRaw)
                setQuery(userInput);
                setDate(pastRaw)
                break;
            }
        }
    })
}, []);

const submit = () => {
    addEntry({
        user: user._id,
        date: "today",
        query: query,
    })
}

    return (
        <div>
            dashboard
            {query &&
            <button onClick={() => submit()}>hello</button>
            }
        </div>
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
