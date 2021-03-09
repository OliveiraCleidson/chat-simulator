function Repository() {
  this.repository = [];
  this.listerners = {};
}

Repository.prototype.add = function add(item) {
  this.repository.push(item);

  this.emit('new-item', item);
};

Repository.prototype.on = function on(eventName, callback) {
  this.validateEventName(eventName);

  this.listerners[eventName].push(callback);
};

Repository.prototype.remove = function on(eventName, callback) {
  this.validateEventName(eventName);

  const index = this.listerners[eventName].findIndex(call => call === callback);
  if (index > 0) {
    this.listerners[eventName].splice(index, 1);
  }
};

Repository.prototype.emit = function emit(eventName, data) {
  this.validateEventName(eventName);

  this.listerners[eventName].forEach(callback => callback(data));
};

Repository.prototype.validateEventName = function validateEventName(eventName) {
  if (!this.listerners[eventName]) {
    this.listerners[eventName] = [];
  }
};
