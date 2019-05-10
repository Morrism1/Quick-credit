const getIndex = (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'You are welcome to index API Endpoint',
  });
};

export default {
  getIndex,
};
