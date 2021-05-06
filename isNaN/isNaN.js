(function(global) {
    var nodes = global.nodes;

    function isNaN(){
        this.addOutput("True", nodes.EVENT);
        this.addOutput("False", nodes.EVENT);
        this.addProperty("Thing to check", "");
        this.addProperty("",`<div class="card" style="overflow-y: scroll; max-height: 15vw;">
        <div class="container">
        <h3 style="font-weight: 600;">This mod checks if something is not a number.</h3>
        </div>
        </div>`,"list");
        this.addInput('Trigger', nodes.ACTION);
        this.widgets_up = true;
    }
    isNaN.title = "isNaN";
    isNaN.prototype.onAction = function(){
        this.setOutputData(0, this.getInputData(0));
        this.setOutputData(1, this.getInputData(0)); 

        if(this.getOutputData(0)){
            const path = require('path')
            const readanything = fs.readFileSync( __dirname+"../../../../../path.txt", "utf-8");
            fs.appendFileSync(this.getInputData(0),`
            if(isNaN(\`${this.properties["Thing to check"]}\`) == true){  
            `);
            this.trigger("True");
            fs.appendFileSync(this.getInputData(0),`
            } else {
            `);
            this.trigger("False");
            fs.appendFileSync(this.getInputData(0),`\n}`);
        }
    }
    nodes.registerNodeType("Variable Action/isNaN", isNaN );
})(this)