import axios from 'axios';
import messageStore from '../store/messageStore';

const axiosFromMessage = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:5000/api/message'
  });

export const sendMessageItemPageApi = async (message) => {
    try {
        const response = await axiosFromMessage.post('/sendMessageItemPage', { message });
        messageStore.setResponseMessage(response.data.responseMessage);
    } catch (error) {
        console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ sendMessageItemPage ☢ error:', error);
    }
}

export const lastMessagesApi = async () => {
    try {
        const response = await axiosFromMessage.get('/getAllLastMessages');
        messageStore.setLastMessage(response.data);
        console.log(response.data);
     } catch (error) {
        console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ lastMessagesApi ☢ error:', error);
    }
}

export const unreadMessageApi = async () => {
  try {
      const response = await axiosFromMessage.get('/unreadMessage');
      return messageStore.setUnreadMessage(response.data);
   } catch (error) {
      console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ lastMessagesApi ☢ error:', error);
  }
}

export const clearCountMessagesApi = async (chatWith) => {
    try {
        const response = await axiosFromMessage.post('/clearCountMessages', { chatWith });
        return messageStore.setUnreadMessage(response.data);
    } catch (error) {
        console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ clearCountMessagesApi ☢ error:', error)
    }
}

export const unreadMessageWithOneUserApi = async ()=>{
  try {
    
  } catch (error) {
    console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ unreadMessageWithOneUserApi ☢ error:', error)

  }
}



