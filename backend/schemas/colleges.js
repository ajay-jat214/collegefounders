const mongoose=require('mongoose');

const CollegeSchema=new mongoose.Schema({
	
		id:{
			type:Number,
			default:0
		},
		name:{
			type:String,
			default:''
		},
		yearFounded:{
			type:Number,
			default:0
		},
		city:{
			type:String,
			default:''
		},
		state:{
			type:String,
			default:''
		},
		country:{
			type:String,
			default:''
		},
		studentStrength:{
			type:Number,
			default:0
		},
		coursesOffered:{
			type:String,
			default:''
		}
	
});


var Collegefounders=mongoose.model("collegefounders",CollegeSchema);
module.exports=Collegefounders;
