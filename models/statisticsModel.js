var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const statisticSchema = new Schema(
    {
        // canvas_location: {
        //     x: {
        //         type: Number,
        //         required: [true, "Coordenada x"],
        //         trim: true
        //     },
        //     y: {
        //         type: Number,
        //         required: [true, "Coordenada y"],
        //         trim: true
        //     }
        // },
        // real_location: {
        //     sector: {
        //         type: String,
        //         required: [
        //             true,
        //             "Debe indicar a que parqueadero pertenece el dispositivo"
        //         ],
        //         trim: true
        //     },
        //     identifier: {
        //         type: Number,
        //         required: [true, "Debe indicar con "],
        //         trim: true
        //     }
        // },
        sector: {
            type: String,
            required: [
                true,
                "Debe indicar a que parqueadero pertenece el dispositivo"
            ],
            trim: true
        },
        canvas_location: {
            x: {
                type: Number,
                required: [true, "Coordenada x"],
                trim: true
            },
            y: {
                type: Number,
                required: [true, "Coordenada y"],
                trim: true
            }
        },
        device:{
            type:String,
            ref:"Device",
            required: [true, "Id del dispositivo al que pertenece"]
        },
        total_minutes: {
            type: Number,
            required: [true, "Debe indicar el numero de minutos"],
            trim: true
        },
        percentage: {
            type: Number,
            required: [true, "Debe indicar con "],
            trim: true
        },
        date: {
            month: {
                type: Number,
                required: [
                    true,
                    "Debe indicar un mes"
                ],
                trim: true
            },
            week: {
                type: Number,
                required: [true, "Debe indicar una semana "],
                trim: true
            }
        }


    },
    {
        versionKey: false // You should be aware of the outcome after set to false
    }
);

module.exports = mongoose.model("Statistics", statisticSchema);
