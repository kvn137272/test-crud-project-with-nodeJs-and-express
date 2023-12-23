// اینجا برای ساختن مدل پست ها ماژول اسکیما رو از مونگوز اینپورت میکنیم
const { Schema, default: mongoose } = require("mongoose");

// برای ساختن مدل پست ها اینجا به وسیله اسکیما اسم فیلدهایی که میخوایم توی دیتا بیس پست ها داشته باشیم رو تعریف میکنیم و همچنین مشخص میکنیم چه تایپی داشته باشن
const postSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", postSchema);
