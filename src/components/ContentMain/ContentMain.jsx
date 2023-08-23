import "./ContentMain.css";
import EarningCard from "../Cards/EarningCard.jsx";
import Transactions from "../Transactions/ExpenseCard.jsx";
import Report from "../Report/Report";
import Budget from "../Budget/Budget";
import Subscriptions from "../Subscriptions/Subscriptions";
import Savings from "../Savings/Savings";
import Loans from "../Loans/Loans";
import Financial from "../Financial/Financial";
import PieChartBox from "../../piechart/PieChart";
import StockPrices from "../../stocks/Stocks";
import StockPrices1 from "../../stocks/Stocks1.jsx";
import Calender1 from "../../calender/Calender1.jsx";

const ContentMain = () => {
  return (
    <div className="main-content-holder">
        <div className="content-grid-one">
            <EarningCard />
            <Transactions />
            <PieChartBox />
        </div>
        <div className="content-grid-two">
            <div className="grid-two-item">
            <Calender1 />
            </div>
            <div className="grid-two-item">
              <div className="subgrid-two">
                <Subscriptions />
                <Savings />
              </div>
            </div>

            <div className="grid-two-item">
              <div className="subgrid-two">
                <StockPrices1 />
              </div>
            </div>
        </div>
    </div>
  )
}

export default ContentMain
