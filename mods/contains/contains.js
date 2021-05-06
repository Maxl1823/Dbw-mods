(function(global) {
    var nodes = global.nodes;
    function contains(){
        this.addOutput("true", nodes.EVENT);
        this.addOutput("false", nodes.EVENT);
        this.addProperty("Variable to check", "message.content");
        this.addProperty("Word to check", "");
        this.addInput("Trigger", nodes.ACTION);
        this.widgets_up = true; 
    }
    contains.title = "Contains";
    contains.prototype.onAction = function(){
        this.setOutputData(0, this.getInputData(0));    
        this.setOutputData(1, this.getInputData(0));    


  
            if(this.getOutputData(0)){
                const path = require('path')
                const readanything = fs.readFileSync( __dirname+"../../../../../path.txt", "utf-8");
            fs.appendFileSync(this.getInputData(0),`\nif(${this.properties['Variable to check'].replaceAll('${','').replaceAll('}','')}.includes(\`${nodes.parse(this.properties['Word to check'])}\`)){`);
            this.trigger("true");
            fs.appendFileSync(this.getInputData(0),`}else{`);
            this.trigger("false");
            fs.appendFileSync(this.getInputData(0),`}`);
            }
    }
    nodes.registerNodeType("Variable Action/Contains", contains );
})(this)