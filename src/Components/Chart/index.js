import React, { PureComponent } from 'react';
import _ from 'lodash';

import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

export default class Chart extends PureComponent {
    static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';

    render() {
        const { data, dateTo, dateFrom } = this.props;
        const newData = _.filter(data, function(o) { return o.t <= dateTo && o.t >= dateFrom; });
        return (
            <LineChart
                width={1000}
                height={300}
                data={newData}
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
