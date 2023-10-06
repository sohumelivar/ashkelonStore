const { Message, User, Chat } = require("../models/models");
const { Op } = require("sequelize");

module.exports = async function getAllMessagesInChat(autorizedUser, user2) {
  try {
    const chat = await Chat.findOne({
      where: {
        [Op.or]: [
          { [Op.and]: { user1Id: autorizedUser, user2Id: user2 } },
          { [Op.and]: { user1Id: user2, user2Id: autorizedUser } },
        ],
      },
    });

    const messages = (
      await Message.findAll({
        where: { chatId: chat.id },
        include: [
          { model: User, as: "sender" },
          { model: User, as: "receiver" },
        ],
      })
    ).map((el) => el.dataValues);
    const result = JSON.parse(JSON.stringify(messages));
    result.map(
      (el) => delete el.sender.password && delete el.receiver.password
    );
    return result;
  } catch (error) {
    console.log(
      "⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ messageController ☢ getAllMessagesInChat ☢ error:",
      error
    );
  }
};
