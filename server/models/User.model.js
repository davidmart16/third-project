const { Schema, model } = require("mongoose");

const userSchema = new Schema({

  username: {
    type: String,
    trim: true,
    set: value => value.charAt(0).toUpperCase() + value.substring(1).toLowerCase(),
    set: value => value,
    unique: true
  },

  id: {
    type: Number,

  },

  password: {
    type: String,
    match: /[0-9][A-Z][a-z]/,
    required: true 
  },

  email: {
    type: String,
    validate: {
            validator: value => value.endsWith('.com') || value.endsWith('.es'),
            message: 'Solo emails validos, acabados en (.com) o (.es)'
        },
    required: true 
  },

  counter: {
    type: Number,
    default: 0
  },

  icon: {
    type: String,
    enum: ['../public/icons/profile-user.png','../public/icons/tarjeta-vip.png',''],
    default: '../public/icons/profile-user.png'
  },

  myAudios: 
    [{
        type: Schema.Types.ObjectId,   
        ref: 'Audio'                       
    }],

  rate: {
    type: Number,
    min: 0,
    max: 5
  },

  role: {
    type: String,
    enum: ['AUDIOLOVER', 'VIP', 'ADMIN'],
    default: 'AUDIOLOVER'
  },

  favAudios:
  [{
    type: Schema.Types.ObjectId,   
    ref: 'Audio'  
  }]
  
}, {
  timestamps: true
});

const User = model("User", userSchema);

module.exports = User;
