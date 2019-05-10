const valiidateSignUp = (req, res, next) => {
  let validationMessage = '';

  if (!req.body.email) {
    validationMessage += 'Email is required';
  } else if (req.body.email && !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(req.body.email)) {
    validationMessage += 'Invalid email: example - user@domain.com';
  } else if (!req.body.firstName) {
    validationMessage += 'First name is required';
  } else if (typeof req.body.firstName !== 'string') {
    validationMessage += 'Invalid first name';
  } else if (!req.body.firstName.trim()) {
    validationMessage += 'First name is empty';
  } else if (/^[a-zA-Z]*$/.test(req.body.firstName) === false) {
    validationMessage += 'First name can only contain alphabets.';
  } else if ((req.body.firstName.trim().length < 3) || (req.body.firstName.trim().length > 20)) {
    validationMessage += 'First name length should be between 3 and 20';
  } else if (!req.body.lastName) {
    validationMessage += 'Last name is required';
  } else if (typeof req.body.lastName !== 'string') {
    validationMessage += 'Invalid last name';
  } else if (!req.body.lastName.trim()) {
    validationMessage += 'Last name is empty';
  } else if (/^[a-zA-Z]*$/.test(req.body.lastName) === false) {
    validationMessage += 'Last name can only contain alphabets.';
  } else if ((req.body.lastName.trim().length < 3) || (req.body.lastName.trim().length > 20)) {
    validationMessage += 'Last name length should be between 3 and 20';
  } else if (!req.body.password) {
    validationMessage += 'password is required';
  } else if (req.body.password !== req.body.confirmPassword) {
    validationMessage += 'password does not match';
  } else if (!req.body.address) {
    validationMessage += 'Address is required';
  } else if (typeof req.body.address !== 'string') {
    validationMessage += 'Invalid address';
  } else if (req.body.address.trim().length === 0) {
    validationMessage += 'Address is empty';
  } else if (/^[a-zA-Z0-9-.,' ]*$/.test(req.body.address) === false) {
    validationMessage += 'Address can only contain alphabets, numbers, comma and hyphen.';
  }
  return (validationMessage.length === 0) ? next()
    : res.status(400).json({ status: 400, error: validationMessage });
};

const valiidateLogin = (req, res, next) => {
  let validationMessage = '';

  if (!req.body.email) {
    validationMessage += 'Email is required';
  } else if (req.body.email && !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(req.body.email)) {
    validationMessage += 'Invalid email: example - user@domain.com';
  } else if (!req.body.password) {
    validationMessage += 'password is required';
  }
  return (validationMessage.length === 0) ? next()
    : res.status(400).json({ status: 400, error: validationMessage });
};

const validateVerificationStatus = (req, res, next) => {
  let validationMessage = '';
  if (!req.body.status) {
    validationMessage += 'Status is required';
  }
  return (validationMessage.length === 0) ? next()
    : res.status(400).json({ status: 400, error: validationMessage });
};

export default {
  valiidateSignUp,
  valiidateLogin,
  validateVerificationStatus,
};
