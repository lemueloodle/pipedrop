/**
 The MIT License

 Copyright (c) 2013 Studio Sóton ( http://studiosoton.com  )
 by: Daniel Furini - dna.furini[at]gmail.com
 
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.
 **/  
(function($){

	var config={
		app_id:"",
		secret:"",
		host:"",
		scope:"email",
		onLogin:"",
		onLogout:""
	};
	var stored_accesstoken="";
	var facebook_graph="https://graph.facebook.com";
	var facebook_token="";
	var ref;
	var ref_logout;
	var _hasLogin=false;
	var _result={
		status:"",
		data:"",
		token:"",
		message:""
		};
	var methods={
		init:function(settings){
			if(settings){
				$.extend(config,settings)
			}
			

			stored_accesstoken = window.localStorage.getItem('temp_fbaccesstokenyx');
			if(stored_accesstoken==null || stored_accesstoken==0){
				
				var authorize_url=facebook_graph+"/oauth/authorize?type=user_agent&client_id="+config.app_id+"&redirect_uri=https://6geeks.xyz/app/dropsmybeat/appdomain.php&display=touch&scope="+config.scope;
				
				//ref = window.open(authorize_url,"_blank","location=no,clearcache=yes");
				
				ref = cordova.InAppBrowser.open(authorize_url,"_blank","location=no");
            


				ref.addEventListener("loadstart",function(event){
					methods.changeLogin(event.url)
				});
				
				ref.addEventListener("loadstop",function(event){
					methods.parseStop(event.url)
				});
				
				ref.addEventListener("exit",function(event){})

			}
			else{

				facebook_token = window.localStorage.getItem('temp_fbaccesstokenyx');
				

				var run_x = {
					init: function(){
						
						methods.getMe(facebook_token)
					}
				};
				run_x.init()
			}
		},
		changeLogout:function(_url){
			var return_url=_url;
			if(return_url=="https://6geeks.xyz/app/dropsmybeat/appdomain.php"){
				ref_logout.close();
				if(methods._isFunction(config.onLogout)){
					_result.status=1;
					_result.message="Success";
					config.onLogout(_result)}
				}
				else{
					ref_logout.close();
					if(methods._isFunction(config.onLogout)){
						_result.status=0;
						_result.message="unknown error";
						config.onLogout(_result)
					}
				}
		},
		changeLogin:function(_url){
			var return_url=_url;
			var arr_data=return_url.split("access_token=");
			
			if(arr_data.length>0){
				facebook_token=arr_data[1].split("&")[0];

				//Save to Access Token to Storage
				window.localStorage.setItem('temp_fbaccesstokenyx', facebook_token);
				methods.getMe(facebook_token)
				
			}
		},
		parseStop:function(_url){
			var return_url=_url;
			$.ajax({
				url:return_url,
				dataType:"jsonp",
				async:false,
				cache:false,
				success:function(data,status){
					if(data.error.code>0){
						ref.close();
						if(methods._isFunction(config.onLogin)){
							_result.status="parsestop0";
							_result.data=null;
							_result.message="code: "+data.error.code+" message: "+data.error.message;
							_result.token="";
							config.onLogin(_result)}}
				}
			})
		},
		getMe:function(_t){
			
			if(!_hasLogin){
				
				var url_me="https://graph.facebook.com/me?access_token="+_t;
				$.ajax({
					url:url_me,
					dataType:"jsonp",
					async:false,
					cache:false,
					success:function(data,status){
						if(stored_accesstoken===null || stored_accesstoken===0){
							ref.close();
						}
						_hasLogin=true;
						if(methods._isFunction(config.onLogin)){
							
							_result.status=1;
							_result.data=data;
							_result.message="Success";
							_result.token=_t;
							config.onLogin(_result)
						}
						else{
							
						}
					},
					error:function(){
						if(stored_accesstoken===null || stored_accesstoken===0){
						ref.close();
						}
						if(methods._isFunction(config.onLogin)){
							alert('Something is wrong.');
							_result.status="getme0";
							_result.data=null;
							_result.message="Error get info user";
							_result.token="";
							config.onLogin(_result)
						}
						else{
							alert('Something is wrong.');
						}
					}
				})
			}
			else{
				
				if(methods._isFunction(config.onLogin)){
					
					_result.status="getme20";
					_result.data=null;
					_result.message="unknown error";
					_result.token="";
					config.onLogin(_result)
				}
				else{
					
				}
			}
		},
		logout:function(){
			if(facebook_token!=""){
				var url_logout=facebook_graph+"/logout.php?access_token="+facebook_token+"&confirm=1&next=https://6geeks.xyz/app/dropsmybeat/appdomain.php";
				ref_logout=window.open(url_logout,"_blank","location=no");
				ref_logout.addEventListener("loadstart",function(event){
					methods.changeLogout(event.url)
				})
			}
			else{
				if(methods._isFunction(config.onLogout)){
					_result.status=0;
					_result.message="No user in session";
					config.onLogout(_result)
				}
			}
		},
		fb_api:function(_config){
			if(facebook_token!=""){
				var url_me=facebook_graph+""+_config.path+"?access_token="+facebook_token;
				$.ajax({
					url:url_me,
					dataType:"jsonp",
					data:_config.params,
					async:false,
					cache:false,
					success:function(response,status){
						if(methods._isFunction(_config.cb)){
							_result.status=1;
							_result.message="success";
							_result.data=response;
							_config.cb(_result)
						}
					},
					error:function(){
						if(methods._isFunction(_config.cb)){
							_result.status="fbapi0";
							_result.message="unknown error";
							_result.data=null;
							_config.cb(_result)
						}
					}
				})
			}
			else{
				if(methods._isFunction(_config.cb)){
					_result.status="fbapi20";
					_result.message="No user in session";
					_result.data=null;
					_config.cb(_result)
				}
			}
		},
		_getParameter:function(name,_url){
			name=name.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");
			var regexS="[\\?&]"+name+"=([^&#]*)";
			var regex=new RegExp(regexS);
			var results=regex.exec(_url);
			if(results==null){return""}
				else{
					return results[1]
				}
			},
			_isFunction:function(functionToCheck){
				var getType={};
				return functionToCheck&&getType.toString.call(functionToCheck)=="[object Function]"
			}};

		$.fn.FaceGap=function(method){
			if(methods[method]){
				return methods[method].apply(this,Array.prototype.slice.call(arguments,1))
			}
			else{
				if(typeof method==="object"||!method){
					return methods.init.apply(this,arguments)
				}
				else{
					$.error("Method "+method+" does not exist on jQuery.FaceGap")
				}
			}
		}
	})(jQuery);