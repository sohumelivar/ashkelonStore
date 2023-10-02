const { User, Goods, Message, Chat } = require('../models/models');
const { Op } = require('sequelize');


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
                time: new Date().toLocaleTimeString('en-US', { hour12: false })
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
            console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ messageController ☢ sendMessageItemPage ☢ chat:', chat)

    
            chat = chat[0];

            
            await messageBD.setChat(chat);

            res.json({test: 'test'});
        } catch (error) {
            console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ messageController ☢ sendMessageItemPage ☢ error:', error);
        }
    }




    // async sendMessageItemPage (req, res) {
    //     try {
            // const { message } = req.body;
            // const from = req.cookies.accessToken.user;
            // const idItem = req.cookies.updateId.id;
            // const itemUserId = (await Goods.findOne({where: {id: idItem}})).dataValues.userId;
            // const to = (await User.findOne({where: {id: itemUserId}})).dataValues.name
    //         const time = new Date().toLocaleTimeString('en-US', { hour12: false });
    //         (await Message.create({message, from, to, time})).dataValues;
    //         const allMessages = (await Message.findAll({where: {from, to}})).map((el) => el.dataValues);
    //         const allMessages2 = (await Message.findAll({where: {from: to, to: from }})).map((el) => el.dataValues);
    //         const result = [...allMessages, ...allMessages2].sort((a, b) => a.id - b.id);
    //         res.json({responseMessage: `сообщение отправлено! Вы можете перейти в чат с пользователем ${to}`});
    //     } catch (error) {
    //         console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ messageController ☢ sendMessageItemPage ☢ error:', error);
    //     }
    // }
    
    // async getAllLastMessages (req, res) {
    //     try {
    //         const { user } = req.cookies.accessToken;
    //         const incomingMessages = (await Message.findAll({where: {to: user}})).map(el => el.dataValues);
    //         function getLatestMessagesFromEachUser(messages) {
    //             const latestMessages = {};
    //             messages.forEach((message) => {
    //               const { from } = message;
    //               if (!latestMessages[from] || message.updatedAt > latestMessages[from].updatedAt) {
    //                 latestMessages[from] = message;
    //             }
    //         });              
    //             const result = Object.values(latestMessages);
    //             return result;
    //           }
    //         const latestMessages = getLatestMessagesFromEachUser(incomingMessages);
            
    //         const img = [];
    //         async function processItem(item) {
    //             const result = (await User.findOne({where: {name: item.from}})).dataValues.img;
    //             return img.push(result);
    //         }              
    //         await Promise.all(latestMessages.map(processItem));
    //         const result = latestMessages.map((el, i) => Object.assign(el, {img: img[i]}));
    //         res.json(result);
    //     } catch (error) {
    //         console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ messageController ☢ getAllLastMessages ☢ error:', error);
    //     }
    // }

  //! --------------
        // const { fromUserId, toUserId } = req.params;

        // const chat = await Chat.findOne({
        //     where: {
        //         [Op.or]: [
        //             { [Op.and]: { from: fromUserId, to: toUserId } },
        //             { [Op.and]: { from: toUserId, to: fromUserId } },
        //         ],
        //     },
        // });

        // if (!chat) {
        //     return res.status(404).json({ error: 'Чат не найден' });
        // }

        // const messages = await Message.findAll({
        //     where: { chatId: chat.id },
        // });

        // res.status(200).json(messages);
    

  //! --------------  

}

module.exports = new messageController;