const recordsModel = require("../models/recordModel");
const devicesModel = require("../models/deviceModel");
const statisticsModel = require("../models/statisticsModel");
//Callback hell

// recordsModel.find({}).populate('device').exec((err,data)=>{
//     if(err) console.log(err);
//     else console.log(data);
// });
// recordsModel.aggregate([{"$lookup":{"from":"devices","localField":"device","foreignField":"_id","as":"dispositivo"}}]).exec((err,doc)=>{
//     if(err) console.log(err);
//     else doc.map(i=>{console.log(i.dispositivo)})
// });

// a=getDevices();
const generateStatistics = async () => {
  const minutesOfWeek = 5520;
  await devicesModel.find({}, (err, devices) => {
    devices.map(async device => {
      await recordsModel
        .find({ state: "Libre", device: device._id })
        .populate("device")
        .exec(async (err, records) => {
          const a = new statisticsModel();
          const date = new Date();
          const month = date.getMonth() + 1;
          const week = getWeekOfMonth(date);
          let total = 0;
          records.map(record => {
            total = total + calculateTime(record.start, record.end);
          });
          a.device = device._id;
          a.sector = device.real_location.sector;
          a.canvas_location = device.canvas_location;
          a.total_minutes = total;
          a.percentage = (total / minutesOfWeek) * 100;
          a.date = { month, week };
          await a.save();
        });
    });
  });
};
module.exports = { generateStatistics };
//getDevices();
// const month=
// const minutesOfWeek=5520;
// var total=0;
// recordsModel.find({"state":"Libre","location.sector":"parqueadero18","location.identifier":1},(err,data)=>{
//     const a=new stadisticsModel();
//     const date=new Date();
//     data.map(i=>{
//         total=total+calculateTime(i.start,i.end);
//     });
//     a.real_location=data[0].location;
//     a.total_minutes=total;
//     a.percentage=(minutesOfWeek/total)*100;
//     a.date={month:date.getMonth(),week:date.get}
//     console.log(total);
// });
//
const calculateTime = (start, end) => {
  let a1 = (end.getHours() - start.getHours()) * 60;
  let a2 = end.getMinutes() - start.getMinutes();
  return a1 + a2;
};

const getWeekOfMonth = date => {
  const startWeekDayIndex = 0; // 1 MonthDay 0 Sundays
  const firstDate = new Date(date.getFullYear(), date.getMonth(), 1);
  const firstDay = firstDate.getDay();

  let weekNumber = Math.ceil((date.getDate() + firstDay) / 7);
  if (startWeekDayIndex === 1) {
    if (date.getDay() === 0 && date.getDate() > 1) {
      weekNumber -= 1;
    }

    if (firstDate.getDate() === 1 && firstDay === 0 && date.getDate() > 1) {
      weekNumber += 1;
    }
  }
  return weekNumber;
};
