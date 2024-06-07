const getUsersByIds = (userIds) => {
  return userModel.find({ _id: { $in: userIds } }, "email").exec();
};

module.exports = { getUsersByIds };
