(function(global) {
    var nodes = global.nodes;
    function videoimg(){
        this.addProperty("Link","");
        this.addProperty("Save to variable","");
        this.addOutput("Action", nodes.EVENT);
        this.addInput("Trigger", nodes.ACTION);
        this.size = [170,27];
        this.widgets_up = true; 
    }
    videoimg.title = "Get Video Thumbnail";
    videoimg.prototype.onAction = function()
    {
        
            this.setOutputData(0, this.getInputData(0));  



  
            if(this.getOutputData(0)){
       
       
            fs.appendFileSync(this.getInputData(0),`\ntry{
                await require('ytdl-core').getInfo(\`${this.properties["Link"]}\`).then(a=>{
                global.${this.properties["Save to variable"].replaceAll("${","").replaceAll("}","").replaceAll("global.","")} =  a.videoDetails.thumbnails[4].url;
            });
        }catch{
            await require('ytdl-core').getInfo(\`${this.properties["Link"]}\`).then(a=>{
                global.${this.properties["Save to variable"].replaceAll("${","").replaceAll("}","").replaceAll("global.","")} =  a.videoDetails.thumbnails[0].url;
            });
        }`);
          nodes.save_var(this.properties["Save to variable"], "Video Thumbnail")
            }
            this.trigger("Action");

    }
    nodes.registerNodeType("Music Action/Get Video Thumbnail", videoimg );
})(this)