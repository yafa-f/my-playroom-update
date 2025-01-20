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
    const { userCode, userName, debt: debtValue } = item;
    if (!acc[userCode]) {
      acc[userCode] = { userCode, userName, totalDebt: 0 };
    }
    acc[userCode].totalDebt += debtValue;
    return acc;
  }, {});

  const result = Object.values(summedDebts);
  const exportToPDF = () => {
    const columns = ["קוד משתמש", "שם משתמש", "סכום החוב"];
    const title = "חובות";
    generatePDF(columns, result, title);
  };
  const exportToPDFDebtByUser = (item) => {
    const columns = ["קוד משתמש", "שם משתמש", "סכום החוב"];
    const title = `חוב עבור משתמש ${item.userName}`;
    generatePDF(columns, [item], title);
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
                      <div className="debt-user-name">{item.userName}</div>
                      <div className="sum-of-debt">{`${item.totalDebt} ש"ח `}</div>
                      <button
                        onClick={() => cancalDebt(item.userCode)}
                        className="cancel-debt"
                      >
                        לביטול החוב
                      </button>
                      <div
                        className="debt-pdf-icon"
                        onClick={() => exportToPDFDebtByUser(item)}
                      >
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
