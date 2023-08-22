import "./ContentMain.css";
import Cards from "../Cards/Cards";
import Transactions from "../Transactions/Transactions";
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
            <Cards />
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
