const database = require("./database");
database.connect();

const recordsModel = require("../models/recordModel");
const devicesModel = require("../models/deviceModel");
const stadisticsModel = require("../models/stadisticsModel");
//Callback hell

const getDevices=async ()=>{
    await devicesModel.aggregate([
        { $group: { _id: "$real_location.sector", cuenta: { $sum: 1 } } }
    ]).exec((err, result) => {


        console.log(result);
        });
};

recordsModel.findOne({_id:'5e681b5039321d0e09304600'}).populate("devices").exec((err,data)=>{
    if(err) console.log(err);
    else console.log(data);
});
// a=getDevices();

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
// const calculateTime=(start,end)=>{
//     let a1=(end.getHours()-start.getHours())*60;
//     let a2=(end.getMinutes()-start.getMinutes());
//     return a1+a2;
// };

// var promise = query.exec();
// promise.addBack(function (err, docs) {
//     console.log(docs)
// });



// function getWeekOfMonth(date) {
//     const startWeekDayIndex = 1; // 1 MonthDay 0 Sundays
//     const firstDate = new Date(date.getFullYear(), date.getMonth(), 1);
//     const firstDay = firstDate.getDay();
//
//     let weekNumber = Math.ceil((date.getDate() + firstDay) / 7);
//     if (startWeekDayIndex === 1) {
//         if (date.getDay() === 0 && date.getDate() > 1) {
//             weekNumber -= 1;
//         }
//
//         if (firstDate.getDate() === 1 && firstDay === 0 && date.getDate() > 1) {
//             weekNumber += 1;
//         }
//     }
//     return weekNumber;
// }
