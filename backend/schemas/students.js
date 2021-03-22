const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

const StudentSchema=new mongoose.Schema({
		id:{
			type:Number,
			default:0
		},
		name:{
			type:String,
			default:''
		},
		collegeId:{
			type:Number,
			default:0
		},
		skills:{
			type:String,
			default:''
		},
		batch:{
			type:Number,
			default:0
		},
	
});

var Student=mongoose.model('student',StudentSchema);
module.exports=Student;
