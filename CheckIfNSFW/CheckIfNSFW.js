// mod by JopGamerNL#3526 [ Discord ]
// more DBW mods at: https://tinyurl.com/dbwmods

(function(global) {
    var nodes = global.nodes;

    function CheckIfNSFW(){
        this.addOutput("True", nodes.EVENT);
        this.addOutput("False", nodes.EVENT);
        this.addProperty("Channel ID", "\${message.channel.id}");
        this.addProperty("",`<div class="card" style="overflow-y: scroll; max-height: 15vw;">
        <div class="container">
        <h3 style="font-weight: 600;">Mod by JopGamerNL#3526<br />Find more mods by clicking <span style="color: #000000;"><a style="color: #000000;" title="DBW Mod Collection" href="https://tinyurl.com/dbwmods" target="_blank">here</a></span></h3>
        </div>
        </div>`,"list");
        this.addInput('Trigger', nodes.ACTION);
        this.widgets_up = true;
    }
    CheckIfNSFW.title = "Check if NSFW";
    CheckIfNSFW.prototype.onAction = function(){
        this.setOutputData(0, this.getInputData(0));
        this.setOutputData(1, this.getInputData(0)); 

        if(this.getOutputData(0)){
            const path = require('path')
            const readanything = fs.readFileSync( __dirname+"../../../../../path.txt", "utf-8");
            fs.appendFileSync(this.getInputData(0),`
            let channel = client.channels.cache.get(\`${this.properties["Channel ID"]}\`);

            if(channel.nsfw){  
            `);
            this.trigger("True");
            fs.appendFileSync(this.getInputData(0),`
            } else {
            `);
            this.trigger("False");
            fs.appendFileSync(this.getInputData(0),`\n}`);
        }
    }
    nodes.registerNodeType("Channel Action/Check If NSFW", CheckIfNSFW );
})(this)