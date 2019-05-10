const loanCalculator = (amount, tenor) => {
  const interestRate = 0.05;
  const interest = (Number(interestRate) * Number(amount)).toFixed(2);
  const balance = (Number(amount) + Number(interest)).toFixed(2);
  const paymentInstallment = (Number(balance) / Number(tenor)).toFixed(2);

  return {
    interest,
    balance,
    paymentInstallment,
  };
};
export default loanCalculator;
