import { describe, it, before } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../api/v1';
import loans from '../api/v1/db/loans';

chai.use(chaiHttp);
const should = chai.should();

let adminToken = '';
let userToken = '';
const invalidToken = 'd0NtBedEcE1vEdtH15T0kEn1s1NvAlId';

const adminCredentials = {
  email: 'admin@quickcredit.com',
  password: process.env.ADMIN_PASS || 'learn',
};

const userCredentials = {
  email: 'taewole@gmail.com',
  password: 'archt',
};

describe('API Test', () => {
  it('should return success if user navigate to localhost:7000/api/v1', (done) => {
    chai.request(server)
      .get('/api/v1')
      .end((err, res) => {
        should.not.exist(err);
        res.body.should.have.status(200);
        res.body.should.have.property('message');
        res.body.should.have.property('message').eql('You\'re welcome to index API Endpoint');
        done();
      });
  });
});

describe('SignUp Test', () => {
  it('should fail if email field is empty', (done) => {
    const user = {
      email: '',
    };
    chai.request(server)
      .post('/api/v1/users/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('Email is required');
        done();
      });
  });
  it('should fail if email field is invalid', (done) => {
    const user = {
      email: 'taewoleatgmail.com',
    };
    chai.request(server)
      .post('/api/v1/users/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('Invalid email: example - user@domain.com');
        done();
      });
  });
  it('should fail if firstName field is empty', (done) => {
    const user = {
      email: 'taewole@gmail.com',
      firstName: '',
    };
    chai.request(server)
      .post('/api/v1/users/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('First name is required');
        done();
      });
  });
  it('should fail if firstName field is invalid', (done) => {
    const user = {
      email: 'taewole@gmail.com',
      firstName: 1234,
    };
    chai.request(server)
      .post('/api/v1/users/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('Invalid first name');
        done();
      });
  });
  it('should fail if trimmed firstName field is empty', (done) => {
    const user = {
      email: 'taewole@gmail.com',
      firstName: '   ',
    };
    chai.request(server)
      .post('/api/v1/users/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('First name is empty');
        done();
      });
  });
  it('should fail if firstName field is not alphabet', (done) => {
    const user = {
      email: 'taewole@gmail.com',
      firstName: 'tae123',
    };
    chai.request(server)
      .post('/api/v1/users/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('First name can only contain alphabets.');
        done();
      });
  });
  it('should fail if firstName is not between 3 and 20 characters', (done) => {
    const user = {
      email: 'taewole@gmail.com',
      firstName: 'k',
    };
    chai.request(server)
      .post('/api/v1/users/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('First name length should be between 3 and 20');
        done();
      });
  });
  it('should fail if lastName field is empty', (done) => {
    const user = {
      email: 'taewole@gmail.com',
      firstName: 'taiwo',
      lastName: '',
    };
    chai.request(server)
      .post('/api/v1/users/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('Last name is required');
        done();
      });
  });
  it('should fail if lastName field is invalid', (done) => {
    const user = {
      email: 'taewole@gmail.com',
      firstName: 'taiwo',
      lastName: 1234,
    };
    chai.request(server)
      .post('/api/v1/users/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('Invalid last name');
        done();
      });
  });
  it('should fail if trimmed lastName field is empty', (done) => {
    const user = {
      email: 'taewole@gmail.com',
      firstName: 'taiwo',
      lastName: '    ',
    };
    chai.request(server)
      .post('/api/v1/users/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('Last name is empty');
        done();
      });
  });
  it('should fail if lastName field is not alphabet', (done) => {
    const user = {
      email: 'taewole@gmail.com',
      firstName: 'taiwo',
      lastName: 'charles123',
    };
    chai.request(server)
      .post('/api/v1/users/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('Last name can only contain alphabets.');
        done();
      });
  });
  it('should fail if lastName is not between 3 and 20 characters', (done) => {
    const user = {
      email: 'taewole@gmail.com',
      firstName: 'taiwo',
      lastName: 'c',
    };
    chai.request(server)
      .post('/api/v1/users/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('Last name length should be between 3 and 20');
        done();
      });
  });
  it('should fail if password field is empty', (done) => {
    const user = {
      email: 'taewole@gmail.com',
      firstName: 'taiwo',
      lastName: 'charles',
      password: '',
    };
    chai.request(server)
      .post('/api/v1/users/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('password is required');
        done();
      });
  });
  it('should fail if password does not match', (done) => {
    const user = {
      email: 'taewole@gmail.com',
      firstName: 'taiwo',
      lastName: 'charles',
      password: 'archt',
      confirmPassword: 'arch',
    };
    chai.request(server)
      .post('/api/v1/users/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('password does not match');
        done();
      });
  });
  it('should fail if address field is empty', (done) => {
    const user = {
      email: 'taewole@gmail.com',
      firstName: 'taiwo',
      lastName: 'charles',
      password: 'archt',
      confirmPassword: 'archt',
      address: '',
    };
    chai.request(server)
      .post('/api/v1/users/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('Address is required');
        done();
      });
  });
  it('should fail if address field is invalid', (done) => {
    const user = {
      email: 'taewole@gmail.com',
      firstName: 'taiwo',
      lastName: 'charles',
      password: 'archt',
      confirmPassword: 'archt',
      address: 123,
    };
    chai.request(server)
      .post('/api/v1/users/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('Invalid address');
        done();
      });
  });
  it('should fail if trimmed address field is empty', (done) => {
    const user = {
      email: 'taewole@gmail.com',
      firstName: 'taiwo',
      lastName: 'charles',
      password: 'archt',
      confirmPassword: 'archt',
      address: '   ',
    };
    chai.request(server)
      .post('/api/v1/users/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('Address is empty');
        done();
      });
  });
  it('should fail if address field contains unsupported characters', (done) => {
    const user = {
      email: 'taewole@gmail.com',
      firstName: 'taiwo',
      lastName: 'charles',
      password: 'archt',
      confirmPassword: 'archt',
      address: '@No 1, Planet #Earth.',
    };
    chai.request(server)
      .post('/api/v1/users/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('Address can only contain alphabets, numbers, comma and hyphen.');
        done();
      });
  });
  it('should return success if signup fields supplied are valid', (done) => {
    const user = {
      email: 'taewole@gmail.com',
      firstName: 'taiwo',
      lastName: 'charles',
      password: 'archt',
      confirmPassword: 'archt',
      address: 'No 1, Planet Earth.',
    };
    chai.request(server)
      .post('/api/v1/users/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        res.body.data.should.have.property('token');
        res.body.data.should.have.property('id');
        res.body.data.should.have.property('firstName').eql(user.firstName);
        res.body.data.should.have.property('lastName').eql(user.lastName);
        res.body.data.should.have.property('email').eql(user.email);
        res.body.data.should.have.property('address').eql(user.address);
        res.body.data.should.have.property('status').eql('unverified');
        res.body.data.should.have.property('isAdmin').eql(false);
        done();
      });
  });
  it('should fail if user signup details already exists', (done) => {
    const user = {
      email: 'taewole@gmail.com',
      firstName: 'taiwo',
      lastName: 'charles',
      password: 'archt',
      confirmPassword: 'archt',
      address: 'No 1, Planet Earth.',
    };
    chai.request(server)
      .post('/api/v1/users/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body.should.have.status(409);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('User already exists');
        done();
      });
  });
});

