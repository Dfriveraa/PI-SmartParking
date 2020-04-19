//Enviar posiciones con porcentajes

// {
//     zone:
//     month:
//     week:
// }
const Statistic = require("../models/statisticsModel");

const getStatistics = (req, res) => {
  const { month, week, sector } = req.body;
  Statistic.find(
    { date: { month, week }, sector: sector },
    { date: 1, percentage: 1, canvas_location: 1 },
    (err, document) => {
      if (err)
        res.status(502).json({
          status: 502,
          message: "Error interno del servidor"
        });
      else {
        console.log(document);
        res.status(200).send(document);
      }
    }
  );
};

module.exports = { getStatistics };
