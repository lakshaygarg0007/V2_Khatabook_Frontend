import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import "./PieChart.scss";
import {useEffect, useState} from "react";
import ipAddress from "../ipAddress.jsx";
import { randomColor } from 'randomcolor';

const data = [
    { name: "Mobile", value: 400, color: "#0088FE" },
    { name: "Desktop", value: 300, color: "#00C49F" },
    { name: "Laptop", value: 300, color: "#FFBB28" },
    { name: "Tablet", value: 200, color: "#FF8042" },
];

const PieChartBox = () => {

    const [pieChartData, setPieChartData] = useState([]);

    const request1 = {
        "user_id": "63c3cc724a4ed3fd4bc79cfb"
    };

    const options1 = {
        method: "POST",
        body: JSON.stringify(request1),
        headers: {
            "Content-Type": "application/json",
        },
    };

    useEffect(() => {
        async function getPieChartData() {
            try {
                const response = await fetch(ipAddress + '/getPieChartData', options1);
                const chartData = await response.json();
                setPieChartData(chartData);
            } catch (error) {
                console.error('Error fetching pie chart data:', error);
            }
        }

        getPieChartData()
    }, []);


    return (
        <div className="subgrid-two-item grid-common grid-c5">
        <div className="pieChartBox">
            <div>
                <ResponsiveContainer width="99%" height={300}>
                    <PieChart>
                        <Tooltip
                            contentStyle={{ background: "white", borderRadius: "5px" }}
                        />
                        <Pie
                            data={pieChartData}
                            innerRadius={"70%"}
                            outerRadius={"90%"}
                            paddingAngle={5}
                            dataKey="amount"
                        >
                            {pieChartData.map((item) => (
                                <Cell key={item.payment_method} fill={randomColor()}  />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className="options">
                {pieChartData.map((item, index) => (
                    <div className="option" key={index}>
                        <div className="title">
                            <div className="dot" style={{ backgroundColor: item.color }} />
                            <span>{item.payment_method}</span>
                        </div>
                        <span>{item.amount}</span>
                    </div>
                ))}
            </div>
        </div>
        </div>
    );
};

export default PieChartBox;
