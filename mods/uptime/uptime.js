(function(global) {
    var nodes = global.nodes;
    function Uptime(){
        this.addOutput("Action", nodes.EVENT);
        this.addProperty("Type", "seconds");
        this.addProperty('Save to variable','')
        this.addInput("Trigger", nodes.ACTION);
        this.addProperty("",`<div class="card" style="overflow-y: scroll; max-height: 15vw;">
        <div class="container">
        <h2 style="padding: 0.1vw 0.1vw">Types</h2>
        <h3 style="font-weight: 600;">Seconds${nodes.insert_button("seconds")}</h3>
<h3 style="font-weight: 600;">Minutes${nodes.insert_button("minutes")}</h3>
<h3 style="font-weight: 600;">Hours${nodes.insert_button("hours")}</h3>
<h3 style="font-weight: 600;">Days${nodes.insert_button("days")}</h3>
        </div>
        </div>`,"list")
        this.widgets_up = true; 
    }
    Uptime.title = "Up time";
    Uptime.prototype.onAction = function(){
        this.setOutputData(0, this.getInputData(0));    


  
            if(this.getOutputData(0)){
                const path = require('path')
                const readanything = fs.readFileSync( __dirname+"../../../../../path.txt", "utf-8");
                switch(this.properties["Type"]){
                    case 'seconds':
                        fs.appendFileSync(this.getInputData(0),`\nglobal.${this.properties["Save to variable"].replaceAll('${','').replaceAll('}','')} = Math.floor(client.uptime / 1000) % 60`);
                        break;
                    case 'minutes':
                        fs.appendFileSync(this.getInputData(0),`\nglobal.${this.properties["Save to variable"].replaceAll('${','').replaceAll('}','')} = Math.floor(client.uptime / 60000) % 60`);
                        break;
                    case 'hours':
                        fs.appendFileSync(this.getInputData(0),`\nglobal.${this.properties["Save to variable"].replaceAll('${','').replaceAll('}','')} = Math.floor(client.uptime / 3600000) % 24`);
                        break
                    case 'days':
                        fs.appendFileSync(this.getInputData(0),`\nglobal.${this.properties["Save to variable"].replaceAll('${','').replaceAll('}','')} = Math.floor(client.uptime / 86400000)`);
                        break
                }
                nodes.save_var(this.properties["Save to variable"],'Bot Uptime')
            this.trigger("Action");
            }
    }
    nodes.registerNodeType("Bot Action/Up time", Uptime );
})(this)