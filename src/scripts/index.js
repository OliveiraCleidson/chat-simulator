const root = document.getElementById('chatContainer');

const repository = new Repository();

const myChat = new Chat({ author: 'Oliver', root, repository });
const otherChat = new Chat({ author: 'Iagod', root, repository });

repository.on('new-item', myChat.handleNewMessages.bind(myChat));
repository.on('new-item', otherChat.handleNewMessages.bind(otherChat));