describe('Login Test', () => {
  it('should fail if email field is empty', (done) => {
    const user = {
      email: '',
    };
    chai.request(server)
      .post('/api/v1/users/auth/login')
      .send(user)
      .end((err, res) => {
        res.body.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('Email is required');
        done();
      });
  });
  it('should fail if email field is invalid', (done) => {
    const user = {
      email: 'taewoleatgmail.com',
    };
    chai.request(server)
      .post('/api/v1/users/auth/login')
      .send(user)
      .end((err, res) => {
        res.body.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('Invalid email: example - user@domain.com');
        done();
      });
  });
  it('should fail if password field is empty', (done) => {
    const user = {
      email: 'taewole@gmail.com',
      password: '',
    };
    chai.request(server)
      .post('/api/v1/users/auth/login')
      .send(user)
      .end((err, res) => {
        res.body.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('password is required');
        done();
      });
  });
  it('should fail if user is not found', (done) => {
    const user = {
      email: 'ungresiteredUser@gmail.com',
      password: 'unregistered',
    };
    chai.request(server)
      .post('/api/v1/users/auth/login')
      .send(user)
      .end((err, res) => {
        res.body.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('User not found');
        done();
      });
  });
  it('should return success if login fields supplied are valid', (done) => {
    const user = {
      email: 'taewole@gmail.com',
      password: 'archt',
    };
    chai.request(server)
      .post('/api/v1/users/auth/login')
      .send(user)
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        res.body.data.should.have.property('token');
        res.body.data.should.have.property('id');
        res.body.data.should.have.property('firstName').eql(res.body.data.firstName);
        res.body.data.should.have.property('lastName').eql(res.body.data.lastName);
        res.body.data.should.have.property('email').eql(res.body.data.email);
        res.body.data.should.have.property('address').eql(res.body.data.address);
        res.body.data.should.have.property('status').eql(res.body.data.status);
        res.body.data.should.have.property('isAdmin').eql(res.body.data.isAdmin);
        done();
      });
  });
});

