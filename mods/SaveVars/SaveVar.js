// mod by JopGamerNL#3526 [ Discord ]
// more DBW mods at: https://tinyurl.com/dbwmods

(function(global) {
    var nodes = global.nodes;
    
    // Create new SaveVar

    function CreateSaveVar(){
        this.addOutput('Action', nodes.EVENT);
        this.addProperty("name", "name of save variable");
        this.addProperty("Value", "");
        this.addProperty("",`<div class="card" style="overflow-y: scroll; max-height: 15vw;">
        <div class="container">
        <h2 style="padding: 0.1vw 0.1vw;">Notes:</h2>
        <h3 style="font-weight: 600;">Please Connect the <span style="text-decoration: underline;">Fetch SaveVars</span> node from the <span style="text-decoration: underline;">SaveVars Mod</span> tab to a <span style="text-decoration: underline;">Bot Ready</span> event in order to make this mod work properly as intended</h3>
        </div>
        </div>`,"list");
        this.addInput('Trigger', nodes.ACTION);
        this.widgets_up = true;
    }
    CreateSaveVar.title = "Create SaveVar";
    CreateSaveVar.prototype.onAction = function(){
        this.setOutputData(0, this.getInputData(0));

        if(this.getOutputData(0)){
            const path = require('path')
            const readanything = fs.readFileSync( __dirname+"../../../../../path.txt", "utf-8");
            fs.appendFileSync(this.getInputData(0),`
                await client.userdata.set(\`SaveVar_${this.properties["name"]}\`, ${this.properties["Value"].replaceAll("${", "\`${").replaceAll("}", "}\`")});
                global.${this.properties["name"]} = await client.userdata.fetch(\`SaveVar_${this.properties["name"]}\`);
                
                if(!global.SaveVars) {
                global.SaveVars = [];
                }

                global.SaveVars.push(\`${this.properties["name"]}\`);
                await client.userdata.set(\`SaveVars\`, global.SaveVars);
                `);
            nodes.save_var(this.properties["name"], "SaveVar")
        }
        this.trigger("Action");
    }
    nodes.registerNodeType("SaveVars Mod/Create SaveVar", CreateSaveVar );

    // Fetch SaveVars OnReady event 

    function UpdateSaveVars(){
        this.addOutput('Action', nodes.EVENT);
        this.addProperty("",`<div class="card" style="overflow-y: scroll; max-height: 15vw;">
        <div class="container">
        <h2 style="padding: 0.1vw 0.1vw;">How to use:</h2>
        <h3 style="font-weight: 600;">Please Connect this node to the <span style="text-decoration: underline;"><strong>Bot Ready</strong></span> event</h3>
        </div>
        </div>`,"list");
        this.addInput('Trigger', nodes.ACTION);
        this.widgets_up = true;
    }
    UpdateSaveVars.title = "Fetch SaveVars";
    UpdateSaveVars.prototype.onAction = function(){
        this.setOutputData(0, this.getInputData(0));

        if(this.getOutputData(0)){
            const path = require('path')
            const readanything = fs.readFileSync( __dirname+"../../../../../path.txt", "utf-8");
            fs.appendFileSync(this.getInputData(0),`
            global.SaveVars = await client.userdata.fetch(\`SaveVars\`);
            if(!global.SaveVars) return;
            
            global.i=0;
            global.SaveVars.forEach(async save_name=>{
                await setTimeout(async ()=>{
                global.i++;
                global[save_name] = await client.userdata.fetch(\`SaveVar_\${save_name}\`);
                if(global.i >= global.SaveVars.length){}
            },global.i)})
            `);
        }
        this.trigger("Action");
    }
    nodes.registerNodeType("SaveVars Mod/Fetch SaveVars", UpdateSaveVars );

    // edit SaveVar

    function EditSaveVar(){
        this.addOutput('Action', nodes.EVENT);
        this.addProperty("Value", "SaveVar Here");
        this.addProperty("Method", "");
        this.addProperty("Second Value", "");
        this.addProperty("",`<div class="card" style="overflow-y: scroll; max-height: 15vw;">
        <div class="container">
        <h2 style="padding: 0.1vw 0.1vw">Methods</h2>
        <h3 style="font-weight: 600;">Equal${nodes.insert_button("=")}</h3>
        <h3 style="font-weight: 600;">Add${nodes.insert_button("+")}</h3>
        <h3 style="font-weight: 600;">Subtract${nodes.insert_button("-")}</h3>
        <h3 style="font-weight: 600;">Multiply${nodes.insert_button("*")}</h3>
        <h3 style="font-weight: 600;">Divide${nodes.insert_button("/")}</h3>
        <h3 style="font-weight: 600;">Modulus${nodes.insert_button("%")}</h3>
        </div>
        </div>`,"list");
        this.addInput('Trigger', nodes.ACTION);
        this.widgets_up = true;
    }
    EditSaveVar.title = "Edit SaveVar";
    EditSaveVar.prototype.onAction = function(){
        this.setOutputData(0, this.getInputData(0));

        if(this.getOutputData(0)){
            const path = require('path')
            const readanything = fs.readFileSync( __dirname+"../../../../../path.txt", "utf-8");
            fs.appendFileSync(this.getInputData(0),`
                
                
                ${this.properties["Value"].replaceAll("${", "").replaceAll("}", "")} = await ${this.properties["Value"].replaceAll("${", "\`${").replaceAll("}", "}\`")} ${this.properties["Method"]} ${this.properties["Second Value"].replaceAll("${", "\`${").replaceAll("}", "}\`")};
                let varName = \`${this.properties["Value"].replaceAll("global.", "")}\`;
                
                await client.userdata.set(\`SaveVar_\${varName}\`, ${this.properties["Value"].replaceAll("${", "\`${").replaceAll("}", "}\`")});
                `);
        }
        this.trigger("Action");
    }
    nodes.registerNodeType("SaveVars Mod/Edit SaveVar", EditSaveVar );

    // Push SaveVar

    function PushSaveVar(){
        this.addOutput('Action', nodes.EVENT);
        this.addProperty("SaveVar", "");
        this.addProperty("",`<div class="card" style="overflow-y: scroll; max-height: 15vw;">
        <div class="container">
        <h2 style="padding: 0.1vw 0.1vw;">Notes:</h2>
        <h3 style="font-weight: 600;">This node will push any SaveVar to the Save file.</h3>
        <h3 style="font-weight: 600;">You don't need this node if you change the SaveVar values with nodes from this mod.</h3>
        <h3 style="font-weight: 600;">This node should only be used in case the SaveVar value has been edited by a node that's not included by this mod.</h3>
        </div>
        </div>`,"list");
        this.addInput('Trigger', nodes.ACTION);
        this.widgets_up = true;
    }
    PushSaveVar.title = "Push SaveVar";
    PushSaveVar.prototype.onAction = function(){
        this.setOutputData(0, this.getInputData(0));

        if(this.getOutputData(0)){
            const path = require('path')
            const readanything = fs.readFileSync( __dirname+"../../../../../path.txt", "utf-8");
            fs.appendFileSync(this.getInputData(0),`
                
            let varName = \`${this.properties["SaveVar"].replaceAll("global.", "").replaceAll("${", "").replaceAll("}", "")}\`;
            await client.userdata.set(\`SaveVar_\${varName}\`, ${this.properties["SaveVar"].replaceAll("${", "\`${").replaceAll("}", "}\`")});
            `);
        }
        this.trigger("Action");
    }
    nodes.registerNodeType("SaveVars Mod/Push SaveVar", PushSaveVar );
})(this)