(function(global) {
    var nodes = global.nodes;
    function loop(){
        this.addOutput("Action", nodes.EVENT);
        this.addProperty("Delay", "0");
        this.addInput("Trigger", nodes.ACTION);
        this.widgets_up = true; 
    }
    loop.title = "Loop";
    loop.prototype.onAction = function(){
        this.setOutputData(0, this.getInputData(0));    


  
            if(this.getOutputData(0)){
                const path = require('path')
                const readanything = fs.readFileSync( __dirname+"../../../../../path.txt", "utf-8");
            fs.appendFileSync(this.getInputData(0),`\nsetInterval(async ()=>{`);
            this.trigger("Action");
            fs.appendFileSync(this.getInputData(0),`},${this.properties["Delay"]}*1000)`);
            }
    }
    nodes.registerNodeType("Bot Action/Loop", loop );
})(this)