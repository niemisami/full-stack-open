import React, { Component } from 'react';
import axios from 'axios'

const apiBase = 'https://restcountries.eu/rest/v2/'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      filter: '',
      selectedCountryName: null
    }
  }

  handleInputChange = field => event => {
    const newValue = event.target.value
    this.setState({
      [field]: newValue,
      selectedCountryName: ''
    })
    this.searchCountries(newValue)
  }

  searchCountries = name => {
    if(name <= 3) {
      this.setState({ countries: [] })
      return
    }
    axios.get(apiBase + 'name/' + name)
      .then(response => {
        const countries = response.data
        this.setState({ countries })
      })
      .catch(() => {
        this.setState({countries: []})
      })

  }

  setActiveCountry = name => () => this.setState({ selectedCountryName: name })

  render() {
    const { filter, selectedCountryName, countries } = this.state
    return (
      <div>
        <h1>Countries</h1>
        <div>
          <label htmlFor='filter' >Find countries: </label>
          <input
            name='filter'
            value={filter}
            onChange={this.handleInputChange('filter')} />
        </div>
        <CountryList
          onClick={this.setActiveCountry}
          selectedCountryName={selectedCountryName}
          countries={countries}
        />
      </div >
    )
  }
}

const CountryList = ({ onClick, selectedCountryName, countries }) => {
  if(!countries.length) {
    return null
  }
  if(countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }
  if(countries.length === 1) {
    return <Country country={countries[0]} />
  }
  if(selectedCountryName) {
    return <Country country={countries.find(country => country.name === selectedCountryName)} />
  }
  return countries.map(country =>
    <p onClick={onClick(country.name)} key={country.name}>
      {country.name}
    </p>
  )
}

const Country = ({ country }) =>
  <div>
    <h2>{country.name}</h2>
    <p>Capital: {country.capital}</p>
    <p>Population: {country.population}</p>
    <img alt='flag' width={300} src={country.flag} />
  </div>

export default App