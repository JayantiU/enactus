import React, { useEffect, useState } from 'react'
import { getEntries } from '../../../actions/entry'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Cards from '../cards';
import alanBtn from '@alan-ai/alan-sdk-web';
import {Bar, Line, Pie} from 'react-chartjs-2';
import './index.css'

const alanKey = 'a36736f23b21bfd709dcc410696ad0a52e956eca572e1d8b807a3e2338fdd0dc/stage';
const chartData = {
  labels: ['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge', 'New Bedford'],
  datasets:[
    {
      label:'Population',
      data:[
        617594,
        181045,
        153060,
        106519,
        105162,
        95072
      ],
      backgroundColor:[
        'rgba(99, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)',
        'rgba(255, 99, 132, 0.6)'
      ]
    }
  ]
}

const Entries = ({ getEntries, entry: { entries }}) => {
    useEffect(() => {
        getEntries()
    }, getEntries)

const getEntryKeys = () => {
  var map = new Map();

    for (var i = 0; i < entries.length; i++){
      const {date, totalScore} = entries[i];
      map.set(date, totalScore);
    }

    var mapAsc = new Map([...map.entries()].sort(function(a, b){
      var aa = a.toString().split('/').reverse().join(),
      bb = b.toString().split('/').reverse().join();
      return aa < bb ? -1 : (aa > bb ? 1 : 0);
  }));

  var keys = [];
  for (const [key, value] of mapAsc.entries()) {
    keys.push(key);
  }

  return keys;
}

const getEntryVals = () => {
  var map = new Map();

    for (var i = 0; i < entries.length; i++){
      const {date, totalScore} = entries[i];
      map.set(date, totalScore);
    }

    var mapAsc = new Map([...map.entries()].sort(function(a, b){
      var aa = a.toString().split('/').reverse().join(),
      bb = b.toString().split('/').reverse().join();
      return aa < bb ? -1 : (aa > bb ? 1 : 0);
  }));

  var vals = [];
  for (const [key, value] of mapAsc.entries()) {
    vals.push(value);
  }

  return vals;
}

const formatEntries = () => {
  const res = {};
  var r = {};
  const labels = getEntryKeys();
  const vals = getEntryVals();
  res.labels = getEntryKeys();
  
  var data = [];
  var color = [];
  for (var i = 0; i < labels.length; i++){
    data.push(vals[i]);
    color.push(`rgba(99, 99, ${Math.random() * 100}, 0.6)`)
  }
  r.label = 'pollution';
  r.data = data;
  r.backgroundColor = color;
  res.datasets = [r];

  return res;
}

    return (
        <div>
        {entries && entries.length !== 0 && 
        <div className='chart-container'>
                <Line
          data={formatEntries()}
          options={{
            title:{
              display:'yeet',
              text:'Largest Cities In '+ 'yoot',
              fontSize:25
            },
            // legend:{
            //   display:this.props.displayLegend,
            //   position:this.props.legendPosition
            // }
          }}
        />
        </div>
        }

           <Cards entries={entries}></Cards>
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
  