describe('User account before verification attempts to apply for loan', () => {
  it('should fail if a LOGGED IN, TOKEN VALID BUT UNVERIFIED User attempts to Apply for loan', (done) => {
    const userLoggin = {
      email: 'taewole@gmail.com',
      password: 'archt',
    };
    chai.request(server)
      .post('/api/v1/users/auth/login')
      .send(userLoggin)
      .end((error, response) => {
        userToken = response.body.data.token;
        const loan = {
          tenor: '5',
          amount: '5000.00',
          purpose: 'Business',
          startDate: new Date(),
        };
        chai.request(server)
          .post('/api/v1/loans')
          .set('authorization', `Bearer ${userToken}`)
          .send(loan)
          .end((err, res) => {
            res.body.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.error.should.be.a('string');
            res.body.error.should.eql('Your account is yet to be verified. Please hold on for verification.');
            done();
          });
      });
  });
});

describe('Admin Test', () => {
  before((done) => {
    chai.request(server)
      .post('/api/v1/users/auth/login')
      .send(adminCredentials)
      .end((error, response) => {
        adminToken = response.body.data.token;
        done();
      });
  });
  it('should fail if status is not present in req.body when admin attempts to verify user account if user is created', (done) => {
    chai.request(server)
      .patch('/api/v1/users/kennyedward99@gmail.com/verify')
      .set('authorization', `Bearer ${adminToken}`)
      .send({ status: '' })
      .end((error, response) => {
        response.body.should.have.status(400);
        response.body.should.have.property('error');
        response.body.error.should.eql('Status is required');
      });
    done();
  });
  it('admin should be able to verify user account if user is created', (done) => {
    chai.request(server)
      .patch('/api/v1/users/taewole@gmail.com/verify')
      .set('authorization', `Bearer ${adminToken}`)
      .send({ status: 'verified' })
      .end((error, response) => {
        response.body.should.have.status(200);
        response.body.should.have.property('data');
        response.body.data.status.should.eql('verified');
      });
    done();
  });
  it('should fail if admin attempt to verify a user account NOT created', (done) => {
    chai.request(server)
      .patch('/api/v1/users/olabode_prof@gmail.com/verify')
      .set('authorization', `Bearer ${adminToken}`)
      .send({ status: 'verified' })
      .end((error, response) => {
        response.body.should.have.status(404);
        response.body.should.have.property('error');
        response.body.error.should.eql('User with the email address is not found.');
      });
    done();
  });
  it('should fail if a user without a valid token attempts to verify a user account', (done) => {
    chai.request(server)
      .patch('/api/v1/users/kennyedward99@gmail.com/verify')
      .set('authorization', `Bearer ${invalidToken}`)
      .send({ status: 'verified' })
      .end((error, response) => {
        response.body.should.have.status(403);
        response.body.should.have.property('error');
        response.body.error.should.eql('Invalid token, You need to login or signup');
      });
    done();
  });
  it('should fail if a user without admin rights attempts to verify a user account', (done) => {
    chai.request(server)
      .patch('/api/v1/users/kennyedward99@gmail.com/verify')
      .set('authorization', `Bearer ${userToken}`)
      .send({ status: 'verified' })
      .end((error, response) => {
        response.body.should.have.status(403);
        response.body.should.have.property('error');
        response.body.error.should.eql('You\'re forbidden to perform this action.');
      });
    done();
  });
  it('should fail if a user without a token attempts to verify a user account', (done) => {
    chai.request(server)
      .patch('/api/v1/users/kennyedward99@gmail.com/verify')
      .send({ status: 'verified' })
      .end((error, response) => {
        response.body.should.have.status(401);
        response.body.should.have.property('error');
        response.body.error.should.eql('Auth failed');
      });
    done();
  });
});

