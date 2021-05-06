(function(global) {
    var nodes = global.nodes;
    function cooldown(){
        this.addOutput("Action", nodes.EVENT);
        this.addOutput("cooldown", nodes.EVENT);
        this.addProperty("Seconds", "10");
        this.addInput("Trigger", nodes.ACTION);
        this.widgets_up = true; 
    }
    cooldown.title = "Cooldown";
    cooldown.prototype.onAction = function(){
        this.setOutputData(0, this.getInputData(0));    
        this.setOutputData(1, this.getInputData(0));    

  
            if(this.getOutputData(0)){
                const path = require('path')
                const readanything = fs.readFileSync( __dirname+"../../../../../path.txt", "utf-8");
                fs.appendFileSync(this.getInputData(0),`
                if(await client.userdata.fetch(\`\${message.guild.id}_\${this.name}_\${message.author.id}\`) == null){
                    await client.userdata.set(\`\${message.guild.id}_\${this.name}_\${message.author.id}\`,'cooldown');
                    await setTimeout(async() => {
                            
                           
                    await client.userdata.set(\`\${message.guild.id}_\${this.name}_\${message.author.id}\`,null);
                            
                            }, ${this.properties["Seconds"]}*1000);
                    `);
            this.trigger("Action");
            fs.appendFileSync(this.getInputData(0),`
        }else{`)
            this.trigger("cooldown");
            fs.appendFileSync(this.getInputData(0),"\n}")
            }
    }
    nodes.registerNodeType("Command Action/Cooldown", cooldown );
})(this)