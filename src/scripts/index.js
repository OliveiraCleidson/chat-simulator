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

function insertMessageInChat({ chat, message, isOwner = false }) {
  const messageDiv = parseMessageToHTML({ message });
  messageDiv.classList.add(isOwner ? 'owner' : 'other');
  chat.appendChild(messageDiv);
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