describe('Loan Test', () => {
  const validLoan = {
    tenor: '5',
    amount: '5000.00',
    purpose: 'Business',
    startDate: new Date(),
  };
  it('should fail if user is not logged in', (done) => {
    chai.request(server)
      .post('/api/v1/loans')
      .send(validLoan)
      .end((err, res) => {
        res.body.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('Auth failed');
        done();
      });
  });
  it('should fail if user token is invalid', (done) => {
    chai.request(server)
      .post('/api/v1/loans')
      .set('authorization', `Bearer ${invalidToken}`)
      .send(validLoan)
      .end((err, res) => {
        res.body.should.have.status(403);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('Invalid token, You need to login or signup');
        done();
      });
  });
  describe('Logged in user create loan test', () => {
    before((done) => {
      chai.request(server)
        .post('/api/v1/users/auth/login')
        .send(userCredentials)
        .end((error, response) => {
          userToken = response.body.data.token;
          done();
        });
    });
    it('should fail if user already has an UNPAID load running', (done) => {
      chai.request(server)
        .post('/api/v1/loans')
        .set('authorization', `Bearer ${userToken}`)
        .send(validLoan)
        .end((err, res) => {
          res.body.should.have.status(409);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.be.a('string').eql('You have an existing loan');
          done();
        });
    });
    it('Given a user is logged in, token is valid and status is VERIFIED, it should NOT create Loan if TENOR IS EMPTY', (done) => {
      validLoan.tenor = '';
      chai.request(server)
        .post('/api/v1/loans')
        .set('authorization', `Bearer ${userToken}`)
        .send(validLoan)
        .end((err, res) => {
          res.body.should.have.status(400);
          res.body.should.be.a('object');
          res.body.error.should.be.a('string');
          res.body.error.should.eql('Loan tenor is required');
          done();
        });
    });
    it('Given a user is logged in, token is valid and status is VERIFIED, it should NOT create Loan if TENOR IS NOT AN INTEGER', (done) => {
      validLoan.tenor = 8.8;
      chai.request(server)
        .post('/api/v1/loans')
        .set('authorization', `Bearer ${userToken}`)
        .send(validLoan)
        .end((err, res) => {
          res.body.should.have.status(400);
          res.body.should.be.a('object');
          res.body.error.should.be.a('string');
          res.body.error.should.eql('Loan tenor must be an integer');
          done();
        });
    });
    it('Given a user is logged in, token is valid and status is VERIFIED, it should NOT create Loan if TENOR IS LESS THAN 1 OR GREATER THAN 12', (done) => {
      validLoan.tenor = '13';
      chai.request(server)
        .post('/api/v1/loans')
        .set('authorization', `Bearer ${userToken}`)
        .send(validLoan)
        .end((err, res) => {
          res.body.should.have.status(400);
          res.body.should.be.a('object');
          res.body.error.should.be.a('string');
          res.body.error.should.eql('Loan tenor must be between 1 and 12');
          done();
        });
    });
    it('Given a user is logged in, token is valid and status is VERIFIED, it should NOT create Loan if AMOUNT IS INVALID', (done) => {
      validLoan.tenor = '5';
      validLoan.amount = '@5577.977';
      chai.request(server)
        .post('/api/v1/loans')
        .set('authorization', `Bearer ${userToken}`)
        .send(validLoan)
        .end((err, res) => {
          res.body.should.have.status(400);
          res.body.should.be.a('object');
          res.body.error.should.be.a('string');
          res.body.error.should.eql('Loan amount is required');
          done();
        });
    });
    it('Given a user is logged in, token is valid and status is VERIFIED, it should NOT create Loan if PURPOSE IS EMPTY', (done) => {
      validLoan.amount = '95577.97';
      validLoan.purpose = '';
      chai.request(server)
        .post('/api/v1/loans')
        .set('authorization', `Bearer ${userToken}`)
        .send(validLoan)
        .end((err, res) => {
          res.body.should.have.status(400);
          res.body.should.be.a('object');
          res.body.error.should.be.a('string');
          res.body.error.should.eql('Loan purpose is required');
          done();
        });
    });
    it('Given a user is logged in, token is valid and status is VERIFIED, it should NOT create Loan if PURPOSE IS INVALID', (done) => {
      validLoan.purpose = '#$@#Fraud';
      chai.request(server)
        .post('/api/v1/loans')
        .set('authorization', `Bearer ${userToken}`)
        .send(validLoan)
        .end((err, res) => {
          res.body.should.have.status(400);
          res.body.should.be.a('object');
          res.body.error.should.be.a('string');
          res.body.error.should.eql('Loan purpose can only contain alphabets');
          done();
        });
    });
  });
});

