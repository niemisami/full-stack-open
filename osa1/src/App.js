import React from 'react'
import Kurssi from './components/Kurssi'

const App = ({ kurssit }) =>
  kurssit.map(kurssi => <Kurssi key={kurssi.id} kurssi={kurssi} />)

export default App
