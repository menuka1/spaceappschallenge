import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from './Card';

export const ExperimentResults = ({ results }) => {
  if (!results) {
    return (
      <Card>
        <p className="text-gray-500 text-center">No results available yet</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {results.graphs.map((graph, index) => (
        <Card key={index}>
          <h3 className="text-lg font-semibold mb-4">{graph.title}</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              {graph.type === 'line' ? (
                <LineChart data={graph.data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="day"
                    label={{ value: 'Day', position: 'insideBottom', offset: -5 }}
                  />
                  <YAxis
                    label={{
                      value: graph.title,
                      angle: -90,
                      position: 'insideLeft',
                      offset: 10,
                    }}
                  />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="growth"
                    stroke="#3B82F6"
                    strokeWidth={2}
                  />
                </LineChart>
              ) : (
                <AreaChart data={graph.data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="hour"
                    label={{ value: 'Hour', position: 'insideBottom', offset: -5 }}
                  />
                  <YAxis
                    label={{
                      value: graph.title,
                      angle: -90,
                      position: 'insideLeft',
                      offset: 10,
                    }}
                  />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="temp"
                    stroke="#3B82F6"
                    fill="#93C5FD"
                  />
                </AreaChart>
              )}
            </ResponsiveContainer>
          </div>
        </Card>
      ))}

      <Card>
        <h3 className="text-lg font-semibold mb-4">Key Metrics</h3>
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(results.metrics).map(([key, value]) => (
            <div key={key} className="text-center">
              <div className="text-2xl font-bold text-blue-600">{value}</div>
              <div className="text-sm text-gray-500 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};