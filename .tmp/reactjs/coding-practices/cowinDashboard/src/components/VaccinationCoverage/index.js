// Write your code here
import {BarChart, Bar, XAxis, YAxis, Legend} from 'recharts'
import './index.css'

const VaccinationCoverage = props => {
  const {last7DaysVaccination} = props

  const dataFormat = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  return (
    <div className="rechart">
      <h1 className="rechart-heading">Vaccination Coverage</h1>
      <BarChart
        height={300}
        width={1000}
        data={last7DaysVaccination}
        margin={{top: 5}}
      >
        <XAxis
          dataKey="vaccineDate"
          tick={{
            stroke: 'gray',
            skroteWidth: 1,
          }}
        />
        <YAxis
          tickFormatter={dataFormat}
          tick={{
            stroke: 'gray',
            strokeWidth: 0,
          }}
        />
        <Legend
          wrapperStyle={{
            padding: 30,
          }}
        />
        <Bar
          dataKey="dose1"
          name="Dose1"
          radius={[10, 10, 0, 0]}
          fill="#5a8dee"
          barSize="20%"
        />
        <Bar
          dataKey="dose2"
          name="Dose2"
          radius={[5, 5, 0, 0]}
          fill="#f54394"
          barSize="20%"
        />
      </BarChart>
    </div>
  )
}

export default VaccinationCoverage
