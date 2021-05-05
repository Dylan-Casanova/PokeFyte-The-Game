const router = require('express').Router();
const { User } = require('../../models');

// CREATE new user
router.post('/', async (req, res) => {
  try {
    const dbuserData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = dbuserData.id;
      req.session.logged_in = true;

      res.status(200).json(dbuserData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});


// Login
router.post('/login', async (req, res) => {
  try {
    const dbuserData = await User.findOne({ where: { email: req.body.email } });
    console.log(req.body.email);
// body from client or database
    if (!dbuserData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await dbuserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = dbuserData.id;
      req.session.logged_in = true;
      
      res.json({ user: dbuserData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
