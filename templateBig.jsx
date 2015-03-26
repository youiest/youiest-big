/*** @jsx React.DOM */
userId = "nicolsondsouza";
var bigReact = new React.createClass({
	getInitialState: function(){
		var big = {};
		var user = Meteor.users.findOne({
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
			var imageId = Session.get("imageId");
			// console.log(imageId);
			var user = Meteor.users.findOne({
				"_id": userId,
				// "inbox": {$elemMatch: {"_id": Session.get("imageId")}}
			});
			
			if(user && user.inbox){
				for(var i=0,il=user.inbox.length;i<il;i++){
					if(user.inbox[i]._id == imageId){
						big = user.inbox[i]; console.log(user.inbox[i]);
					}
				}
			}
			self.setState({big: big});	
		});
	},
	"render": function(){
		// console.log(this.state.big);
		// if(this.state.big){
			return( 
				<div className="ui segment">
					<img 
						className="ui centered image" 
						src={this.state.big.picture_low} 
						onClick={this.onClickBig}/>
				</div>
			)
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
		o.imageId = Session.get("imageId");
		o.followId = Session.get("followId");
		o.currentTarget = event.currentTarget;
		o.elementLeft = event.currentTarget.offsetLeft;
		o.elementTop = event.currentTarget.offsetTop;
		o.clientX = event.clientX;
		o.clientY = event.clientY;
		o.X = o.clientX - o.elementLeft;
		o.Y = o.clientY - o.elementTop;
		o.width = o.currentTarget.clientWidth;
		o.height = o.currentTarget.clientHeight;
		
		// console.log(o)
		// console.log(event.clientX);
		// console.log(second);
		// console.log(imageId);
		// console.log(followId);
	}
});
Big.big = bigReact;

Template.bigPackage.rendered = function(){
	React.renderComponent(<bigReact />, document.getElementById('bigPackage'))
}