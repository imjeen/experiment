
// from：
//  http://www.bennadel.com/blog/2298-be-careful-when-using-the-jquery-proxy-method-outside-of-a-jquery-context.htm
//
//==============================================
// 法一：
var Signal = (function(){
	function Signal(context,eventType){
		this.context = context;
		this.eventType = eventType;
		this.callBacks = [];
	}

	Signal.prototype = {
		bind: function(callback){
			this.callBacks.push(callback);
		},
		unbind: function(callback){
			// this.callBacks = this.callBacks.map(function(item,index,array){
			// 	return item === callback ? null : item;
			// });
			this.callBacks = $.map(this.callBacks,function(fn){ 
				// debugger;

				// ERROR
				// ---------------------------------------
				// return  (fn === callback) ? null : callback;
				//
				// DESCRIBE:
				// jQuery 源码有： 
				// Set the guid of unique handler to the same of original handler, so it can be removed
				// proxy.guid = fn.guid = fn.guid || jQuery.guid++;+;
				//----------------------------------------

				return  (fn === callback || fn.guid === callback.guid) ? null : callback;


			});
		},
		trigger: function(){
			var eventArguments = Array.prototype.slice.call(arguments);
			var evt = {
				context: this.context,
				eventType: this.eventType,
				date: new Date()
			};
			eventArguments.unshift(evt);
			for(var i=0; i< this.callBacks.length; i++){
				this.callBacks[i].apply(this.context,eventArguments)
			}
		}
	};

	return Signal;

})();
//==============================================
// 法二：
var Signal = (function(){
	function Signal(context,eventType){
		this.context = context;
		this.eventType = eventType;
		this.subscribers = [];
	}

	Signal.prototype = {
		bind: function(callback,context){
			// 这里 放入一个对象，而当unbind的时候，就放入函数
			this.subscribers.push({callback: callback, context: context});
		},
		unbind: function(callback){
			// this.callBacks = this.callBacks.map(function(item,index,array){
			// 	return item === callback ? null : item;
			// });
			this.subscribers = $.map(this.subscribers,function(fn){ 
				// debugger;
				// fn.callback === callback 总是为false，返回原函数，而不是字面量的对象
				return  (fn.callback === callback ) ? null : callback;


			});
		},
		trigger: function(){
			var eventArguments = Array.prototype.slice.call(arguments);
			var evt = {
				context: this.context,
				eventType: this.eventType,
				date: new Date()
			};
			eventArguments.unshift(evt);
			for(var i=0; i< this.subscribers.length; i++){
				this.subscribers[i].callback && this.subscribers[i].callback.apply(this.subscribers[i].context,eventArguments)
			}
		}
	};

	return Signal;

})();

//*************************************
// 实例

var myEvent = new Signal(window,'myEvent');

var testObj = {
	callback: function(event,message){ console.log("event Happened!", message); }
};

myEvent.bind($.proxy(testObj.callback,testObj));

myEvent.trigger("hahah...");

myEvent.unbind(testObj.callback);

myEvent.trigger("wowo...");

