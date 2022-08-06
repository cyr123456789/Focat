import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Gets the key of the current last task and the next integer is the key of the new task.
 * Update the "tasks" item by setting the value to the newly modified tasks array.
 * @param {*} task
 */
const storeTask = async (task) => {
  getTasks().then((arr) => {
    let key = 0;
    let idx = 0;
    let allTasks = [];
    if (arr !== undefined && arr.length > 0) {
      key = arr.slice(-1)[0].key + 1;
      idx = arr.length;
      allTasks = arr;
    }
    allTasks[idx] = {
      key: key,
      task: task,
      isDone: false,
    };
    AsyncStorage.setItem('tasks', JSON.stringify(allTasks)).then(
      null,
      (error) => {
        console.log(error);
      }
    );
  });
};

/**
 * @returns tasks array
 */
const getTasks = async () => {
  try {
    const arr = await AsyncStorage.getItem('tasks');
    if (arr != null) {
      return JSON.parse(arr);
    }
  } catch (e) {
    console.log(e);
  }
};

/**
 * Finds the correct array index for the selected task to be toggled as done / undone.
 * Update value of isDone then update the value of "tasks" item.
 * @param {*} keyVal
 */
const toggleDoneStatus = async (keyVal) => {
  try {
    getTasks().then((arr) => {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].key === keyVal && arr !== undefined) {
          arr[i].isDone = !arr[i].isDone;
          AsyncStorage.setItem('tasks', JSON.stringify(arr)).then(
            null,
            (error) => {
              console.log(error);
            }
          );
          break;
        }
      }
    });
  } catch (e) {
    console.log(e);
  }
};

/**
 * Finds the correct array index for the selected task to be deleted.
 * Update the array by removing the correct element in the array.
 * @param {*} keyVal
 */
const removeTask = async (keyVal) => {
  try {
    getTasks().then((arr) => {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].key === keyVal && arr !== undefined) {
          arr.splice(i, 1);
          AsyncStorage.setItem('tasks', JSON.stringify(arr)).then(
            null,
            (error) => {
              console.log(error);
            }
          );
          break;
        }
      }
    });
  } catch (e) {
    console.log(e);
  }
};

/**
 * Updates existing task based on user input.
 * @param {*} keyVal
 * @param {*} task
 */
const editTask = async (keyVal, task) => {
  try {
    getTasks().then((arr) => {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].key === keyVal && arr !== undefined) {
          arr[i].task = task;
          AsyncStorage.setItem('tasks', JSON.stringify(arr)).then(
            null,
            (error) => {
              console.log(error);
            }
          );
          break;
        }
      }
    });
  } catch (e) {
    console.log(e);
  }
};

export { storeTask, getTasks, toggleDoneStatus, removeTask, editTask };
