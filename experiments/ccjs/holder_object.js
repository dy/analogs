var a = {
	x: function(){
		return a.z() + a.y + 2;
	},

	y: 1,

	z: function(){
		return 1 + a.y;
	}
};

module.exports = a.x;