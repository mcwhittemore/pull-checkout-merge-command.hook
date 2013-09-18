var colors = require("colors");

var hook = process.argv[2];

var validHooks = ["post-checkout", "post-merge"];

var exec = require("child_process").exec;

var runCommands = function(i, commands){

	var command = commands[i];
	if(typeof command == "string"){
		exec(command, function(err, stdout, stderr){
			if(stdout){
				console.log(stdout);
			}

			if(stderr){
				console.error(stderr);
			}

			if(err){
				console.error(err);
				process.exit(1);
			}
			else{
				runCommands(i+1, commands);
			}
		});
	}
	else if(typeof command != "undefined"){
		console.error("Commands".blue+" must be strings");
	}
}

if(validHooks.indexOf(hook)==-1){
	console.log("pull-checkout-merge-command.hook".blue+" is not valid for "+hook.red+".");
	console.log("No commands will be run!".red);
}
else{
	try{
		var packageJson = require(process.cwd()+"/package.json");

		if(packageJson.scripts == undefined && packageJson.scripts["pcm-command"]==undefined){
			console.error("package.json".blue+" must include a "+"scripts".red+" param with a "+"pcm-command".red+" param");
			process.exit(1);
		}
		else{
			var commands;
			if(Object.prototype.toString.call( packageJson.scripts["pcm-command"] ) === '[object Array]'){
				commands= packageJson.scripts["pcm-command"];
			}
			else if(typeof packageJson.scripts["pcm-command"] == "string"){
				commands = [packageJson.scripts["pcm-command"]];
			}
			
			if(commands){
				runCommands(0, commands);
			}
			else{
				console.error("package.json scripts pcm-command".blue+" must be a string or an array");
			}
		}
	}
	catch(err){
		console.error(err);
		process.exit(1);
	}
}