describe('Admin Approves Loan Test', () => {
  before((done) => {
    chai.request(server)
      .post('/api/v1/users/auth/login')
      .send(adminCredentials)
      .end((error, response) => {
        adminToken = response.body.data.token;
        response.body.should.have.status(200);
        response.body.should.be.a('object');
        response.body.data.should.have.property('token');
        response.body.data.should.have.property('isAdmin');
        response.body.data.isAdmin.should.eql(true);
        done();
      });
  });
  it('admin should fail if loan is NOT FOUND', (done) => {
    chai.request(server)
      .patch('/api/v1/loans/79567888')
      .set('authorization', `Bearer ${adminToken}`)
      .send({ status: 'approved' })
      .end((error, response) => {
        response.body.should.have.status(404);
        response.body.should.have.property('error');
        response.body.error.should.be.a('string');
        response.body.error.should.eql('Loan not found.');
      });
    done();
  });
  it('admin should be able to APPROVE a loan if user account EXISTS AND loan is CREATED and status is PENDING', (done) => {
    chai.request(server)
      .patch('/api/v1/loans/44068301')
      .set('authorization', `Bearer ${adminToken}`)
      .send({ status: 'approved' })
      .end((error, response) => {
        response.body.should.have.status(200);
        response.body.should.have.property('data');
        response.body.data.status.should.eql('approved');
      });
    done();
  });
  it('admin should be able to REJECT a loan if user account EXISTS AND loan is CREATED and status is PENDING', (done) => {
    chai.request(server)
      .patch('/api/v1/loans/44068301')
      .set('authorization', `Bearer ${adminToken}`)
      .send({ status: 'rejected' })
      .end((error, response) => {
        response.body.should.have.status(200);
        response.body.should.have.property('data');
        response.body.data.status.should.eql('rejected');
      });
    done();
  });
  it('admin can even return REJECTED loan to PENDING OR APPROVED as the case may be', (done) => {
    chai.request(server)
      .patch('/api/v1/loans/44068301')
      .set('authorization', `Bearer ${adminToken}`)
      .send({ status: 'pending' })
      .end((error, response) => {
        response.body.should.have.status(200);
        response.body.should.have.property('data');
        response.body.data.status.should.eql('pending');
      });
    done();
  });
});

