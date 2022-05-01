const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const SuscriptoresSchema = mongoose.Schema(
  {
    Email: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
)

SuscriptoresSchema.plugin(mongoosePaginate)
SuscriptoresSchema.index({
  Email: 'text',
})

const myModel = (module.exports = mongoose.model('Suscriptores', SuscriptoresSchema, 'suscriptores'))
myModel.schema = SuscriptoresSchema
