/*** @jsx React.DOM */
userId = "nicolsondsouza";
// console.log(Vote);
var voteListReact = Vote.voteListReact;
var RecommendListReact = Recommend.RecommendListReact;
var BigReact = new React.createClass({
	getInitialState: function(){
		var big = {};
		var user = WI.findOne({
			"_id": userId,
			// "inbox": {$elemMatch: {"_id": Session.get("imageId")}}
		});
		var imageId = Session.get("imageId");
		if(user && user.inbox){
			for(var i=0,il=user.inbox.length;i<il;i++){
				if(user.inbox[i]._id == imageId)
					big = user.inbox[i];
					// self.setState({big: user.inbox[i]});		
			}
		}
		return {
			big: big
		}
	},
	componentDidMount: function(){
		var self = this;
		Tracker.autorun(function(){
			var big = {};
			var tempBig = Session.get("big");
			if(tempBig && tempBig[0])
				big = tempBig[0] || {};
			// var imageId = Session.get("imageId");
			// console.log(big);
			// var user = WI.findOne({
			// 	"_id": userId,
			// 	// "inbox": {$elemMatch: {"_id": Session.get("imageId")}}
			// });
			
			// if(user && user.inbox){
			// 	for(var i=0,il=user.inbox.length;i<il;i++){
			// 		if(user.inbox[i]._id == imageId){
			// 			big = user.inbox[i]; //console.log(user.inbox[i]);
			// 		}
			// 	}
			// }

			self.setState({big: big});	
		});
	},
	"render": function(){
		// console.log(this.state.big);
		// if(this.state.big){
			return(                                                                     
				React.DOM.div( {className:"ui segment"},                                   
					React.DOM.img(                                                            
						{className:"ui centered image",                                          
						src:this.state.big.image_low,                                            
						onClick:this.onClickBig}),                                               
					voteListReact(null ),                                                     
					RecommendListReact(null )
				)                                                                         
			)
			// return( 
			// 	<div className="ui segment">
			// 		<img 
			// 			className="ui centered image" 
			// 			src={this.state.big.image_low} 
			// 			onClick={this.onClickBig}/>
			// 		<voteListReact />
			// 		<RecommendListReact />
			// 	</div>
			// )
		// }
		// else{
		// 	return( 
		// 		<img className="ui small images" src="" onClick={this.onClickFeed}/>
		// 	)	
		// }
		
	},
	"onClickBig": function(event,second){
		var options = {};
		var o = options;
		// console.log($(event.currentTarget).offset().top + $(window).scrollTop())
		// console.log($(event.currentTarget).offset().top);
		o.imageId = Session.get("imageId");
		o.followId = Session.get("followId");
		o.currentTarget = event.currentTarget;
		o.elementLeft = event.currentTarget.offsetLeft;
		o.elementTop = $(event.currentTarget).offset().top - $(window).scrollTop();
		o.clientX = event.clientX;
		o.clientY = event.clientY;
		o.X = o.clientX - o.elementLeft;
		o.Y = o.clientY - o.elementTop;
		o.width = o.currentTarget.clientWidth;
		o.height = o.currentTarget.clientHeight;
		o.XP = Math.round((o.X / o.width) * 100);
		o.YP = Math.round((o.Y / o.height) * 100);

		this.onPrepare(options);
		// console.log(o.YP)
		// console.log(event.clientX);
		// console.log(second);
		// console.log(imageId);
		// console.log(followId);
	},
	"onPrepare": function(options){
		var o = options;
		var big = Session.get("big");
		if(big && big[0]){
			o.big = big[0];
		}
		else{
			o.big = {};
		}
		o.vote = Vote.findOne({"userId": userId, "imageId": o.big._id});
		if(o.vote){
			this.onRecommend(options);
		}else{
			this.onVote(options);
		}
	},
	"onRecommend": function(options){
		console.log("onRecommend");
		var o = options;
		var recommend = {};
		var user = WI.findOne(userId);
		if(user && user.profile && user.profile.profile_picture)
			recommend.sender_picture = user.profile.profile_picture;
		else
			recommend.sender_picture = "";

		recommend.senderId = userId;
		user = Session.get("sender");
		if(user && user.profile_picture)
			recommend.receiver_picture = user.profile_picture;
		else
			recommend.receiver_picture = "";
		
		recommend.receiverId = user._id;

		
		// if(big && big[0]){
		// 	big = big[0];
		recommend.imageId = o.big._id;
		recommend.image_low = o.big.image_low;
		recommend.XP = o.XP;
		recommend.YP = o.YP;
		// }
		
		

		Recommend.insert(recommend);
		// console.log(options)
		// console.log(recommend)
	},
	"onVote": function(options){
		var vote = {};
		console.log("onVote");
		var o = options;
		var user = WI.findOne(userId);
		if(user && user.profile && user.profile.profile_picture)
			vote.profile_picture = user.profile.profile_picture;
		else
			vote.profile_picture = "";

		vote.userId = userId;

		
		// if(big && big[0]){
		// 	big = big[0];
		vote.imageId = o.big._id;
		vote.image_low = o.big.image_low;
		vote.XP = o.XP;
		vote.YP = o.YP;
		vote.from_user = userId;
		vote._id = Random.id();
		vote.to_user = vote.imageId;
		// }

		Unionize.connect(vote);
		// Vote.insert(vote);
		// console.log(options)
		// console.log(vote)
	},
	"onMoveVR": function(options){
		var o = options;
	}
});
Big.big = BigReact;

Template.bigPackage.rendered = function(){
	React.renderComponent(<BigReact />, document.getElementById('bigPackage'))
}