import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const kurssi = {
    nimi: 'Half Stack -sovelluskehitys',
    osat: [
      {
        nimi: 'Reactin perusteet',
        tehtavia: 10
      },
      {
        nimi: 'Tiedonvälitys propseilla',
        tehtavia: 7
      },
      {
        nimi: 'Komponenttien tila',
        tehtavia: 14
      }
    ]
  }

  return (
    <div>
      <Otsikko kurssi={kurssi} />
      <Sisalto osat={kurssi.osat} />
      <Yhteensa osat={kurssi.osat} />
    </div>
  )
}

const Otsikko = ({ kurssi }) => <h1>{kurssi.name}</h1>
const Sisalto = ({ osat }) => (
  <div>
    {osat.map(osa => <Osa key={osa.nimi} osa={osa} />)}
  </div>
)
const Yhteensa = ({ osat }) => {
  let yhteensa = 0
  osat.forEach(osa => yhteensa += osa.tehtavia)
  return < p > yhteensä {yhteensa} tehtävää</p>
}

const Osa = ({ osa }) => <p>{osa.nimi} {osa.tehtavia}</p>

ReactDOM.render(
  <App />,
  document.getElementById('root')
)