describe('Admin Create Loan Repayment Test', () => {
  const loanRepayment = {
    paidAmount: '5000.00',
  };
  it('should fail if token is not found', (done) => {
    chai.request(server)
      .post('/api/v1/loans/:loanId/repayment')
      .send(loanRepayment)
      .end((err, res) => {
        res.body.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('Auth failed');
        done();
      });
  });
  it('should fail if admin token is invalid', (done) => {
    chai.request(server)
      .post('/api/v1/loans/:loanId/repayment')
      .set('authorization', `Bearer ${invalidToken}`)
      .send(loanRepayment)
      .end((err, res) => {
        res.body.should.have.status(403);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('Invalid token, You need to login or signup');
        done();
      });
  });
  it('should return forbidden if a user without admin rights attempts to create loan repayment', (done) => {
    chai.request(server)
      .post('/api/v1/loans/:loanId/repayment')
      .set('authorization', `Bearer ${userToken}`)
      .send(loanRepayment)
      .end((error, response) => {
        response.body.should.have.status(403);
        response.body.should.have.property('error');
        response.body.error.should.eql('You\'re forbidden to perform this action.');
      });
    done();
  });
  it('should fail if admin token is VALID and loan is NOT FOUND', (done) => {
    chai.request(server)
      .post('/api/v1/loans/83736219/repayment')
      .set('authorization', `Bearer ${adminToken}`)
      .send(loanRepayment)
      .end((err, res) => {
        res.body.should.have.status(404);
        res.body.should.be.a('object');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('Loan not found.');
        done();
      });
  });
  it('should return LOAN NOT YET APPROVED', (done) => {
    chai.request(server)
      .post('/api/v1/loans/44068301/repayment')
      .set('authorization', `Bearer ${adminToken}`)
      .send(loanRepayment)
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.be.a('object');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('Your loan is yet to be approved');
        done();
      });
  });
  it('should pass if admin token is VALID, loan is APPROVED and paid amount is VALID', (done) => {
    chai.request(server)
      .post('/api/v1/loans/82928475/repayment')
      .set('authorization', `Bearer ${adminToken}`)
      .send(loanRepayment)
      .end((err, res) => {
        res.body.should.have.status(201);
        res.body.should.be.a('object');
        res.body.data.should.be.a('object');
        res.body.data.should.have.property('balance').eql(res.body.data.balance);
        res.body.data.should.have.property('user');
        done();
      });
  });
  it('SECOND PAYMENT: should pass if admin token is VALID, loan is APPROVED and paid amount is VALID', (done) => {
    loanRepayment.paidAmount = '15000.00';
    chai.request(server)
      .post('/api/v1/loans/82928475/repayment')
      .set('authorization', `Bearer ${adminToken}`)
      .send(loanRepayment)
      .end((err, res) => {
        res.body.should.have.status(201);
        res.body.should.be.a('object');
        res.body.data.should.be.a('object');
        res.body.data.should.have.property('balance').eql(res.body.data.balance);
        res.body.data.should.have.property('user');
        done();
      });
  });
  it('should should fail if admin TOKEN is VALID, loan is APPROVED but paid amount is INVALID', (done) => {
    loanRepayment.paidAmount = '@#$$#';
    chai.request(server)
      .post('/api/v1/loans/82928475/repayment')
      .set('authorization', `Bearer ${adminToken}`)
      .send(loanRepayment)
      .end((err, res) => {
        res.body.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('Paid amount is required');
        done();
      });
  });
});

