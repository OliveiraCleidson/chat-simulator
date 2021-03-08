function getChatById(id) {
  const chat = document.getElementById(id);

  if (!chat) {
    throw new Error('Chat não encontrado');
  }

  return chat;
}

function createDivAndInsertValueAndClass({ className, value }) {
  const myDiv = document.createElement('div');
  myDiv.classList.add(className);
  myDiv.innerHTML = `${value}`;
  return myDiv;
}

function parseMessageToHTML({ message }) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message');

  const senderDiv = createDivAndInsertValueAndClass({
    className: 'sender',
    value: message.author,
  });
  messageDiv.appendChild(senderDiv);

  const contentDiv = createDivAndInsertValueAndClass({
    className: 'content',
    value: message.content,
  });

  messageDiv.appendChild(contentDiv);

  return messageDiv;
}

function validateMessage(message) {
  if (!message) {
    throw new Error('Deve mandar uma mensagem!');
  }

  if (!message.author || !message.content) {
    throw new Error('Faltando author ou content na mensagem!');
  }
}

function validateChat(chat) {
  if (typeof chat !== 'object') {
    throw new Error('Chat inválido!');
  }

  if (!chat.appendChild) {
    throw new Error('Chat inválido!');
  }
}

function insertMessageInChat({ chat, message, isOwner = false }) {
  try {
    validateMessage(message);
    validateChat(chat);
    const messageDiv = parseMessageToHTML({ message });
    messageDiv.classList.add(isOwner ? 'owner' : 'other');
    chat.appendChild(messageDiv);
  } catch (err) {
    alert(err.message);
  }
}

const myChat = getChatById('chat');

insertMessageInChat({
  chat: myChat,
  message: {
    author: 'Iago',
    content: 'Testando',
  },

  isOwner: true,
});
