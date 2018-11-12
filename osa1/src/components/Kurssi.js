import React from 'react'


const Kurssi = ({ kurssi }) =>
  <div>
    <Otsikko kurssi={kurssi} />
    <Sisalto osat={kurssi.osat} />
    <Yhteensa osat={kurssi.osat} />
  </div>

const Otsikko = ({ kurssi }) => <h1>{kurssi.nimi}</h1>
const Sisalto = ({ osat }) => (
  <div>
    {osat.map(osa => <Osa key={osa.nimi} osa={osa} />)}
  </div>
)
const Yhteensa = ({ osat }) => {
  let yhteensa = osat.reduce((yhteensa, osa) => yhteensa + osa.tehtavia, 0)
  return < p > yhteensä {yhteensa} tehtävää</p>
}

const Osa = ({ osa }) => <p>{osa.nimi} {osa.tehtavia}</p>

export default Kurssi
