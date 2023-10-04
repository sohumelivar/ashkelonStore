const { User, Goods, Message } = require('../models/models');



class messageController {
    async sendMessageItemPage (req, res) {
        try {
            const { message } = req.body;
            const from = req.cookies.accessToken.user;
            const idItem = req.cookies.updateId.id;
            const itemUserId = (await Goods.findOne({where: {id: idItem}})).dataValues.userId;
            const to = (await User.findOne({where: {id: itemUserId}})).dataValues.name
            const time = new Date().toLocaleTimeString('en-US', { hour12: false });
            (await Message.create({message, from, to, time})).dataValues;
            const allMessages = (await Message.findAll({where: {from, to}})).map((el) => el.dataValues);
            const allMessages2 = (await Message.findAll({where: {from: to, to: from }})).map((el) => el.dataValues);
            const result = [...allMessages, ...allMessages2].sort((a, b) => a.id - b.id);
            res.json({responseMessage: `сообщение отправлено! Вы можете перейти в чат с пользователем ${to}`});
        } catch (error) {
            console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ messageController ☢ sendMessageItemPage ☢ error:', error);
        }
    }
    
    
    
    async getAllLastMessages (req, res) {
        try {
            const { user } = req.cookies.accessToken;
            const incomingMessages = (await Message.findAll({where: {to: user}})).map(el => el.dataValues);
            function getLatestMessagesFromEachUser(messages) {
                const latestMessages = {};
                messages.forEach((message) => {
                  const { from } = message;
                  if (!latestMessages[from] || message.updatedAt > latestMessages[from].updatedAt) {
                    latestMessages[from] = message;
                }
            });              
                const result = Object.values(latestMessages);
                return result;
              }
            const latestMessages = getLatestMessagesFromEachUser(incomingMessages);
            
            const img = [];
            async function processItem(item) {
                const result = (await User.findOne({where: {name: item.from}})).dataValues.img;
                return img.push(result);
            }              
            await Promise.all(latestMessages.map(processItem));
            const result = latestMessages.map((el, i) => Object.assign(el, {img: img[i]}));
            res.json(result);
            console.log();
        } catch (error) {
            console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ messageController ☢ getAllLastMessages ☢ error:', error);
        }
    }



 
  
  
  
  
  
    
}

module.exports = new messageController;

