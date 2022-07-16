// Write your code here
import {PieChart, Pie, Legend, Cell} from 'recharts'

const VaccinationByAge = props => {
  const {vaccinationByAge} = props

  return (
    <div className="rechart">
      <h1 className="rechart-heading">Vaccination By Gender</h1>
      <PieChart height={300} width={1000}>
        <Pie
          cx="50%"
          cy="60%"
          data={vaccinationByAge}
          startAngle={180}
          endAngle={0}
          innerRadius="30%"
          outerRadius="60%"
          dataKey="count"
        >
          <Cell name="Male" fill="#f54394" />
          <Cell name="Female" fill="#5a8dee" />
          <Cell name="Others" fill="#2cc6c6" />
        </Pie>
        <Legend
          iconType="circle"
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
          wrapperStyle={{
            fontSize: 12,
            fontFamily: 'Roboto',
          }}
        />
      </PieChart>
    </div>
  )
}

export default VaccinationByAge
