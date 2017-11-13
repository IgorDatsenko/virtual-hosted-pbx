var getTaskByName = function (from, name) {
  var newName = name.split(':');

  if (typeof from[newName[0]] === 'function') {
    return from[newName[0]];
  } else {
    name = newName.splice(0, 1);

    return getTaskByName(from[name[0]], newName.join(':'));
  }
};

module.exports = getTaskByName;
