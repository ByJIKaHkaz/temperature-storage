import React, { Component }  from 'react';
import { block } from 'bem-cn';
import Chart from './Components/Chart';
import Filter from './Components/Filter';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import './App.css';

const className = block('main');

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      temperatures: null,
      precipitations: null,
      activeFilter: 0,
      dates: [],
      dateFrom: '1881-01-01',
      dateTo: '2006-12-31'
    };

    this.fetchPrec = this.fetchPrec.bind(this);
    this.fetchTemp = this.fetchTemp.bind(this);
    this.onChangeFilter = this.onChangeFilter.bind(this);
  }

  componentWillMount(){
    this.fetchTemp();
    this.fetchPrec();
    this.setState({dates: this.getDates()});
  }

  fetchTemp() {
    return fetch('http://x933313j.bget.ru/temperature.json')
        .then(response => response.json())
        .then(result => this.setState({temperatures: result}))
        .catch(e => console.log(e));
  }

  fetchPrec() {
    return fetch('http://x933313j.bget.ru/precipitation.json')
        .then(response => response.json())
        .then(result => this.setState({precipitations: result}))
        .catch(e => console.log(e));
  };

  getDates() {
    const { temperatures } = this.state;
    if (temperatures !== null)
      return temperatures.map( item => {
        return item.t;
      })
    else return [];
  }

  onChangeFilter(filterNumber) {
    return this.setState({activeFilter: filterNumber})
  };

  setDate(key, date) {
    return this.setState({[key]: date})
  }

  render(){

  return (
    <div className={className()}>
      <div className={className('sidebar')}>
        <Filter activeFilter={this.state.activeFilter} onChange={e => this.onChangeFilter(e)}/>
      </div>
      <div className={className('chart')}>
        <div className={className('filter')}>
        <FormControl classes={{ root: className('filter', 'item').toString() }}>
          <InputLabel id="demo-simple-select-label">Year from</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={this.state.dateFrom}
            onChange={e => e.target.value <= this.state.dateTo ? this.setDate('dateFrom', e.target.value) : null}
          >
            {this.state.dates.map(i => (
              <MenuItem value={i}>{i}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl classes={{ root: className('filter', 'item').toString() }}>
          <InputLabel id="demo-simple-select-label">Year to</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={this.state.dateTo}
            onChange={e => e.target.value >= this.state.dateFrom ? this.setDate('dateTo', e.target.value) : null}
          >
           {this.state.dates.map(i => (
              <MenuItem value={i}>{i}</MenuItem>
            ))}
          </Select>
        </FormControl>
        </div>
        <div className={className('chart', 'body')}>
          <Chart dateTo={this.state.dateTo} dateFrom={this.state.dateFrom} data={ this.state.activeFilter === 0 ? this.state.temperatures : this.state.precipitations}/>
        </div>
      </div>
    </div>
  );
}
}

export default App;
