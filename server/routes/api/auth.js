// // server/routes/api/auth.js
// const express = require('express');
// const router = express.Router();
// const { register, login, getProfile } = require('../../controllers/authController');
// const { protect } = require('../../middleware/auth');

// router.post('/register', register);
// router.post('/login', login);
// router.get('/profile', protect, getProfile);

// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const { login, getProfile } = require('../../controllers/authController');
// const { adminProtect } = require('../../middleware/auth');

// router.post('/login', login);
// router.get('/profile', adminProtect, getProfile);

// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const { login, getProfile } = require('../../controllers/authController');
// const { adminProtect } = require('../../middleware/auth');

// // Ensure handlers exist before adding routes
// if (login) router.post('/login', login);
// if (getProfile) router.get('/profile', adminProtect, getProfile);

// module.exports = router;

// server/routes/api/auth.js
// const express = require('express');
// const router = express.Router();
// const auth = require('../../middleware/auth');
// const { login } = require('../../controllers/authController');

// router.post('/login', login);
// router.get('/verify', auth, (req, res) => {
//     res.json({ user: req.user });
// });

// module.exports = router;

// server/routes/api/auth.js
// server/routes/api/auth.js
const express = require('express');
const router = express.Router();
const { login, verifyToken } = require('../../controllers/authController');
const { protect } = require('../../middleware/auth');

router.post('/login', login);
router.get('/verify', protect, verifyToken);

module.exports = router;