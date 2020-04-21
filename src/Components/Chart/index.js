import React, { PureComponent } from 'react';
import _ from 'lodash';

import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

export default class Chart extends PureComponent {
    static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';

    render() {
        const { data, dateTo, dateFrom } = this.props;
        if (!data) return []
        let year = parseInt(_.first(data).t.substr(0,4));
        let count = 0;
        let value = 0;
        const newData = data.map(item => {
            if (parseInt(item.t.substr(0,4)) === year && item !== _.last(data)){
              count += 1;
              value += item.v;
              return null;
            }
            else {
              count = 1;
              value = item.v;
              const result = { t: year, v: value / count }
              year = year + 1;
              return result
            }
        });
        const filteredData = _.filter(_.compact(newData), function(o) { return o.t <= dateTo && o.t >= dateFrom; });
        return (
            <LineChart
                width={1000}
                height={300}
                data={filteredData}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="t" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="v" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
        );
    }
}
