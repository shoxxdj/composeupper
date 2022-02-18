const fs = require('fs-extra')
const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');
YAML = require('yamljs');
const composer = require('docker-composer');
const dockerCompose = require('docker-compose');

	function getARandomName(){
		return new Promise((resolve,reject)=>{
			if(true){
				resolve(uniqueNamesGenerator({dictionaries:[colors,animals],length:2}));	
			}
			else{
				reject(); //Maybe Thanos is back at this point .. 
			}
		});
	}

	function copyFiles(src,dst){
		return new Promise((resolve,reject)=>{
			fs.copy(src,dst)
			.then(()=>{
				resolve(dst)
			})
			.catch((err)=>{
				reject(err);
			})
		})
	}

	function addLabelToDockerCompose(path,serviceName,value){
		return new Promise((resolve,reject)=>{
			nativeObject = YAML.load(path+'/docker-compose.yml');

			if(nativeObject.services!=undefined){
				if(nativeObject.services[serviceName].labels==undefined){
					nativeObject.services[serviceName].labels=[];
					//"traefik.http.routers.blog.rule=Host(`blog.your_domain`)"
					nativeObject.services[serviceName].labels.push(value);
				}
				else{
					nativeObject.services[serviceName].labels.push(value);
				}
			}else{
				if(nativeObject[serviceName].labels==undefined){
					nativeObject[serviceName].labels=[];
					nativeObject[serviceName].labels.push(value);
				}
				else{
					nativeObject[serviceName].labels.push(value);
				}
			}

			var generatedYML = composer.generate( nativeObject )
			fs.writeFile(path+'/docker-compose.yml',generatedYML,(err)=>{
				if(!err) resolve();
				else reject(err);
			});
		});
	}

	function runCompose(path){
		return new Promise((resolve,reject)=>{
			dockerCompose.upAll({ cwd: path, log: false }).then(
					() => {
					  resolve();
					},
					(err) => {
					  reject(err);
					}
				)
		});
		
	}

	function stopCompose(path){
		return new Promise((resolve,reject)=>{
			dockerCompose.stop({ cwd: path, log: true }).then(
					() => {
					  resolve();
					},
					(err) => {
					  reject(err);
					}
				)
		});
	}


	function getLogs(path,service){
		return new Promise((resolve,reject)=>{
			dockerCompose.logs(service,{cwd:path}).then(
				(logs) => {
					resolve(logs)
				},
				(err)=>{
					reject(err);
				}
			)
		});
	}


module.exports = {
	getARandomName,
	copyFiles,
	addLabelToDockerCompose,
	runCompose,
	stopCompose
}