describe('User View Repayment History Test', () => {
  it('should fail if token is not found', (done) => {
    chai.request(server)
      .get('/api/v1/loans/12345678/repayment')
      .end((err, res) => {
        res.body.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('Auth failed');
        done();
      });
  });
  it('should fail if user token is invalid', (done) => {
    chai.request(server)
      .get('/api/v1/loans/12345678/repayment')
      .set('authorization', `Bearer ${invalidToken}`)
      .end((err, res) => {
        res.body.should.have.status(403);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('Invalid token, You need to login or signup');
        done();
      });
  });
  it('should fail if user token is VALID and loan ID is INVALID', (done) => {
    chai.request(server)
      .get('/api/v1/loans/abcd1234/repayment')
      .set('authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        res.body.should.have.status(400);
        res.body.should.be.a('object');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('Loan ID is invalid.');
        done();
      });
  });
  it('should fail if user token is VALID and loan is NOT FOUND', (done) => {
    chai.request(server)
      .get('/api/v1/loans/12345678/repayment')
      .set('authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        res.body.should.have.status(404);
        res.body.should.be.a('object');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('Loan not found.');
        done();
      });
  });
  it('should return success if user token is VALID and loan is APPROVED and Repayment Transaction has been created', (done) => {
    chai.request(server)
      .get('/api/v1/loans/82928475/repayment')
      .set('authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });
  it('should return empty array if user token is VALID and loan is VALID and NO Repayment Transaction FOUND', (done) => {
    chai.request(server)
      .get('/api/v1/loans/73637837/repayment')
      .set('authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        res.body.should.have.status(404);
        res.body.should.be.a('object');
        res.body.data.should.be.a('string');
        res.body.data.should.eql('Loan repayment transaction NOT found for this loan.');
        done();
      });
  });
  describe('Admin should be able to View All Loan Test', () => {
    it('should fail if a non admin credential attempts to view all loans', (done) => {
      chai.request(server)
        .get('/api/v1/loans/')
        .set('authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          res.body.should.have.status(403);
          res.body.should.be.a('object');
          res.body.error.should.be.a('string').eql('You\'re forbidden to perform this action.');
          done();
        });
    });
    it('should pass if admin token is VALID and loan exists', (done) => {
      chai.request(server)
        .get('/api/v1/loans/')
        .set('authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
          res.body.should.have.status(200);
          res.body.should.be.a('object');
          res.body.data.should.be.a('array');
          done();
        });
    });
    it('should fail if loan id is invalid', (done) => {
      chai.request(server)
        .get('/api/v1/loans/abcd1234')
        .set('authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
          res.body.should.have.status(400);
          res.body.should.be.a('object');
          res.body.error.should.be.a('string').eql('Loan ID is invalid.');
          done();
        });
    });
    it('should fail if user without admin rights attempts to view a specific loan', (done) => {
      chai.request(server)
        .get('/api/v1/loans/12345678')
        .set('authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          res.body.should.have.status(403);
          res.body.should.be.a('object');
          res.body.error.should.be.a('string').eql('You\'re forbidden to perform this action.');
          done();
        });
    });
    it('should return 404 if loan is not found', (done) => {
      chai.request(server)
        .get('/api/v1/loans/12345678')
        .set('authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
          res.body.should.have.status(404);
          res.body.should.be.a('object');
          res.body.error.should.be.a('string').eql('Loan not found.');
          done();
        });
    });
    it('admin should be able to view a specific loan application if its exists', (done) => {
      chai.request(server)
        .get('/api/v1/loans/82928475')
        .set('authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
          res.body.should.have.status(200);
          res.body.should.be.a('object');
          res.body.data.should.be.a('object');
          done();
        });
    });
    it('admin should be able to view all current loan application', (done) => {
      chai.request(server)
        .get('/api/v1/loans/?status=approved&repaid=false')
        .set('authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
          res.body.should.have.status(200);
          res.body.should.be.a('object');
          res.body.data.should.be.a('array');
          done();
        });
    });
    it('admin should be able to view all paid loan application', (done) => {
      chai.request(server)
        .get('/api/v1/loans/?status=approved&repaid=true')
        .set('authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
          res.body.should.have.status(200);
          res.body.should.be.a('object');
          res.body.data.should.be.a('array');
          done();
        });
    });
    it('should fail if query status is not approved', (done) => {
      chai.request(server)
        .get('/api/v1/loans/?status=approve&repaid=true')
        .set('authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
          res.body.should.have.status(400);
          res.body.should.be.a('object');
          res.body.error.should.be.a('string').eql('status can only have the value: \'approved\'');
          done();
        });
    });
    it('should fail if query repaid is not correct', (done) => {
      chai.request(server)
        .get('/api/v1/loans/?status=approved&repaid=truty')
        .set('authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
          res.body.should.have.status(400);
          res.body.should.be.a('object');
          res.body.error.should.be.a('string').eql('repaid can only have the value: \'true\' or \'false\'');
          done();
        });
    });
    it('should return empty array if admin token is VALID and no loan exists yet', (done) => {
      loans.splice(0, loans.length);
      chai.request(server)
        .get('/api/v1/loans/')
        .set('authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
          res.body.should.have.status(404);
          res.body.should.be.a('object');
          res.body.data.should.be.a('array');
          done();
        });
    });
  });
});
