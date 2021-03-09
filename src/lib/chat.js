function Chat({ author, root, repository }) {
  this.author = author;
  const chatContainer = this.createChatContainer();
  root.appendChild(chatContainer);
  this.repository = repository;
}

Chat.prototype.createDivAndInsertValueAndClass = function createDivAndInsertValueAndClass({
  className,
  value,
}) {
  const myDiv = document.createElement('div');
  myDiv.classList.add(className);
  myDiv.innerHTML = value;
  return myDiv;
};

Chat.prototype.parseMessageToHTML = function parseMessageToHTML({ message }) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message');

  const senderDiv = this.createDivAndInsertValueAndClass({
    className: 'sender',
    value: message.author,
  });
  messageDiv.appendChild(senderDiv);

  const contentDiv = this.createDivAndInsertValueAndClass({
    className: 'content',
    value: message.content,
  });

  messageDiv.appendChild(contentDiv);

  return messageDiv;
};

Chat.prototype.validateMessage = function validateMessage(message) {
  if (!message) {
    throw new Error('Deve mandar uma mensagem!');
  }

  if (!message.author || !message.content) {
    throw new Error('Faltando author ou content na mensagem!');
  }
};

Chat.prototype.validateChat = function validateChat(chat) {
  if (typeof chat !== 'object') {
    throw new Error('Chat inválido!');
  }

  if (!chat.appendChild) {
    throw new Error('Chat inválido!');
  }
};

Chat.prototype.insertMessageInChat = function insertMessageInChat({
  message,
  isOwner = false,
}) {
  try {
    this.validateMessage(message);
    const messageDiv = this.parseMessageToHTML({ message });
    messageDiv.classList.add(isOwner ? 'owner' : 'other');
    this.chat.appendChild(messageDiv);
  } catch (err) {
    alert(err.message);
  }
};

Chat.getChatById = function getChatById(id) {
  const chat = document.getElementById(id);

  if (!chat) {
    throw new Error('Chat não encontrado');
  }

  return chat;
};

Chat.prototype.popValueFromTextArea = function popValueFromTextArea() {
  const { value } = this.textArea;
  this.textArea.value = '';
  return value;
};

Chat.prototype.handleSendMessage = function handleSendMessage() {
  const messageContent = this.popValueFromTextArea();

  this.insertMessageInChat({
    message: {
      author: this.author,
      content: messageContent,
    },
    isOwner: true,
  });

  if (this.repository) {
    this.repository.add({
      author: this.author,
      content: messageContent,
      date: new Date(),
    });
  }
};

Chat.prototype.createSendContainer = function () {
  const sendContainer = document.createElement('div');
  sendContainer.classList.add('send-container');
  const textArea = document.createElement('textarea');
  textArea.placeholder = 'Digite sua mensagem!';
  textArea.classList.add('messageToSend');

  const submitButton = document.createElement('button');
  submitButton.type = 'button';
  submitButton.innerHTML = 'Enviar';
  submitButton.classList.add('submitBtn');
  submitButton.onclick = this.handleSendMessage.bind(this);
  sendContainer.appendChild(textArea);
  sendContainer.appendChild(submitButton);

  this.textArea = textArea;
  this.submitButton = submitButton;

  return sendContainer;
};

Chat.prototype.createChat = function createChat() {
  const myChat = document.createElement('div');

  myChat.classList.add('chat');
  this.chat = myChat;

  return myChat;
};

Chat.prototype.createChatContainer = function createChatContainer() {
  const chatContainer = document.createElement('div');
  const myChat = this.createChat();
  chatContainer.appendChild(myChat);
  const sendContainer = this.createSendContainer();
  chatContainer.appendChild(sendContainer);

  return chatContainer;
};

Chat.prototype.handleNewMessages = function handleNewMessages(message) {
  this.validateMessage(message);

  if (message.author !== this.author) {
    this.insertMessageInChat({
      message,
      isOwner: false,
    });
  }
};
