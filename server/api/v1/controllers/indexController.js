const getIndex = (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'You\'re welcome to index API Endpoint',
  });
};

export default {
  getIndex,
};
