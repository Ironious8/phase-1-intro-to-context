function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents:[],
        timeOutEvents:[]
    };
}

function createEmployeeRecords(employeeInfo) {
      return employeeInfo.map(data => createEmployeeRecord(data));

}

function createTimeInEvent(employeeRecord, dateStamp) {
    let [date, hour] = dateStamp.split(' ');
    employeeRecord.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date: date
    });
    return employeeRecord;
  }

  
  function createTimeOutEvent(employeeRecord, dateStamp) {
    let [date, hour] = dateStamp.split(' ');
    employeeRecord.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date: date
    });
    return employeeRecord;
  }

  
  function hoursWorkedOnDate(employeeRecord, date) {
    let timeIn = employeeRecord.timeInEvents.find(event => event.date === date);
    let timeOut = employeeRecord.timeOutEvents.find(event => event.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
  }

  
  function wagesEarnedOnDate(employeeRecord, date) {
    let hours = hoursWorkedOnDate(employeeRecord, date);
    return hours * employeeRecord.payPerHour;
  }

  function allWagesFor(employeeRecord) {
    return employeeRecord.timeInEvents.reduce((total, event) => {
      return total + wagesEarnedOnDate(employeeRecord, event.date);
    }, 0);
  }

  
  function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total, record) => {
      return total + allWagesFor(record);
    }, 0);
  }

