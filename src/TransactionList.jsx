
import PropTypes from "prop-types";

const TransactionList = ({ transactions }) => {
  const statusColor = (status) => {
    switch (status) {
      case "Buy":
        return "green";
      case "Sell":
        return "red";
      case "Add Liquidity":
        return "blue";
      case "Remove Liquidity":
        return "orange";
      default:
        return "black";
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      {/* {transactions?.length === 0 ? (
        <p>No transactions found. Please ensure the Ethereum address is correct and try again.</p>
      ) : (
        <div>
          <h2>Transactions:</h2>
          {transactions.map((tx, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "5px",
              }}
            >
              <p>
                <strong>From:</strong> {tx.from}
              </p>
              <p>
                <strong>To:</strong> {tx.to}
              </p>
              <p>
                <strong>Amount:</strong> {tx.value} ETH
              </p>
              <p style={{ color: statusColor(tx.status) }}>
                <strong>Status:</strong> {tx.status}
              </p>
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
};

TransactionList.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      from: PropTypes.string.isRequired,
      to: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    })
  ),
};

TransactionList.defaultProps = {
  transactions: [],
};

export default TransactionList;
