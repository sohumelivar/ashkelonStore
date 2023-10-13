const { User, Goods, Message, Chat, Unread } = require('../models/models');
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
            await messageBD.setChat(chat);

            const unreadMessageBD = await Unread.findOne({where : {userId: to, from}});
            if(unreadMessageBD) {
                const counter = unreadMessageBD.dataValues.counter;
                await Unread.update({counter: counter + 1}, {where: {userId: to, from}});
            } else {
                await Unread.create({userId: to, from, counter: 1});
            }
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
                  { model: User, as: 'sender', include: Unread },
                  { model: User, as: 'receiver', include: Unread },
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

            result.map( el => {
                if(el.sender.id === id) {
                    Object.assign(el, { unread: false });
                } else {
                    el.receiver.unreads.map( arr => {
                        if( arr.from === el.sender.id && arr.counter ) {
                            Object.assign(el, { unread: true });
                        } 
                        else if ( arr.from === el.sender.id && arr.counter === 0 ){
                            Object.assign(el, { unread: false });
                        }
                    })
                }
            })
            res.json(result);
        } catch (error) {
            console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ messageController ☢ getAllLastMessages ☢ error:', error);
        }
    }
 
   async getUnreadMessage (req,res){
    try {
        const { id } = req.cookies.accessToken;
        const unreadMessage = await Unread.findAll({where: {userId: id}});
        if(unreadMessage) {
            const counter = unreadMessage.map( el => el.dataValues).reduce((acc, el) => el.counter + acc, 0);
            return res.json(counter);
        }
        res.json(null);
    } catch (error) {
      console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ messageController ☢ getUnreadMessage ☢ error:', error.message);
    }
    }
    

    async clearCountMessages (req, res) {
        try {
            const { id } = req.cookies.accessToken;
            const { chatWith }  = req.body;
            if ( id ) {
                await Unread.update({counter: 0},{where: {userId: id, from: chatWith}});
                const unreadMessage = await Unread.findAll({where: {userId: id}});
                if(unreadMessage) {
                    const counter = unreadMessage.map( el => el.dataValues).reduce((acc, el) => el.counter + acc, 0);
                    return res.json(counter);
                }
                return res.json(null);
            }
            return res.json(null);
        } catch (error) {
            console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ messageController ☢ clearCountMessages ☢ error:', error);
        }
    }
}



module.exports = new messageController;
