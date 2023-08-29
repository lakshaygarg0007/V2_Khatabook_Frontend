import React, {useEffect, useState} from "react";
import "./Expenses.css";
import {iconsImgs} from "../utils/images";
import {budget} from "../data/data";
import ContentTop from "../components/ContentTop/ContentTop.jsx";
import ipAddress from "../ipAddress.jsx";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './chart.scss';
import {
    AreaChart,
    Area,
    XAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import Sidebar from "../layout/Sidebar/Sidebar.jsx";
import {useNavigate} from "react-router-dom";
import _ from "lodash";

const data1 = [
    {name: "January", Total: 800},
    {name: "February", Total: 700},
    {name: "March", Total: 400},
    {name: "April", Total: 300},
    {name: "May", Total: 900},
    {name: "June", Total: 800},
];


const Earnings = ({aspect, title}) => {
    const navigate = useNavigate();
    const [expense, setExpense] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);
    const [user_data] = useState(sessionStorage.getItem("user_data"))
    const userData = JSON.parse(user_data)
    const [paginatedPosts, setPaginatedPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const page_size = 5;

    const [index, setIndex] = useState(null);

    const getIndex = (i) => {
        setIndex(i)
    }

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({user_id: userData.id})
    }

    const edit_record = async (expense) => {
        navigate('/editExpense', { state: { expense } });
    }

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.text('Expense Report', 10, 10); // Add a title

        const tableHeaders = ['Amount', 'Description', 'Payment Method', 'Date'];
        const tableData = expense.map((budgetItem) => [
            `$${budgetItem.Amount}`,
            budgetItem.description,
            budgetItem.payment_method,
            budgetItem.date
        ]);

        // Create the table
        doc.autoTable({
            head: [tableHeaders],
            body: tableData,
            startY: 20
        });

        doc.save('expense_report.pdf');
    };

    const delete_record = (async (id, amountDeleted) => {
        const response = await fetch(ipAddress + '/deleteExpense', {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
            body: JSON.stringify({expense_id: id}),
        }).then(() => {
            console.log("Record Deleted Successfully")
            window.location.reload();
        });
        const amt = userData.expense
        sessionStorage.setItem('user_data', JSON.stringify({
            name: userData.name, id: userData.id,
            expense: amt - amountDeleted, earning: userData.earning,
            subscription_type: userData.subscription_type,
            email: userData.email,
            mobile_number: userData.mobile_number
        }));
    });

    const page_count = expense ? Math.ceil(expense.length / page_size) : 0;
    const pages = _.range(1, page_count + 1)


    const pagination = (page_no) => {
        setCurrentPage(page_no)
        const start_index = (page_no - 1) * page_size;
        const paginatedPosts = _(expense).slice(start_index).take(page_size).value()
        setPaginatedPosts(paginatedPosts)
    }

    const handleKebabClick = (itemId) => {
        if (selectedRow === itemId) {
            setSelectedRow(null); // Close the dropdown if already open
        } else {
            setSelectedRow(itemId); // Open the dropdown
        }
    };

    useEffect(() => {
        const apiUrl = ipAddress + '/getExpense'; // Replace with your API endpoint
        fetch(apiUrl, options)
            .then((response) => response.json())
            .then((data) => {
                const transformedData = data.map((item, index) => ({
                    _id: item._id,
                    id: index + 1,
                    Amount: item.amount,
                    payment_method: item.payment_method,
                    date: new Date(item.date).toLocaleDateString(),
                    description: item.description,
                }));
                setPaginatedPosts(_(transformedData).slice(0).take(page_size).value());
                setExpense(transformedData);

            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <>
            <Sidebar/>
            <div className="main-content">
                <ContentTop/>
                <div className="grid-two-item grid-common grid-c4">
                    <div className="grid-c-title">
                        <h1 className="sm:text-4xl text-center font-medium title-font mb-2 text-gray-900">My
                            Expenses</h1>
                        <button
                            className="grid-c-title-text"
                            onClick={generatePDF}
                            style={{
                                border: '1px solid #1296D2',
                                backgroundColor: '#1296D2',
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '0.5rem 1rem',
                                borderRadius: '4px',
                            }}
                        >
                            Export
                        </button>


                    </div>
                    <div className="lg:w-3/3 w-full mx-auto overflow-auto">
                        <table className="table-auto w-full text-left whitespace-no-wrap">
                            {/* Column headings */}
                            <thead>
                            <tr>
                                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">Amount</th>
                                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Description</th>
                                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Payment
                                    Method
                                </th>
                                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Date</th>
                                <th className="w-10 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br"></th>
                            </tr>
                            </thead>
                            <tbody>
                            {paginatedPosts.map((budgetItem) => (
                                <tr key={index}>
                                    <td className="px-4 py-3 text-gray-900">{budgetItem.Amount}</td>
                                    <td className="px-4 py-3 text-gray-900">{budgetItem.description}</td>
                                    <td className="px-4 py-3 text-gray-900">{budgetItem.payment_method}</td>
                                    <td className="px-4 py-3 text-lg text-gray-900">{budgetItem.date}</td>
                                    <td className="px-4 py-3">
                                        <button className="w-6 h-6 rounded-lg mr-2 p-1 bg-gray-300 hover:bg-gray-400
                        flex items-center justify-center" onClick={() => handleKebabClick(budgetItem._id)}
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor"
                                                 viewBox="0 0 24 24"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                      strokeWidth={2}
                                                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                                            </svg>
                                        </button>
                                        {selectedRow === budgetItem._id && (
                                            <div
                                                className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 shadow-lg">
                                                <button
                                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                                    onClick={() => edit_record(budgetItem)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                                    onClick={() => delete_record(selectedRow, budgetItem.Amount)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>

                        <br></br>

                        <div class="flex justify-center">
                            <nav>
                                <ul className="flex list-style-none">
                                    {
                                        pages.map((page) => (
                                            <li className={page === currentPage ? "page-item active" : "page-item"} onClick={() => pagination(page)} >
                                                {<a
                                                    className={page === currentPage ? "page-link relative block py-1.5 px-3 rounded border-0 bg-red-400 outline-none transition-all duration-300 rounded text-white hover:text-white hover:bg-red-600 shadow-md focus:shadow-md" :
                                                        "page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"}
                                                >
                                                    {page}
                                                </a>}
                                            </li>
                                        ))
                                    }
                                </ul>
                            </nav>
                        </div>
                        <div className="mt-4">
                            <button
                                className="edit-button flex mx-auto text-white border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg"
                                onClick={() => window.location.href = '/addExpense'}
                            >
                                Add Expense
                            </button>
                        </div>
                    </div>

                    <br/>



                    <div className="chart">
                        <div className="title"></div>
                        <ResponsiveContainer width="100%" aspect={2 / 1}>
                            <AreaChart
                                width={530}
                                height={100}
                                data={data1}
                                margin={{top: 10, right: 30, left: 0, bottom: 0}}
                            >
                                <defs>
                                    <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" stroke="gray"/>
                                <CartesianGrid strokeDasharray="3 3" className="chartGrid"/>
                                <Tooltip/>
                                <Area
                                    type="monotone"
                                    dataKey="Total"
                                    stroke="#8884d8"
                                    fillOpacity={1}
                                    fill="url(#total)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>


            </div>
        </>

    );
};

export default Earnings;
