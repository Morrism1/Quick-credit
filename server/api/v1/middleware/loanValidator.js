const valiidateLoan = (req, res, next) => {
  let validationMessage = '';
  const tenor = Number(req.body.tenor);
  const amount = parseFloat(req.body.amount);

  if (!tenor) {
    validationMessage += 'Loan tenor is required';
  } else if (!Number.isInteger(tenor)) {
    validationMessage += 'Loan tenor must be an integer';
  } else if (tenor < 1 || tenor > 12) {
    validationMessage += 'Loan tenor must be between 1 and 12';
  } else if (!amount) {
    validationMessage += 'Loan amount is required';
  } else if (!req.body.purpose) {
    validationMessage += 'Loan purpose is required';
  } else if (/^[a-zA-Z]*$/.test(req.body.purpose) === false) {
    validationMessage += 'Loan purpose can only contain alphabets';
  }
  return (validationMessage.length === 0) ? next()
    : res.status(400).json({ status: 400, error: validationMessage });
};

const valiidateLoanRepayment = (req, res, next) => {
  let validationMessage = '';
  const paidAmount = parseFloat(req.body.paidAmount);
  if (!paidAmount) {
    validationMessage += 'Paid amount is required';
  }
  return (validationMessage.length === 0) ? next()
    : res.status(400).json({ status: 400, error: validationMessage });
};

const validateLoanStatus = (req, res, next) => {
  let validationMessage = '';
  const status = req.body.status.trim();
  if (!status) {
    validationMessage += 'Status is required';
  } else if (status.trim() !== 'approved' && status !== 'rejected' && status !== 'pending') {
    validationMessage += 'Status can only be either \'approved\', \'rejected\' or \'pending\'';
  }
  return (validationMessage.length === 0) ? next()
    : res.status(400).json({ status: 400, error: validationMessage });
};

const validateLoanId = (req, res, next) => {
  let validationMessage = '';
  let { loanId } = req.params;
  loanId = parseInt(loanId, 10);
  if (!loanId) {
    validationMessage += 'Loan ID is invalid.';
  }
  return (validationMessage.length === 0) ? next()
    : res.status(400).json({ status: 400, error: validationMessage });
};

export default {
  valiidateLoan,
  valiidateLoanRepayment,
  validateLoanStatus,
  validateLoanId,
};
