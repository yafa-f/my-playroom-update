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
    const { _id, userName, debt: debtValue } = item;
    if (!acc[_id]) {
      acc[_id] = { _id, userName, totalDebt: 0 };
    }
    acc[_id].totalDebt += debtValue;
    return acc;
  }, {});

  const result = Object.values(summedDebts);

  const exportToPDF = () => {
    const columns = ["קוד משתמש", "שם משתמש", "סכום החוב"];
    const title = "חובות";
    const rows = result.map((r) => {
      return {
        ...r,
        totalDebt: `${r.totalDebt}ש"ח`,
      };
    });
    generatePDF(columns, rows, title);
  };

  const exportToPDFDebtByUser = (item) => {
    const columns = ["קוד משתמש", "שם משתמש", "סכום החוב"];
    const title = `חוב עבור משתמש ${item.userName}`;
    const formatItem = {
      ...item,
      totalDebt: `${item.totalDebt}ש"ח`,
    };
    generatePDF(columns, [formatItem], title);
  };

  const cancalDebt = async (id) => {
    const debtToCancel = debt.find(d => d._id === id);
    if (debtToCancel) {
      const deletedOneDebt = await deleteDebt(debtToCancel);
      if (deletedOneDebt) dispatch(DELETE_DEBT(debtToCancel));
    }
  };

  return (
      <div className="debt">
        <div className="debt-title">
          <div className="h-3-debt">שם מנוי</div>
          <div className="h-3-debt">סכום הקנס</div>
          <div className="debt-pdf-icon" onClick={() => exportToPDF()}>
            <PictureAsPdfIcon sx={{ color: "rgba(6, 120, 252, 1)" }} />
          </div>
        </div>
        <div className="debt-table">
          <section className="section-debt">
            {Array.isArray(result) &&
              result.map((item, i) => {
                return (
                  
                    <div className="one-item-debt" key={i}>
                      <div className="debt-user-name">{item.userName}</div>
                      <div className="sum-of-debt">{`${item.totalDebt} ש"ח `}</div>
                      <button
                        onClick={() => cancalDebt(item._id)}
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
                );
              })}
          </section>
        </div>
      </div>

  );
};

