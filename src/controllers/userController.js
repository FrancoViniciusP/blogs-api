const { STATUS, MESSAGES } = require('../helpers/constants');
const service = require('../services/userService');

async function create(req, res, next) {
  const userToken = await service.createUser(req.body);

  if (!userToken) return next({ status: STATUS.CONFLICT, message: MESSAGES.USER_EXISTS });
   
  res.status(201).json({ token: userToken });
}

async function getAll(_req, res) {
  const users = await service.getAllUsers();

  res.status(200).json(users);
}

async function getById(req, res, next) {
  const { id } = req.params;
  const user = await service.getUserById(id);

  if (!user) return next({ status: STATUS.NOT_FOUND, message: MESSAGES.ERROR_USER });

  res.status(200).json(user);
}

async function destroy(req, res) {
  const { userId } = req.body;

  await service.deleteUser(userId);
 
  res.status(204).json();
}

module.exports = {
  create,
  getAll,
  getById,
  destroy,
};