(function(global) {
    var nodes = global.nodes;
    function log(){
        this.addOutput("Action", nodes.EVENT);
        this.addProperty("Text", "something");
        this.addInput("Trigger", nodes.ACTION);
        this.widgets_up = true; 
    }
    log.title = "Print";
    log.prototype.onAction = function(){
        this.setOutputData(0, this.getInputData(0));    


  
            if(this.getOutputData(0)){
                const path = require('path')
                const readanything = fs.readFileSync( __dirname+"../../../../../path.txt", "utf-8");
            fs.appendFileSync(this.getInputData(0),`\nconsole.log(\`${nodes.parse(this.properties["Text"])}\`)`);
            this.trigger("Action");
            }
    }
    nodes.registerNodeType("Bot Action/Print", log );
})(this)