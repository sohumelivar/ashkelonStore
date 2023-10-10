const { User, Goods, Message, Chat } = require('../models/models');
const { Op, where } = require('sequelize');


class messageController {
    async sendMessageItemPage (req, res) {
        try {
            const { message } = req.body;
            const from = req.cookies.accessToken.id;
            const idItem = req.cookies.updateId.id;
            const itemUserId = (await Goods.findOne({where: {id: idItem}})).dataValues.userId;
            const to = (await User.findOne({where: {id: itemUserId}})).dataValues.id;
            const messageBD = await Message.create({
                message,
                from,
                to,
                time: new Date().toLocaleTimeString('en-US', { hour12: false }),
            });
            let chat = await Chat.findOrCreate({
                where: {
                    [Op.or]: [
                        { user1Id: from, user2Id: to },
                        { user1Id: to, user2Id: from },
                    ],
                },
                defaults: {
                    user1Id: from,
                    user2Id: to
                }   
            });
            chat = chat[0];
            const unreadMessageBD = (await Chat.findOne({where : {id:chat.id}})).dataValues.unreadMessage
   
            if(unreadMessageBD){
              await Chat.update({unreadMessage: unreadMessageBD+1},{where:{id:chat.id}})
            }else{
              await Chat.update({unreadMessage:1},{where:{id:chat.id}})

            }
            console.log(unreadMessageBD,'======');
                        await messageBD.setChat(chat);
            res.json({test: 'test'});
        } catch (error) {
            console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ messageController ☢ sendMessageItemPage ☢ error:', error);
        }
    }

    async getAllLastMessages (req, res) {
        try {
            const { id } = req.cookies.accessToken;
            const chat = (await Chat.findAll({
                where: {
                    [Op.or]: [
                        { [Op.and]: { user1Id: id } },
                        { [Op.and]: { user2Id: id } },
                    ],
                },
            })).map(el => el.dataValues);
            const messages = (await Message.findAll({
                include: [
                  { model: User, as: 'sender' },
                  { model: User, as: 'receiver' },
                ],
              })).map(el => el.dataValues);
            const idChat = chat.map(el => el.id);
            const filteredMessages = messages.filter(message => idChat.includes(message.chatId)); 

            let lastMessagesByChatId = {};
            filteredMessages.forEach(message => {
                const chatId = message.chatId;
                if (!lastMessagesByChatId[chatId] || message.createdAt > lastMessagesByChatId[chatId].createdAt) {
                    lastMessagesByChatId[chatId] = message;
                }
            });
            lastMessagesByChatId = (Object.values(lastMessagesByChatId)).sort((a, b) => {
                return b.id - a.id
            })
            const result = JSON.parse(JSON.stringify(lastMessagesByChatId));
            result.map(el => delete el.sender.password && delete el.receiver.password);
            res.json(result);
        } catch (error) {
            console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ messageController ☢ getAllLastMessages ☢ error:', error);
        }
    }
 
   async getUnreadMessage (req,res){
    try {
      const { id } = req.cookies.accessToken;
      const unreadMessage = (await Chat.findAll({
        where: {
            [Op.or]: [
                { [Op.and]: { user1Id: id } },
                { [Op.and]: { user2Id: id } },
            ],
        },
    })).map(el => el.dataValues).reduce((acc,el)=> el.unreadMessage+acc,0);
    res.json(unreadMessage)

      
    } catch (error) {
      console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ messageController ☢ getUnreadMessage ☢ error:', error);

    }
    }
  
}



module.exports = new messageController;
