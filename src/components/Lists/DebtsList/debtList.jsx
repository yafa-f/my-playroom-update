import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./debtList.css";
import { generatePDF } from "../../exporttopdf/exportToPDF";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import deleteDebt from "../../DeleteFunctions/deleteDebt";
import { DELETE_DEBT } from "../../../app/slices/debtSlice";
export const DebtList = () => {
  const dispatch = useDispatch();
  const debt = useSelector((state) => state.debt.debts);

  const summedDebts = debt.reduce((acc, item) => {
    const { userCode, debt: debtValue } = item;

    if (!acc[userCode]) {
      acc[userCode] = { userCode, totalDebt: 0 };
    }

    acc[userCode].totalDebt += debtValue;

    return acc;
  }, {});

  const result = Object.values(summedDebts);
  const exportToPDF = () => {
    const columns = ["קוד משתמש", "סכום החוב"];
    const title = "חובות";
    generatePDF(columns, result, title);
  };
  const cancalDebt = (id) => {
    debt.map(async (d) => {
      if (d.userCode === id) {
        const deletedOneDebt = await deleteDebt(d);
        if (deletedOneDebt) dispatch(DELETE_DEBT(d));
      }
    });
  };
  return (
    <div>
      <div className="debt">
        <div className="debt-title">
          <div className="h-3-debt">שם מנוי</div>
          <div className="h-3-debt">סכום הקנס</div>
          <div className="pdf-icon" onClick={() => exportToPDF()}>
            <PictureAsPdfIcon sx={{ color: "rgba(6, 120, 252, 1)" }} />
          </div>
        </div>
        <div className="debt-table">
          <section className="section">
            {Array.isArray(result) &&
              result.map((item, i) => {
                return (
                  <>
                    <div className="one-item-debt" key={i}>
                      <div className="debt-user-name">{item.userCode}</div>
                      <div className="sum-of-debt">{item.totalDebt}</div>
                      <button onClick={() => cancalDebt(item.userCode)}>
                        לביטול החוב
                      </button>
                      <div className="pdf-icon" onClick={() => exportToPDF()}>
                        <PictureAsPdfIcon
                          sx={{ color: "rgba(6, 120, 252, 1)" }}
                        />
                      </div>
                    </div>
                  </>
                );
              })}
          </section>
        </div>
      </div>
    </div>
  );
};
