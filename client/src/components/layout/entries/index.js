import React, { useEffect } from 'react'
import { getEntries } from '../../../actions/entry'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Cards from '../cards'

const Entries = ({ getEntries, entry: { entries }}) => {
    useEffect(() => {
        getEntries()
    }, getEntries)
    return (
        <div>
           <Cards articles={entries}></Cards>
        </div>
    )
}

Entries.propTypes = {
    getEntries: PropTypes.func.isRequired,
    entry: PropTypes.object.isRequired,
  };
  
  const mapStateToProps = (state) => ({
    entry: state.entry,
  });
  
  export default connect(mapStateToProps, { getEntries })(Entries);
  
