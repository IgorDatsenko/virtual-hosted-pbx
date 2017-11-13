var gulp = require('gulp'),
  getTaskByName = require('./get-task-by-name.js'),
  MainTasks = function (tasks) {
    this.tasks = tasks || {};
  };

MainTasks.prototype = {
  init: function (taskName, tasksArr) {
    var i = 0,
      newTasks = [],
      tempTaskName = '';

    for (; i < tasksArr.length; i++) {
      tempTaskName = taskName + ':' + tasksArr[i];
      newTasks[i] = tempTaskName;

      if (i !== 0) {
        gulp.task(tempTaskName, [newTasks[i - 1]], getTaskByName(this.tasks, tasksArr[i]));
      } else {
        gulp.task(tempTaskName, getTaskByName(this.tasks, tasksArr[i]));
      }
    }

    gulp.task(taskName, [newTasks[newTasks.length - 1]]);

    return this;
  }
};

module.exports = MainTasks;
