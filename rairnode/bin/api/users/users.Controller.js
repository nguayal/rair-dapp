const express = require('express');
const { validation, requireUserSession, isAdmin } = require('../../middleware');
const {
  createUser,
  getUserByAddress,
  updateUserByUserAddress,
  listUsers,
  exportUsers,
} = require('./users.Service');
const upload = require('../../Multer/Config');

const router = express.Router();

router.get(
  '/list',
  requireUserSession,
  isAdmin,
  listUsers,
);
router.get(
  '/export',
  requireUserSession,
  isAdmin,
  exportUsers,
);

router.post('/', validation(['createUser']), createUser);

// Common for the group of routes below validation
router.use('/:userAddress', validation(['userAddress'], 'params'));

router
  .route('/:publicAddress')
  .get(getUserByAddress)
  // Was POST in V1, no difference in usage, just standard
  .patch(
    requireUserSession,
    upload.array('files', 2),
    validation(['updateUser']),
    updateUserByUserAddress,
  );

module.exports = router;
