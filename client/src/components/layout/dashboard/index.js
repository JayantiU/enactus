import React, { useEffect, useState, Fragment } from 'react'
import alanBtn from '@alan-ai/alan-sdk-web';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addEntry, getEntry } from '../../../actions/entry'

const alanKey = 'a36736f23b21bfd709dcc410696ad0a52e956eca572e1d8b807a3e2338fdd0dc/stage';

const Dashboard = ({
    addEntry,
    getEntry,
    auth: { user },
}) => {

    const [query, setQuery] = useState('');

  useEffect(() => {
    alanBtn({
        key: alanKey,
        onCommand: ({ command, userInput }) => {
            switch (command){
                case 'today': 
                setQuery(userInput);
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
        actions: [
            {
                _id: "5f94d3b0911be43d0c6d28e0",
                text: "test"
            }
        ],
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
